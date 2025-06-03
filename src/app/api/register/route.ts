import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, ad, sirketAdi } = await request.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ad,
          sirket_adi: sirketAdi,
        },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Kayıt başarılı',
        user: data.user 
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 