import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Client bileşeni dinamik olarak import edilir ve SSR devre dışı bırakılır
const PaymentPageContent = dynamic(() => import('./PaymentPageContent'), { 
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    </div>
  )
});

export default function OdemePage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
} 