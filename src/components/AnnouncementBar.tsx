'use client';
import { useState, useEffect } from 'react';

const announcements = [
  "FREE SHIPPING ON ORDERS ABOVE ₹999",
  "USE CODE: WELCOME10 FOR 10% OFF",
  "CASH ON DELIVERY AVAILABLE ALL OVER INDIA"
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: 'var(--forest)',
      color: 'var(--ivory)',
      textAlign: 'center',
      padding: '8px 16px',
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      position: 'relative',
      zIndex: 1000,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '36px'
    }}>
      <div 
        style={{
          animation: 'fadeIn 0.5s ease-in-out'
        }}
        key={currentIndex}
      >
        {announcements[currentIndex]}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
