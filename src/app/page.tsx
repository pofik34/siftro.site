'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem('session');
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const PricingButtons = ({ plan }: { plan: 'monthly' | 'yearly' }) => {
    if (isLoggedIn) {
      return (
        <Link
          href={`/odeme?plan=${plan}`}
          className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
        >
          Satın Al
        </Link>
      );
    }
    return (
      <Link
        href="/giris"
        className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
      >
        Giriş Yap
      </Link>
    );
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Verini süzer,</span>
              <span className="block text-blue-600">işini hızlandırır.</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Siftro, küçük ve orta ölçekli girişimler için özel olarak geliştirilmiş veri kazıma ve potansiyel müşteri listesi oluşturma aracıdır. Apify ve n8n entegrasyonuyla tamamen otomatik çalışır.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/kayit" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Hemen Başla
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="#how-it-works" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Nasıl Çalışır?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Güçlü Özellikler
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Satış sürecinizi hızlandıracak tüm araçlar tek platformda
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Veri Kazıma Otomasyonu</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Apify ve n8n entegrasyonuyla otomatik veri toplama ve işleme
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Temiz Lead Listesi</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Filtrelenmiş ve düzenlenmiş şirket verileri ve iletişim bilgileri
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Excel Entegrasyonu</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Toplanan veriler doğrudan Excel formatında aktarılır
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">CRM Uyumu</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Popüler CRM sistemleriyle sorunsuz entegrasyon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nasıl Çalışır?
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              4 basit adımda otomatik lead toplama sisteminizi kurun
            </p>
          </div>

          <div className="mt-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Step 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Hesap Oluşturun</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Siftro'ya üye olun ve abonelik planınızı seçin. Size özel Apify hesabınız otomatik oluşturulacak.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Hedef Belirleyin</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Panelden hedef web sitelerini ve arama kriterlerinizi seçin. Hazır şablonlarımızı kullanabilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Otomatik Toplama</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Sistemimiz Apify ve n8n entegrasyonuyla verileri toplar, temizler ve kategorize eder.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold">4</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Sonuçları Görün</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Temizlenmiş lead listelerinizi panelinizden görüntüleyin, Excel veya CSV olarak indirin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Otomatik İş Akışı</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">Apify ile güçlü veri kazıma</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">n8n ile veri temizleme ve filtreleme</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">Excel formatında veri aktarımı</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kolay Yönetim</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">Kullanıcı dostu kontrol paneli</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">Hazır veri toplama şablonları</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">7/24 teknik destek</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Basit ve Şeffaf Fiyatlandırma
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              14 gün ücretsiz deneyin, risksiz başlayın
            </p>
          </div>

          <div className="mt-20 max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
            {/* Free Trial Plan */}
            <div className="flex flex-col border-2 border-gray-200 rounded-lg shadow-lg p-8 bg-white relative hover:border-blue-600 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-center text-gray-900">Deneme</h3>
              <p className="mt-4 text-lg text-center text-gray-500">14 gün ücretsiz deneyin</p>
              <div className="mt-6 text-center">
                <span className="text-5xl font-extrabold text-gray-900">₺0</span>
                <span className="text-xl font-medium text-gray-500">/14 gün</span>
              </div>
              <ul className="mt-8 space-y-4 flex-grow">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Sınırsız veri kazıma</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Apify ve n8n entegrasyonu</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Excel formatında veri aktarımı</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Teknik destek</span>
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href={isLoggedIn ? "/panel" : "/kayit"}
                  className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  {isLoggedIn ? 'Panele Git' : 'Ücretsiz Dene'}
                </Link>
                <p className="mt-2 text-sm text-center text-gray-500">
                  Kredi kartı gerekmiyor
                </p>
              </div>
            </div>

            {/* Monthly Plan */}
            <div className="flex flex-col border-2 border-gray-200 rounded-lg shadow-lg p-8 bg-white relative hover:border-blue-600 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-center text-gray-900">Aylık Plan</h3>
              <p className="mt-4 text-lg text-center text-gray-500">Aylık ödeme esnekliği</p>
              <div className="mt-6 text-center">
                <span className="text-5xl font-extrabold text-gray-900">₺3799</span>
                <span className="text-xl font-medium text-gray-500">/ay</span>
              </div>
              <ul className="mt-8 space-y-4 flex-grow">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Sınırsız veri kazıma</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Apify ve n8n entegrasyonu</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Excel formatında veri aktarımı</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Teknik destek</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">İptal etme garantisi</span>
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <PricingButtons plan="monthly" />
              </div>
            </div>

            {/* Yearly Plan */}
            <div className="flex flex-col border-2 border-blue-600 rounded-lg shadow-lg p-8 bg-white relative">
              {/* Popular Badge */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">
                  En Popüler
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-center text-gray-900">Yıllık Plan</h3>
              <p className="mt-4 text-lg text-center text-gray-500">Yıllık ödemede tasarruf</p>
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-5xl font-extrabold text-gray-900">₺3199</span>
                  <span className="text-xl font-medium text-gray-500">/ay</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Yıllık ödeme ile (₺38.388/yıl)</p>
                <p className="mt-2 text-sm font-medium text-green-600">%27 indirim · ₺7.200 tasarruf</p>
              </div>
              <ul className="mt-8 space-y-4 flex-grow">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Sınırsız veri kazıma</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Apify ve n8n entegrasyonu</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Excel formatında veri aktarımı</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">Öncelikli teknik destek</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-base text-gray-500">İptal etme garantisi</span>
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <PricingButtons plan="yearly" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
              İletişime Geç
            </h2>
            <p className="mt-4 text-lg text-gray-500 text-center">
              Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2024 Siftro. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
