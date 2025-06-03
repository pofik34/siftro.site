import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe } = await request.json();
    
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

    // Authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // If remember me is checked, create a session record
    if (rememberMe) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

      const { error: sessionError } = await supabase
        .from('user_sessions')
        .insert([
          {
            user_id: data.user.id,
            ip: clientIp,
            expires_at: expiresAt.toISOString(),
          }
        ]);

      if (sessionError) {
        console.error('Failed to create session record:', sessionError);
      }
    }

    return NextResponse.json({
      user: data.user,
      session: {
        ...data.session,
        rememberMe,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 