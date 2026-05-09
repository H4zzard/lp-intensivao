/* =====================================================================
   CPPEM — Mentoria Intensiva PMPE 2026 | Landing Page de Vendas
   main.js
   ===================================================================== */

/* ---------- COUNTDOWN ---------- */
/* Oferta válida do dia 12/05/2026 até o dia 15/05/2026 (final do dia 23:59:59) */
function initCountdown() {
  // Encerramento: 15/05/2026 às 23:59:59 (horário de Brasília -03:00)
  const target = new Date("2026-05-15T23:59:59-03:00");

  const els = {
    dias: document.getElementById("cd-dias"),
    horas: document.getElementById("cd-horas"),
    min: document.getElementById("cd-min"),
    seg: document.getElementById("cd-seg"),
  };
  const topbar = document.getElementById("topbar-countdown");
  const fmt = (n) => String(Math.max(0, n)).padStart(2, "0");

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      Object.values(els).forEach((el) => el && (el.textContent = "00"));
      if (topbar) topbar.textContent = "encerrada";
      return;
    }

    const dias = Math.floor(diff / 86400000);
    const horas = Math.floor((diff % 86400000) / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const seg = Math.floor((diff % 60000) / 1000);

    if (els.dias) els.dias.textContent = fmt(dias);
    if (els.horas) els.horas.textContent = fmt(horas);
    if (els.min) els.min.textContent = fmt(min);
    if (els.seg) els.seg.textContent = fmt(seg);

    /* Atualiza topbar de urgência */
    if (topbar) {
      if (dias > 0) {
        topbar.textContent = `em ${dias}d ${fmt(horas)}h ${fmt(min)}min`;
      } else if (horas > 0) {
        topbar.textContent = `em ${fmt(horas)}h ${fmt(min)}min ${fmt(seg)}s`;
      } else {
        topbar.textContent = `em ${fmt(min)}min ${fmt(seg)}s`;
      }
    }

    setTimeout(tick, 1000);
  }
  tick();
}

/* ---------- PROGRESS BAR ---------- */
function initProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;
  let raf = null;
  window.addEventListener(
    "scroll",
    () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
        raf = null;
      });
    },
    { passive: true }
  );
}

/* ---------- FADE-UP (Intersection Observer) ---------- */
function initFadeUp() {
  const els = document.querySelectorAll(".fade-up");
  if (!els.length) return;

  /* Se o navegador não suporta IntersectionObserver, mostra tudo. */
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  els.forEach((el) => obs.observe(el));

  /* Failsafe: se por algum motivo (scroll muito rápido em telas longas)
     algum elemento ainda estiver invisível depois de 1.5s, garantimos
     que nada fique escondido pro usuário. */
  setTimeout(() => {
    document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("visible");
      }
    });
  }, 1500);
}

/* ---------- STICKY NAV (sombra) ---------- */
function initStickyNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  let raf = null;
  window.addEventListener(
    "scroll",
    () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        nav.style.boxShadow =
          window.scrollY > 40 ? "0 4px 32px rgba(0,0,0,0.6)" : "none";
        raf = null;
      });
    },
    { passive: true }
  );
}

/* ---------- FAQ ACCORDION ---------- */
function toggleFaq(el) {
  const item = el.closest(".faq-item");
  if (!item) return;
  const resp = item.querySelector(".faq-resposta");
  const isOpen = item.classList.contains("open");

  /* Fecha todos */
  document.querySelectorAll(".faq-item.open").forEach((open) => {
    open.classList.remove("open");
    const r = open.querySelector(".faq-resposta");
    if (r) r.style.maxHeight = null;
  });

  if (!isOpen) {
    item.classList.add("open");
    if (resp) resp.style.maxHeight = resp.scrollHeight + "px";
  }
}
window.toggleFaq = toggleFaq;

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ---------- CTA PULSE (chamariz após inatividade) ---------- */
function initCtaPulse() {
  const btns = document.querySelectorAll(".btn-primary");
  if (!btns.length) return;

  let timer = setTimeout(
    () => btns.forEach((b) => b.classList.add("pulse")),
    10000
  );

  const reset = () => {
    clearTimeout(timer);
    btns.forEach((b) => b.classList.remove("pulse"));
    timer = setTimeout(
      () => btns.forEach((b) => b.classList.add("pulse")),
      18000
    );
  };

  window.addEventListener("scroll", reset, { passive: true });
  window.addEventListener("mousemove", reset, { passive: true });
  window.addEventListener("touchstart", reset, { passive: true });
}

/* ---------- BOOT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  initProgressBar();
  initFadeUp();
  initStickyNav();
  initSmoothScroll();
  initCtaPulse();
});
