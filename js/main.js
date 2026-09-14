/* ============================================================
   Portfolio core: theme, language, nav, particles, reveals
   ============================================================ */
(function () {
  "use strict";

  const STORAGE_THEME = "mfk-theme";
  const STORAGE_LANG = "mfk-lang";
  const tutorialTextSources = new Map();

  /* ---------- Theme ---------- */
  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_THEME);
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_THEME, theme);
    document.querySelectorAll("[data-theme-icon]").forEach((icon) => {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    });
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  }

  /* ---------- Language ---------- */
  function getLang() {
    return localStorage.getItem(STORAGE_LANG) || "en";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_LANG, lang);
    document.documentElement.setAttribute("lang", lang === "fr" ? "fr" : "en-GB");
    applyTranslations(lang);
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else {
          setTranslatedText(el, dict[key]);
        }
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const attributes = el.getAttribute("data-i18n-attr").split(",");
      attributes.forEach((attribute) => {
        const key = el.getAttribute(`data-i18n-${attribute}`);
        if (key && dict[key] !== undefined) el.setAttribute(attribute, dict[key]);
      });
    });

    const tutorialKeys = {
      "network-design.html": "tut1",
      "active-directory.html": "tut2",
      "cctv-deploy.html": "tut3",
      "php-mysql-app.html": "tut4",
      "linux-server-setup.html": "tut5",
      "vlan-configuration.html": "tut6",
      "cctv-placement.html": "tut7",
      "active-directory-gpo.html": "tut8",
      "windows-server-backup-strategies.html": "tut9",
      "network-monitoring-observability.html": "tut10",
      "cctv-maintenance-troubleshooting.html": "tut11",
      "dns-dhcp-configuration.html": "tut12"
    };
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const currentTutorialKey = tutorialKeys[currentFile];
    const pageTitleKeys = {
      "about.html": "about.pageTitle",
      "skills.html": "skills.pageTitle",
      "experience.html": "exp.pageTitle",
      "projects.html": "proj.pageTitle",
      "tutorials.html": "tut.pageTitle",
      "education.html": "edu.pageTitle",
      "contact.html": "contact.pageTitle"
    };
    const pageTitleKey = document.body.dataset.titleKey;
    if (pageTitleKey && dict[pageTitleKey]) document.title = dict[pageTitleKey];
    if (!currentTutorialKey && pageTitleKeys[currentFile] && dict[pageTitleKeys[currentFile]]) {
      document.title = `${dict[pageTitleKeys[currentFile]]} | Manso Felix Kofi`;
    }
    if (currentTutorialKey && dict[`${currentTutorialKey}.title`]) {
      document.title = `${dict[`${currentTutorialKey}.title`]} | ${dict["nav.tutorials"]}`;
      const breadcrumb = document.querySelector(".breadcrumb");
      const currentPage = breadcrumb && breadcrumb.lastElementChild;
      if (currentPage && currentPage.tagName !== "A") {
        currentPage.textContent = dict[`${currentTutorialKey}.title`];
      }
    }
    document.querySelectorAll(".tutorial-nav__link[href]").forEach((link) => {
      const fileName = link.getAttribute("href").split("/").pop();
      const key = tutorialKeys[fileName];
      const title = key && dict[`${key}.title`];
      const titleEl = link.querySelector(".tutorial-nav__title");
      if (title && titleEl) titleEl.textContent = title;
    });

    document.querySelectorAll(".article__preview h3").forEach((el) => {
      if (el.textContent.trim() === "What you'll learn" || el.textContent.trim() === "Ce que vous apprendrez") {
        el.textContent = dict["tut.learn"];
      }
    });

    translatePageText(lang);

    // Placeholders specifically
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });
  }

  async function translatePageText(lang) {
    const contentRoots = document.querySelectorAll("main, footer");
    if (!contentRoots.length) return;

    const nodes = [];
    contentRoots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!node.nodeValue.trim() || !parent || parent.closest("[data-i18n], pre, code, #typed-text, .article__preview h3")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
      });
      let node;
      while ((node = walker.nextNode())) nodes.push(node);
    });

    if (lang !== "fr") {
      nodes.forEach((textNode) => {
        const source = tutorialTextSources.get(textNode);
        if (source) textNode.nodeValue = source;
      });
      return;
    }

    const translateNode = async (textNode) => {
      const source = tutorialTextSources.get(textNode) || textNode.nodeValue;
      tutorialTextSources.set(textNode, source);
      const leadingWhitespace = source.match(/^\s*/)[0];
      const trailingWhitespace = source.match(/\s*$/)[0];
      const cacheKey = `mfk-fr:${source}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        textNode.nodeValue = leadingWhitespace + cached + trailingWhitespace;
        return;
      }

      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(source)}&langpair=en|fr`
        );
        const result = await response.json();
        const translated = result.responseData && result.responseData.translatedText;
        if (translated) {
          const cleanTranslation = translated.trim();
          localStorage.setItem(cacheKey, cleanTranslation);
          textNode.nodeValue = leadingWhitespace + cleanTranslation + trailingWhitespace;
        }
      } catch (error) {
        // Keep the original English text when the translation service is unavailable.
      }
    };

    for (let index = 0; index < nodes.length; index += 4) {
      await Promise.all(nodes.slice(index, index + 4).map(translateNode));
    }
  }

  function setTranslatedText(el, text) {
    if (el.children.length > 0) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue.trim()) {
          node.nodeValue = text;
          return;
        }
      }
      el.textContent = text;
    } else {
      el.textContent = text;
    }
  }

  /* ---------- Init theme & lang early ---------- */
  setTheme(getPreferredTheme());
  // Language applied after DOM ready so elements exist

  /* ---------- DOM Ready ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    setLang(getLang());
    // Re-apply theme so icons reflect the current theme once DOM exists
    setTheme(getPreferredTheme());

    // Theme toggle (attach to all theme-toggle buttons)
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", toggleTheme);
    });

    // Language buttons
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });

    // Mobile nav
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");
    const navBackdrop = document.getElementById("nav-backdrop");

    let lastFocused = null;

    function openNav() {
      if (!navMenu) return;
      lastFocused = document.activeElement;
      navMenu.classList.add("show");
      if (navBackdrop) navBackdrop.classList.add("show");
      if (navToggle) {
        navToggle.classList.add("active");
        navToggle.setAttribute("aria-expanded", "true");
      }
      document.body.classList.add("nav-open");
      const scrollbarComp = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = scrollbarComp + "px";
      document.body.style.overflow = "hidden";
      // Focus first link for accessibility
      setTimeout(() => {
        const firstLink = navMenu.querySelector(".nav__link");
        if (firstLink) firstLink.focus();
      }, 200);
    }

    function closeNav() {
      if (!navMenu) return;
      navMenu.classList.remove("show");
      if (navBackdrop) navBackdrop.classList.remove("show");
      if (navToggle) {
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
      document.body.classList.remove("nav-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function toggleNav() {
      if (navMenu && navMenu.classList.contains("show")) closeNav();
      else openNav();
    }

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-controls", "nav-menu");
      navToggle.addEventListener("click", toggleNav);
    }
    if (navClose) navClose.addEventListener("click", closeNav);
    if (navBackdrop) navBackdrop.addEventListener("click", closeNav);
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => closeNav());
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu && navMenu.classList.contains("show")) {
        closeNav();
      }
    });

    // Auto-close on resize to desktop
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains("show")) {
          closeNav();
        }
      }, 150);
    });

    // Header scroll
    const header = document.getElementById("header");
    const backToTop = document.getElementById("back-to-top");
    function onScroll() {
      if (header) {
        header.classList.toggle("scrolled", window.scrollY >= 40);
      }
      if (backToTop) {
        backToTop.classList.toggle("visible", window.scrollY >= 380);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Active nav based on current page
    const path = window.location.pathname;
    document.querySelectorAll(".nav__link").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const isHome = href.endsWith("index.html") || href === "/" || href.endsWith("/");
      const currentIsHome = path.endsWith("index.html") || path.endsWith("/") || path === "";
      if ((isHome && currentIsHome) || (!isHome && path.includes(href.replace("./", "").replace("../", "")))) {
        link.classList.add("active");
      }
    });

    // Typing effect (home only)
    const typedEl = document.getElementById("typed-text");
    if (typedEl) {
      const phrasesEn = ["IT Manager", "Systems Engineer", "Network Specialist", "CCTV Expert", "Web Developer"];
      const phrasesFr = ["Responsable IT", "Ingénieur Systèmes", "Spécialiste Réseau", "Expert CCTV", "Développeur Web"];
      let phrases = getLang() === "fr" ? phrasesFr : phrasesEn;
      let phraseIndex = 0, charIndex = 0, isDeleting = false, speed = 90;

      function type() {
        phrases = getLang() === "fr" ? phrasesFr : phrasesEn;
        const current = phrases[phraseIndex % phrases.length];
        if (isDeleting) {
          typedEl.textContent = current.substring(0, charIndex - 1);
          charIndex--;
          speed = 40;
        } else {
          typedEl.textContent = current.substring(0, charIndex + 1);
          charIndex++;
          speed = 85;
        }
        if (!isDeleting && charIndex === current.length) {
          isDeleting = true;
          speed = 1500;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          speed = 350;
        }
        setTimeout(type, speed);
      }
      setTimeout(type, 500);
    }

    // Skill bars animation
    const fills = document.querySelectorAll(".skill-bar__fill");
    if (fills.length) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.width || "0%";
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      fills.forEach((f) => obs.observe(f));
    }

    // Reveal on scroll
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      const ro = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            ro.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach((el) => ro.observe(el));
    }

    // Particles (hero)
    initParticles();

    // Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Contact form success
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") {
      showToast(
        (translations[getLang()] && translations[getLang()]["contact.success"]) ||
          "Message sent successfully!",
        "success"
      );
      const clean = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, clean);
    }

    const form = document.getElementById("contact-form");
    if (form) {
      const next = document.getElementById("form-next");
      if (next) next.value = window.location.href.split("?")[0] + "?sent=1";
      form.addEventListener("submit", () => {
        const btn = document.getElementById("submit-btn");
        if (btn) {
          const text = btn.querySelector(".btn-text");
          const loading = btn.querySelector(".btn-loading");
          if (text) text.hidden = true;
          if (loading) loading.hidden = false;
          btn.disabled = true;
        }
      });
    }
  });

  /* ---------- Particles canvas ---------- */
  function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles, animId;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      const count = Math.min(55, Math.floor((w * h) / 18000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 0.6
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const color = isDark ? "56, 189, 248" : "2, 132, 199";

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.55)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${color}, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
  }

  /* ---------- Toast ---------- */
  function showToast(message, type) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "toast toast--" + (type || "info");
    toast.setAttribute("role", "alert");
    toast.innerHTML = `<i class="fas ${type === "success" ? "fa-check-circle" : "fa-info-circle"}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // Expose for potential external use
  window.MFK = { setTheme, toggleTheme, setLang, getLang, showToast };
})();
