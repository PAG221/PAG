document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlEl = document.documentElement;

  // Mobile menu toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Dark mode init & toggle (persistent)
  const setDark = (enabled) => {
    if (enabled) {
      htmlEl.classList.add('dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      htmlEl.classList.remove('dark');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  const saved = localStorage.getItem('darkMode');
  if (saved === 'enabled' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setDark(true);
  } else {
    setDark(false);
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      setDark(!htmlEl.classList.contains('dark'));
    });
  }

  // Intersection observer for section animations
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, header, .project-card').forEach(el => observer.observe(el));

  // Contact form handling (mock)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitText = document.getElementById('submitText');
    const submitIcon = document.getElementById('submitIcon');
    const submitSpinner = document.getElementById('submitSpinner');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitText) submitText.textContent = 'Envoi en cours...';
      if (submitIcon) submitIcon.classList.add('hidden');
      if (submitSpinner) submitSpinner.classList.remove('hidden');

      // Simulate API call
      setTimeout(() => {
        if (submitText) submitText.textContent = 'Envoyer le message';
        if (submitIcon) submitIcon.classList.remove('hidden');
        if (submitSpinner) submitSpinner.classList.add('hidden');

        if (formSuccess) formSuccess.classList.remove('hidden');
        if (formError) formError.classList.add('hidden');
        contactForm.reset();

        setTimeout(() => { if (formSuccess) formSuccess.classList.add('hidden'); }, 5000);
      }, 1800);
    });
  }

  // Tech icon tooltips
  document.querySelectorAll('.tech-icon').forEach(icon => {
    const label = icon.getAttribute('data-tooltip') || '';
    if (!label) return;

    const tip = document.createElement('div');
    tip.className = 'tooltip-custom';
    tip.textContent = label;
    icon.appendChild(tip);
    // Hover handled by CSS .tech-icon:hover .tooltip-custom
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
      }
    });
  });
});