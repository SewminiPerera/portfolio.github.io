// ============================
//  LOADER
// ============================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }
});

// ============================
//  DARK / LIGHT MODE TOGGLE
// ============================
const themeButton = document.getElementById('theme-button');
const themeIcon = themeButton ? themeButton.querySelector('i') : null;

if (themeButton && themeIcon) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // Switch icon
    if (document.body.classList.contains('light-mode')) {
      themeIcon.classList.remove('bx-moon');
      themeIcon.classList.add('bx-sun');
    } else {
      themeIcon.classList.remove('bx-sun');
      themeIcon.classList.add('bx-moon');
    }
  });
}

// ============================
//  HAMBURGER MENU
// ============================
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

// Close navbar when a link is clicked
navbar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

// ============================
//  AOS (Animate On Scroll)
// ============================
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 80,
});

// ============================
//  GALLERY FILTER
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const graphicItems = document.querySelectorAll('.graphic-item');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter gallery items
      graphicItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hide');
          // Re-trigger AOS for smooth appearance (optional but nice)
          item.classList.remove('aos-animate');
          setTimeout(() => item.classList.add('aos-animate'), 10);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });
}

// ============================
//  TYPED.JS — Typing animation
// ============================
new Typed('.typed-text', {
  strings: [
    'ICT Undergraduate',
    'Web Developer',
    'UI/UX Designer',
    'Photographer',
    'Graphic Designer',
  ],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1500,
  loop: true,
});

// ============================
//  ACTIVE NAV LINK ON SCROLL
// ============================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => navObserver.observe(section));


// ============================
//  BACK TO TOP BUTTON
// ============================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// ============================
//  DYNAMIC COPYRIGHT YEAR
// ============================
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ============================
//  CONTACT FORM VALIDATION
// ============================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default page redirect

    const emailInput = document.getElementById('email').value.trim();
    const phoneInput = document.getElementById('phone').value.trim();

    // Check if email contains @ mark
    if (!emailInput.includes('@')) {
      alert('@ mark is missing');
      return;
    }

    // Check if email ends with @gmail.com
    if (!emailInput.toLowerCase().endsWith('@gmail.com')) {
      alert('Please enter a valid @gmail.com email address.');
      return;
    }

    // Check if phone is exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneInput)) {
      alert('Please enter exactly 10 digits for the phone number.');
      return;
    }

    // AJAX Submission to prevent redirect
    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: contactForm.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        alert("Your Massage is submit succesfully");
        contactForm.reset();
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    }).catch(error => {
      alert("Oops! There was a problem submitting your form.");
    });

  });
}

