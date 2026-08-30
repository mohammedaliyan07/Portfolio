/* ═══════════════════════════════════════════════════════════════
   MOHAMMED ALIYAN — PORTFOLIO · main.js
   Animations · Themes · Lightbox (pinch-zoom) · Interactions
   ═══════════════════════════════════════════════════════════════ */
'use strict';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (ym) => {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  return `${MONTHS[parseInt(m, 10) - 1]} ${y}`;
};
const fmtMonthLong = (ym) => {
  const [y, m] = ym.split('-');
  return `${['January','February','March','April','May','June','July','August','September','October','November','December'][parseInt(m, 10) - 1]} ${y}`;
};
const catLabel = (id) => (CATEGORIES.find((c) => c.id === id) || { label: id }).label;
const catShort = (id) => ({
  ai: 'AI', cybersecurity: 'Security', 'project-management': 'Project Mgmt',
  data: 'Data', business: 'Business', finance: 'Finance', design: 'Design'
}[id] || id);

/* ═══════════ PRELOADER ═══════════ */
(function preloader() {
  const el = $('#preloader');
  const bar = $('.preloader-bar span');
  const count = $('.preloader-count');
  const DURATION = REDUCED ? 200 : 1500;
  const start = performance.now();

  function tick(now) {
    const p = clamp((now - start) / DURATION, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(eased * 100);
    bar.style.width = val + '%';
    count.textContent = val + '%';
    if (p < 1) requestAnimationFrame(tick);
    else setTimeout(() => el.classList.add('done'), 250);
  }
  requestAnimationFrame(tick);
})();

/* ═══════════ CUSTOM CURSOR ═══════════ */
(function cursor() {
  if (!FINE_POINTER || REDUCED) return;
  document.documentElement.classList.add('fine-pointer');
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  let mx = -100, my = -100, rx = -100, ry = -100;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    dot.style.opacity = 1; ring.style.opacity = 1;
  }, { passive: true });

  window.addEventListener('mousedown', () => document.documentElement.classList.add('cursor-down'));
  window.addEventListener('mouseup', () => document.documentElement.classList.remove('cursor-down'));

  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  const HOVERABLE = 'a, button, input, .cert-card, .filter-btn, .theme-option';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVERABLE)) document.documentElement.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVERABLE)) document.documentElement.classList.remove('cursor-hover');
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
})();

/* ═══════════ THEME SWITCHER ═══════════ */
(function themes() {
  const html = document.documentElement;
  const fab = $('#themeFab');
  const panel = $('#themePanel');
  const closeBtn = $('#themeClose');

  const saved = (() => {
    try { return localStorage.getItem('ma-theme'); } catch (e) { return null; }
  })();
  if (saved && ['nebula', 'ocean', 'aurora', 'light', 'brutal'].includes(saved)) {
    html.setAttribute('data-theme', saved);
  }

  function syncActive() {
    const current = html.getAttribute('data-theme');
    $$('.theme-option').forEach((b) => b.classList.toggle('active', b.dataset.themeValue === current));
  }
  syncActive();

  function togglePanel(force) {
    const open = force !== undefined ? force : !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
  }

  fab.addEventListener('click', (e) => { e.stopPropagation(); togglePanel(); });
  closeBtn.addEventListener('click', () => togglePanel(false));
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('open') && !panel.contains(e.target) && e.target !== fab) togglePanel(false);
  });

  $$('.theme-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.themeValue;
      html.setAttribute('data-theme', theme);
      try { localStorage.setItem('ma-theme', theme); } catch (e) { /* private mode */ }
      syncActive();
      togglePanel(false);
      const meta = $('meta[name="theme-color"]');
      if (meta) {
        const colors = { nebula: '#0b0f1e', ocean: '#041020', aurora: '#051310', light: '#f6f8fc', brutal: '#f7f2e7' };
        meta.setAttribute('content', colors[theme]);
      }
      const name = $('.theme-name', btn).textContent;
      showToast(`Theme: ${name} ✨`);
    });
  });
})();

