/**
 * Aplicación Web de Presentación: Catálogo de Señales en Telecomunicaciones
 * Lógica Principal, Enrutamiento Hash, Modos de Exposición e Interacción
 */

const App = {
  currentCategory: null,
  currentSignalKey: null,
  currentSignalIndex: 0,
  currentCategorySignals: [],

  init() {
    this.setupHashRouting();
    this.renderExpositoresGrid();
    this.renderModulesGrid();
    this.setupLogoUploads();
    this.setupKeyboardNavigation();
    this.setupFullscreenToggle();
    this.setupCodeTabsAndCopy();

    // Renderizar fórmulas de la home si existen
    this.renderAllMath();

    // Manejar ruta inicial
    this.handleRoute();
    window.addEventListener("hashchange", () => this.handleRoute());
  },

  // ==========================================================
  // ENRUTAMIENTO HASH (SPA)
  // ==========================================================
  setupHashRouting() {
    window.addEventListener("resize", () => {
      if (this.currentSignalKey) {
        Plotly.Plots.resize(document.getElementById("signal-plot-container"));
      }
    });
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || "home";
    const parts = hash.split("/");

    const homeView = document.getElementById("home-view");
    const expositorView = document.getElementById("expositor-view");
    const signalView = document.getElementById("signal-detail-view");

    // Ocultar todas las vistas
    [homeView, expositorView, signalView].forEach(v => {
      if (v) v.classList.remove("active");
    });

    if (parts[0] === "home" || !parts[0]) {
      if (homeView) homeView.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.updateNavActive("home");
    } else if (parts[0].startsWith("sec-")) {
      if (homeView) homeView.classList.add("active");
      this.updateNavActive(parts[0]);
      setTimeout(() => {
        const el = document.getElementById(parts[0]);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    } else if (parts[0] === "expositor" && parts[1]) {
      this.showExpositorView(parts[1]);
      if (expositorView) expositorView.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.updateNavActive("sec-modulos");
    } else if (parts[0] === "senal" && parts[1] && parts[2]) {
      this.showSignalDetailView(parts[1], parts[2]);
      if (signalView) signalView.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.updateNavActive("sec-modulos");
    } else {
      window.location.hash = "#home";
    }
  },

  goToSection(sectionId) {
    const homeView = document.getElementById("home-view");
    const expositorView = document.getElementById("expositor-view");
    const signalView = document.getElementById("signal-detail-view");

    [expositorView, signalView].forEach(v => {
      if (v) v.classList.remove("active");
    });
    if (homeView) homeView.classList.add("active");

    this.updateNavActive(sectionId);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState(null, null, "#home");
      return;
    }

    history.pushState(null, null, "#" + sectionId);

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 40);
  },

  updateNavActive(targetKey) {
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-nav") === targetKey) {
        btn.classList.add("active");
      }
    });
  },

  navigateTo(hash) {
    window.location.hash = hash;
  },

  // ==========================================================
  // VISTA PRINCIPAL: EXPOSITORES Y MÓDULOS
  // ==========================================================
  renderExpositoresGrid() {
    const container = document.getElementById("expositores-container");
    if (!container) return;

    container.innerHTML = EXPOSITORES.map((exp, idx) => {
      const cat = CATEGORIAS[exp.categoryKey];
      return `
        <div class="expositor-card" style="--card-color: ${exp.badgeColor};">
          <div class="expositor-header">
            <div class="expositor-avatar">${exp.avatarInitial}</div>
            <div class="expositor-name-block">
              <h4>${exp.fullName}</h4>
              <span class="expositor-role">Expositor #${idx + 1}</span>
            </div>
          </div>
          <div class="expositor-theme">📚 Módulo: <strong>${exp.theme}</strong></div>
          <p class="expositor-bio">${exp.bio}</p>
          <div class="expositor-footer">
            <span class="badge-count">${exp.signalsCount} señales preparadas</span>
            <button class="btn-open-module" onclick="App.navigateTo('#expositor/${exp.categoryKey}')">
              Ver Señales →
            </button>
          </div>
        </div>
      `;
    }).join("");
  },

  renderModulesGrid() {
    const container = document.getElementById("modules-container");
    if (!container) return;

    const catKeys = Object.keys(CATEGORIAS);

    container.innerHTML = catKeys.map(catKey => {
      const cat = CATEGORIAS[catKey];
      // Obtener las señales de esta categoría
      const signalsOfCat = Object.keys(SENALES_DATA)
        .filter(k => SENALES_DATA[k].categoryKey === catKey)
        .map(k => ({ key: k, ...SENALES_DATA[k] }));

      return `
        <div class="module-card" style="--mod-color: ${cat.color};" onclick="App.navigateTo('#expositor/${cat.id}')">
          <div class="module-meta">
            <span class="module-badge">${cat.title.split("(")[0].trim()}</span>
            <span class="module-author">👤 ${cat.author.split(",")[0]}</span>
          </div>
          <h3>${cat.title}</h3>
          <p class="module-desc">${cat.desc}</p>
          <div class="module-signals-preview">
            ${signalsOfCat.map(s => `<span class="signal-pill">${s.name}</span>`).join("")}
          </div>
          <div class="module-action-btn">
            <span>Explorar Módulo (${signalsOfCat.length} Señales)</span>
            <span>→</span>
          </div>
        </div>
      `;
    }).join("");
  },

  // ==========================================================
  // VISTA 2: LISTA DE SEÑALES DEL EXPOSITOR
  // ==========================================================
  showExpositorView(categoryKey) {
    const cat = CATEGORIAS[categoryKey];
    if (!cat) {
      this.navigateTo("#home");
      return;
    }

    this.currentCategory = categoryKey;
    const headerTitle = document.getElementById("expositor-view-title");
    const headerSubtitle = document.getElementById("expositor-view-subtitle");
    const listContainer = document.getElementById("signals-list-container");

    if (headerTitle) headerTitle.textContent = cat.title;
    if (headerSubtitle) headerSubtitle.textContent = `Presentación a cargo de: ${cat.author}`;

    // Obtener señales pertenecientes a esta categoría
    const signalEntries = Object.entries(SENALES_DATA).filter(([key, s]) => s.categoryKey === categoryKey);

    if (listContainer) {
      listContainer.innerHTML = signalEntries.map(([slug, s], index) => {
        return `
          <div class="signal-card" onclick="App.navigateTo('#senal/${categoryKey}/${slug}')">
            <div class="signal-card-header">
              <span class="badge-tag" style="background: rgba(56, 189, 248, 0.12); color: var(--accent-cyan);">
                Señal #${index + 1}
              </span>
              <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">
                ${slug}
              </span>
            </div>
            <h3>${s.name}</h3>
            <div class="signal-card-body">
              <p class="signal-card-desc">${s.desc}</p>
              <div class="math-preview-box" id="math-preview-${slug}">
                $$ ${s.mathModel.split("\\quad")[0]} $$
              </div>
            </div>
            <div class="module-action-btn" style="margin-top: 14px;">
              <span>Exponer y Analizar Señal</span>
              <span>→</span>
            </div>
          </div>
        `;
      }).join("");

      // Renderizar fórmulas de las tarjetas con KaTeX
      this.renderMath(listContainer);
    }
  },

  // ==========================================================
  // VISTA 3: DETALLE DE EXPOSICIÓN DE LA SEÑAL
  // ==========================================================
  showSignalDetailView(categoryKey, signalSlug) {
    const signal = SENALES_DATA[signalSlug];
    if (!signal) {
      this.navigateTo(`#expositor/${categoryKey}`);
      return;
    }

    this.currentCategory = categoryKey;
    this.currentSignalKey = signalSlug;

    // Calcular señales de la categoría para navegación Anterior / Siguiente
    const catSignalKeys = Object.keys(SENALES_DATA).filter(k => SENALES_DATA[k].categoryKey === categoryKey);
    this.currentCategorySignals = catSignalKeys;
    this.currentSignalIndex = catSignalKeys.indexOf(signalSlug);

    // Actualizar Encabezado y Breadcrumbs
    const cat = CATEGORIAS[categoryKey];
    const breadcrumbCategory = document.getElementById("breadcrumb-category");
    const breadcrumbSignal = document.getElementById("breadcrumb-signal");
    const signalTitle = document.getElementById("signal-detail-title");
    const signalAuthorTag = document.getElementById("signal-author-tag");
    const prevBtn = document.getElementById("btn-prev-signal");
    const nextBtn = document.getElementById("btn-next-signal");

    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = cat ? cat.title.split("(")[0].trim() : "Módulo";
      breadcrumbCategory.onclick = () => App.navigateTo(`#expositor/${categoryKey}`);
    }
    if (breadcrumbSignal) breadcrumbSignal.textContent = signal.name;
    if (signalTitle) signalTitle.textContent = signal.name;
    if (signalAuthorTag) signalAuthorTag.textContent = `Expositor: ${signal.authorName}`;

    // Configurar botones de navegación entre diapositivas
    if (prevBtn) {
      prevBtn.disabled = this.currentSignalIndex <= 0;
      prevBtn.onclick = () => {
        if (this.currentSignalIndex > 0) {
          const prevSlug = this.currentCategorySignals[this.currentSignalIndex - 1];
          App.navigateTo(`#senal/${categoryKey}/${prevSlug}`);
        }
      };
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentSignalIndex >= this.currentCategorySignals.length - 1;
      nextBtn.onclick = () => {
        if (this.currentSignalIndex < this.currentCategorySignals.length - 1) {
          const nextSlug = this.currentCategorySignals[this.currentSignalIndex + 1];
          App.navigateTo(`#senal/${categoryKey}/${nextSlug}`);
        }
      };
    }

    // Actualizar Información Teórica e Importancia
    const descEl = document.getElementById("signal-desc-content");
    const importanceEl = document.getElementById("signal-importance-content");
    const mathExplEl = document.getElementById("signal-math-explanation");
    const mathBox = document.getElementById("signal-math-formula-box");

    if (descEl) {
      descEl.textContent = signal.desc;
      this.renderMath(descEl);
    }
    if (importanceEl) {
      importanceEl.textContent = signal.importance;
      this.renderMath(importanceEl);
    }
    if (mathExplEl) {
      mathExplEl.textContent = signal.mathExplanation;
      this.renderMath(mathExplEl);
    }

    // Renderizar Fórmula Principal con KaTeX
    if (mathBox && window.katex) {
      try {
        katex.render(signal.mathModel, mathBox, {
          throwOnError: false,
          displayMode: true
        });
      } catch (e) {
        mathBox.textContent = signal.mathModel;
      }
    }

    // Actualizar Códigos en los Visores
    const matlabCodeBlock = document.getElementById("code-matlab");
    const pythonCodeBlock = document.getElementById("code-python");

    if (matlabCodeBlock) {
      matlabCodeBlock.textContent = signal.matlabCode;
      if (window.Prism) Prism.highlightElement(matlabCodeBlock);
    }
    if (pythonCodeBlock) {
      pythonCodeBlock.textContent = signal.pythonCode;
      if (window.Prism) Prism.highlightElement(pythonCodeBlock);
    }

    // Renderizar Gráfica Científica estilo MATLAB
    setTimeout(() => {
      PlotEngine.render("signal-plot-container", signalSlug);
      const plotBox = document.getElementById("signal-plot-container");
      if (plotBox && window.Plotly) {
        Plotly.Plots.resize(plotBox);
      }
    }, 60);
  },

  // ==========================================================
  // ATAJOS DE TECLADO PARA LA EXPOSICIÓN
  // ==========================================================
  setupKeyboardNavigation() {
    window.addEventListener("keydown", (e) => {
      // Si estamos en la vista de detalle de señal
      const signalView = document.getElementById("signal-detail-view");
      if (signalView && signalView.classList.contains("active")) {
        if (e.key === "ArrowRight") {
          // Siguiente señal
          if (this.currentSignalIndex < this.currentCategorySignals.length - 1) {
            const nextSlug = this.currentCategorySignals[this.currentSignalIndex + 1];
            this.navigateTo(`#senal/${this.currentCategory}/${nextSlug}`);
          }
        } else if (e.key === "ArrowLeft") {
          // Señal anterior
          if (this.currentSignalIndex > 0) {
            const prevSlug = this.currentCategorySignals[this.currentSignalIndex - 1];
            this.navigateTo(`#senal/${this.currentCategory}/${prevSlug}`);
          }
        } else if (e.key === "Escape") {
          // Volver a la lista del expositor
          if (this.currentCategory) {
            this.navigateTo(`#expositor/${this.currentCategory}`);
          } else {
            this.navigateTo("#home");
          }
        } else if (e.key.toLowerCase() === "f") {
          // Toggle pantalla completa
          this.toggleFullscreen();
        }
      }
    });
  },

  // ==========================================================
  // PANTALLA COMPLETA
  // ==========================================================
  setupFullscreenToggle() {
    const fsBtns = document.querySelectorAll(".btn-fullscreen-toggle");
    fsBtns.forEach(btn => {
      btn.addEventListener("click", () => this.toggleFullscreen());
    });
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error al activar pantalla completa: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  // ==========================================================
  // VISOR DE CÓDIGO: PESTAÑAS Y COPIAR
  // ==========================================================
  setupCodeTabsAndCopy() {
    const tabBtns = document.querySelectorAll(".code-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetLang = btn.getAttribute("data-tab");
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const contents = document.querySelectorAll(".code-tab-content");
        contents.forEach(c => {
          c.classList.remove("active");
          if (c.getAttribute("data-content") === targetLang) {
            c.classList.add("active");
          }
        });
      });
    });

    const copyBtn = document.getElementById("btn-copy-active-code");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const activeContent = document.querySelector(".code-tab-content.active code");
        if (activeContent) {
          navigator.clipboard.writeText(activeContent.textContent).then(() => {
            this.showToast("¡Código copiado al portapapeles exitosamente!");
          }).catch(() => {
            this.showToast("No se pudo copiar el código.");
          });
        }
      });
    }
  },

  // ==========================================================
  // CARGA Y CAMBIO DINÁMICO DE LOGOS
  // ==========================================================
  setupLogoUploads() {
    const setupSlot = (slotId, inputId, storageKey, defaultSrc) => {
      const slot = document.getElementById(slotId);
      const input = document.getElementById(inputId);
      const img = slot ? slot.querySelector("img") : null;

      // Recuperar de localStorage si el usuario ya guardó un logo previamente
      const savedLogo = localStorage.getItem(storageKey);
      if (savedLogo && img) {
        img.src = savedLogo;
      }

      if (slot && input && img) {
        slot.addEventListener("click", () => input.click());

        input.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const base64 = event.target.result;
              img.src = base64;
              try {
                localStorage.setItem(storageKey, base64);
                this.showToast("Logo actualizado y guardado correctamente.");
              } catch (err) {
                console.warn("Storage quota exceded:", err);
                this.showToast("Logo cargado para esta sesión.");
              }
            };
            reader.readAsDataURL(file);
          }
        });
      }
    };

    setupSlot("uni-logo-slot", "uni-logo-input", "catalog_uni_logo", "assets/university-logo.svg");
    setupSlot("fac-logo-slot", "fac-logo-input", "catalog_fac_logo", "assets/faculty-logo.svg");
  },

  // ==========================================================
  // NOTIFICACIÓN FLOTANTE (TOAST)
  // ==========================================================
  showToast(message) {
    let toast = document.getElementById("app-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "app-toast";
      toast.className = "toast-notice";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  },

  // Renderizador universal KaTeX para cualquier elemento con fórmulas $...$ o $$...$$
  renderMath(element) {
    if (!element) return;
    const doRender = () => {
      if (window.renderMathInElement) {
        try {
          renderMathInElement(element, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\(", right: "\\)", display: false },
              { left: "\\[", right: "\\]", display: true }
            ],
            throwOnError: false
          });
        } catch (err) {
          console.warn("KaTeX render error:", err);
        }
      } else {
        setTimeout(doRender, 50);
      }
    };
    doRender();
  },

  // Renderizar fórmulas LaTeX en toda la página
  renderAllMath() {
    this.renderMath(document.body);
  }
};

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
