'use client';

import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    };

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([data]);

      if (error) {
        throw new Error(error.message);
      }

      setSubmitStatus('success');
      setStatusMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Ad Soyad
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  className="block w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Adınız Soyadınız"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                E-posta
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="ornek@sirketiniz.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                Mesaj
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="block w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                  placeholder="Mesajınız..."
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {submitStatus !== 'idle' && (
            <div className={`p-4 rounded-lg ${
              submitStatus === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {submitStatus === 'success' ? (
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{statusMessage}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gönderiliyor...
                </>
              ) : (
                'Gönder'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 