/* ═══════════ NAVBAR ═══════════ */
(function navbar() {
  const nav = $('#navbar');
  const burger = $('#hamburger');
  const links = $('#navLinks');
  const navAnchors = $$('.nav-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navAnchors.forEach((a) => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  }));

  // Active section highlight
  const sections = $$('main section[id], header[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => observer.observe(s));
})();

/* ═══════════ SCROLL PROGRESS + BACK TO TOP ═══════════ */
(function scrollUX() {
  const bar = $('.scroll-progress');
  const toTop = $('#backToTop');
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / h) * 100 + '%';
    toTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }));
})();

/* ═══════════ TYPING EFFECT ═══════════ */
(function typing() {
  const el = $('#typedText');
  const phrases = [
    'B.Com Computer Applications Student',
    'AI & Prompt Engineering Enthusiast',
    'Aspiring Business Analyst',
    'Cybersecurity Learner',
    'Certified by Google · AWS · NASA'
  ];
  if (REDUCED) { el.textContent = phrases[0]; return; }

  let pi = 0, ci = 0, deleting = false;
  function loop() {
    const phrase = phrases[pi];
    el.textContent = phrase.slice(0, ci);
    let delay = deleting ? 34 : 68;
    if (!deleting && ci === phrase.length) { delay = 2100; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 420; }
    else ci += deleting ? -1 : 1;
    setTimeout(loop, delay);
  }
  loop();
})();

