// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// Stagger index for children
document.querySelectorAll('.reveal-stagger').forEach((group) => {
  Array.from(group.children).forEach((child, i) => {
    child.style.setProperty('--i', i);
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.textContent = isOpen ? 'Close' : 'Menu';
  });
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = 'Menu';
    });
  });
}

// Active nav link highlight on index page sections
const sections = document.querySelectorAll('main [id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
  const navIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => navIo.observe(s));
}

// Case-study TOC scroll-spy
const csCards = document.querySelectorAll('.cs-card[id]');
const tocLinks = document.querySelectorAll('.cs-toc a[href^="#"]');
if (csCards.length && tocLinks.length && 'IntersectionObserver' in window) {
  const tocIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tocLinks.forEach((a) => a.classList.remove('active'));
        const match = document.querySelector(`.cs-toc a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-15% 0px -70% 0px' });
  csCards.forEach((c) => tocIo.observe(c));
}

// Count-up animation for KPI / stat numbers
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCountUp(el, duration = 1100) {
  const raw = el.textContent.trim();
  const match = raw.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/s);
  if (!match) return;
  const [, prefix, numStr, suffix] = match;
  const cleanNum = numStr.replace(/,/g, '');
  const target = parseFloat(cleanNum);
  if (isNaN(target)) return;
  const intPart = cleanNum.replace('-', '').split('.')[0];
  const decimals = cleanNum.includes('.') ? cleanNum.split('.')[1].length : 0;
  const padLen = intPart.length;
  const hasLeadingZero = intPart[0] === '0' && padLen > 1;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = target * eased;
    let display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
    if (hasLeadingZero) {
      let [ip, dp] = display.split('.');
      ip = ip.padStart(padLen, '0');
      display = dp ? ip + '.' + dp : ip;
    }
    el.textContent = prefix + display + suffix;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = raw;
  }
  requestAnimationFrame(frame);
  setTimeout(() => { el.textContent = raw; }, duration + 60);
}

const countEls = document.querySelectorAll('.hero-stat .num, .kpi-card .value, .project-meta .v');
if (countEls.length && !reduceMotion && 'IntersectionObserver' in window) {
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        countIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  countEls.forEach((el) => countIo.observe(el));
}

// Generic staggered-group entrance (used for pills, KPI cards, finding-cards, fix-cards, skill categories)
function staggerReveal(selector, stepMs = 55) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.children).filter((c) => c.matches(selector));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('in'), idx * stepMs);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el) => io.observe(el));
}

staggerReveal('.pill', 50);
staggerReveal('.kpi-card', 90);
staggerReveal('.finding-card', 90);
staggerReveal('.fix-card', 90);
staggerReveal('.skill-cat', 110);

// Nav shadow on scroll
const siteNav = document.querySelector('.site-nav');
if (siteNav) {
  const toggleNavShadow = () => siteNav.classList.toggle('scrolled', window.scrollY > 12);
  toggleNavShadow();
  window.addEventListener('scroll', toggleNavShadow, { passive: true });
}
