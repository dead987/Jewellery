// ========================================
// PREMIUM JEWELLERY WEBSITE - JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  const header = document.querySelector(".header");

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuToggle && navLinks) {
    // Create overlay element
    const overlay = document.createElement("div");
    overlay.classList.add("nav-overlay");
    document.body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
      mobileMenuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      overlay.classList.toggle("active");

      // Toggle body scroll
      if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden";
        mobileMenuToggle.setAttribute("aria-expanded", "true");
      } else {
        document.body.style.overflow = "";
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      }
    }

    // Click handlers - improved for mobile with debounce to prevent double-firing
    let menuToggleInProgress = false;
    
    function handleMenuToggle(e) {
      if (menuToggleInProgress) return;
      menuToggleInProgress = true;
      
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
      
      // Reset flag after a short delay
      setTimeout(() => {
        menuToggleInProgress = false;
      }, 300);
    }

    mobileMenuToggle.addEventListener("click", handleMenuToggle);
    mobileMenuToggle.addEventListener("touchstart", handleMenuToggle, { passive: false });

    overlay.addEventListener("click", function(e) {
      e.preventDefault();
      toggleMenu();
    });

    // Close menu when clicking nav links
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          toggleMenu();
        }
      });
    });

    // Close menu on window resize if open
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992 && navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  }

  // ========================================
  // PARALLAX EFFECTS
  // ========================================
  const heroVideo = document.querySelector(".hero-video");
  const archMain = document.querySelector(".arch-main");
  const heroHeading = document.querySelector(".hero-heading");

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;

    // Video parallax
    if (heroVideo && scrolled < window.innerHeight) {
      heroVideo.style.transform = `translateY(${
        scrolled * 0.35
      }px) scale(1.05)`;
    }

    // Arch subtle movement
    if (archMain && scrolled < window.innerHeight) {
      archMain.style.transform = `translateY(${scrolled * 0.06}px)`;
    }

    // Heading parallax
    if (heroHeading && scrolled < window.innerHeight) {
      heroHeading.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroHeading.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
    }
  });

  // ========================================
  // COUNTER ANIMATION FOR STATS
  // ========================================
  const statValues = document.querySelectorAll(".stat-value");

  const animateCounter = (element) => {
    const target = element.getAttribute("data-count");
    if (!target) return;

    const targetNum = parseInt(target);
    const duration = 2000;
    const increment = targetNum / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < targetNum) {
        element.textContent = Math.floor(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetNum + "+";
      }
    };

    updateCounter();
  };

  // Observe stats for animation
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statValues.forEach((stat) => {
    const text = stat.textContent;
    const num = parseInt(text);
    if (!isNaN(num)) {
      stat.setAttribute("data-count", num);
      stat.textContent = "0+";
      statsObserver.observe(stat);
    }
  });

  // ========================================
  // SMOOTH REVEAL ANIMATIONS
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add reveal class to section elements
  const revealElements = document.querySelectorAll(
    ".category-card, .section-header, .tagline-content, .tagline-side"
  );

  revealElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
      index * 0.08
    }s, 
                               transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
                                 index * 0.08
                               }s`;
    revealObserver.observe(el);
  });

  // Add CSS for revealed state
  const style = document.createElement("style");
  style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);

  // ========================================
  // MAGNETIC EFFECT FOR BUTTONS
  // ========================================
  const magneticButtons = document.querySelectorAll(".btn-primary");

  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ========================================
  // PREMIUM CUSTOM CURSOR
  // ========================================
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  // Only initialize custom cursor on non-touch devices
  if (cursor && cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    // Add class to html to hide default cursor
    document.documentElement.classList.add('has-custom-cursor');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
      // Cursor dot follows instantly
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      // Follower circle has more delay
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Interactive elements for hover effect
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-icon, .side-card, .arrival-card, .collection-tile, .gallery-item, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
      });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
      cursor.classList.add('click');
      cursorFollower.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
      cursor.classList.remove('click');
      cursorFollower.classList.remove('click');
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '0.7';
    });
  }

  // ========================================
  // CURSOR GLOW EFFECT (Ambient light following cursor)
  // ========================================
  const cursorGlow = document.createElement("div");
  cursorGlow.classList.add("cursor-glow");
  document.body.appendChild(cursorGlow);

  const glowStyle = document.createElement("style");
  glowStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 350px;
            height: 350px;
            background: radial-gradient(
                circle,
                rgba(201, 169, 98, 0.04) 0%,
                rgba(201, 169, 98, 0.02) 30%,
                transparent 60%
            );
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            transform: translate(-50%, -50%);
            transition: opacity 0.4s ease;
            mix-blend-mode: screen;
        }
        
        @media (max-width: 768px) {
            .cursor-glow {
                display: none;
            }
        }
    `;
  document.head.appendChild(glowStyle);

  let glowX = 0, glowY = 0;
  let currentGlowX = 0, currentGlowY = 0;

  document.addEventListener("mousemove", (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
  });

  // Smooth glow following
  function animateGlow() {
    const ease = 0.08;
    currentGlowX += (glowX - currentGlowX) * ease;
    currentGlowY += (glowY - currentGlowY) * ease;

    cursorGlow.style.left = currentGlowX + "px";
    cursorGlow.style.top = currentGlowY + "px";

    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ========================================
  // IMAGE ELEGANT LOAD
  // ========================================
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (!img.complete) {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.6s ease";

      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });
    }
  });

  // ========================================
  // INTERACTIVE CARDS TILT EFFECT
  // ========================================
  const cards = document.querySelectorAll(".side-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ========================================
  // ARCH GLOW EFFECT ON HOVER
  // ========================================
  const archMainHover = document.querySelector(".arch-main");

  if (archMainHover) {
    archMainHover.addEventListener("mouseenter", () => {
      archMainHover.style.boxShadow = `
                0 0 150px rgba(120, 50, 50, 0.25),
                0 30px 100px rgba(0, 0, 0, 0.7),
                inset 0 0 100px rgba(201, 169, 98, 0.05),
                inset 0 -80px 150px rgba(0, 0, 0, 0.6)
            `;
    });

    archMainHover.addEventListener("mouseleave", () => {
      archMainHover.style.boxShadow = `
                0 0 120px rgba(120, 50, 50, 0.15),
                0 30px 80px rgba(0, 0, 0, 0.6),
                inset 0 0 80px rgba(201, 169, 98, 0.03),
                inset 0 -80px 120px rgba(0, 0, 0, 0.5)
            `;
    });
  }

  // ========================================
  // CURATED GALLERY - SIMPLE & WORKING
  // ========================================

  // Wait a bit to ensure DOM is fully ready
  setTimeout(function () {
    const buttons = document.querySelectorAll(".gallery-item");
    const leftImg = document.getElementById("gallery-left-img");
    const rightImg = document.getElementById("gallery-right-img");
    const video = document.getElementById("gallery-video");
    const videoSource = document.getElementById("gallery-video-source");
    const defaultVideo = "Generate_Jewelry_Modeling_Video.mp4";

    if (buttons.length === 0) {
      console.error("No gallery buttons found!");
      return;
    }

    if (!leftImg || !rightImg) {
      console.error("Gallery images not found!");
      return;
    }

    console.log("✓ Gallery Ready:", buttons.length, "buttons");

    // Click handler for each button
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].onclick = function (e) {
        e.preventDefault();

        // Get this button
        const btn = this;

        // Skip if already active
        if (btn.classList.contains("active")) {
          return;
        }

        console.log("Clicked:", btn.getAttribute("data-target"));

        // Remove active from all
        for (let j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("active");
        }

        // Add active to clicked
        btn.classList.add("active");

        // Get new sources
        const newLeft = btn.getAttribute("data-left-img");
        const newRight = btn.getAttribute("data-right-img");
        const newVideo = btn.getAttribute("data-video") || defaultVideo;

        // Animate fade out
        leftImg.style.opacity = "0";
        leftImg.style.transform = "scale(0.9)";
        rightImg.style.opacity = "0";
        rightImg.style.transform = "scale(0.9)";

        if (video) {
          video.style.opacity = "0.3";
        }

        // After 300ms, change sources and fade in
        setTimeout(function () {
          // Update sources
          leftImg.src = newLeft;
          rightImg.src = newRight;

          if (video && videoSource) {
            videoSource.src = newVideo;
            video.load();
            video.play().catch(function () {
              // If video fails, use default
              videoSource.src = defaultVideo;
              video.load();
              video.play().catch(function () {});
            });
          }

          // Fade in
          setTimeout(function () {
            leftImg.style.opacity = "1";
            leftImg.style.transform = "scale(1)";
            rightImg.style.opacity = "1";
            rightImg.style.transform = "scale(1)";

            if (video) {
              video.style.opacity = "1";
            }
          }, 50);
        }, 300);
      };
    }

    // Add CSS transitions to images
    leftImg.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    rightImg.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    if (video) {
      video.style.transition = "opacity 0.3s ease";
    }
  }, 100);

  // ========================================
  // TEXT SHIMMER EFFECT
  // ========================================
  const shimmerStyle = document.createElement("style");
  shimmerStyle.textContent = `
        .heading-main {
            background: linear-gradient(
                90deg,
                var(--color-text-primary) 0%,
                var(--color-gold-light) 50%,
                var(--color-text-primary) 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 5s linear infinite;
        }
        
        @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
        }
    `;
  document.head.appendChild(shimmerStyle);
});
