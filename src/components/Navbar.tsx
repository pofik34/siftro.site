'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPaidPlan, setHasPaidPlan] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem('session');
    if (session) {
      setIsLoggedIn(true);
      // Burada gerçek API çağrısı yapılacak, şimdilik mock data kullanıyoruz
      const sessionData = JSON.parse(session);
      setHasPaidPlan(sessionData.hasPaidPlan || false);
    } else {
      setIsLoggedIn(false);
      setHasPaidPlan(false);
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    document.body.classList.add('overflow-hidden');
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('session');
    setIsLoggedIn(false);
    setHasPaidPlan(false);
    setShowLogoutModal(false);
    document.body.classList.remove('overflow-hidden');
    router.push('/');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
    document.body.classList.remove('overflow-hidden');
  };

  const LogoutModal = () => {
    if (!showLogoutModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Çıkış yapmak istediğinize emin misiniz?
          </h3>
          <div className="flex space-x-4">
            <button
              onClick={handleLogoutConfirm}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Evet, Çıkış Yap
            </button>
            <button
              onClick={handleLogoutCancel}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Geri
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AuthButtons = () => {
    if (isLoggedIn) {
      return (
        <>
          {hasPaidPlan && (
            <Link href="/panel" className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200">
              Panel
            </Link>
          )}
          <button
            onClick={handleLogoutClick}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            Çıkış Yap
          </button>
        </>
      );
    }
    return (
      <>
        <Link href="/giris" className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200">
          Giriş Yap
        </Link>
        <Link 
          href="/kayit" 
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Kayıt Ol
        </Link>
      </>
    );
  };

  const MobileAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <>
          {hasPaidPlan && (
            <Link href="/panel" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200">
              Panel
            </Link>
          )}
          <button
            onClick={handleLogoutClick}
            className="w-full text-left px-3 py-2 text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Çıkış Yap
          </button>
        </>
      );
    }
    return (
      <>
        <Link href="/giris" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200">
          Giriş Yap
        </Link>
        <Link 
          href="/kayit" 
          className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors duration-200 shadow-sm hover:shadow-md mt-2"
        >
          Kayıt Ol
        </Link>
      </>
    );
  };

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Siftro
                  </span>
                  <span className="hidden sm:inline-block text-sm font-medium text-gray-500">
                    | Workflow Automation
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="sr-only">Ana menüyü aç</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex sm:items-center">
              <div className="flex items-center space-x-6">
                <Link href="/#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Özellikler
                </Link>
                <Link href="/#how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Nasıl Çalışır?
                </Link>
                <Link href="/#pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Fiyatlandırma
                </Link>
                <Link href="/#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  İletişim
                </Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <AuthButtons />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden border-t border-gray-200`}>
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link href="/#features" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200">
              Özellikler
            </Link>
            <Link href="/#how-it-works" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200">
              Nasıl Çalışır?
            </Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200">
              Fiyatlandırma
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200">
              İletişim
            </Link>
            <div className="my-4 border-t border-gray-200"></div>
            <MobileAuthButtons />
          </div>
        </div>
      </nav>
      <LogoutModal />
    </>
  );
} 