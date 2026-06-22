// ponytail: entire scroll animation system is one IntersectionObserver, no libraries
(function(){
  // Reveal on scroll — native IntersectionObserver, no polyfill needed (supported 97%+ browsers)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      } else {
        e.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Counter animation — ponytail: requestAnimationFrame, no library
  const counters = document.querySelectorAll('.stat-counter');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target, duration = 1200;
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        el.textContent = Math.round(target * p);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterIO.observe(el));

  // Navbar background on scroll — ponytail: one scroll listener, throttled by rAF
  let ticking = false;
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.style.background = window.scrollY > 50 ? 'var(--nav-bg)' : 'transparent';
      nav.style.backdropFilter = window.scrollY > 50 ? 'blur(15px)' : 'none';
      ticking = false;
    });
  }, { passive: true });

  // App Feature Theme Toggle
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

  // Smooth scroll for anchor links — ponytail: native scrollIntoView, no library
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();
