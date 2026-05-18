// ═══════════════════════════════════════════
// ORGANNAH — Mobile Menu (Drawer)
// ═══════════════════════════════════════════

const toggle  = document.getElementById('menu-toggle');
const drawer  = document.getElementById('nav-drawer');
const overlay = document.getElementById('nav-overlay');
const closeBtn = document.getElementById('menu-close');

const openMenu = () => {
  drawer.classList.add('is-open');
  overlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  drawer.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
};

toggle.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);
closeBtn.addEventListener('click', closeMenu);
drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
