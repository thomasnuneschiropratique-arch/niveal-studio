/**
 * Comportements communs à toutes les pages :
 * en-tête (fond au défilement, masqué quand on descend), menu mobile,
 * apparitions douces au défilement.
 */

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ------------------------------------------------------------------ En-tête */

const header = document.querySelector<HTMLElement>('[data-site-header]');
let lastY = window.scrollY;
let ticking = false;

function updateHeader() {
  ticking = false;
  if (!header) return;
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 24);

  const threshold = window.innerHeight * 0.6;
  if (y > lastY + 6 && y > threshold && !header.contains(document.activeElement)) {
    header.classList.add('is-hidden');
  } else if (y < lastY - 6 || y <= threshold) {
    header.classList.remove('is-hidden');
  }
  lastY = y;
}

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateHeader);
    }
  },
  { passive: true },
);
header?.addEventListener('focusin', () => header.classList.remove('is-hidden'));
updateHeader();

/* ---------------------------------------------------------------- Menu mobile */

const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');

function openMenu() {
  if (!menu || menu.open) return;
  menu.showModal();
  root.classList.add('is-locked');
  openButton?.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => menu.classList.add('is-open'));
}

function closeMenu() {
  if (!menu || !menu.open) return;
  menu.classList.remove('is-open');
  openButton?.setAttribute('aria-expanded', 'false');
  root.classList.remove('is-locked');
  window.setTimeout(() => menu.close(), reducedMotion.matches ? 0 : 380);
}

openButton?.addEventListener('click', openMenu);
menu?.querySelector('[data-menu-close]')?.addEventListener('click', closeMenu);
menu?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeMenu();
});
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
window.matchMedia('(min-width: 64em)').addEventListener('change', (e) => {
  if (e.matches) closeMenu();
});

/* ------------------------------------------------- Apparitions au défilement */

const revealed = document.querySelectorAll<HTMLElement>('[data-reveal]');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  revealed.forEach((el) => observer.observe(el));
} else {
  revealed.forEach((el) => el.classList.add('is-in'));
}

(window as Window & { __nivealReady?: boolean }).__nivealReady = true;