// ============================
//  COSMIC NEBULA CANVAS — FULL PAGE, DARK CINEMATIC
// ============================
(function () {
  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, tick = 0;

  // ── Particle layers ──────────────────────────────────
  const LAYERS = [
    { count: 120, speed: 0.012, rMin: 0.2, rMax: 0.7, alpha: 0.45 }, // tiny distant stars
    { count: 50,  speed: 0.022, rMin: 0.5, rMax: 1.2, alpha: 0.65 }, // mid-field stars
    { count: 18,  speed: 0.04,  rMin: 1.0, rMax: 1.8, alpha: 0.80 }, // bright close stars
  ];

  // Nebula cloud config (slow-breathing radial blobs)
  const NEBULA_DEFS = [
    { cx: 0.15, cy: 0.25, rx: 0.45, ry: 0.35, col: [40, 0, 120],  baseA: 0.13, phase: 0.0 },
    { cx: 0.80, cy: 0.60, rx: 0.50, ry: 0.40, col: [0,  60, 140], baseA: 0.11, phase: 1.5 },
    { cx: 0.50, cy: 0.90, rx: 0.55, ry: 0.30, col: [80, 0, 100],  baseA: 0.09, phase: 3.0 },
    { cx: 0.90, cy: 0.10, rx: 0.35, ry: 0.25, col: [0,  90, 110], baseA: 0.08, phase: 4.5 },
    { cx: 0.35, cy: 0.70, rx: 0.40, ry: 0.30, col: [20, 0, 80],   baseA: 0.07, phase: 2.2 },
  ];

  // Meteor config
  const MAX_METEORS = 3;
  let meteors = [];
  function rnd(a, b) { return a + Math.random() * (b - a); }

  // ── Stars storage ──────────────────────────────────
  let stars = [];

  function mkStar(layer) {
    const starColors = [
      [255,255,255],[210,230,255],[255,240,200],[180,210,255],[255,200,200],[200,255,245]
    ];
    const col = starColors[Math.floor(Math.random() * starColors.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * W,            // will be remapped to screen coords below
      r: rnd(layer.rMin, layer.rMax),
      speed: layer.speed * rnd(0.6, 1.4),
      alpha: rnd(0.1, layer.alpha * 0.8),
      twDir: Math.random() > 0.5 ? 1 : -1,
      twSpeed: rnd(0.001, 0.005),
      col,
      layer,
    };
  }

  function initStars() {
    stars = [];
    LAYERS.forEach(lay => {
      for (let i = 0; i < lay.count; i++) {
        const s = mkStar(lay);
        s.x = Math.random() * W;
        s.y = Math.random() * H;
        stars.push(s);
      }
    });
  }

  // ── Nebulae ──────────────────────────────────────
  function drawNebulae() {
    NEBULA_DEFS.forEach(n => {
      const breath = Math.sin(tick * 0.0008 + n.phase) * 0.03; // slow breathe
      const alpha = n.baseA + breath;
      const cx = n.cx * W, cy = n.cy * H;
      const rx = n.rx * W, ry = n.ry * H;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, ry / rx);          // elliptical shape

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      let [r, g, b] = n.col;
      
      if (document.body.classList.contains('light-mode')) {
        // Soft pastel colorful haze for light mode
        r = Math.min(255, r + 100); g = Math.min(255, g + 150); b = Math.min(255, b + 180);
      }

      grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.4})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    });
  }

  // ── Stars ────────────────────────────────────────
  function drawStars() {
    stars.forEach(s => {
      // Slow upward drift (parallax by layer)
      s.y -= s.speed;
      if (s.y < -s.r * 2) { s.y = H + s.r; s.x = Math.random() * W; }

      // Twinkle
      s.alpha += s.twDir * s.twSpeed;
      if (s.alpha > s.layer.alpha)      { s.alpha = s.layer.alpha; s.twDir *= -1; }
      if (s.alpha < 0.05)               { s.alpha = 0.05;          s.twDir *= -1; }

      let [r, g, b] = s.col;
      
      if (document.body.classList.contains('light-mode')) {
        // Draw dark deep navy stars in light mode
        r = 20; g = 40; b = 80;
      }

      // Glow halo for brighter stars
      if (s.r > 1.0) {
        const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
        halo.addColorStop(0,   `rgba(${r},${g},${b},${s.alpha * 0.5})`);
        halo.addColorStop(1,   `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${s.alpha})`;
      ctx.fill();
    });
  }

  // ── Meteors ──────────────────────────────────────
  function spawnMeteor() {
    if (meteors.length >= MAX_METEORS) return;
    const angle = rnd(28, 55) * Math.PI / 180;
    const speed = rnd(10, 22);
    meteors.push({
      x:     rnd(W * 0.05, W * 0.95),
      y:     rnd(-50, H * 0.4),
      vx:    Math.cos(angle) * speed,
      vy:    Math.sin(angle) * speed,
      alpha: rnd(0.7, 1.0),
      decay: rnd(0.010, 0.018),
      width: rnd(1.5, 3.0),
      trail: [],
    });
  }

  function drawMeteors() {
    meteors = meteors.filter(m => m.alpha > 0.015);
    meteors.forEach(m => {
      m.trail.push({ x: m.x, y: m.y });
      if (m.trail.length > 24) m.trail.shift();
      m.x += m.vx; m.y += m.vy;
      m.alpha -= m.decay;

      const isLightMode = document.body.classList.contains('light-mode');

      // Trail
      for (let i = 1; i < m.trail.length; i++) {
        const t = i / m.trail.length;
        ctx.beginPath();
        ctx.moveTo(m.trail[i - 1].x, m.trail[i - 1].y);
        ctx.lineTo(m.trail[i].x,     m.trail[i].y);
        ctx.strokeStyle = isLightMode 
          ? `rgba(60,110,180,${m.alpha * t * 0.85})` 
          : `rgba(200,230,255,${m.alpha * t * 0.85})`;
        ctx.lineWidth   = m.width * t;
        ctx.lineCap     = 'round';
        ctx.stroke();
      }

      // Head glow
      const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 6);
      glow.addColorStop(0,   isLightMode ? `rgba(40,80,150,${m.alpha})` : `rgba(255,255,255,${m.alpha})`);
      glow.addColorStop(0.4, isLightMode ? `rgba(80,130,200,${m.alpha * 0.5})` : `rgba(160,210,255,${m.alpha * 0.5})`);
      glow.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
    });
  }

  // ── Resize ───────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // ── Main loop ────────────────────────────────────
  let lastMeteor = 0;
  function animate(ts) {
    requestAnimationFrame(animate);
    tick++;

    // Spawn meteors on timer
    if (ts - lastMeteor > rnd(1600, 3200)) {
      spawnMeteor();
      lastMeteor = ts;
    }

    // Clear previous frame so CSS background shows underneath
    ctx.clearRect(0, 0, W, H);

    if (!document.body.classList.contains('light-mode')) {
      // ── Background: dark space gradient ONLY in dark mode ──
      const overlay = ctx.createLinearGradient(0, 0, W, H);
      overlay.addColorStop(0,   'rgba(0,0,10,0.85)');
      overlay.addColorStop(1,   'rgba(2,8,22,0.65)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, W, H);
    }

    drawNebulae();
    drawStars();
    drawMeteors();
  }

  // ── Init ─────────────────────────────────────────
  function init() {
    resize();
    initStars();
    animate(0);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();