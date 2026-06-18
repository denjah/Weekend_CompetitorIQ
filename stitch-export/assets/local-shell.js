(function () {
  const screenMap = {
    overview: { file: "overview.html", labels: ["overview", "обзор"], icons: ["dashboard"] },
    graph: { file: "graph.html", labels: ["graph", "граф", "knot", "связ"], icons: ["hub"] },
    observatory: { file: "observatory.html", labels: ["observatory", "обсерват"], icons: ["visibility"] },
    insights: { file: "insights.html", labels: ["insights", "инсайт"], icons: ["insights", "psychology"] },
    reports: { file: "reports.html", labels: ["reports", "отчет", "отчёт"], icons: ["assessment", "analytics"] },
  };

  const currentFile = location.pathname.split("/").pop() || "overview.html";
  const currentKey = Object.entries(screenMap).find(([, screen]) => screen.file === currentFile)?.[0] || "overview";

  function assetPath(path) {
    return `../assets/${path}`;
  }

  function installCursorTexture() {
    const root = document.documentElement;
    window.addEventListener(
      "pointermove",
      (event) => {
        root.style.setProperty("--wb-cursor-x", `${event.clientX}px`);
        root.style.setProperty("--wb-cursor-y", `${event.clientY}px`);
      },
      { passive: true },
    );
  }

  function cp1251ReverseMap() {
    const bytes = new Uint8Array(256);
    for (let i = 0; i < 256; i += 1) bytes[i] = i;

    const decoded = new TextDecoder("windows-1251").decode(bytes);
    const reverse = new Map();
    Array.from(decoded).forEach((char, index) => {
      if (!reverse.has(char)) reverse.set(char, index);
    });
    return reverse;
  }

  const reverseCp1251 = cp1251ReverseMap();
  const utf8Decoder = new TextDecoder("utf-8", { fatal: false });
  const suspiciousMojibake = /(?:[РС][\u00a0-\u00bf\u0400-\u045f])|[Ѐ-Џђ-џҐґЄєІіЇїЎўЈјЉљЊњЋћЌќЍѝ]/;

  function repairMojibake(value) {
    if (!value || !suspiciousMojibake.test(value)) return value;

    const chars = Array.from(value);
    const bytes = [];

    for (const char of chars) {
      const code = char.charCodeAt(0);
      if (code < 128) {
        bytes.push(code);
      } else if (reverseCp1251.has(char)) {
        bytes.push(reverseCp1251.get(char));
      } else {
        return value;
      }
    }

    const repaired = utf8Decoder.decode(new Uint8Array(bytes));
    return repaired.includes("\uFFFD") ? value : repaired;
  }

  function repairText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      const fixed = repairMojibake(node.nodeValue);
      if (fixed !== node.nodeValue) node.nodeValue = fixed;
    });

    document.querySelectorAll("[placeholder], [title], [alt], [aria-label]").forEach((node) => {
      ["placeholder", "title", "alt", "aria-label"].forEach((attr) => {
        const value = node.getAttribute(attr);
        if (!value) return;
        const fixed = repairMojibake(value);
        if (fixed !== value) node.setAttribute(attr, fixed);
      });
    });
  }

  function installBrand() {
    const nav = document.querySelector("body > nav") || document.querySelector("nav[class*='left-0'][class*='top-0']");
    if (!nav || nav.querySelector(".wb-local-brand")) return;

    const originalBrand = nav.firstElementChild;
    if (originalBrand) originalBrand.classList.add("wb-original-brand-hidden");

    nav.insertAdjacentHTML(
      "afterbegin",
      `
      <a class="wb-local-brand" href="../index.html" aria-label="КОНКУРЕНТЫ Weekend Billiard">
        <img class="wb-local-brand__mark" src="${assetPath("logo/logo_icon.svg")}" alt="" aria-hidden="true">
        <img class="wb-local-brand__word" src="${assetPath("logo/weekend_logo.png")}" alt="weekend billiard">
        <span class="wb-local-brand__title">КОНКУРЕНТЫ</span>
        <span class="wb-local-brand__meta">market intelligence portal</span>
      </a>
    `,
    );
  }

  function normalizeTopBranding() {
    const replacements = new Map([
      ["Competitor Intelligence Portal", "КОНКУРЕНТЫ"],
      ["Competitive Command Overview", "Командный обзор конкурентов"],
      ["Competitor Intelligence Ledger", "Журнал конкурентной разведки"],
      ["Industrial Intel Matrix", "КОНКУРЕНТЫ"],
      ["INTEL_CORE_V4", "КОНКУРЕНТЫ"],
      ["MATRIX_CORE", "КОНКУРЕНТЫ"],
      ["STRAT_CMD", "КОНКУРЕНТЫ"],
      ["INTEL_MATRIX", "КОНКУРЕНТЫ"],
      ["All market signals compared against Weekend Billiard", "Все рыночные сигналы сравниваются относительно Weekend Бильярд"],
      ["WE / Weekend Billiard Baseline Active", "МЫ / Weekend Бильярд: базовая линия активна"],
      ["Level 4 Clearance", "Доступ аналитика L4"],
      ["Request Intel", "Запросить данные"],
      ["NEW_QUERY", "НОВЫЙ ЗАПРОС"],
      ["Support", "Поддержка"],
      ["Settings", "Настройки"],
      ["Security", "Безопасность"],
      ["Period", "Период"],
      ["Source", "Источник"],
      ["Source Coverage", "Покрытие источников"],
      ["Search Intel...", "Поиск по сигналам..."],
    ]);

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      let next = node.nodeValue;
      replacements.forEach((to, from) => {
        next = next.replaceAll(from, to);
      });
      if (next !== node.nodeValue) node.nodeValue = next;
    });

    document.title = `${screenTitle(currentKey)} - КОНКУРЕНТЫ`;
  }

  function screenTitle(key) {
    const titles = {
      overview: "Обзор",
      graph: "Граф связей",
      observatory: "Обсерватория",
      insights: "Инсайты",
      reports: "Отчеты",
    };
    return titles[key] || "Обзор";
  }

  function detectScreenKey(anchor) {
    const text = repairMojibake(anchor.textContent || "").toLowerCase();
    const icon = (anchor.querySelector(".material-symbols-outlined")?.textContent || "").trim().toLowerCase();

    for (const [key, screen] of Object.entries(screenMap)) {
      if (screen.icons.includes(icon)) return key;
      if (screen.labels.some((label) => text.includes(label))) return key;
    }

    return null;
  }

  function wireNavigation() {
    document.querySelectorAll("a").forEach((anchor) => {
      const key = detectScreenKey(anchor);
      if (!key) return;
      anchor.href = screenMap[key].file;
      anchor.dataset.wbScreenLink = key;
      if (key === currentKey) anchor.dataset.wbActive = "true";
      else delete anchor.dataset.wbActive;
    });
  }

  function addPageSignature() {
    document.body.dataset.wbScreen = currentKey;
  }

  function boot() {
    installCursorTexture();
    repairText(document.body);
    installBrand();
    normalizeTopBranding();
    wireNavigation();
    addPageSignature();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