/* ═══════════ REVEAL ON SCROLL ═══════════ */
(function reveals() {
  const els = $$('.reveal');
  if (REDUCED) { els.forEach((e) => e.classList.add('revealed')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        entry.target.style.setProperty('--reveal-delay', delay + 'ms');
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach((el) => io.observe(el));
})();

/* ═══════════ COUNTERS ═══════════ */
(function counters() {
  const nums = $$('.stat-number[data-count]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const target = parseInt(el.dataset.count, 10);
      if (REDUCED) { el.textContent = target; return; }
      const start = performance.now();
      const DUR = 1800;
      (function tick(now) {
        const p = clamp((now - start) / DUR, 0, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: 0.4 });
  nums.forEach((n) => io.observe(n));
})();

/* ═══════════ PARALLAX ORBS ═══════════ */
(function parallax() {
  if (REDUCED || !FINE_POINTER) return;
  const orbs = $$('.orb');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    orbs.forEach((orb) => {
      const depth = parseFloat(orb.dataset.parallax || '0.2');
      orb.style.translate = `${x * depth * 90}px ${y * depth * 90}px`;
    });
  }, { passive: true });
})();

/* ═══════════ MAGNETIC BUTTONS ═══════════ */
(function magnetic() {
  if (REDUCED || !FINE_POINTER) return;
  $$('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.32}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
})();

/* ═══════════ 3D TILT ═══════════ */
(function tilt() {
  if (REDUCED || !FINE_POINTER) return;
  $$('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ═══════════ MARQUEE ═══════════ */
(function marquee() {
  const track = $('#marqueeTrack');
  const items = ISSUER_MARQUEE.map((i) => `<span class="marquee-item">${i}</span>`).join('');
  track.innerHTML = items + items; // duplicate for seamless loop
})();

/* ═══════════ SKILLS ═══════════ */
(function skills() {
  const grid = $('#skillsGrid');
  grid.innerHTML = SKILL_GROUPS.map((g, i) => `
    <div class="skill-card reveal" data-reveal="fade-up" data-delay="${i * 90}">
      <div class="skill-head">
        <div class="skill-name"><span class="skill-icon">${g.icon}</span>${g.name}</div>
        <span class="skill-level" data-level="${g.level}">0%</span>
      </div>
      <div class="skill-bar"><span class="skill-bar-fill" data-fill="${g.level}"></span></div>
      <div class="skill-tags">${g.tags.map((t) => `<span class="skill-tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      io.unobserve(card);
      const fill = $('.skill-bar-fill', card);
      const level = $('.skill-level', card);
      const target = parseInt(fill.dataset.fill, 10);
      setTimeout(() => { fill.style.width = target + '%'; }, 150);
      if (REDUCED) { level.textContent = target + '%'; return; }
      const start = performance.now();
      (function tick(now) {
        const p = clamp((now - start) / 1400, 0, 1);
        level.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + '%';
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: 0.35 });
  $$('.skill-card', grid).forEach((c) => io.observe(c));

  // Re-observe newly added reveal cards
  if (!REDUCED) {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.setProperty('--reveal-delay', (e.target.dataset.delay || 0) + 'ms');
          e.target.classList.add('revealed');
          rio.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.skill-card', grid).forEach((c) => rio.observe(c));
  } else {
    $$('.skill-card', grid).forEach((c) => c.classList.add('revealed'));
  }
})();

/* ═══════════ CERTIFICATIONS GALLERY ═══════════ */
const certState = { filter: 'all', query: '' };

function certSort(a, b) {
  // Undated last; then date desc
  const da = a.issued || '0000-00';
  const db = b.issued || '0000-00';
  if (da === db) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  return db.localeCompare(da);
}

function visibleCerts() {
  const q = certState.query.trim().toLowerCase();
  return [...CERTS].sort(certSort).filter((c) => {
    const matchCat = certState.filter === 'all' || c.category === certState.filter;
    const matchQ = !q ||
      c.title.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q));
    return matchCat && matchQ;
  });
}

function renderFilters() {
  const bar = $('#certFilters');
  bar.innerHTML = CATEGORIES.map((c) => {
    const count = c.id === 'all' ? CERTS.length : CERTS.filter((x) => x.category === c.id).length;
    return `<button class="filter-btn ${c.id === certState.filter ? 'active' : ''}" data-filter="${c.id}" role="tab" aria-selected="${c.id === certState.filter}">
      <span>${c.icon}</span>${c.label}<span class="filter-count">${count}</span>
    </button>`;
  }).join('');

  $$('.filter-btn', bar).forEach((btn) => {
    btn.addEventListener('click', () => {
      certState.filter = btn.dataset.filter;
      renderFilters();
      renderCerts();
    });
  });
}

function renderCerts() {
  const grid = $('#certsGrid');
  const list = visibleCerts();
  $('#certsEmpty').hidden = list.length > 0;

  grid.innerHTML = list.map((c, i) => `
    <article class="cert-card ${REDUCED ? '' : ''}" data-id="${c.id}" style="animation-delay:${Math.min(i * 55, 550)}ms" tabindex="0" role="button" aria-label="Open certificate: ${c.title}">
      <div class="cert-thumb-wrap">
        ${c.featured ? '<span class="cert-featured">Top</span>' : ''}
        <span class="cert-category-chip">${catShort(c.category)}</span>
        <img class="cert-thumb" src="assets/img/certs/thumbs/${c.id}.jpg" alt="${c.title} certificate" loading="lazy" decoding="async"/>
        <div class="cert-overlay"><span class="cert-zoom-hint">🔍 View certificate</span></div>
      </div>
      <div class="cert-info">
        <div>
          <h3 class="cert-title">${c.title}</h3>
          <p class="cert-issuer">${c.issuer}</p>
        </div>
        ${c.issued ? `<span class="cert-date">${fmtDate(c.issued)}</span>` : ''}
      </div>
    </article>
  `).join('');

  $$('.cert-card', grid).forEach((card) => {
    card.addEventListener('click', () => lightbox.open(card.dataset.id, visibleCerts().map((c) => c.id)));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lightbox.open(card.dataset.id, visibleCerts().map((c) => c.id)); }
    });
  });
}

(function certsInit() {
  renderFilters();
  renderCerts();

  const search = $('#certSearch');
  let debounce;
  search.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      certState.query = search.value;
      renderCerts();
    }, 180);
  });
  $('#clearSearch').addEventListener('click', () => {
    search.value = '';
    certState.query = '';
    renderCerts();
  });
})();

