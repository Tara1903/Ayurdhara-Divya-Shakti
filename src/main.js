import './styles/index.css';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  initIntroSequence();
  initCustomCursor();
  initNavigation();
  initIntersectionObserver();
  initParallax();
  initCountUp();
  initMagneticButtons();
  initParticles();
  initScrollIndicator();
});

/* Cinematic Intro */
function initIntroSequence() {
  const intro = document.getElementById('intro-sequence');
  // Only play on first visit
  if (!sessionStorage.getItem('introPlayed')) {
    setTimeout(() => {
      intro.classList.add('hidden');
      sessionStorage.setItem('introPlayed', 'true');
    }, 2800); // 2.8s total duration for intro

  } else {
    intro.style.display = 'none';
  }
}

/* Custom Cursor */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const interactables = document.querySelectorAll('a, button, .magnetic');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

/* Magnetic Buttons */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const magneticEls = document.querySelectorAll('.magnetic');
  
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Gentle displacement
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* Navigation */
function initNavigation() {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const close = document.getElementById('nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  if (toggle && overlay && close) {
    toggle.addEventListener('click', () => overlay.classList.add('open'));
    close.addEventListener('click', () => overlay.classList.remove('open'));
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => overlay.classList.remove('open'));
    });
  }
}

/* Intersection Observer Reveals */
function initIntersectionObserver() {
  // Check if browser supports ViewTimeline (CSS native approach)
  if (CSS.supports('animation-timeline: view()')) {
    // We already have CSS handling .scroll-reveal
  }
  
  const options = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        
        // Trigger countup if it's a stats section
        if (entry.target.classList.contains('trust-chapter')) {
           triggerCountUp();
        }
      }
    });
  }, options);

  document.querySelectorAll('.reveal, .img-reveal, .gold-divider').forEach(el => {
    observer.observe(el);
  });
  
  // Specific observer for stats
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        triggerCountUp();
        statObserver.disconnect();
      }
    })
  });
  const trustSection = document.getElementById('trust');
  if(trustSection) statObserver.observe(trustSection);
}

/* Parallax */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return; // Disable on mobile for perf

  const heroBg = document.getElementById('hero-bg');
  const heroContent = document.getElementById('hero-content');
  const parallaxImgs = document.querySelectorAll('.parallax-img');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY < window.innerHeight) {
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.7}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
      }
    }

    parallaxImgs.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
         const yPos = (rect.top - window.innerHeight / 2) * 0.15;
         img.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, { passive: true });
}

/* Count Up Animation */
function triggerCountUp() {
  const counters = document.querySelectorAll('.count-up');
  const speed = 200; 

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

/* Gold Dust Particles */
function initParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height, particles;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // initial random spread
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.size = Math.random() * 2 + 1;
      this.speedY = Math.random() * 0.5 + 0.1;
      this.speedX = Math.random() * 0.2 - 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = Math.random() * 0.02 - 0.01;
    }

    update() {
      this.y -= this.speedY;
      this.angle += this.angleSpeed;
      // Sine wave motion
      this.x += Math.sin(this.angle) * 0.5 + this.speedX;

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(197, 165, 114, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < 25; i++) {
      particles.push(new Particle());
    }
    window.addEventListener('resize', resize);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
}

/* Scroll Indicator */
function initScrollIndicator() {
  const indicator = document.getElementById('scroll-indicator');
  if (!indicator) return;

  indicator.addEventListener('click', () => {
    const manifesto = document.getElementById('manifesto');
    if (manifesto) {
      manifesto.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
