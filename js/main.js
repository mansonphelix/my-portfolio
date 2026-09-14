/* ============================================================
   Portfolio core: theme, language, nav, particles, reveals
   ============================================================ */
(function () {
  "use strict";

  const STORAGE_THEME = "mfk-theme";
  const STORAGE_LANG = "mfk-lang";
  const tutorialTextSources = new Map();
  const frenchCorrections = {
    "1. Choose backup targets": "1. Choisissez les cibles de sauvegarde",
    "2. Configure Windows Server Backup": "2. Configurez la sauvegarde Windows Server",
    "3. Retention and rotation": "3. Rétention et rotation",
    "4. Test restores regularly": "4. Testez régulièrement les restaurations",
    "5. Quick checklist": "5. Liste de contrôle rapide",
    "What you'll learn": "Ce que vous apprendrez",
    "Basic monitoring tools": "Outils de supervision de base",
    "Alerting rules that work": "Des règles d'alerte efficaces",
    "Log review routine": "Routine d'analyse des journaux",
    "Define what matters": "Définissez ce qui compte",
    "Choose backup targets": "Choisissez les cibles de sauvegarde",
    "Test restores regularly": "Testez régulièrement les restaurations",
    "Quick start checklist": "Liste de contrôle pour commencer",
    "Quick checklist": "Liste de contrôle rapide",
    "Site survey": "Étude du site",
    "Camera and NVR selection": "Choix des caméras et du NVR",
    "Remote access — keep it secure": "Accès distant : gardez-le sécurisé",
    "Handover": "Passation",
    "Initial OS installation": "Installation initiale du système d'exploitation",
    "Gather requirements": "Recueillez les besoins",
    "Core devices": "Équipements principaux",
    "Cabling and topology": "Câblage et topologie",
    "Basic security checklist": "Liste de contrôle de sécurité de base",
    "Test before handover": "Testez avant la passation",
    "Network share (SMB)": "Partage réseau (SMB)",
    "External USB / eSATA": "USB externe / eSATA",
    "Server Tools": "Outils serveur",
    "Alerting": "Alertes",
    "Database Design": "Conception de base de données",
    "Switch Config": "Configuration des commutateurs",
    "Software Deployment": "Déploiement de logiciels",
    "Remote Viewing": "Visualisation à distance"
    ,"Prerequisites": "Prérequis"
    ,"1. Organise with OUs": "1. Organisez les UO"
    ,"2. Start with security baselines": "2. Commencez par les bases de sécurité"
    ,"3. Deploy software wisely": "3. Déployez les logiciels avec discernement"
    ,"4. Drive maps and printers": "4. Mappages de lecteurs et imprimantes"
    ,"5. Maintenance tips": "5. Conseils de maintenance"
    ,"1. Install the AD DS role": "1. Installez le rôle AD DS"
    ,"2. Promote to domain controller": "2. Promouvez le serveur en contrôleur de domaine"
    ,"3. Post-promotion checks": "3. Vérifications après promotion"
    ,"4. Organisational Units (OUs)": "4. Unités organisationnelles (UO)"
    ,"5. First Group Policy Object": "5. Premier objet de stratégie de groupe"
    ,"6. Backup and documentation": "6. Sauvegarde et documentation"
    ,"1. Site survey": "1. Étude du site"
    ,"2. Camera and NVR selection": "2. Choix des caméras et du NVR"
    ,"3. Cabling": "3. Câblage"
    ,"4. NVR configuration": "4. Configuration du NVR"
    ,"5. Remote access — keep it secure": "5. Accès distant : gardez-le sécurisé"
    ,"6. Handover": "6. Passation"
    ,"1. Routine maintenance": "1. Maintenance courante"
    ,"2. Common camera issues": "2. Problèmes courants des caméras"
    ,"3. NVR and storage checks": "3. Vérifications du NVR et du stockage"
    ,"4. Remote access": "4. Accès distant"
    ,"5. Quick maintenance schedule": "5. Calendrier de maintenance rapide"
    ,"1. Identify key areas": "1. Identifiez les zones clés"
    ,"2. Camera angles and height": "2. Angles et hauteur des caméras"
    ,"3. Lighting conditions": "3. Conditions d'éclairage"
    ,"4. Recording settings": "4. Paramètres d'enregistrement"
    ,"5. NVR placement and security": "5. Emplacement et sécurité du NVR"
    ,"1. Install the roles": "1. Installez les rôles"
    ,"2. Configure DHCP": "2. Configurez DHCP"
    ,"3. DHCP reservations": "3. Réservations DHCP"
    ,"4. Configure DNS": "4. Configurez DNS"
    ,"5. Common mistakes": "5. Erreurs courantes"
    ,"6. Quick checklist": "6. Liste de contrôle rapide"
    ,"1. Initial OS installation": "1. Installation initiale du système d'exploitation"
    ,"2. System updates and essentials": "2. Mises à jour et éléments essentiels du système"
    ,"3. User and SSH configuration": "3. Configuration des utilisateurs et de SSH"
    ,"4. Firewall setup": "4. Configuration du pare-feu"
    ,"5. Ongoing maintenance": "5. Maintenance continue"
    ,"1. Gather requirements": "1. Recueillez les besoins"
    ,"2. IP addressing plan": "2. Plan d'adressage IP"
    ,"3. Core devices": "3. Équipements principaux"
    ,"4. Cabling and topology": "4. Câblage et topologie"
    ,"5. Basic security checklist": "5. Liste de contrôle de sécurité de base"
    ,"6. Test before handover": "6. Testez avant la passation"
    ,"1. Define what matters": "1. Définissez ce qui compte"
    ,"2. Basic monitoring tools": "2. Outils de supervision de base"
    ,"3. Alerting rules that work": "3. Des règles d'alerte efficaces"
    ,"4. Log review routine": "4. Routine d'analyse des journaux"
    ,"5. Quick start checklist": "5. Liste de contrôle pour commencer"
    ,"1. Define the problem clearly": "1. Définissez clairement le problème"
    ,"2. Database design": "2. Conception de la base de données"
    ,"3. Project layout": "3. Structure du projet"
    ,"4. Connection and security basics": "4. Bases de la connexion et de la sécurité"
    ,"5. Forms and validation": "5. Formulaires et validation"
    ,"6. Deployment on a local or internal server": "6. Déploiement sur un serveur local ou interne"
    ,"7. Iterate with users": "7. Améliorez avec les utilisateurs"
    ,"1. Plan your VLANs": "1. Planifiez vos VLAN"
    ,"2. Configure the switch": "2. Configurez le commutateur"
    ,"3. Configure the router or Layer 3 switch": "3. Configurez le routeur ou le commutateur de couche 3"
    ,"4. Test and verify": "4. Testez et vérifiez"
    ,"5. Common pitfalls": "5. Pièges courants"
  };

  function isUsableFrenchTranslation(value) {
    return Boolean(value && !/MYMEMORY WARNING|NEXT AVAILABLE|TRANSLATION ERROR|QUOTA/i.test(value));
  }

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

    if (lang === "fr") {
      document.querySelectorAll(".article__content h2").forEach((heading) => {
        const correction = frenchCorrections[heading.textContent.trim()];
        if (correction) heading.textContent = correction;
      });
    }

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
      const corrected = frenchCorrections[source];
      if (corrected) {
        localStorage.setItem(cacheKey, corrected);
        textNode.nodeValue = leadingWhitespace + corrected + trailingWhitespace;
        return;
      }
      const cached = localStorage.getItem(cacheKey);
      if (isUsableFrenchTranslation(cached)) {
        textNode.nodeValue = leadingWhitespace + cached + trailingWhitespace;
        return;
      }
      if (cached) localStorage.removeItem(cacheKey);

      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(source)}&langpair=en|fr`
        );
        if (!response.ok) return;
        const result = await response.json();
        const translated = result.responseData && result.responseData.translatedText;
        if (isUsableFrenchTranslation(translated)) {
          const cleanTranslation = frenchCorrections[source] || translated.trim();
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
