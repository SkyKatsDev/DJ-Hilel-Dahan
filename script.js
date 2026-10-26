const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const revealItems = document.querySelectorAll('.reveal');
const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => {
  sectionObserver.observe(item);
});

const currentLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

const setActiveNav = () => {
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const matchedLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

    if (!matchedLink) return;

    const top = section.offsetTop;
    const height = section.offsetHeight;
    const isInView = scrollPosition >= top && scrollPosition < top + height;

    matchedLink.classList.toggle('active', isInView);
  });
};

if (currentLinks.length) {
  setActiveNav();
  window.addEventListener('scroll', setActiveNav, { passive: true });
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach((item) => item.classList.add('visible'));
}
