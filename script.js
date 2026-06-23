// ponytail: scroll-driven fluid animations, no libraries
(function(){
  'use strict';

  // ─── SCROLL-DRIVEN REVEAL SYSTEM ───
  // Instead of binary show/hide, each element's transform is
  // interpolated based on scroll position (0 → 1 progress).
  // This creates the buttery-smooth "uncommon design" feel.

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

  // Easing: cubic ease-out for natural deceleration
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  const reveals = [];
  document.querySelectorAll('.reveal').forEach(el => {
    // Parse the initial transform from CSS to know where the element starts
    const cs = getComputedStyle(el);
    const startOpacity = parseFloat(cs.opacity) || 0;
    reveals.push({ el, startOpacity, done: false });
  });

  const parallaxes = document.querySelectorAll('.parallax');

  function updateReveals() {
    const vh = window.innerHeight;
    reveals.forEach(item => {
      const rect = item.el.getBoundingClientRect();
      // Element enters when its top crosses 90% of viewport
      // Element is fully revealed when its top reaches 40% of viewport
      const enterPoint = vh * 0.92;
      const fullPoint = vh * 0.55;

      if (rect.top > enterPoint) {
        // Not yet visible — keep hidden state
        item.el.classList.remove('visible');
        item.el.style.setProperty('--progress', '0');
      } else if (rect.top <= fullPoint) {
        // Fully revealed
        item.el.classList.add('visible');
        item.el.style.setProperty('--progress', '1');
      } else {
        // In transition zone — calculate smooth progress
        const raw = (enterPoint - rect.top) / (enterPoint - fullPoint);
        const progress = clamp(easeOut(raw), 0, 1);
        item.el.classList.add('visible');
        item.el.style.setProperty('--progress', progress.toFixed(3));
      }
    });
  }

  function updateParallax() {
    const vh = window.innerHeight;
    parallaxes.forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      // Calculate how far the center of the element is from the center of the viewport
      const distanceFromCenter = vh / 2 - center;
      // Factor is how much the image moves. The image moves in opposite direction of scroll.
      const offset = distanceFromCenter * -0.15;
      el.style.setProperty('--parallax', offset.toFixed(2));
    });
  }

  // ─── rAF-THROTTLED SCROLL ───
  let scrollRAF = null;
  function onScroll() {
    if (scrollRAF) return;
    scrollRAF = requestAnimationFrame(() => {
      updateReveals();
      updateParallax();
      scrollRAF = null;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  // Initial paint
  updateReveals();
  updateParallax();

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('.stat-counter');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target, duration = 1200;
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        el.textContent = Math.round(target * easeOut(p));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterIO.observe(el));

  // ─── NAVBAR SCROLL ───
  let ticking = false;
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const s = window.scrollY > 50;
      nav.style.background = s ? 'rgba(10,10,10,0.85)' : 'transparent';
      nav.style.backdropFilter = s ? 'blur(12px)' : 'none';
      nav.style.webkitBackdropFilter = s ? 'blur(12px)' : 'none';
      ticking = false;
    });
  }, { passive: true });

  // ─── MOBILE HAMBURGER ───
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── APP THEME TOGGLE ───
  const appThemeBtns = document.querySelectorAll('.theme-btn');
  const darkImg = document.querySelector('.dark-img');
  const lightImg = document.querySelector('.light-img');
  if (appThemeBtns.length) {
    appThemeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        appThemeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.dataset.mode === 'light') {
          if (darkImg) darkImg.classList.remove('active');
          if (lightImg) lightImg.classList.add('active');
        } else {
          if (lightImg) lightImg.classList.remove('active');
          if (darkImg) darkImg.classList.add('active');
        }
      });
    });
  }

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();
