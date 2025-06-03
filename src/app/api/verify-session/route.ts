import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();
    
    // Get client IP from headers
    let clientIp = 'unknown';
    try {
      const headersList = await headers();
      const forwardedFor = headersList.get('x-forwarded-for');
      if (forwardedFor) {
        clientIp = forwardedFor.split(',')[0].trim();
      }
    } catch (err) {
      console.error('Failed to get client IP:', err);
    }

    // Get session from database
    const { data: session, error: sessionError } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { valid: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    // Check if IP matches and session is not expired
    const isValidIp = session.ip === clientIp;
    const isNotExpired = new Date(session.expires_at) > new Date();

    if (!isValidIp || !isNotExpired) {
      // Delete invalid session
      await supabase
        .from('user_sessions')
        .delete()
        .eq('id', sessionId);

      return NextResponse.json(
        { valid: false, error: 'Session invalid or expired' },
        { status: 401 }
      );
    }

    // Update session expiry if it's still valid
    if (isValidIp && isNotExpired) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // Extend by 30 days

      await supabase
        .from('user_sessions')
        .update({
          expires_at: expiresAt.toISOString(),
          last_used_at: new Date().toISOString(),
        })
        .eq('id', sessionId);
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 