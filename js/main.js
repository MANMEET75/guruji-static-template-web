/* ============================================================
   GURUJI ACADEMY — Main JS
   Handles: navbar scroll, mobile menu, scroll animations, form
   ============================================================ */

(function () {
  'use strict';

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---------- MOBILE MENU ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- FADE-IN ON SCROLL ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el, i) {
      // Stagger cards
      if (el.closest('.cards-grid')) {
        el.style.transitionDelay = (i % 4) * 0.1 + 's';
      }
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- EARLY ACCESS FORM ---------- */
  const form    = document.getElementById('earlyAccessForm');
  const emailEl = document.getElementById('emailInput');
  const msgEl   = document.getElementById('formMsg');

  if (form && emailEl && msgEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = emailEl.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        showMsg('Please enter your email address.', 'error');
        emailEl.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        showMsg('Please enter a valid email address.', 'error');
        emailEl.focus();
        return;
      }

      // Simulate form submission success
      showMsg('You\'re on the list! We\'ll be in touch soon.', 'success');
      emailEl.value = '';

      // Reset message after 5s
      setTimeout(function () {
        msgEl.textContent = '';
        msgEl.style.color = '';
      }, 5000);
    });
  }

  function showMsg(text, type) {
    msgEl.textContent = text;
    msgEl.style.color = type === 'success' ? '#4ade80' : '#f87171';
  }

  /* ---------- SMOOTH SCROLL OFFSET ---------- */
  // Offset scroll for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