/* ═══════════ TIMELINE ═══════════ */
(function timeline() {
  const tl = $('#timeline');
  const dated = CERTS.filter((c) => c.issued);
  const groups = {};
  dated.forEach((c) => {
    (groups[c.issued] = groups[c.issued] || []).push(c);
  });
  const keys = Object.keys(groups).sort(); // chronological ascending

  tl.innerHTML = keys.map((k) => {
    const items = groups[k];
    const titles = items.slice(0, 3).map((c) => `<div class="tl-title">${c.title}</div>`).join('');
    const extra = items.length > 3 ? `<span class="tl-count">+${items.length - 3} more</span>` : '';
    return `
      <div class="tl-item reveal" data-reveal="fade-up">
        <span class="tl-dot"></span>
        <span class="tl-date">${fmtMonthLong(k)}</span>
        <div class="tl-card">
          ${titles}
          <div class="tl-issuer">${[...new Set(items.map((c) => c.issuer))].slice(0, 2).join(' · ')}</div>
          ${extra}
        </div>
      </div>
    `;
  }).join('') + `
    <div class="tl-item reveal" data-reveal="fade-up">
      <span class="tl-dot"></span>
      <span class="tl-date">Next Chapter</span>
      <div class="tl-card">
        <div class="tl-title">B.Com Graduation — Class of 2027 🎓</div>
        <div class="tl-issuer">Kakatiya University</div>
      </div>
    </div>`;

  // Observe new reveals
  if (!REDUCED) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    $$('.tl-item', tl).forEach((t) => io.observe(t));
  } else {
    $$('.tl-item', tl).forEach((t) => t.classList.add('revealed'));
  }

  // Animated progress line
  const progress = document.createElement('div');
  progress.className = 'timeline-progress';
  tl.appendChild(progress);
  window.addEventListener('scroll', () => {
    const r = tl.getBoundingClientRect();
    const total = r.height - 100;
    const passed = clamp(window.innerHeight * 0.55 - r.top, 0, total);
    progress.style.height = passed + 'px';
  }, { passive: true });
})();

/* ═══════════ COPY EMAIL + TOAST ═══════════ */
function showToast(msg, ms = 2400) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), ms);
}

(function copyActions() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const text = btn.dataset.copy;
    const done = () => {
      btn.classList.add('copied');
      const orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1800);
      showToast('Email copied to clipboard 📋');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallback());
    } else fallback();
    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { showToast('Copy failed — email: ' + text); }
      ta.remove();
    }
  });
})();

/* ═══════════ FOOTER YEAR ═══════════ */
$('#year').textContent = new Date().getFullYear();

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX — pinch zoom · pan · swipe · fullscreen · keyboard
   ═══════════════════════════════════════════════════════════════ */
