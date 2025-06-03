'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function OdemeSayfasi() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [planDetails, setPlanDetails] = useState({
    name: '',
    price: '',
    interval: '',
    features: [] as string[]
  });

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem('session');
    if (!session) {
      router.push('/giris');
      return;
    }

    // Get plan type from URL parameters
    const plan = searchParams.get('plan');
    if (!plan) {
      router.push('/#pricing');
      return;
    }

    // Set plan details based on selection
    if (plan === 'monthly') {
      setPlanDetails({
        name: 'Aylık Plan',
        price: '₺4399',
        interval: 'ay',
        features: [
          'Sınırsız veri kazıma',
          'Apify ve n8n entegrasyonu',
          'Excel formatında veri aktarımı',
          'Teknik destek',
          'İptal etme garantisi'
        ]
      });
    } else if (plan === 'yearly') {
      setPlanDetails({
        name: 'Yıllık Plan',
        price: '₺3199',
        interval: 'ay',
        features: [
          'Sınırsız veri kazıma',
          'Apify ve n8n entegrasyonu',
          'Excel formatında veri aktarımı',
          'Öncelikli teknik destek',
          'İptal etme garantisi',
          '%27 indirim · ₺14.400 tasarruf'
        ]
      });
    } else {
      router.push('/#pricing');
    }
  }, [router, searchParams]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement payment processing
      // For now, just simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update user's plan status
      const session = localStorage.getItem('session');
      if (session) {
        const sessionData = JSON.parse(session);
        sessionData.hasPaidPlan = true;
        localStorage.setItem('session', JSON.stringify(sessionData));
      }

      // Redirect to panel
      router.push('/panel');
    } catch (err) {
      setError('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{planDetails.name}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Hemen başlayın ve potansiyel müşterilerinizi otomatik olarak bulun
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-gray-900">{planDetails.price}</p>
                <p className="text-sm text-gray-500">/{planDetails.interval}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Plan özellikleri</h3>
              <ul className="mt-4 space-y-4">
                {planDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <div className="mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="mt-8">
              <form onSubmit={handlePayment}>
                {/* TODO: Add payment form fields */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
                </button>
              </form>
            </div>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Güvenli ödeme altyapısı ile işleminiz korunmaktadır.
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/#pricing"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Fiyatlandırmaya geri dön
          </Link>
        </div>
      </div>
    </div>
  );
} 