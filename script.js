
    /* ── NAVBAR SCROLL ─────────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    /* ── TYPED ROLE ────────────────────────────────────────── */
    const roles = [
      'Aspiring Web Developer',
      'Student Coder',
      'Front-End Learner',
      'PHP Builder',
    ];
    let ri = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-role');
    function type() {
      const word = roles[ri];
      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
      } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(type, deleting ? 50 : 90);
    }
    type();

    /* ── SCROLL REVEAL ─────────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));

    /* ── SKILL RINGS ───────────────────────────────────────── */
    function animateRings(container) {
      container.querySelectorAll('.skill-ring .fill').forEach(circle => {
        const pct = parseFloat(circle.dataset.pct);
        const circumference = 88;
        const offset = circumference - (pct / 100) * circumference;
        circle.style.strokeDashoffset = offset;
      });
    }

    const ringIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => animateRings(entry.target), 200);
          ringIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('#skills-grid').forEach(el => ringIO.observe(el));

    /* ── SKILL FILTER ──────────────────────────────────────── */
    document.querySelectorAll('.skill-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach((card, i) => {
          const match = filter === 'all' || card.dataset.cat === filter;
          card.classList.toggle('hidden', !match);
          if (match) {
            card.style.animationDelay = (i * 40) + 'ms';
            card.classList.remove('animate-in');
            void card.offsetWidth;
            card.classList.add('animate-in');
            setTimeout(() => animateRings(card), i * 40 + 200);
          }
        });
      });
    });

    /* ── CONTACT FORM ──────────────────────────────────────── */
    function handleFormSubmit(btn) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#1a3a2a';
      btn.style.color = '#4ade80';
      btn.style.cursor = 'default';
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.cursor = '';
      }, 3000);
    }

    /* ── PHOTO CARD DECK ───────────────────────────────────── */
const photos = [
  'static/img.jpg',
  'static/img2.jpg',
  'static/img3.jpg',
  // add more: 'static/img4.jpg',
];

let currentPhoto = 0;
let isFlipping = false;

function cyclePhoto() {
  if (isFlipping) return;
  isFlipping = true;

  const inner    = document.getElementById('flip-inner');
  const front    = document.getElementById('photo-front');
  const back     = document.getElementById('photo-back');
  const counter  = document.getElementById('photo-counter');

  const nextIndex = (currentPhoto + 1) % photos.length;

  // Load next photo on the back face
  back.src = photos[nextIndex];

  // Flip
  inner.classList.add('flipping');

  setTimeout(() => {
    // After flip: swap front to the new photo, reset without animation
    front.src = photos[nextIndex];
    inner.style.transition = 'none';
    inner.classList.remove('flipping');

    // Pre-load the one after next on the back
    const afterNext = (nextIndex + 1) % photos.length;
    back.src = photos[afterNext];

    // Re-enable transition after reset
    setTimeout(() => {
      inner.style.transition = '';
      isFlipping = false;
    }, 50);

    currentPhoto = nextIndex;
    counter.textContent = `${currentPhoto + 1} / ${photos.length}`;
  }, 620);
}

// ── HERO TERMINAL ──────────────────────────────────────────
(function () {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  const SEQ = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', parts: [{ cls: 't-cyan', t: 'patrio_gabriel_patdu' }] },
    { type: 'gap' },

    { type: 'cmd', text: 'ls projects/' },
    { type: 'out', parts: [{ cls: 't-green', t: 'Pagloat/' }, { cls: 't-muted', t: '  ' }, { cls: 't-green', t: 'WarOnDrugs/' }, { cls: 't-muted', t: '  ' }, { cls: 't-green', t: 'Petals/' }] },
    { type: 'gap' },

    { type: 'cmd', text: 'cat Pagloat/readme.md' },
    { type: 'out', parts: [{ cls: 't-white', t: 'PHP cruise booking website' }] },
    { type: 'out', parts: [{ cls: 't-comment', t: '# MySQL · Bootstrap · XAMPP' }] },
    { type: 'gap' },

    { type: 'cmd', text: 'cat WarOnDrugs/readme.md' },
    { type: 'out', parts: [{ cls: 't-white', t: '2D shooter — political commentary' }] },
    { type: 'out', parts: [{ cls: 't-comment', t: '# Python · pygame' }] },
    { type: 'gap' },

    { type: 'cmd', text: 'cat Petals/readme.md' },
    { type: 'out', parts: [{ cls: 't-white', t: 'Niche perfume e-commerce store' }] },
    { type: 'out', parts: [{ cls: 't-comment', t: '# HTML · CSS · JS · PHP' }] },
    { type: 'gap' },

    { type: 'cmd', text: 'cat tungtungtungsahur.md' },
    { type: 'out', parts: [{ cls: 't-white', t: '67676767' }] },
    { type: 'out', parts: [{ cls: 't-comment', t: '# HTML · CSS · JS · PHP' }] },
    { type: 'gap' },

    { type: 'cmd', text: 'echo $STATUS' },
    { type: 'out', parts: [{ cls: 't-cyan', t: 'always_learning...' }, { cls: 't-cyan', t: '∞' }] },
    { type: 'idle' },
  ];

  let li = 0, ci = 0, cursorEl = null, cmdSpan = null;

  function removeCursor() {
    if (cursorEl) { cursorEl.remove(); cursorEl = null; }
  }

  function addCursor(parent) {
    removeCursor();
    cursorEl = document.createElement('span');
    cursorEl.className = 't-cursor';
    parent.appendChild(cursorEl);
  }

  function newLine() {
    const d = document.createElement('div');
    d.className = 't-line';
    body.appendChild(d);
    return d;
  }

  function tick() {
    if (li >= SEQ.length) return;
    const step = SEQ[li];

    if (step.type === 'gap') {
      const g = document.createElement('div');
      g.className = 't-gap';
      body.appendChild(g);
      li++; setTimeout(tick, 60); return;
    }

    if (step.type === 'idle') {
      const d = newLine();
      const p = document.createElement('span');
      p.className = 't-prompt'; p.textContent = '→ '; d.appendChild(p);
      addCursor(d); li++;
      setTimeout(restart, 5000); return;
    }

    if (step.type === 'cmd') {
      if (ci === 0) {
        const d = newLine();
        const p = document.createElement('span');
        p.className = 't-prompt'; p.textContent = '→ '; d.appendChild(p);
        cmdSpan = document.createElement('span');
        cmdSpan.className = 't-cmd'; d.appendChild(cmdSpan);
        addCursor(d);
      }
      if (ci < step.text.length) {
        cmdSpan.textContent += step.text[ci++];
        setTimeout(tick, 50 + Math.random() * 40);
      } else {
        removeCursor(); ci = 0; li++;
        setTimeout(tick, 280);
      }
      return;
    }

    if (step.type === 'out') {
      const d = newLine();
      step.parts.forEach(pt => {
        const s = document.createElement('span');
        s.className = pt.cls; s.textContent = pt.t; d.appendChild(s);
      });
      li++; setTimeout(tick, 140); return;
    }
  }

  function restart() {
    body.innerHTML = ''; li = 0; ci = 0; cursorEl = null; cmdSpan = null;
    setTimeout(tick, 400);
  }

  setTimeout(tick, 800);
})();