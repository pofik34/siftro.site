'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (!session) {
      router.push('/giris');
      return;
    }

    const plan = searchParams.get('plan');
    if (!plan) {
      router.push('/#pricing');
      return;
    }

    const planDetails = plan === 'monthly' ? {
      name: 'Aylık Plan',
      price: '₺3799',
      interval: 'ay',
      features: [
        'Sınırsız veri kazıma',
        'Apify ve n8n entegrasyonu',
        'Excel formatında veri aktarımı',
        'Teknik destek',
        'İptal etme garantisi'
      ]
    } : plan === 'yearly' ? {
      name: 'Yıllık Plan',
      price: '₺3199',
      interval: 'ay',
      features: [
        'Sınırsız veri kazıma',
        'Apify ve n8n entegrasyonu',
        'Excel formatında veri aktarımı',
        'Öncelikli teknik destek',
        'İptal etme garantisi',
        '%27 indirim · ₺7.200 tasarruf'
      ]
    } : null;

    if (!planDetails) {
      router.push('/#pricing');
      return;
    }

    const content = document.getElementById('payment-content');
    if (!content) return;

    content.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-8">
          <div class="flex items-center justify-between border-b border-gray-200 pb-8">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">${planDetails.name}</h2>
              <p class="mt-1 text-sm text-gray-500">
                Hemen başlayın ve potansiyel müşterilerinizi otomatik olarak bulun
              </p>
            </div>
            <div class="text-right">
              <p class="text-4xl font-bold text-gray-900">${planDetails.price}</p>
              <p class="text-sm text-gray-500">/${planDetails.interval}</p>
            </div>
          </div>

          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900">Plan özellikleri</h3>
            <ul class="mt-4 space-y-4">
              ${planDetails.features.map(feature => `
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="ml-3 text-gray-600">${feature}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="mt-8">
            <form id="payment-form">
              <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Ödemeyi Tamamla
              </button>
            </form>
          </div>

          <p class="mt-4 text-sm text-gray-500 text-center">
            Güvenli ödeme altyapısı ile işleminiz korunmaktadır.
          </p>
        </div>
      </div>

      <div class="mt-4 text-center">
        <a
          href="/#pricing"
          class="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Fiyatlandırmaya geri dön
        </a>
      </div>
    `;

    const form = document.getElementById('payment-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = form.querySelector('button');
      if (!button) return;
      
      button.disabled = true;
      button.textContent = 'İşleniyor...';

      try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const session = localStorage.getItem('session');
        if (session) {
          const sessionData = JSON.parse(session);
          sessionData.hasPaidPlan = true;
          localStorage.setItem('session', JSON.stringify(sessionData));
        }

        router.push('/panel');
      } catch (err) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg';
        errorDiv.textContent = 'Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.';
        if (form.parentNode) {
          form.parentNode.insertBefore(errorDiv, form);
        }
        
        button.disabled = false;
        button.textContent = 'Ödemeyi Tamamla';
      }
    });
  }, [router, searchParams]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div id="payment-content">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 