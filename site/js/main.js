/* LM Tubos · landing page: comportamento (sem dependências). */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     Configuração: edite aqui
     --------------------------------------------------------------- */
  const WA_NUMBER = "5562985587373";
  const WA_DEFAULT = "Olá! Vim pelo site da LM Tubos e gostaria de um orçamento.";

  // Faixa de promoção sazonal (oculta por padrão).
  const PROMO = {
    enabled: false,
    text: "",   // ex.: "Condição especial em sprinklers até 31/10. Fale com o comercial."
    href: ""    // opcional: link da faixa (ex.: "#orcamento")
  };

  // Rastreamento: os scripts só carregam se o ID estiver preenchido E o visitante aceitar os cookies.
  const TRACKING = {
    metaPixelId: "", // [PENDENTE: ID do Meta Pixel]
    ga4Id: "",       // [PENDENTE: G-XXXXXXXXXX]
    adsId: "",       // [PENDENTE: AW-XXXXXXXXX]
    adsLabel: ""     // [PENDENTE: label da conversão do Google Ads para clique no WhatsApp]
  };

  const CONSENT_KEY = "lm-consent";
  const FLOAT_AFTER = 400;
  const HEADER_SHADOW_AFTER = 10;

  /* ---------------------------------------------------------------
     WhatsApp
     --------------------------------------------------------------- */
  function waLink(msg = WA_DEFAULT) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function withUtm(msg) {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const campaign = params.get("utm_campaign");
    if (!source && !campaign) return msg;
    return `${msg}\n\n[origem: ${source || "-"} / ${campaign || "-"}]`;
  }

  function initWaLinks() {
    document.querySelectorAll("a[data-wa-msg]").forEach((link) => {
      link.href = waLink(withUtm(link.dataset.waMsg || WA_DEFAULT));
      link.addEventListener("click", () => trackWhatsApp(link.dataset.waOrigin || "desconhecida"));
    });
  }

  /* ---------------------------------------------------------------
     Consentimento + rastreamento
     --------------------------------------------------------------- */
  const hasAnyTracking = () => Boolean(TRACKING.metaPixelId || TRACKING.ga4Id || TRACKING.adsId);

  function readConsent() {
    try { return window.localStorage.getItem(CONSENT_KEY); } catch (err) { return null; }
  }

  function saveConsent(value) {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch (err) { /* armazenamento bloqueado: vale só nesta visita */ }
  }

  let trackingOn = false;

  function loadScript(src) {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function loadMetaPixel(id) {
    if (!window.fbq) {
      const fbq = function () {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
      };
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      window.fbq = fbq;
      window._fbq = fbq;
    }
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  function loadGtag(ids) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    ids.forEach((id) => window.gtag("config", id));
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids[0])}`);
  }

  function startTracking() {
    if (trackingOn || !hasAnyTracking()) return;
    trackingOn = true;
    if (TRACKING.metaPixelId) loadMetaPixel(TRACKING.metaPixelId);
    const googleIds = [TRACKING.ga4Id, TRACKING.adsId].filter(Boolean);
    if (googleIds.length) loadGtag(googleIds);
  }

  function trackWhatsApp(origin) {
    if (!trackingOn) return;
    if (TRACKING.metaPixelId && window.fbq) window.fbq("track", "Contact", { content_name: origin });
    if (!window.gtag) return;
    if (TRACKING.ga4Id) window.gtag("event", "whatsapp_click", { origem: origin });
    if (TRACKING.adsId && TRACKING.adsLabel) {
      window.gtag("event", "conversion", { send_to: `${TRACKING.adsId}/${TRACKING.adsLabel}` });
    }
  }

  function trackLead() {
    if (!trackingOn) return;
    if (TRACKING.metaPixelId && window.fbq) window.fbq("track", "Lead");
    if (TRACKING.ga4Id && window.gtag) window.gtag("event", "generate_lead", { origem: "form" });
  }

  function initConsent() {
    if (!hasAnyTracking()) return;
    const stored = readConsent();
    if (stored === "granted") { startTracking(); return; }
    if (stored === "denied") return;

    const bar = document.getElementById("cookie-bar");
    if (!bar) return;
    bar.hidden = false;
    document.body.classList.add("has-cookie-bar");
    const syncHeight = () => document.body.style.setProperty("--cookie-h", `${bar.offsetHeight}px`);
    syncHeight();
    window.addEventListener("resize", syncHeight, { passive: true });

    bar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-consent]");
      if (!button) return;
      const choice = button.dataset.consent;
      saveConsent(choice);
      bar.hidden = true;
      document.body.classList.remove("has-cookie-bar");
      window.removeEventListener("resize", syncHeight);
      if (choice === "granted") startTracking();
    });
  }

  /* ---------------------------------------------------------------
     Formulário → WhatsApp
     --------------------------------------------------------------- */
  const FORM_ERRORS = {
    nome: "Informe seu nome.",
    cidade: "Informe a cidade e a UF da obra.",
    mensagem: "Conte o que você precisa."
  };

  function validateField(field) {
    const error = document.getElementById(`${field.id}-err`);
    const isValid = field.value.trim() !== "";
    field.closest(".field").classList.toggle("is-invalid", !isValid);
    field.setAttribute("aria-invalid", String(!isValid));
    if (error) error.textContent = isValid ? "" : FORM_ERRORS[field.name];
    return isValid;
  }

  function buildFormMessage(data) {
    const value = (key) => (data.get(key) || "").toString().trim() || "-";
    return [
      "Olá! Vim pelo site da LM Tubos e quero um orçamento.",
      `Nome: ${value("nome")}`,
      `Empresa: ${value("empresa")}`,
      `Perfil: ${value("perfil")}`,
      `Cidade/UF: ${value("cidade")}`,
      `Preciso de: ${value("mensagem")}`
    ].join("\n");
  }

  function initForm() {
    const form = document.getElementById("quote-form");
    if (!form) return;
    const required = Array.from(form.querySelectorAll("[required]"));
    const status = document.getElementById("form-status");

    required.forEach((field) => {
      field.addEventListener("input", () => {
        if (field.closest(".field").classList.contains("is-invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const invalid = required.filter((field) => !validateField(field));
      if (invalid.length) { invalid[0].focus(); return; }

      const link = waLink(withUtm(buildFormMessage(new FormData(form))));
      trackLead();
      trackWhatsApp("form");
      // Sem a feature "noopener": com ela window.open sempre retorna null e não dá para detectar bloqueio.
      const opened = window.open(link, "_blank");
      if (opened) opened.opener = null;
      else window.location.href = link; // pop-up bloqueado: abre na mesma aba
      // Limpa antes de escrever para o leitor de tela anunciar de novo em um segundo envio.
      status.textContent = "";
      window.setTimeout(() => { status.textContent = "Pronto! Continue a conversa no WhatsApp que acabou de abrir."; }, 50);
    });
  }

  /* ---------------------------------------------------------------
     Header: link ativo, menu mobile, sombra e botão flutuante
     --------------------------------------------------------------- */
  function initActiveLink() {
    const links = Array.from(document.querySelectorAll(".nav__link"));
    const byId = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));
    const sections = Array.from(byId.keys()).map((id) => document.getElementById(id)).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove("is-active"));
        byId.get(entry.target.id).classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((section) => observer.observe(section));
  }

  function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("menu");
    const header = document.getElementById("site-header");
    if (!toggle || !nav || !header) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const isOpen = () => nav.classList.contains("is-open");

    function setOpen(open, returnFocus) {
      if (open) nav.style.setProperty("--nav-top", `${header.getBoundingClientRect().bottom}px`);
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      document.body.classList.toggle("is-locked", open);
      if (open) nav.querySelector("a").focus();
      else if (returnFocus) toggle.focus();
    }

    // Ciclo de foco: botão de fechar → links do menu → botão de fechar.
    function trapFocus(event) {
      const items = [toggle, ...nav.querySelectorAll("a")];
      const current = items.indexOf(document.activeElement);
      const step = event.shiftKey ? -1 : 1;
      const next = current === -1 ? 0 : (current + step + items.length) % items.length;
      event.preventDefault();
      items[next].focus();
    }

    toggle.addEventListener("click", () => setOpen(!isOpen(), true));
    nav.addEventListener("click", (event) => { if (event.target.closest("a") && isOpen()) setOpen(false, false); });
    desktop.addEventListener("change", () => { if (isOpen()) setOpen(false, false); });
    document.addEventListener("keydown", (event) => {
      if (!isOpen()) return;
      if (event.key === "Escape") setOpen(false, true);
      else if (event.key === "Tab") trapFocus(event);
    });
  }

  function initScrollState() {
    const header = document.getElementById("site-header");
    const float = document.getElementById("wa-float");
    let ticking = false;

    function update() {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > HEADER_SHADOW_AFTER);
      if (float) float.classList.toggle("is-visible", y > FLOAT_AFTER);
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  // content-visibility estima a altura das seções fora da tela; antes do primeiro salto por âncora
  // desligamos a otimização para a rolagem parar no lugar certo.
  function initAnchorFix() {
    window.addEventListener("hashchange", () => document.documentElement.classList.add("cv-off"));
    // Link de anúncio com âncora (ex.: /#orcamento): a troca das fontes reflui o texto acima do alvo,
    // então rolamos de novo quando elas terminam de carregar.
    const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target && document.fonts) {
      window.addEventListener("load", () => {
        document.fonts.ready.then(() => target.scrollIntoView({ block: "start" }));
      }, { once: true });
    }
    document.addEventListener("click", (event) => {
      if (event.target.closest('a[href^="#"]')) document.documentElement.classList.add("cv-off");
    }, { capture: true });
  }

  /* ---------------------------------------------------------------
     Animação de entrada (uma vez só)
     --------------------------------------------------------------- */
  const REVEAL_STAGGER = 110; // ms entre cards que entram juntos

  function initRevealCards(reduce) {
    const cards = document.querySelectorAll("[data-reveal-cards] > *");
    if (reduce || !("IntersectionObserver" in window)) return;
    cards.forEach((card) => card.classList.add("reveal-card"));
    const observer = new IntersectionObserver((entries) => {
      // Cards da mesma linha chegam no mesmo lote: cada um espera um pouco mais que o anterior.
      entries.filter((entry) => entry.isIntersecting).forEach((entry, index) => {
        entry.target.style.setProperty("--reveal-delay", `${index * REVEAL_STAGGER}ms`);
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    cards.forEach((card) => observer.observe(card));
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    initRevealCards(reduce);
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach((item) => observer.observe(item));
  }

  /* ---------------------------------------------------------------
     Esteiras (autoplay infinito): listas com o atributo data-marquee
     --------------------------------------------------------------- */
  const MARQUEE_SPEED = 45;   // px por segundo (sobrescreva com data-marquee-speed)
  const MARQUEE_MAX_FILL = 6; // limite de repetições, evita laço infinito se a lista não tiver largura

  // Etapa 1 (imediata, sem medir nada): monta o layout final da esteira, assim nada pula depois.
  function setupMarquee(list) {
    const host = list.closest("section");
    const viewport = document.createElement("div");
    const track = document.createElement("div");
    viewport.className = "marquee";
    track.className = "marquee__track";
    list.parentNode.insertBefore(viewport, list);
    viewport.appendChild(track);
    track.appendChild(list);
    if (host) host.classList.add("is-marquee");
    list.classList.add("is-marquee");
    return { list, viewport, track };
  }

  // Etapa 2 (depois do carregamento): repete os itens até cobrir a área visível, duplica a lista
  // e liga a animação. A trilha anda -50% e volta ao início sem emenda visível.
  function startMarquee({ list, viewport, track }) {
    const hideCopy = (node) => {
      const copy = node.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      return copy;
    };
    // Uma leitura de largura só (cada leitura força o navegador a recalcular a página).
    const listWidth = list.scrollWidth;
    const viewportWidth = viewport.clientWidth;
    const rounds = listWidth > 0 ? Math.min(MARQUEE_MAX_FILL, Math.ceil(viewportWidth / listWidth) - 1) : 0;
    const originals = Array.from(list.children);
    const fill = document.createDocumentFragment();
    for (let round = 0; round < rounds; round += 1) {
      originals.forEach((item) => fill.appendChild(hideCopy(item)));
    }
    list.appendChild(fill);
    track.appendChild(hideCopy(list));
    const speed = Number(list.dataset.marqueeSpeed) || MARQUEE_SPEED;
    const fullWidth = listWidth * (rounds + 1);
    track.style.setProperty("--marquee-dur", `${Math.max(1, Math.round(fullWidth / speed))}s`);
    track.classList.add("is-running");
  }

  // Mede e anima depois do carregamento, para não disputar o primeiro desenho da página (LCP).
  function initMarquees() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const marquees = Array.from(document.querySelectorAll("[data-marquee]")).map(setupMarquee);
    const start = () => marquees.forEach(startMarquee);
    const whenIdle = () => ("requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 200));
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
  }

  /* ---------------------------------------------------------------
     Fotos do estoque ampliadas (links com data-lightbox)
     Sem suporte a <dialog>, o link abre a foto normalmente.
     --------------------------------------------------------------- */
  function initLightbox() {
    const dialog = document.getElementById("lightbox");
    if (!dialog || typeof dialog.showModal !== "function") return;
    const image = dialog.querySelector(".lightbox__img");
    const caption = dialog.querySelector(".lightbox__caption");

    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[data-lightbox]");
      if (!link) return;
      event.preventDefault();
      const thumb = link.querySelector("img");
      const label = link.querySelector(".stock__caption");
      image.src = link.href;
      image.alt = thumb ? thumb.alt : "";
      caption.textContent = label ? label.textContent : "";
      dialog.showModal();
    });
    // Fecha no X ou ao clicar fora da foto (no fundo escuro). Esc já fecha por padrão.
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target.closest(".lightbox__close")) dialog.close();
    });
    dialog.addEventListener("close", () => { image.removeAttribute("src"); });
  }

  /* ---------------------------------------------------------------
     Faixa de promoção
     --------------------------------------------------------------- */
  function initPromo() {
    const bar = document.getElementById("promo-bar");
    if (!bar || !PROMO.enabled || !PROMO.text) return;
    if (PROMO.href) {
      const link = document.createElement("a");
      link.href = PROMO.href;
      link.textContent = PROMO.text;
      bar.appendChild(link);
    } else {
      bar.textContent = PROMO.text;
    }
    bar.hidden = false;
  }

  /* --------------------------------------------------------------- */
  initPromo();
  initMarquees();
  initLightbox();
  initWaLinks();
  initForm();
  initActiveLink();
  initMobileMenu();
  initScrollState();
  initAnchorFix();
  initReveal();
  initConsent();
})();
