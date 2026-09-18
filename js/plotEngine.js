/**
 * Motor de Graficación Científica Interactiva estilo MATLAB
 * Utiliza Plotly.js para reproducir fielmente las gráficas de simulación
 */

const PlotEngine = {
  // Paleta de colores científicos inspirada en MATLAB y temas modernos
  theme: {
    paper_bgcolor: "rgba(11, 19, 41, 0.7)",
    plot_bgcolor: "rgba(15, 23, 42, 0.85)",
    font: {
      family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#e2e8f0",
      size: 12
    },
    gridcolor: "rgba(255, 255, 255, 0.08)",
    zerolinecolor: "rgba(56, 189, 248, 0.4)",
    linecolors: {
      blue: "#38bdf8",
      orange: "#fb923c",
      green: "#34d399",
      red: "#f87171",
      purple: "#c084fc",
      magenta: "#f472b6",
      cyan: "#22d3ee"
    }
  },

  // Generador de arrays numéricos tipo linspace de MATLAB / NumPy
  linspace(start, stop, num) {
    const arr = [];
    const step = (stop - start) / (num - 1);
    for (let i = 0; i < num; i++) {
      arr.push(start + step * i);
    }
    return arr;
  },

  // Función para generar líneas de tallo discretas (stem plot)
  generateStemTraces(xVals, yVals, name = "Discreta", color = "#f87171") {
    const stemShapes = [];
    for (let i = 0; i < xVals.length; i++) {
      stemShapes.push({
        type: "line",
        x0: xVals[i],
        y0: 0,
        x1: xVals[i],
        y1: yVals[i],
        line: {
          color: color,
          width: 2
        }
      });
    }

    const markersTrace = {
      x: xVals,
      y: yVals,
      mode: "markers",
      type: "scatter",
      name: name,
      marker: {
        color: color,
        size: 8,
        symbol: "circle",
        line: { color: "#ffffff", width: 1.5 }
      }
    };

    return { markersTrace, stemShapes };
  },

  render(containerId, signalKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Destruir gráfica previa si existe
    Plotly.purge(container);

    const commonConfig = {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToRemove: ["lasso2d", "select2d"],
      displaylogo: false
    };

    const t = this.theme;

    switch (signalKey) {
      // ==================== ZAUL ====================
      case "analogica-y-digital": {
        const time = this.linspace(0, 4 * Math.PI, 1000);
        const yAnalog = time.map(x => Math.sin(x));
        const yDigital = yAnalog.map(val => (val >= 0 ? 1 : 0));

        const trace1 = {
          x: time,
          y: yAnalog,
          name: "Analógica: sin(t)",
          type: "scatter",
          mode: "lines",
          line: { color: t.linecolors.green, width: 2.5 },
          xaxis: "x1",
          yaxis: "y1"
        };

        const trace2 = {
          x: time,
          y: yDigital,
          name: "Digital: Niveles 0 y 1",
          type: "scatter",
          mode: "lines",
          line: { color: t.linecolors.orange, width: 2.5, shape: "hv" },
          xaxis: "x2",
          yaxis: "y2"
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          grid: { rows: 2, columns: 1, pattern: "independent" },
          xaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud Continua", range: [-1.2, 1.2] },
          xaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Nivel Lógico", range: [-0.2, 1.2] },
          title: "<b>Señal Analógica vs Señal Digital</b> (Subplots)"
        };

        Plotly.newPlot(container, [trace1, trace2], layout, commonConfig);
        break;
      }

      case "continua-y-discreta": {
        const tCont = this.linspace(0, 10, 1000);
        const yCont = tCont.map(x => Math.sin(x));

        const nDisc = Array.from({ length: 11 }, (_, i) => i);
        const yDisc = nDisc.map(n => Math.sin(n));

        const trace1 = {
          x: tCont,
          y: yCont,
          name: "Continua x(t) = sin(t)",
          type: "scatter",
          mode: "lines",
          line: { color: t.linecolors.blue, width: 2.5 },
          xaxis: "x1",
          yaxis: "y1"
        };

        const { markersTrace, stemShapes } = this.generateStemTraces(nDisc, yDisc, "Discreta x[n] = sin(n)", t.linecolors.red);
        markersTrace.xaxis = "x2";
        markersTrace.yaxis = "y2";

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          grid: { rows: 2, columns: 1, pattern: "independent" },
          xaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo continuo (t)" },
          yaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-1.2, 1.2] },
          xaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Muestras discretas (n)", dtick: 1 },
          yaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud x[n]", range: [-1.2, 1.2] },
          shapes: stemShapes.map(s => ({ ...s, xref: "x2", yref: "y2" })),
          title: "<b>Señal Continua vs Discreta</b> (Plot vs Stem)"
        };

        Plotly.newPlot(container, [trace1, markersTrace], layout, commonConfig);
        break;
      }

      case "periodica-y-no-periodica": {
        const time = this.linspace(0, 10, 1000);
        const yPer = time.map(x => Math.sin(2 * Math.PI * 1 * x));
        const yNoPer = time.map(x => Math.sin(2 * Math.PI * 3 * x) * Math.exp(-0.5 * x));

        const trace1 = {
          x: time,
          y: yPer,
          name: "Periódica (f = 1 Hz)",
          line: { color: t.linecolors.purple, width: 2.5 },
          xaxis: "x1",
          yaxis: "y1"
        };

        const trace2 = {
          x: time,
          y: yNoPer,
          name: "No Periódica (Amortiguada)",
          line: { color: t.linecolors.blue, width: 2.5 },
          xaxis: "x2",
          yaxis: "y2"
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          grid: { rows: 2, columns: 1, pattern: "independent" },
          xaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud" },
          xaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud" },
          title: "<b>Señal Periódica vs No Periódica</b>"
        };

        Plotly.newPlot(container, [trace1, trace2], layout, commonConfig);
        break;
      }

      case "valor-absoluto": {
        const time = this.linspace(-5, 5, 1000);
        const y = time.map(x => Math.abs(x));

        const trace = {
          x: time,
          y: y,
          name: "y(t) = |t|",
          line: { color: t.linecolors.blue, width: 2.5 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "y(t)" },
          title: "<b>Señal de Valor Absoluto: y(t) = |t|</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "impulso-de-dirac": {
        const nVals = Array.from({ length: 11 }, (_, i) => i - 5);
        const yVals = nVals.map(n => (n === 0 ? 1 : 0));

        const { markersTrace, stemShapes } = this.generateStemTraces(nVals, yVals, "δ[n]", t.linecolors.red);

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Muestras (n)", dtick: 1 },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "δ[n]", range: [-0.2, 1.3] },
          shapes: stemShapes,
          title: "<b>Impulso de Dirac en Tiempo Discreto: δ[n]</b>"
        };

        Plotly.newPlot(container, [markersTrace], layout, commonConfig);
        break;
      }

      case "escalon-unitario": {
        const time = this.linspace(-5, 5, 1000);
        const y = time.map(x => (x >= 0 ? 1 : 0));

        const trace = {
          x: time,
          y: y,
          name: "u(t)",
          line: { color: t.linecolors.green, width: 2.5, shape: "hv" }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "u(t)", range: [-0.2, 1.2] },
          title: "<b>Señal Escalón Unitario: u(t)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "rampa-unitaria": {
        const time = this.linspace(-5, 5, 1000);
        const y = time.map(x => (x >= 0 ? x : 0));

        const trace = {
          x: time,
          y: y,
          name: "r(t) = t · u(t)",
          line: { color: t.linecolors.orange, width: 2.5 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "r(t)" },
          title: "<b>Señal de Rampa Unitaria: r(t)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "senal-de-potencia": {
        const time = this.linspace(-5, 5, 1000);
        const y = time.map(x => Math.sin(2 * Math.PI * 1 * x));

        const trace = {
          x: time,
          y: y,
          name: "sin(2π · 1 · t)",
          line: { color: t.linecolors.purple, width: 2.5 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-1.3, 1.3] },
          title: "<b>Señal de Potencia (Onda Senoidal Continua)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "senal-de-energia": {
        const time = this.linspace(-5, 5, 1000);
        const y = time.map(x => Math.exp(-Math.pow(x, 2)));

        const trace = {
          x: time,
          y: y,
          name: "e^(-t²)",
          line: { color: t.linecolors.cyan, width: 2.5 },
          fill: "tozeroy",
          fillcolor: "rgba(34, 211, 238, 0.15)"
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-0.1, 1.1] },
          title: "<b>Señal de Energía (Pulso Gaussiano Cuadrático Integrable)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      // ==================== FRANCO ====================
      case "exponencial-creciente": {
        const time = this.linspace(0, 3, 1000);
        const y = time.map(x => 1 * Math.exp(1.5 * x));

        const trace = {
          x: time,
          y: y,
          name: "x(t) = e^(1.5 t)",
          line: { color: t.linecolors.blue, width: 2.5 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud" },
          title: "<b>Exponencial Creciente: x(t) = A · e^{at} (a > 0)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "exponencial-decreciente": {
        const time = this.linspace(0, 5, 1000);
        const y = time.map(x => 5 * Math.exp(-1.2 * x));

        const trace = {
          x: time,
          y: y,
          name: "x(t) = 5 e^(-1.2 t)",
          line: { color: t.linecolors.red, width: 2.5 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud" },
          title: "<b>Exponencial Decreciente: x(t) = A · e^{-at}</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "exponencial-compleja": {
        const time = this.linspace(0, 3, 1000);
        const sigma = -0.5;
        const w0 = 4 * Math.PI;
        const realPart = time.map(tVal => 2 * Math.exp(sigma * tVal) * Math.cos(w0 * tVal));
        const imagPart = time.map(tVal => 2 * Math.exp(sigma * tVal) * Math.sin(w0 * tVal));

        const trace1 = {
          x: time,
          y: realPart,
          name: "Parte Real: Re{x(t)}",
          line: { color: t.linecolors.blue, width: 2 },
          xaxis: "x1",
          yaxis: "y1"
        };

        const trace2 = {
          x: time,
          y: imagPart,
          name: "Parte Imaginaria: Im{x(t)}",
          line: { color: t.linecolors.red, width: 2 },
          xaxis: "x2",
          yaxis: "y2"
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          grid: { rows: 2, columns: 1, pattern: "independent" },
          xaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Re{x(t)}" },
          xaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Im{x(t)}" },
          title: "<b>Exponencial Compleja: x(t) = 2 · e^{(-0.5 + j4π)t}</b>"
        };

        Plotly.newPlot(container, [trace1, trace2], layout, commonConfig);
        break;
      }

      case "senoidal": {
        const time = this.linspace(0, 1.5, 1000);
        const A = 3;
        const f0 = 2;
        const phi = Math.PI / 4;
        const w0 = 2 * Math.PI * f0;
        const y = time.map(x => A * Math.sin(w0 * x + phi));

        const trace = {
          x: time,
          y: y,
          name: "3 sin(4πt + π/4)",
          line: { color: t.linecolors.blue, width: 2.5 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-3.5, 3.5] },
          title: "<b>Señal Senoidal Pura: x(t) = A · sin(ω₀t + φ)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      // ==================== JEREMY ====================
      case "senoidal-amortiguada": {
        const time = this.linspace(0, 10, 2000);
        const A = 5;
        const alpha = 0.5;
        const omega = 10;
        const phi = 2;
        const y = time.map(x => A * Math.exp(-alpha * x) * Math.sin(omega * x - phi));
        const envPos = time.map(x => A * Math.exp(-alpha * x));
        const envNeg = time.map(x => -A * Math.exp(-alpha * x));

        const trace = {
          x: time,
          y: y,
          name: "x(t) = 5e^(-0.5t) sin(10t - 2)",
          line: { color: t.linecolors.cyan, width: 2 }
        };

        const traceEnv1 = {
          x: time,
          y: envPos,
          name: "Envolvente +A e^(-αt)",
          line: { color: "rgba(255, 255, 255, 0.3)", width: 1.5, dash: "dash" }
        };

        const traceEnv2 = {
          x: time,
          y: envNeg,
          name: "Envolvente -A e^(-αt)",
          line: { color: "rgba(255, 255, 255, 0.3)", width: 1.5, dash: "dash" }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud" },
          title: "<b>Señal Senoidal Amortiguada</b>"
        };

        Plotly.newPlot(container, [trace, traceEnv1, traceEnv2], layout, commonConfig);
        break;
      }

      case "senal-signo": {
        const time = this.linspace(-5, 5, 1000);
        const y = time.map(x => (x > 0 ? 1 : x < 0 ? -1 : 0));

        const trace = {
          x: time,
          y: y,
          name: "sgn(t)",
          line: { color: t.linecolors.blue, width: 2.5, shape: "hv" }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-1.6, 1.6] },
          title: "<b>Función Signo: sgn(t)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "pulso-rectangular": {
        const time = this.linspace(-5, 5, 1000);
        const y = time.map(x => (x >= -1 && x <= 1 ? 1 : 0));

        const trace = {
          x: time,
          y: y,
          name: "Π(t/2)",
          line: { color: t.linecolors.blue, width: 2.5, shape: "hv" },
          fill: "tozeroy",
          fillcolor: "rgba(56, 189, 248, 0.15)"
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-0.2, 1.5] },
          title: "<b>Pulso Rectangular Unitario [-1, 1]</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "pulso-triangular": {
        const time = this.linspace(-2, 2, 1000);
        const y = time.map(x => Math.max(1 - Math.abs(x), 0));

        const trace = {
          x: time,
          y: y,
          name: "Λ(t) = max(1 - |t|, 0)",
          line: { color: t.linecolors.orange, width: 2.5 },
          fill: "tozeroy",
          fillcolor: "rgba(251, 146, 60, 0.15)"
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-0.2, 1.4] },
          title: "<b>Pulso Triangular Canónico</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      // ==================== HENRY ====================
      case "pulso-sinc": {
        const time = this.linspace(-5, 5, 1000);
        const A = 2;
        const y = time.map(x => {
          if (Math.abs(x) < 1e-7) return A;
          return (A * Math.sin(Math.PI * x)) / (Math.PI * x);
        });

        const trace = {
          x: time,
          y: y,
          name: "2 · sinc(t)",
          line: { color: t.linecolors.blue, width: 2.5 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-0.6, 2.3] },
          title: "<b>Pulso Sinc: x(t) = A · sinc(t) = A · sin(πt)/(πt)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "onda-cuadrada": {
        const time = this.linspace(0, 3, 1000);
        const A = 2;
        const f = 2;
        const y = time.map(x => {
          const s = Math.sin(2 * Math.PI * f * x);
          return s >= 0 ? A : -A;
        });

        const trace = {
          x: time,
          y: y,
          name: "Onda Cuadrada f = 2 Hz",
          line: { color: t.linecolors.blue, width: 2, shape: "hv" }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-2.6, 2.6] },
          title: "<b>Onda Cuadrada Periódica (Square Wave)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "onda-triangular": {
        const time = this.linspace(0, 4, 1000);
        const A = 3;
        const f = 1;
        const T = 1 / f;
        const y = time.map(x => {
          const phase = (x % T) / T;
          if (phase < 0.5) {
            return -A + 4 * A * phase;
          } else {
            return 3 * A - 4 * A * phase;
          }
        });

        const trace = {
          x: time,
          y: y,
          name: "Onda Triangular",
          line: { color: t.linecolors.red, width: 2.2 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-3.8, 3.8] },
          title: "<b>Onda Triangular Simétrica: A = 3, f = 1 Hz</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "diente-de-sierra": {
        const time = this.linspace(0, 2, 1000);
        const A = 2;
        const f = 3;
        const T = 1 / f;
        const y = time.map(x => {
          const phase = (x % T) / T;
          return -A + 2 * A * phase;
        });

        const trace = {
          x: time,
          y: y,
          name: "Diente de Sierra f = 3 Hz",
          line: { color: t.linecolors.magenta, width: 2.2 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-2.6, 2.6] },
          title: "<b>Onda Diente de Sierra (Sawtooth Wave)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      // ==================== ALEX ====================
      case "senal-coseno": {
        const time = this.linspace(-2 * Math.PI, 2 * Math.PI, 1000);
        const y = time.map(x => Math.cos(x));

        const trace = {
          x: time,
          y: y,
          name: "x(t) = cos(t)",
          line: { color: t.linecolors.blue, width: 2.5 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-1.3, 1.3] },
          title: "<b>Señal Cosenoidal Fundamental</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "dsb-sc": {
        const time = this.linspace(-2 * Math.PI, 2 * Math.PI, 1500);
        const m = time.map(x => Math.cos(x));
        const s = time.map(x => Math.cos(x) * Math.cos(10 * x));

        const traceMod = {
          x: time,
          y: s,
          name: "s(t) = cos(t)cos(10t)",
          line: { color: t.linecolors.blue, width: 2 }
        };

        const traceEnvPos = {
          x: time,
          y: m,
          name: "Mensaje m(t)",
          line: { color: "rgba(255, 255, 255, 0.4)", width: 1.5, dash: "dash" }
        };

        const traceEnvNeg = {
          x: time,
          y: m.map(v => -v),
          name: "-m(t)",
          line: { color: "rgba(255, 255, 255, 0.4)", width: 1.5, dash: "dash" }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-1.3, 1.3] },
          title: "<b>Modulación DSB-SC (Doble Banda Lateral con Portadora Suprimida)</b>"
        };

        Plotly.newPlot(container, [traceMod, traceEnvPos, traceEnvNeg], layout, commonConfig);
        break;
      }

      case "senal-am": {
        const time = this.linspace(-2 * Math.PI, 2 * Math.PI, 1500);
        const env = time.map(x => 1 + 0.5 * Math.cos(x));
        const s = time.map(x => (1 + 0.5 * Math.cos(x)) * Math.cos(10 * x));

        const traceAM = {
          x: time,
          y: s,
          name: "AM: [1 + 0.5cos(t)]cos(10t)",
          line: { color: t.linecolors.cyan, width: 2 }
        };

        const traceEnv = {
          x: time,
          y: env,
          name: "Envolvente Superior",
          line: { color: t.linecolors.orange, width: 2, dash: "dash" }
        };

        const traceEnvNeg = {
          x: time,
          y: env.map(v => -v),
          name: "Envolvente Inferior",
          line: { color: t.linecolors.orange, width: 2, dash: "dash" }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-1.8, 1.8] },
          title: "<b>Modulación de Amplitud Estándar (AM con μ = 0.5)</b>"
        };

        Plotly.newPlot(container, [traceAM, traceEnv, traceEnvNeg], layout, commonConfig);
        break;
      }

      case "senal-fm": {
        const time = this.linspace(-2 * Math.PI, 2 * Math.PI, 2000);
        const s = time.map(x => Math.cos(10 * x + 5 * Math.sin(x)));

        const trace = {
          x: time,
          y: s,
          name: "FM: cos(10t + 5sin(t))",
          line: { color: t.linecolors.green, width: 2 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t)" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-1.3, 1.3] },
          title: "<b>Modulación de Frecuencia (FM con Variación Angular)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      // ==================== BENJAMIN ====================
      case "senal-tangente": {
        const f = 2;
        const T = 1 / f;
        const time = this.linspace(0, 2 * T, 1500);
        const A = 3;
        const y = time.map(x => {
          const val = A * Math.tan(2 * Math.PI * f * x);
          if (Math.abs(val) > 4 * A) return null; // Eliminar trazo en la asíntota vertical
          return val;
        });

        const trace = {
          x: time,
          y: y,
          name: "x(t) = 3 · tan(4πt)",
          line: { color: t.linecolors.blue, width: 2.2 }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t) [s]" },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud x(t)", range: [-12, 12] },
          title: "<b>Señal Tangente Periódica: x(t) = A · tan(2πft)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "senal-escalada-desplazada-y-reflejada": {
        const time = this.linspace(-3, 5, 1200);

        // 1. Original: rampa asimétrica en [0, 1]
        const xOrig = time.map(tVal => (tVal >= 0 && tVal <= 1 ? tVal : 0));

        // 2. Escalada y desplazada: 2 * x(2t - 1.5)
        const A = 2, c = 2, t0 = 1.5;
        const xTrans = time.map(tVal => {
          const tPrime = c * tVal - t0;
          return tPrime >= 0 && tPrime <= 1 ? A * tPrime : 0;
        });

        // 3. Reflejada: x(-t)
        const xRef = time.map(tVal => {
          const tPrime = -tVal;
          return tPrime >= 0 && tPrime <= 1 ? tPrime : 0;
        });

        const trace1 = {
          x: time,
          y: xOrig,
          name: "Original: x(t)",
          line: { color: t.linecolors.blue, width: 2.2 },
          xaxis: "x1",
          yaxis: "y1"
        };

        const trace2 = {
          x: time,
          y: xTrans,
          name: "Escalada & Desplazada: 2·x(2t - 1.5)",
          line: { color: t.linecolors.red, width: 2.2 },
          xaxis: "x2",
          yaxis: "y2"
        };

        const trace3 = {
          x: time,
          y: xRef,
          name: "Reflejada: x(-t)",
          line: { color: t.linecolors.green, width: 2.2 },
          xaxis: "x3",
          yaxis: "y3"
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          grid: { rows: 3, columns: 1, pattern: "independent" },
          xaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, range: [-3, 5] },
          yaxis1: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Original", range: [-0.5, 2.5] },
          xaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, range: [-3, 5] },
          yaxis2: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Esc & Desp", range: [-0.5, 2.5] },
          xaxis3: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (s)", range: [-3, 5] },
          yaxis3: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Reflejada", range: [-0.5, 2.5] },
          title: "<b>Transformaciones Temporales de Señal</b> (3 Subplots)"
        };

        Plotly.newPlot(container, [trace1, trace2, trace3], layout, commonConfig);
        break;
      }

      case "tren-de-pulsos": {
        const time = this.linspace(-4, 6, 1200);
        const T = 2;
        const W = 1;
        const A = 1;
        const y = time.map(x => {
          let mod = x % T;
          if (mod < 0) mod += T;
          return mod >= 0 && mod <= W ? A : 0;
        });

        const trace = {
          x: time,
          y: y,
          name: "x(t) Tren de Pulsos",
          line: { color: t.linecolors.blue, width: 2.5, shape: "hv" },
          fill: "tozeroy",
          fillcolor: "rgba(56, 189, 248, 0.15)"
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t) [segundos]", range: [-4, 6] },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud x(t)", range: [-0.2, 1.3] },
          title: "<b>Tren de Pulsos Periódico (Período T = 2s, Ancho W = 1s)</b>"
        };

        Plotly.newPlot(container, [trace], layout, commonConfig);
        break;
      }

      case "aliasing": {
        const f = 9;
        const tCont = this.linspace(0, 1, 1000);
        const xCont = tCont.map(tVal => Math.sin(2 * Math.PI * f * tVal));

        const fs = 10; // Frecuencia de muestreo inferior a 2*f = 18 Hz (Aliasing evidente)
        const numSamples = Math.floor(1 * fs) + 1;
        const tSamples = [];
        const xSamples = [];
        for (let i = 0; i < numSamples; i++) {
          const tVal = i / fs;
          tSamples.push(tVal);
          xSamples.push(Math.sin(2 * Math.PI * f * tVal));
        }

        const traceCont = {
          x: tCont,
          y: xCont,
          name: "Seno Real Continuo (9 Hz)",
          line: { color: t.linecolors.blue, width: 1.5, dash: "dash" }
        };

        const traceSamples = {
          x: tSamples,
          y: xSamples,
          name: "Muestras a fs = 10 Hz (Alias a 1 Hz)",
          mode: "lines+markers",
          line: { color: t.linecolors.red, width: 2.5 },
          marker: { size: 9, color: t.linecolors.red, symbol: "circle" }
        };

        const layout = {
          paper_bgcolor: t.paper_bgcolor,
          plot_bgcolor: t.plot_bgcolor,
          font: t.font,
          margin: { t: 50, b: 50, l: 60, r: 30 },
          xaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Tiempo (t) [segundos]", range: [0, 1] },
          yaxis: { gridcolor: t.gridcolor, zerolinecolor: t.zerolinecolor, title: "Amplitud", range: [-1.3, 1.3] },
          title: "<b>Fenómeno de Aliasing: Señal Real (9 Hz) vs Muestreo Insuficiente (fs = 10 Hz)</b>"
        };

        Plotly.newPlot(container, [traceCont, traceSamples], layout, commonConfig);
        break;
      }

      default:
        console.warn(`No plot defined for signal: ${signalKey}`);
    }
  }
};
