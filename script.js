document.addEventListener('DOMContentLoaded', () => {
  // Update Navbar on scroll
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const closeMenuBtn = document.querySelector('.close-menu-btn');
  const mobileMenuOverlay = document.getElementById('mobileMenu');
  const mobileNavLinksList = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && closeMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeMenuBtn.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close menu when a link is clicked
    mobileNavLinksList.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth Scrolling for Nav Links
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .logo, .cta-primary, .cta-secondary');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only smooth scroll for hash links
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Adjust offset for fixed header
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // Update active class
          document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(nav => nav.classList.remove('active'));
          if (this.classList.contains('nav-link') || this.classList.contains('mobile-nav-link')) {
            this.classList.add('active');
          }
        }
      }
    });
  });

  // Intersection Observer for Scroll Animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // Custom Cursor Glow Effect
  const cursorGlow = document.querySelector('.cursor-glow');
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow with requestAnimationFrame
  function animateCursor() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    
    // Add interactions over clickable elements
    // We could increase cursor size on hover of links/buttons, but keep it simple
    
    requestAnimationFrame(animateCursor);
  }
  
  // Only animate cursor on non-touch devices
  if (window.matchMedia("(pointer: fine)").matches) {
    animateCursor();
  } else {
    cursorGlow.style.display = 'none';
  }
  
  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
