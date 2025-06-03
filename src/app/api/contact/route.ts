import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // İstek gövdesinden verileri al
    const { name, email, message } = await request.json();

    // Gerekli alanların kontrolü
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'İsim, e-posta ve mesaj alanları zorunludur' },
        { status: 400 }
      );
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    // Supabase'e veri ekleme
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          message
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Mesajınız kaydedilirken bir hata oluştu' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Mesajınız başarıyla kaydedildi',
        data: data[0]
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 