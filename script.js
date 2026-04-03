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
//  SKILL BAR ANIMATION (on scroll)
// ============================
const skillsSection = document.querySelector('#skills');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;

        const spans = document.querySelectorAll('.skill-bar .bar span');
        spans.forEach(span => {
          const targetWidth = getComputedStyle(span).getPropertyValue('--target-width').trim();
          if (targetWidth) {
            span.style.width = targetWidth;
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

if (skillsSection) skillObserver.observe(skillsSection);

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