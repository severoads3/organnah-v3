// ═══════════════════════════════════════════
// ORGANNAH — Scroll Reveal v3
// Mobile-first: IntersectionObserver only.
// Zero scroll listeners = zero jank no iOS/Android.
// ═══════════════════════════════════════════

// ── Utilitário: respeita prefers-reduced-motion ──
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Se o usuário pediu menos movimento, torna tudo visível imediatamente
if (prefersReducedMotion) {
  document.querySelectorAll(
    '.reveal, .reveal--left, .reveal--right, .reveal--scale, .stagger-item'
  ).forEach(el => el.classList.add('is-visible'));
}


// ════════════════════════════════════════════
// OBSERVER 1 — Reveal padrão (one-shot)
// Observa: .reveal, .reveal--left, .reveal--right, .reveal--scale
// Dispara uma vez e para de observar (performance).
// ════════════════════════════════════════════
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // libera memória
      }
    });
  },
  {
    // -8% no bottom: começa a animar levemente antes
    // de o elemento aparecer completamente — mais fluido no mobile
    rootMargin: '0px 0px -8% 0px',
    threshold: 0,
  }
);

document.querySelectorAll(
  '.reveal, .reveal--left, .reveal--right, .reveal--scale'
).forEach(el => {
  if (!prefersReducedMotion) revealObserver.observe(el);
});


// ════════════════════════════════════════════
// OBSERVER 2 — Stagger Group
// Observa: [data-stagger] (container)
// Quando o container entra na viewport, adiciona
// .is-visible a cada filho .stagger-item com delay
// incremental de 90ms. Suave e sem sobrecarga.
// ════════════════════════════════════════════
const STAGGER_DELAY = 90; // ms entre cada filho

const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const items = entry.target.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        // Usa setTimeout para escalonar sem bloquear a thread
        setTimeout(() => {
          item.classList.add('is-visible');
        }, index * STAGGER_DELAY);
      });

      // Após animar, para de observar o container
      staggerObserver.unobserve(entry.target);
    });
  },
  {
    rootMargin: '0px 0px -6% 0px',
    threshold: 0.05,
  }
);

document.querySelectorAll('[data-stagger]').forEach(el => {
  if (!prefersReducedMotion) staggerObserver.observe(el);
  else {
    // Reduzido: mostra todos imediatamente
    el.querySelectorAll('.stagger-item').forEach(i => i.classList.add('is-visible'));
  }
});


// ════════════════════════════════════════════
// OBSERVER 3 — Brand Popups de canto
// Bidirecional: aparece e desaparece conforme o
// scroll passa pelos .balloon-trigger nas seções.
// ════════════════════════════════════════════
const popups = {
  '1': document.getElementById('brand-popup-1'),
  '2': document.getElementById('brand-popup-2'),
  '3': document.getElementById('brand-popup-3'),
};

function hideAllPopups() {
  Object.values(popups).forEach(p => {
    if (p) p.classList.remove('is-visible');
  });
}

function showPopup(id) {
  hideAllPopups();
  const popup = popups[id];
  if (popup) {
    setTimeout(() => popup.classList.add('is-visible'), 60);
  }
}

const triggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const id = entry.target.dataset.balloon;
      if (entry.isIntersecting) {
        showPopup(id);
      } else {
        const popup = popups[id];
        if (popup && popup.classList.contains('is-visible')) {
          popup.classList.remove('is-visible');
        }
      }
    });
  },
  {
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0,
  }
);

document.querySelectorAll('.balloon-trigger').forEach(el => {
  triggerObserver.observe(el);
});
