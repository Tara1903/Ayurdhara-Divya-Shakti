'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AppPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('ayurdhara_app_promo_dismissed');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('ayurdhara_app_promo_dismissed', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center relative">
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="w-16 h-16 bg-[#81C784] rounded-full mx-auto flex items-center justify-center mb-4">
           <span className="text-white text-2xl">📱</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Get the Ayurdhara App</h3>
        <p className="text-gray-600 mb-6 text-sm">Experience faster checkout and exclusive offers on our new Android app.</p>
        <Link 
          href="/mobile-app"
          onClick={handleDismiss}
          className="block w-full bg-[#81C784] text-white font-medium py-2 px-4 rounded-md hover:bg-[#66BB6A] transition-colors mb-3"
        >
          Download Now
        </Link>
        <button 
          onClick={handleDismiss}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}