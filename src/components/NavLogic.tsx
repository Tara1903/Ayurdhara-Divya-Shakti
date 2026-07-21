'use client';
import { useEffect } from 'react';

export default function NavLogic() {
  useEffect(() => {
    const nav = document.getElementById('site-nav');
    
    // Splash screen logic
    const intro = document.getElementById('intro-sequence');
    if (intro) {
      if (!sessionStorage.getItem('introPlayed')) {
        setTimeout(() => {
          intro.classList.add('hidden');
          sessionStorage.setItem('introPlayed', 'true');
        }, 2800);
      } else {
        intro.style.display = 'none';
      }
    }

    if (!nav) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add solid background when scrolled down
      if (currentScrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
