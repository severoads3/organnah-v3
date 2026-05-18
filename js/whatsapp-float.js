// ═══════════════════════════════════════════
// ORGANNAH — WhatsApp Floating Button
// ═══════════════════════════════════════════

const waFloat = document.getElementById('whatsapp-float');

window.addEventListener('scroll', () => {
  waFloat.classList.toggle('is-visible', window.scrollY > 200);
}, { passive: true });
