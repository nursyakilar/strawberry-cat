/* =========================================================
   STRAWBERRY CAT — SCRIPT
   Vanilla JS only. No frameworks, no dependencies.
   Sections: Nav toggle, scroll fade-ins, sticky header shadow,
   menu tabs, back-to-top, contact form, footer year.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function closeNav() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function toggleNav() {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  navToggle.addEventListener('click', toggleNav);

  // Close the mobile menu after a link is tapped (better UX on phones)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close menu if user resizes to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 860) closeNav();
  });


  /* ---------- 2. SCROLL FADE-IN ANIMATIONS ---------- */
  // Uses IntersectionObserver so elements animate in only once,
  // the first time they enter the viewport. Cheap and smooth.
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for very old browsers: just show everything
    fadeEls.forEach(el => el.classList.add('is-visible'));
  }


  /* ---------- 3. MENU TABS (Bakes / Drinks / Light Sets) ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');

      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(panel => {
        const isTarget = panel.id === targetId;
        panel.hidden = !isTarget;
        panel.classList.toggle('is-hidden', !isTarget);
      });
    });
  });


  /* ---------- 4. BACK TO TOP BUTTON ---------- */
  const backToTop = document.getElementById('backToTop');
  const showAfterPx = 480;

  function toggleBackToTop() {
    backToTop.classList.toggle('is-visible', window.scrollY > showAfterPx);
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop(); // run once in case page loads mid-scroll (e.g. on refresh)

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ---------- 5. STICKY HEADER SUBTLE SHADOW ON SCROLL ---------- */
  const header = document.getElementById('site-header');

  function toggleHeaderShadow() {
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 6px 18px rgba(107,70,54,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
  toggleHeaderShadow();


  /* ---------- 6. CONTACT FORM (front-end only — no backend) ---------- */
  // This site has no backend, so we simply validate and show a
  // friendly confirmation message. Wire this up to an email service
  // (e.g. Formspree, Netlify Forms) or a real backend when ready.
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in every field before sending.';
        return;
      }
      if (!emailPattern.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      // Placeholder success state — replace with a real fetch() call
      // to your email/booking service when this goes live.
      formStatus.textContent = `Thanks, ${name}! We'll reply to ${email} soon.`;
      contactForm.reset();
    });
  }


  /* ---------- 7. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
