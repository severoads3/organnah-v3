// ═══════════════════════════════════════════
// ORGANNAH — Header Scroll Behavior
// ═══════════════════════════════════════════

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 80);
}, { passive: true });