const lightbox = (function () {
  const root = $('#lightbox');
  const img = $('#lbImage');
  const canvas = $('#lbCanvas');
  const stage = $('#lbStage');
  const titleEl = $('#lbTitle');
  const metaEl = $('#lbMeta');
  const skillsEl = $('#lbSkills');
  const zoomLevelEl = $('#lbZoomLevel');
  const hintEl = $('#lbHint');

  let list = [];        // array of cert ids in current view
  let index = -1;
  let scale = 1, tx = 0, ty = 0;
  let pointers = new Map();
  let pinchStart = null;
  let swipeStart = null;
  let lastTap = 0;
  let lastTapPoint = null;
  const MIN_SCALE = 1, MAX_SCALE = 6;

  // counter badge
  const counter = document.createElement('div');
  counter.className = 'lb-counter';
  stage.appendChild(counter);

  function current() { return CERTS.find((c) => c.id === list[index]); }

  function apply(smooth = false) {
    img.classList.toggle('no-transition', !smooth);
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    if (smooth) setTimeout(() => img.classList.remove('no-transition'), 300);
    zoomLevelEl.textContent = Math.round(scale * 100) + '%';
    img.classList.toggle('zoomed', scale > 1.02);
  }

  function reset() { scale = 1; tx = 0; ty = 0; apply(true); }

  function clampPan() {
    const r = img.getBoundingClientRect();
    const cr = canvas.getBoundingClientRect();
    const maxX = Math.max(0, (r.width * scale - cr.width) / 2 + 40);
    const maxY = Math.max(0, (r.height * scale - cr.height) / 2 + 40);
    tx = clamp(tx, -maxX, maxX);
    ty = clamp(ty, -maxY, maxY);
  }

  function zoomAt(fx, fy, newScale, smooth = true) {
    newScale = clamp(newScale, MIN_SCALE, MAX_SCALE);
    const cr = canvas.getBoundingClientRect();
    const cx = fx - cr.left - cr.width / 2;
    const cy = fy - cr.top - cr.height / 2;
    const ratio = newScale / scale;
    tx = cx - (cx - tx) * ratio;
    ty = cy - (cy - ty) * ratio;
    scale = newScale;
    if (scale <= MIN_SCALE + 0.01) { scale = 1; tx = 0; ty = 0; }
    clampPan();
    apply(smooth);
  }

  function setImage(i) {
    index = (i + list.length) % list.length;
    const c = current();
    // fade swap
    img.style.opacity = '0';
    const full = `assets/img/certs/full/${c.id}.jpg`;
    const pre = new Image();
    pre.onload = pre.onerror = () => {
      img.src = full;
      img.alt = `${c.title} — certificate by ${c.issuer}`;
      img.style.opacity = '1';
      reset();
    };
    pre.src = full;

    titleEl.textContent = c.title;
    metaEl.textContent = `${c.issuer}${c.issued ? ' · ' + fmtDate(c.issued) : ''}${c.credential ? ' · ID: ' + c.credential : ''}`;
    skillsEl.innerHTML = c.skills.map((s) => `<span class="lb-skill">${s}</span>`).join('');
    counter.textContent = `${index + 1} / ${list.length}`;
    // preload neighbours
    const nextC = CERTS.find((x) => x.id === list[(index + 1) % list.length]);
    const prevC = CERTS.find((x) => x.id === list[(index - 1 + list.length) % list.length]);
    [nextC, prevC].forEach((n) => { if (n) { const im = new Image(); im.src = `assets/img/certs/full/${n.id}.jpg`; } });
  }

  function open(id, ids) {
    list = ids && ids.length ? ids : CERTS.map((c) => c.id);
    const i = list.indexOf(id);
    root.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => root.classList.add('open'));
    setImage(i >= 0 ? i : 0);
    hintEl.classList.remove('hide');
    setTimeout(() => hintEl.classList.add('hide'), 4200);
  }

  function close() {
    root.classList.remove('open');
    document.body.style.overflow = '';
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setTimeout(() => { root.hidden = true; }, 400);
  }

  const next = () => { if (list.length) { reset(); setImage(index + 1); } };
  const prev = () => { if (list.length) { reset(); setImage(index - 1); } };

  /* ── Pointer interactions ── */
  stage.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.lb-nav')) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { stage.setPointerCapture(e.pointerId); } catch (err) { /* synthetic/unsupported pointer */ }

    if (pointers.size === 2) {
      const pts = [...pointers.values()];
      pinchStart = {
        dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        scale,
        mid: { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 },
        tx, ty
      };
      swipeStart = null;
    } else if (pointers.size === 1) {
      swipeStart = { x: e.clientX, y: e.clientY, t: Date.now() };
      img.classList.add('dragging');
    }
    hintEl.classList.add('hide');
  });

  stage.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return;
    const prevPt = pointers.get(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2 && pinchStart) {
      const pts = [...pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const target = clamp(pinchStart.scale * (dist / pinchStart.dist), MIN_SCALE, MAX_SCALE);
      // zoom around gesture midpoint, then pan with midpoint movement
      const cr = canvas.getBoundingClientRect();
      const cx = pinchStart.mid.x - cr.left - cr.width / 2;
      const cy = pinchStart.mid.y - cr.top - cr.height / 2;
      const ratio = target / pinchStart.scale;
      let ntx = cx - (cx - pinchStart.tx) * ratio + (mid.x - pinchStart.mid.x);
      let nty = cy - (cy - pinchStart.ty) * ratio + (mid.y - pinchStart.mid.y);
      scale = target; tx = ntx; ty = nty;
      if (scale <= MIN_SCALE + 0.01) { scale = 1; tx = 0; ty = 0; }
      clampPan();
      apply(false);
    } else if (pointers.size === 1) {
      if (scale > 1.02) {
        tx += e.clientX - prevPt.x;
        ty += e.clientY - prevPt.y;
        clampPan();
        apply(false);
      }
    }
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = null;
    img.classList.remove('dragging');

    if (pointers.size === 0 && swipeStart) {
      const dx = e.clientX - swipeStart.x;
      const dy = e.clientY - swipeStart.y;
      const dt = Date.now() - swipeStart.t;
      const dist = Math.hypot(dx, dy);

      // double-tap toggle zoom
      if (dist < 12 && dt < 280) {
        const now = Date.now();
        if (now - lastTap < 320 && lastTapPoint && Math.hypot(e.clientX - lastTapPoint.x, e.clientY - lastTapPoint.y) < 40) {
          zoomAt(e.clientX, e.clientY, scale > 1.02 ? 1 : 2.6);
          lastTap = 0;
        } else { lastTap = now; lastTapPoint = { x: e.clientX, y: e.clientY }; }
        swipeStart = null;
        return;
      }

      // swipe navigation (only when not zoomed)
      if (scale <= 1.02 && Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 600) {
        dx < 0 ? next() : prev();
      }
      swipeStart = null;
    }
  }

  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);

  /* ── Wheel zoom ── */
  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.16 : 1 / 1.16;
    zoomAt(e.clientX, e.clientY, scale * factor, false);
    hintEl.classList.add('hide');
  }, { passive: false });

  /* ── Double click zoom ── */
  img.addEventListener('dblclick', (e) => {
    zoomAt(e.clientX, e.clientY, scale > 1.02 ? 1 : 2.6);
  });

  /* ── Controls ── */
  $('#lbClose').addEventListener('click', close);
  $('.lightbox-backdrop').addEventListener('click', close);
  $('#lbNext').addEventListener('click', next);
  $('#lbPrev').addEventListener('click', prev);
  $('#lbZoomIn').addEventListener('click', () => {
    const r = canvas.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, scale * 1.35);
  });
  $('#lbZoomOut').addEventListener('click', () => {
    const r = canvas.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, scale / 1.35);
  });
  $('#lbReset').addEventListener('click', reset);
  $('#lbDownload').addEventListener('click', () => {
    const c = current();
    if (!c) return;
    const a = document.createElement('a');
    a.href = `assets/img/certs/full/${c.id}.jpg`;
    a.download = `${c.title.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')}-Mohammed-Aliyan.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Certificate downloaded ⬇');
  });
  $('#lbFullscreen').addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await root.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) { showToast('Fullscreen not supported on this device'); }
  });

  /* ── Keyboard ── */
  document.addEventListener('keydown', (e) => {
    if (root.hidden) return;
    switch (e.key) {
      case 'Escape': close(); break;
      case 'ArrowRight': next(); break;
      case 'ArrowLeft': prev(); break;
      case '+': case '=': { const r = canvas.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, scale * 1.3); break; }
      case '-': { const r = canvas.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, scale / 1.3); break; }
      case '0': reset(); break;
    }
  });

  return { open, close, next, prev };
})();
