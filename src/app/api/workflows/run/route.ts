import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { workflowId } = await request.json();

    // Get workflow details
    const { data: workflow, error: workflowError } = await supabase
      .from('workflows')
      .select('*')
      .eq('id', workflowId)
      .eq('user_id', session.user.id)
      .single();

    if (workflowError || !workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    // Update workflow status to running
    await supabase
      .from('workflows')
      .update({
        status: 'running',
      })
      .eq('id', workflowId);

    try {
      // Run Apify task
      const apifyResponse = await fetch(
        `https://api.apify.com/v2/actor-tasks/${process.env.APIFY_TASK_ID}/run-sync-get-dataset-items`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.APIFY_API_KEY}`,
          },
          body: JSON.stringify({
            targetUrl: workflow.target_website,
            searchCriteria: workflow.search_criteria,
          }),
        }
      );

      if (!apifyResponse.ok) {
        throw new Error('Apify task failed');
      }

      const scrapedData = await apifyResponse.json();

      // Run n8n workflow to process and save data
      const n8nResponse = await fetch(
        `${process.env.N8N_WEBHOOK_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: scrapedData,
            workflow: {
              id: workflow.id,
              name: workflow.name,
            },
            user: {
              id: session.user.id,
              email: session.user.email,
            },
          }),
        }
      );

      if (!n8nResponse.ok) {
        throw new Error('n8n workflow failed');
      }

      // Update workflow status to completed
      const { data: updatedWorkflow, error: updateError } = await supabase
        .from('workflows')
        .update({
          status: 'completed',
          last_run: new Date().toISOString(),
        })
        .eq('id', workflowId)
        .select()
        .single();

      if (updateError) {
        throw new Error('Failed to update workflow status');
      }

      return NextResponse.json({ workflow: updatedWorkflow });
    } catch (error) {
      // Update workflow status to error
      await supabase
        .from('workflows')
        .update({
          status: 'error',
        })
        .eq('id', workflowId);

      throw error;
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 