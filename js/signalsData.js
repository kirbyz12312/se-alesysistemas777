/**
 * Base de Datos Central del Catálogo de Señales
 * Universidad y Facultad de Ingeniería de Telecomunicaciones
 */

const EXPOSITORES = [
  {
    id: "henry",
    fullName: "Gutierrez Barrionuevo, Henry Andre",
    shortName: "Henry Gutierrez",
    categoryKey: "henry",
    theme: "Pulsos Especiales y Ondas",
    badgeColor: "#38bdf8",
    avatarInitial: "H",
    bio: "",  
    signalsCount: 4
  },
  {
    id: "franco",
    fullName: "Gutierrez Ccolqque, Franco Arturo",
    shortName: "Franco Gutierrez",
    categoryKey: "franco",
    theme: "Señales Exponenciales y Senoidales",
    badgeColor: "#a855f7",
    avatarInitial: "F",
    bio: "",
    signalsCount: 4
  },
  {
    id: "benjamin",
    fullName: "Quispe Flores, Benjamín Eduardo",
    shortName: "Benjamín Quispe",
    categoryKey: "benjamin",
    theme: "Señales Especiales y Aliasing",
    badgeColor: "#f43f5e",
    avatarInitial: "B",
    bio: "",
    signalsCount: 4
  },
  {
    id: "alex",
    fullName: "Quispe Yncarroque, Alex Cesar",
    shortName: "Alex Quispe",
    categoryKey: "alex",
    theme: "Señales Trigonométricas y de Potencia",
    badgeColor: "#10b981",
    avatarInitial: "A",
    bio: "",
    signalsCount: 4
  },
  {
    id: "zaul",
    fullName: "Uturunco Cuela, Zaul Francisco",
    shortName: "Zaul Uturunco",
    categoryKey: "zaul",
    theme: "Señales Básicas",
    badgeColor: "#06b6d4",
    avatarInitial: "Z",
    bio: "",
    signalsCount: 9
  },
  {
    id: "jeremy",
    fullName: "Villalta Checalla, Gianluigi Jeremy",
    shortName: "Jeremy Villalta",
    categoryKey: "jeremy",
    theme: "Señales Moduladas y Pulsos",
    badgeColor: "#eab308",
    avatarInitial: "J",
    bio: "",
    signalsCount: 4
  }
];

const CATEGORIAS = {
  zaul: {
    id: "zaul",
    title: "Señales Básicas",
    author: "Uturunco Cuela, Zaul Francisco",
    color: "#06b6d4",
    icon: "activity",
    desc: "Estudio de las señales elementales de prueba y modelos de referencia en tiempo continuo y discreto, analógicas vs digitales, impulsos, escalones y clasificación energética."
  },
  franco: {
    id: "franco",
    title: "Señales Exponenciales y Senoidales",
    author: "Gutierrez Ccolqque, Franco Arturo",
    color: "#a855f7",
    icon: "trending-up",
    desc: "Comportamiento dinámico exponencial creciente y decreciente, representación compleja en el plano temporal (parte real e imaginaria) y la sinusoide pura."
  },
  jeremy: {
    id: "jeremy",
    title: "Señales Moduladas y Pulsos",
    author: "Villalta Checalla, Gianluigi Jeremy",
    color: "#eab308",
    icon: "radio",
    desc: "Oscilaciones amortiguadas con pérdidas físicas, función de conmutación signo y pulsos canónicos rectangulares y triangulares de duración finita."
  },
  henry: {
    id: "henry",
    title: "Pulsos Especiales y Ondas",
    author: "Gutierrez Barrionuevo, Henry Andre",
    color: "#38bdf8",
    icon: "cpu",
    desc: "La función cardinal sinc como base de la interpolación de Whittaker-Shannon, y generadores de ondas cuadradas, triangulares y diente de sierra."
  },
  alex: {
    id: "alex",
    title: "Señales Trigonométricas y de Potencia",
    author: "Quispe Yncarroque, Alex Cesar",
    color: "#10b981",
    icon: "share-2",
    desc: "La portadora cosenoidal fundamental y los tres grandes pilares de la modulación analógica de banda base a radiofrecuencia: DSB-SC, AM convencional y FM."
  },
  benjamin: {
    id: "benjamin",
    title: "Señales Especiales y Aliasing",
    author: "Quispe Flores, Benjamín Eduardo",
    color: "#f43f5e",
    icon: "sliders",
    desc: "La función tangente asintótica, operaciones fundamentales de transformación temporal (escalamiento, desplazamiento y reflexión), trenes de pulsos y el teorema del aliasing."
  }
};

const SENALES_DATA = {
  // ==================== ZAUL ====================
  "analogica-y-digital": {
    name: "Analógica y Digital",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "Una señal analógica varía de forma continua tanto en el tiempo como en su rango de amplitud, adoptando infinitos valores posibles. En contraposición, una señal digital restringe sus valores a un conjunto finito y discreto de niveles cuantizados (por ejemplo, niveles lógicos 0 y 1 en lógica binaria). En esta gráfica, la señal analógica es una onda senoidal continua, y la digital se obtiene mediante un comparador umbral en cero.",
    importance: "Es la base absoluta de la digitalización moderna (ADC/DAC) y de todos los sistemas de telecomunicaciones contemporáneos, permitiendo la regeneración inmune al ruido y el procesamiento digital mediante DSPs y FPGAs.",
    mathModel: "x_{ana}(t) = \\sin(t) \\quad \\text{y} \\quad y_{dig}(t) = \\begin{cases} 1, & \\text{si } \\sin(t) \\ge 0 \\\\ 0, & \\text{si } \\sin(t) < 0 \\end{cases}",
    mathExplanation: "La función signo umbralizada cuantiza el continuo de valores sinusoidales en una señal binaria de dos estados con período idéntico pero contenido armónico enriquecido por transiciones abruptas.",
    matlabCode: `% Definir el vector de tiempo
t = linspace(0, 4*pi, 1000);

% Señal analógica
y_analogica = sin(t);

% Señal digital (comparar con cero)
y_digital = double(y_analogica >= 0);

% Crear figura con dos subgráficas
figure('Name', 'Señal Analógica y Digital');

subplot(2, 1, 1);
plot(t, y_analogica, 'g', 'LineWidth', 2);
title('Señal Analógica');
grid on;

subplot(2, 1, 2);
stairs(t, y_digital, 'Color', [1 0.5 0], 'LineWidth', 2);
title('Señal Digital');
grid on;
axis([0 4*pi -0.2 1.2]);`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 4 * np.pi, 1000)
y_analogica = np.sin(t)
y_digital = np.where(y_analogica >= 0, 1, 0)

plt.figure(figsize=(10, 8))
plt.subplot(2, 1, 1)
plt.plot(t, y_analogica, color='green', linewidth=2)
plt.title('Señal Analógica: Amplitud continua')
plt.xlabel('Tiempo (t)')
plt.ylabel('Amplitud')
plt.grid(True)

plt.subplot(2, 1, 2)
plt.step(t, y_digital, color='orange', linewidth=2, where='post')
plt.title('Señal Digital: Amplitud discreta (Niveles lógicos 0 y 1)')
plt.xlabel('Tiempo (t)')
plt.ylabel('Amplitud Lógica')
plt.ylim(-0.2, 1.2) 
plt.grid(True)
plt.tight_layout()
plt.show()`,
    plotType: "analogica-y-digital"
  },
  "continua-y-discreta": {
    name: "Continua y Discreta",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "Una señal continua en el tiempo está definida para todo instante real $t \\in \\mathbb{R}$. Por el contrario, una señal de tiempo discreto solo existe en instantes aislados $n \\in \\mathbb{Z}$, típicamente espaciados a intervalos uniformes de muestreo $T_s$. Aquí comparamos una sinusoide continua $x(t) = \\sin(t)$ con su secuencia muestreada $x[n] = \\sin(n)$.",
    importance: "El paso de tiempo continuo a discreto es el requisito indispensable para que una computadora o procesador DSP pueda almacenar, filtrar o transformar una señal física del mundo real.",
    mathModel: "x(t) = \\sin(t) \\quad (t \\in \\mathbb{R}), \\qquad x[n] = x(n T_s) = \\sin(n) \\quad (n \\in \\mathbb{Z})",
    mathExplanation: "La variable independiente cambia de una recta continua $t$ a un índice entero de muestra $n$, visualizado en MATLAB mediante la instrucción 'stem' (gráfico de agujas o tallo).",
    matlabCode: `% Señal continua
t_continuo = linspace(0, 10, 1000);
y_continua = sin(t_continuo);

% Señal discreta
n_discreto = 0:10;
y_discreta = sin(n_discreto);

% Crear figura
figure('Name', 'Señal Continua y Discreta');

subplot(2, 1, 1);
plot(t_continuo, y_continua, 'b', 'LineWidth', 2);
title('Señal Continua');
grid on;

subplot(2, 1, 2);
stem(n_discreto, y_discreta, 'r', 'filled', 'LineWidth', 1.5);
title('Señal Discreta');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t_continuo = np.linspace(0, 10, 1000)
y_continua = np.sin(t_continuo)
n_discreto = np.arange(0, 11) 
y_discreta = np.sin(n_discreto)

plt.figure(figsize=(10, 8))
plt.subplot(2, 1, 1)
plt.plot(t_continuo, y_continua, color='blue', linewidth=2)
plt.title('Señal Continua: Definida en todo instante de tiempo')
plt.xlabel('Tiempo (t)')
plt.ylabel('Amplitud')
plt.grid(True)

plt.subplot(2, 1, 2)
plt.stem(n_discreto, y_discreta, linefmt='red', markerfmt='ro', basefmt="black")
plt.title('Señal Discreta: Definida solo en instantes específicos (muestras)')
plt.xlabel('Muestra (n)')
plt.ylabel('Amplitud')
plt.grid(True)
plt.tight_layout()
plt.show()`,
    plotType: "continua-y-discreta"
  },
  "periodica-y-no-periodica": {
    name: "Periódica y No Periódica",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "Una señal es periódica si existe una constante $T > 0$ tal que $x(t + T) = x(t)$ para todo $t$. El menor $T$ se denomina período fundamental. Por el contrario, una señal no periódica (o aperiódica) jamás repite su forma de onda exactamente; en este ejemplo, la multiplicación por $e^{-0.5t}$ amortigua progresivamente la amplitud.",
    importance: "Las señales periódicas se descomponen mediante Series de Fourier en un espectro de líneas armónicas discretas, mientras que las señales aperiódicas requieren la Integral de Transformada de Fourier con espectro continuo.",
    mathModel: "x_p(t) = \\sin(2\\pi f_1 t), \\qquad x_{np}(t) = \\sin(2\\pi f_2 t) \\cdot e^{-\\alpha t}",
    mathExplanation: "La envolvente exponencial decreciente destruye la simetría traslacional en el tiempo, impidiendo que $x_{np}(t)$ satisfaga la condición de periodicidad.",
    matlabCode: `t = linspace(0, 10, 1000);

% Señal periódica
y_periodica = sin(2*pi*1*t);

% Señal no periódica (amortiguada)
y_no_periodica = sin(2*pi*3*t).*exp(-0.5*t);

% Crear figura
figure('Name', 'Señal Periódica y No Periódica');

subplot(2, 1, 1);
plot(t, y_periodica, 'm', 'LineWidth', 2);
title('Señal Periódica');
grid on;

subplot(2, 1, 2);
plot(t, y_no_periodica, 'b', 'LineWidth', 2);
title('Señal No Periódica');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 10, 1000)
y_periodica = np.sin(2 * np.pi * 1 * t)
y_no_periodica = np.sin(2 * np.pi * 3 * t) * np.exp(-0.5 * t)

plt.figure(figsize=(10, 8))
plt.subplot(2, 1, 1)
plt.plot(t, y_periodica, color='purple', linewidth=2)
plt.title('Señal Periódica: Su patrón se repite constantemente')
plt.xlabel('Tiempo (t)')
plt.ylabel('Amplitud')
plt.grid(True)

plt.subplot(2, 1, 2)
plt.plot(t, y_no_periodica, color='magenta', linewidth=2)
plt.title('Señal No Periódica: Onda senoidal amortiguada (no se repite)')
plt.xlabel('Tiempo (t)')
plt.ylabel('Amplitud')
plt.grid(True)
plt.tight_layout()
plt.show()`,
    plotType: "periodica-y-no-periodica"
  },
  "valor-absoluto": {
    name: "Valor Absoluto",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "La función valor absoluto $y(t) = |t|$ rectifica cualquier valor hacia el semiplano positivo. Su gráfica forma una 'V' con vértice en el origen. Es una señal par no diferenciable en $t = 0$.",
    importance: "Fundamental en circuitos de rectificación de onda completa, demodulación de envolvente para receptores de radio AM y en el cálculo de métricas de error absoluto (MAE).",
    mathModel: "y(t) = |t| = \\begin{cases} t, & t \\ge 0 \\\\ -t, & t < 0 \\end{cases}",
    mathExplanation: "Al invertir la pendiente en el semieje negativo, la función preserva la magnitud física de una cantidad eliminando la información de fase o polaridad.",
    matlabCode: `t = linspace(-5, 5, 1000);
y = abs(t);

figure('Name', 'Señal de Valor Absoluto');
plot(t, y, 'b', 'LineWidth', 2);
title('Valor Absoluto: y(t) = |t|');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-5, 5, 1000)
y = np.abs(t)

plt.figure(figsize=(8, 4))
plt.plot(t, y, color='blue', linewidth=2)
plt.title('Señal de Valor Absoluto')
plt.xlabel('Tiempo (t)')
plt.ylabel('y(t)')
plt.grid(True)
plt.show()`,
    plotType: "valor-absoluto"
  },
  "impulso-de-dirac": {
    name: "Impulso de Dirac",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "El impulso unitario o delta de Dirac $\\delta(t)$ es una función generalizada (distribución) con duración infinitesimal, amplitud infinita en $t=0$ y área total igual a 1. En tiempo discreto, $\\delta[n]$ se define limpiamente con valor 1 en el origen y 0 en cualquier otro punto.",
    importance: "Es el pilar de la teoría de sistemas LTI (Lineales e Invariantes en el Tiempo). La respuesta al impulso $h(t)$ o $h[n]$ caracteriza completamente un canal de comunicación o filtro digital mediante la integral/suma de convolución.",
    mathModel: "\\delta[n] = \\begin{cases} 1, & n = 0 \\\\ 0, & n \\neq 0 \\end{cases} \\qquad \\left[\\int_{-\\infty}^{\\infty} \\delta(t)dt = 1\\right]",
    mathExplanation: "Posee la propiedad de muestreo o filtrado: al convolucionar cualquier señal $x[n]$ con $\\delta[n - k]$, se obtiene la señal retardada $x[n - k]$.",
    matlabCode: `n = -5:5;
y = zeros(size(n));
y(n == 0) = 1;

figure('Name', 'Impulso de Dirac');
stem(n, y, 'r', 'filled', 'LineWidth', 1.5);
title('Impulso de Dirac: \\delta[n]');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

n = np.arange(-5, 6)
y = np.zeros_like(n)
y[n == 0] = 1

plt.figure(figsize=(8, 4))
plt.stem(n, y, linefmt='red', markerfmt='ro', basefmt="black")
plt.title('Impulso de Dirac (Discreto)')
plt.xlabel('Muestras (n)')
plt.ylabel('δ[n]')
plt.grid(True)
plt.show()`,
    plotType: "impulso-de-dirac"
  },
  "escalon-unitario": {
    name: "Escalón Unitario",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "La función escalón unitario de Heaviside $u(t)$ vale 0 para tiempos estrictamente negativos y salta instantáneamente al valor 1 para tiempos positivos. Modela la energización de un circuito o la activación repentina de un transmisor.",
    importance: "Permite delimitar funciones causales en ingeniería y evaluar la respuesta transitoria y estabilidad de sistemas ante cambios en escalón (tiempo de subida, sobreimpulso y tiempo de establecimiento).",
    mathModel: "u(t) = \\begin{cases} 1, & t \\ge 0 \\\\ 0, & t < 0 \\end{cases}",
    mathExplanation: "La derivada matemática del escalón en sentido distribucional es precisamente el impulso de Dirac: $\\frac{d}{dt} u(t) = \\delta(t)$.",
    matlabCode: `t = linspace(-5, 5, 1000);
y = double(t >= 0);

figure('Name', 'Escalón Unitario');
plot(t, y, 'g', 'LineWidth', 2);
title('Escalón Unitario: u(t)');
axis([-5 5 -0.2 1.2]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-5, 5, 1000)
y = np.heaviside(t, 1)

plt.figure(figsize=(8, 4))
plt.plot(t, y, color='green', linewidth=2)
plt.title('Señal Escalón Unitario')
plt.xlabel('Tiempo (t)')
plt.ylabel('u(t)')
plt.grid(True)
plt.show()`,
    plotType: "escalon-unitario"
  },
  "rampa-unitaria": {
    name: "Rampa Unitaria",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "La rampa unitaria $r(t)$ se define como la integral del escalón unitario. Es idéntica a cero para $t < 0$ y crece linealmente con pendiente unitaria para $t \\ge 0$.",
    importance: "Se utiliza en servomecanismos de seguimiento de antenas de telecomunicación, radares y para evaluar el error en estado estacionario ante entradas de velocidad.",
    mathModel: "r(t) = t \\cdot u(t) = \\begin{cases} t, & t \\ge 0 \\\\ 0, & t < 0 \\end{cases} = \\int_{-\\infty}^t u(\\tau) d\\tau",
    mathExplanation: "Su crecimiento proporcional al tiempo permite simular aceleraciones o variaciones térmicas lentas en componentes de comunicaciones.",
    matlabCode: `t = linspace(-5, 5, 1000);
y = max(0, t);

figure('Name', 'Rampa Unitaria');
plot(t, y, 'Color', [1 0.5 0], 'LineWidth', 2);
title('Rampa Unitaria: r(t)');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-5, 5, 1000)
y = np.maximum(0, t)

plt.figure(figsize=(8, 4))
plt.plot(t, y, color='orange', linewidth=2)
plt.title('Señal de Rampa Unitaria')
plt.xlabel('Tiempo (t)')
plt.ylabel('r(t)')
plt.grid(True)
plt.show()`,
    plotType: "rampa-unitaria"
  },
  "senal-de-potencia": {
    name: "Señal de Potencia",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "Una señal de potencia posee energía total infinita ($E = \\infty$), pero su potencia media temporal calculada a lo largo de un período infinito es finita y estrictamente mayor a cero ($0 < P < \\infty$). Todas las ondas periódicas infinitas, como la sinusoide pura, son señales de potencia.",
    importance: "En telecomunicaciones, las portadoras de radiofrecuencia de emisión continua se modelan como señales de potencia para determinar los requerimientos de amplificadores de potencia (PA) y balances de enlace (dBm, Watts).",
    mathModel: "P = \\lim_{T \\to \\infty} \\frac{1}{T} \\int_{-T/2}^{T/2} |x(t)|^2 dt, \\qquad P_{\\text{seno}} = \\frac{A^2}{2}",
    mathExplanation: "Para una sinusoide de amplitud 1, la integral cuadrática media converge exactamente a $1/2 = 0.5$ W sobre una carga normalizada de 1 ohmio.",
    matlabCode: `t = linspace(-5, 5, 1000);
frecuencia = 1;
y = sin(2*pi*frecuencia*t);

figure('Name', 'Señal de Potencia');
plot(t, y, 'm', 'LineWidth', 2);
title('Señal de Potencia');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-5, 5, 1000)
frecuencia = 1 # Hz
y = np.sin(2 * np.pi * frecuencia * t)

plt.figure(figsize=(8, 4))
plt.plot(t, y, color='purple', linewidth=2)
plt.title('Señal de Potencia (Onda Senoidal)')
plt.xlabel('Tiempo (t)')
plt.ylabel('Amplitud')
plt.grid(True)
plt.show()`,
    plotType: "senal-de-potencia"
  },
  "senal-de-energia": {
    name: "Señal de Energía",
    categoryKey: "zaul",
    authorName: "Zaul Francisco Uturunco Cuela",
    desc: "Una señal de energía posee una energía total finita ($0 < E < \\infty$) y, por consiguiente, su potencia media en el tiempo infinito es exactamente cero ($P = 0$). Los pulsos transitorios de duración finita o aquellos que decaen exponencialmente, como el pulso gaussiano $e^{-t^2}$, son el ejemplo canónico.",
    importance: "Los paquetes de datos transmitidos en redes inalámbricas (como ráfagas de tramas Wi-Fi o pulsos UWB) son señales de energía finita delimitadas en el tiempo.",
    mathModel: "E = \\int_{-\\infty}^{\\infty} |x(t)|^2 dt < \\infty, \\qquad x(t) = e^{-t^2}",
    mathExplanation: "Dado que $e^{-t^2} \\to 0$ muy velozmente cuando $|t| \\to \\infty$, la integral bajo la curva cuadrática converge a la constante $\\sqrt{\\pi / 2}$.",
    matlabCode: `t = linspace(-5, 5, 1000);
y = exp(-t.^2);

figure('Name', 'Señal de Energía');
plot(t, y, 'c', 'LineWidth', 2);
title('Señal de Energía - Pulso Gaussiano');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-5, 5, 1000)
y = np.exp(-t**2)

plt.figure(figsize=(8, 4))
plt.plot(t, y, color='magenta', linewidth=2)
plt.title('Señal de Energía (Pulso Gaussiano)')
plt.xlabel('Tiempo (t)')
plt.ylabel('Amplitud')
plt.grid(True)
plt.show()`,
    plotType: "senal-de-energia"
  },

  // ==================== FRANCO ====================
  "exponencial-creciente": {
    name: "Exponencial Creciente",
    categoryKey: "franco",
    authorName: "Franco Arturo Gutierrez Ccolqque",
    desc: "La señal exponencial creciente aumenta su magnitud a una tasa proporcional a su valor actual según $x(t) = A e^{at}$ con parámetro de escala $a > 0$. Crece sin límite hacia el infinito positivo.",
    importance: "Modela la inestabilidad de sistemas con realimentación positiva, avalanchas de portadores en fotodiodos APD o el inicio de oscilación en circuitos osciladores LC antes de la saturación no lineal.",
    mathModel: "x(t) = A e^{at} \\quad (a > 0, \\, t \\ge 0)",
    mathExplanation: "La constante $A$ fija la condición inicial en $t=0$, mientras que el coeficiente $a$ determina la velocidad de amplificación temporal (inversa de la constante de tiempo).",
    matlabCode: `A = 1;
a = 1.5;
t = 0:0.001:3;
x = A*exp(a*t);

figure('Name', 'Exponencial Creciente');
plot(t, x, 'b', 'LineWidth', 2);
title('Exponencial Creciente');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

A = 1
a = 1.5
t = np.linspace(0, 3, 1000)
x = A * np.exp(a * t)

plt.figure()
plt.plot(t, x, 'b', linewidth=2)
plt.grid(True)
plt.title('Exponencial Creciente')
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.show()`,
    plotType: "exponencial-creciente"
  },
  "exponencial-decreciente": {
    name: "Exponencial Decreciente",
    categoryKey: "franco",
    authorName: "Franco Arturo Gutierrez Ccolqque",
    desc: "La exponencial decreciente se expresa como $x(t) = A e^{-at}$ con $a > 0$. Comienza en un valor inicial $A$ y tiende asintóticamente a cero conforme el tiempo se incrementa.",
    importance: "Representa el fenómeno físico más ubicuo: la descarga de un capacitor en circuitos RC, la atenuación de una onda de radio viajando por un medio disipativo o la relajación térmica.",
    mathModel: "x(t) = A e^{-at} = A e^{-t/\\tau} \\quad (a = 1/\\tau > 0)",
    mathExplanation: "Al cabo de un tiempo igual a una constante de tiempo $\\tau = 1/a$, la señal se ha reducido al $36.8\\%$ de su valor inicial; tras $5\\tau$, se considera prácticamente extinguida ($<1\\%$).",
    matlabCode: `A = 5;
a = 1.2;
t = 0:0.001:5;
x = A*exp(-a*t);

figure('Name', 'Exponencial Decreciente');
plot(t, x, 'r', 'LineWidth', 2);
title('Exponencial Decreciente');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

A = 5
a = 1.2
t = np.linspace(0, 5, 1000)
x = A * np.exp(-a * t)

plt.figure()
plt.plot(t, x, 'r', linewidth=2)
plt.grid(True)
plt.title('Exponencial Decreciente')
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.show()`,
    plotType: "exponencial-decreciente"
  },
  "exponencial-compleja": {
    name: "Exponencial Compleja",
    categoryKey: "franco",
    authorName: "Franco Arturo Gutierrez Ccolqque",
    desc: "La exponencial compleja generalizada reúne en una sola formulación matemática amortiguamiento y oscilación armónica mediante la fórmula de Euler: $e^{(\\sigma + j\\omega_0)t} = e^{\\sigma t} (\\cos \\omega_0 t + j \\sin \\omega_0 t)$.",
    importance: "Es el bloque elemental del dominio transformado de Laplace y la base de los fasores, autofunciones indispensables para analizar cualquier filtro o sistema lineal invariante en el tiempo (LTI).",
    mathModel: "x(t) = A e^{(\\sigma + j\\omega_0)t} = A e^{\\sigma t}\\cos(\\omega_0 t) + j A e^{\\sigma t}\\sin(\\omega_0 t)",
    mathExplanation: "La parte real $\\sigma$ dicta si la envolvente crece ($\\sigma > 0$) o decae ($\\sigma < 0$), mientras que $\\omega_0$ es la velocidad angular de rotación en radianes/segundo en el plano complejo.",
    matlabCode: `A = 2;
sigma = -0.5;
w0 = 4*pi;
t = 0:0.001:3;

x = A*exp((sigma + 1j*w0)*t);

figure('Name', 'Exponencial Compleja');

subplot(2, 1, 1);
plot(t, real(x), 'b', 'LineWidth', 1.5);
title('Parte Real');
grid on;

subplot(2, 1, 2);
plot(t, imag(x), 'r', 'LineWidth', 1.5);
title('Parte Imaginaria');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

A = 2
sigma = -0.5
w0 = 4 * np.pi
t = np.linspace(0, 3, 1000)
x = A * np.exp((sigma + 1j * w0) * t)

plt.figure()
plt.subplot(2, 1, 1)
plt.plot(t, np.real(x), 'b', linewidth=1.5)
plt.grid(True)
plt.title('Parte Real')
plt.ylabel('Amplitud')

plt.subplot(2, 1, 2)
plt.plot(t, np.imag(x), 'r', linewidth=1.5)
plt.grid(True)
plt.title('Parte Imaginaria')
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.tight_layout()
plt.show()`,
    plotType: "exponencial-compleja"
  },
  "senoidal": {
    name: "Senoidal",
    categoryKey: "franco",
    authorName: "Franco Arturo Gutierrez Ccolqque",
    desc: "La función senoidal es la oscilación armónica pura más elemental en telecomunicaciones, gobernada por tres parámetros independientes: amplitud pico $A$, frecuencia de repetición $f_0$ (o frecuencia angular $\\omega_0 = 2\\pi f_0$) y ángulo de fase inicial $\\phi$.",
    importance: "Según el análisis de Fourier, cualquier señal analógica compleja del universo puede expresarse como una suma ponderada de ondas senoidales de distinta frecuencia y fase.",
    mathModel: "x(t) = A \\sin(\\omega_0 t + \\phi) = A \\sin(2\\pi f_0 t + \\phi)",
    mathExplanation: "Un ciclo completo abarca un período $T_0 = 1/f_0$; la fase $\\phi = \\pi/4$ adelanta la cresta de la señal temporalmente respecto al origen de coordenadas.",
    matlabCode: `A = 3;
f0 = 2;
phi = pi/4;
w0 = 2*pi*f0;
t = 0:0.001:1.5;

x = A*sin(w0*t + phi);

figure('Name', 'Señal Senoidal');
plot(t, x, 'b', 'LineWidth', 2);
title('Señal Senoidal');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

A = 3
f0 = 2
phi = np.pi / 4
w0 = 2 * np.pi * f0
t = np.linspace(0, 1.5, 1000)
x = A * np.sin(w0 * t + phi)

plt.figure()
plt.plot(t, x, 'b', linewidth=2)
plt.grid(True)
plt.title('Señal Senoidal')
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.show()`,
    plotType: "senoidal"
  },

  // ==================== JEREMY ====================
  "senoidal-amortiguada": {
    name: "Senoidal Amortiguada",
    categoryKey: "jeremy",
    authorName: "Gianluigi Jeremy Villalta Checalla",
    desc: "Se trata de una oscilación sinusoidal cuya amplitud pico decae monótonamente en el tiempo atrapada dentro de una envolvente exponencial decreciente $\\pm A e^{-\\alpha t}$. Simula el comportamiento subamortiguado en sistemas con pérdidas disipativas.",
    importance: "Es la respuesta natural transitoria de circuitos resonantes RLC en serie o paralelo, cavidades electromagnéticas con pérdidas y antenas sometidas a impulsos electromagnéticos (EMP).",
    mathModel: "x(t) = A e^{-\\alpha t} \\sin(\\omega t - \\phi)",
    mathExplanation: "El parámetro de amortiguamiento $\\alpha$ determina la tasa de absorción de energía por ciclo, mientras que $\\omega$ representa la frecuencia angular de oscilación amortiguada.",
    matlabCode: `t = linspace(0, 10, 2000);
A = 5;
alpha = 0.5;
omega = 10;
phi = 2;

x = A*exp(-alpha*t).*sin(omega*t - phi);

figure('Name', 'Señal Senoidal Amortiguada');
plot(t, x, 'LineWidth', 1.5);
title('Señal Senoidal Amortiguada');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 10, 2000)

A = 5
alpha = 0.5
omega = 10
phi = 2

x = A * np.exp(-alpha * t) * np.sin(omega * t - phi)

plt.plot(t, x)
plt.title("Damped Sinusoidal Signal\\n$x(t)=5e^{-0.5t}\\sin(10t-2)$", fontsize=14)
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.grid(True)
plt.show()`,
    plotType: "senoidal-amortiguada"
  },
  "senal-signo": {
    name: "Señal Signo",
    categoryKey: "jeremy",
    authorName: "Gianluigi Jeremy Villalta Checalla",
    desc: "La función signo $\\text{sgn}(t)$ extrae únicamente el signo algebraico de la variable temporal: vale $+1$ cuando $t > 0$, $-1$ cuando $t < 0$, y $0$ en $t = 0$. Es una función impar discontinua.",
    importance: "Se emplea intensamente en comunicaciones digitales para modelar la decisión de bit en polaridad bipolar (antipodal BPSK), discriminadores de cruce por cero y en la definición de la Transformada de Hilbert.",
    mathModel: "\\text{sgn}(t) = \\begin{cases} 1, & t > 0 \\\\ 0, & t = 0 \\\\ -1, & t < 0 \\end{cases} = 2u(t) - 1",
    mathExplanation: "Posee una relación directa con el escalón unitario de Heaviside a través de la identidad $\\text{sgn}(t) = 2u(t) - 1$, lo que simplifica transformaciones espectrales.",
    matlabCode: `t = linspace(-5, 5, 1000);
x = sign(t);

figure('Name', 'Señal Signo');
plot(t, x, 'LineWidth', 1.5);
title('Señal Signo');
ylim([-1.5 1.5]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-5, 5, 1000)
x = np.sign(t)

plt.step(t, x, where="post")
plt.title("Sign Signal")
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.grid(True)
plt.ylim(-1.5, 1.5)
plt.show()`,
    plotType: "senal-signo"
  },
  "pulso-rectangular": {
    name: "Pulso Rectangular",
    categoryKey: "jeremy",
    authorName: "Gianluigi Jeremy Villalta Checalla",
    desc: "El pulso rectangular $\\Pi(t)$ es una función ventana que vale 1 dentro de un intervalo cerrado $[-T/2, T/2]$ y cero fuera de él. En este código, se define con ancho total 2 centrado en el origen (entre $-1$ y $1$).",
    importance: "Es el formato de pulso básico en codificación de línea NRZ (Non-Return-to-Zero) y sirve como modelo de ventana temporal. Su transformada de Fourier es la función sinc.",
    mathModel: "\\Pi(t) = \\text{rect}\\left(\\frac{t}{2}\\right) = \\begin{cases} 1, & -1 \\le t \\le 1 \\\\ 0, & |t| > 1 \\end{cases}",
    mathExplanation: "La duración finita en tiempo provoca que en el dominio de la frecuencia su ancho de banda sea infinito, generando lóbulos secundarios que pueden causar interferencia intersimbólica (ISI).",
    matlabCode: `t = linspace(-5, 5, 1000);
x = double((t >= -1) & (t <= 1));

figure('Name', 'Pulso Rectangular');
plot(t, x, 'LineWidth', 1.5);
title('Pulso Rectangular');
ylim([-0.2 1.5]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-5, 5, 1000)
x = np.where((t >= -1) & (t <= 1), 1, 0)

plt.plot(t, x)
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.title("Rectangular Pulse")
plt.grid(True)
plt.ylim(-0.2, 1.5)
plt.show()`,
    plotType: "pulso-rectangular"
  },
  "pulso-triangular": {
    name: "Pulso Triangular",
    categoryKey: "jeremy",
    authorName: "Gianluigi Jeremy Villalta Checalla",
    desc: "El pulso triangular $\\Lambda(t)$ se forma mediante dos rampas lineales que ascienden hasta una cresta unitaria en $t=0$ y descienden a cero en los extremos $|t| = 1$. Es matemáticamente la convolución de dos pulsos rectangulares idénticos.",
    importance: "Tiene una caída espectral en frecuencia de $1/f^2$ (mucho más rápida que la del pulso rectangular $1/f$), reduciendo notablemente la interferencia de canal adyacente en transmisores.",
    mathModel: "\\Lambda(t) = \\text{tri}(t) = \\max(1 - |t|, 0) = \\begin{cases} 1 - |t|, & |t| \\le 1 \\\\ 0, & |t| > 1 \\end{cases}",
    mathExplanation: "Al ser el resultado de $\\Pi(t) * \\Pi(t)$, su transformada de Fourier equivale al producto de dos sincs, es decir, $\\text{sinc}^2(f)$.",
    matlabCode: `t = linspace(-2, 2, 1000);
x = max(1-abs(t), 0);

figure('Name', 'Pulso Triangular');
plot(t, x, 'LineWidth', 1.5);
title('Pulso Triangular');
ylim([-0.2 1.4]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-2, 2, 1000)
x = np.maximum(1 - np.abs(t), 0)

plt.plot(t, x)
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.title("Triangular Pulse")
plt.grid(True)
plt.ylim(-0.2, 1.4)
plt.show()`,
    plotType: "pulso-triangular"
  },

  // ==================== HENRY ====================
  "pulso-sinc": {
    name: "Pulso Sinc",
    categoryKey: "henry",
    authorName: "Henry Andre Gutierrez Barrionuevo",
    desc: "La función sinc normalizada se define como $\\text{sinc}(t) = \\frac{\\sin(\\pi t)}{\\pi t}$. Alcanza su pico unitario en $t=0$ y cruza exactamente por cero en todos los números enteros no nulos ($t = \\pm 1, \\pm 2, \\pm 3, \\dots$).",
    importance: "Es el pulso ideal de Nyquist con criterio de cero interferencia intersimbólica (ISI). Además, constituye la función de interpolación cardinal para reconstruir señales continuas en el teorema de Nyquist-Shannon.",
    mathModel: "x(t) = A \\cdot \\text{sinc}(t) = A \\frac{\\sin(\\pi t)}{\\pi t} \\quad \\text{con } x(0) = A",
    mathExplanation: "En el dominio frecuencial corresponde a un filtro pasobajas ideal (ladrillo rectangular). En tiempo, sus cruces por cero en enteros permiten transmitir muestras sucesivas sin que se perturben entre sí.",
    matlabCode: `A = 2;
t = -5:0.001:5;
x = A*sinc(t);

figure('Name', 'Pulso Sinc');
plot(t, x, 'b', 'LineWidth', 1.5);
title('Pulso Sinc');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

A = 2
t = np.arange(-5, 5.001, 0.001)
x = A * np.sinc(t)

plt.figure()
plt.plot(t, x, 'b', linewidth=1.5)
plt.grid(True)
plt.title('Pulso Sinc')
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.show()`,
    plotType: "pulso-sinc"
  },
  "onda-cuadrada": {
    name: "Onda Cuadrada",
    categoryKey: "henry",
    authorName: "Henry Andre Gutierrez Barrionuevo",
    desc: "La onda cuadrada es una forma de onda periódica simétrica que conmuta abruptamente entre dos niveles amplitudes extremas ($+A$ y $-A$) con un ciclo de trabajo del $50\\%$.",
    importance: "Es la señal de reloj (clock) por excelencia para sincronizar microprocesadores, buses digitales serie/paralelo (SPI, I2C, PCIe) y trenes de muestreo en moduladores por ancho de pulso (PWM).",
    mathModel: "x(t) = A \\cdot \\text{sgn}(\\sin(2\\pi f t)) = \\frac{4A}{\\pi} \\sum_{k=1,3,5...}^{\\infty} \\frac{1}{k} \\sin(2\\pi k f t)",
    mathExplanation: "Su desarrollo en serie de Fourier demuestra que solo contiene armónicos impares cuya amplitud decrece inversamente con el orden armónico $1/k$.",
    matlabCode: `A = 2;
f = 2;
t = 0:0.001:3;

x = A*square(2*pi*f*t);

figure('Name', 'Onda Cuadrada');
plot(t, x, 'b', 'LineWidth', 1.5);
title('Onda Cuadrada');
ylim([-2.5 2.5]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.arange(0, 2.001, 0.001)
f = 2
x = np.sign(np.sin(2 * np.pi * f * t))

plt.plot(t, x, linewidth=1.5)
plt.grid(True)
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.title('Onda Cuadrada')
plt.ylim(-1.5, 1.5)
plt.show()`,
    plotType: "onda-cuadrada"
  },
  "onda-triangular": {
    name: "Onda Triangular",
    categoryKey: "henry",
    authorName: "Henry Andre Gutierrez Barrionuevo",
    desc: "Una onda triangular es periódica y continua a tramos, con pendientes lineales simétricas que ascienden y descienden uniformemente entre $-A$ y $+A$. En MATLAB y Python se genera con la función `sawtooth(t, 0.5)` con ancho simétrico.",
    importance: "Se usa ampliamente como señal portadora portante en moduladores PWM analógicos para etapas de potencia clase D y fuentes conmutadas (SMPS).",
    mathModel: "x(t) = \\frac{8A}{\\pi^2} \\sum_{k=1,3,5...}^{\\infty} \\frac{(-1)^{(k-1)/2}}{k^2} \\sin(2\\pi k f t)",
    mathExplanation: "Al poseer armónicos impares que decaen como $1/k^2$, tiene una forma de onda mucho más limpia y armónicamente atenuada que la onda cuadrada.",
    matlabCode: `A = 3;
f = 1;
t = 0:0.001:4;

x = A*sawtooth(2*pi*f*t, 0.5);

figure('Name', 'Onda Triangular');
plot(t, x, 'r', 'LineWidth', 1.5);
title('Onda Triangular');
ylim([-3.5 3.5]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import sawtooth

t = np.arange(0, 2.001, 0.001)
f = 2
x = sawtooth(2 * np.pi * f * t, width=0.5)

plt.plot(t, x, linewidth=1.5)
plt.grid(True)
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.title('Onda Triangular')
plt.ylim(-1.5, 1.5)
plt.show()`,
    plotType: "onda-triangular"
  },
  "diente-de-sierra": {
    name: "Diente de Sierra",
    categoryKey: "henry",
    authorName: "Henry Andre Gutierrez Barrionuevo",
    desc: "La onda diente de sierra se caracteriza por una rampa que sube suavemente hasta alcanzar el valor pico $+A$ y luego cae verticalmente de forma instantánea a $-A$, repitiéndose periódicamente con frecuencia $f$.",
    importance: "Ha sido históricamente el patrón de barrido horizontal y vertical de los haces de electrones en tubos de rayos catódicos (CRT), osciloscopios analógicos e instrumentos de barrido en frecuencia (sweep generators).",
    mathModel: "x(t) = 2A \\left( \\frac{t}{T} - \\left\\lfloor \\frac{t}{T} + \\frac{1}{2} \\right\\rfloor \\right) = -\\frac{2A}{\\pi} \\sum_{k=1}^{\\infty} \\frac{(-1)^k}{k} \\sin(2\\pi k f t)",
    mathExplanation: "Contiene todos los armónicos (tanto pares como impares) decayendo con tasa $1/k$, lo que la convierte en una señal muy rica para probar la respuesta en frecuencia de filtros.",
    matlabCode: `A = 2;
f = 3;
t = 0:0.001:2;

x = A*sawtooth(2*pi*f*t);

figure('Name', 'Onda Diente de Sierra');
plot(t, x, 'm', 'LineWidth', 1.5);
title('Onda Diente de Sierra');
ylim([-2.5 2.5]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import sawtooth

t = np.arange(0, 2.001, 0.001)
f = 2
x = sawtooth(2 * np.pi * f * t)

plt.plot(t, x, linewidth=1.5)
plt.grid(True)
plt.xlabel('Tiempo (s)')
plt.ylabel('Amplitud')
plt.title('Onda Diente de Sierra')
plt.ylim(-1.5, 1.5)
plt.show()`,
    plotType: "diente-de-sierra"
  },

  // ==================== ALEX ====================
  "senal-coseno": {
    name: "Señal Coseno",
    categoryKey: "alex",
    authorName: "Alex Cesar Quispe Yncarroque",
    desc: "La señal coseno $x(t) = \\cos(t)$ es la forma armónica par complementaria al seno, desfasada exactamente en $+90^\\circ$ ($\\pi/2$ radianes). Es máxima en el origen ($t=0$).",
    importance: "Constituye la base del canal en fase ($I$, In-phase) en constelaciones de modulación digital avanzada como QPSK, 16-QAM y modulaciones OFDM utilizadas en 4G/5G.",
    mathModel: "x(t) = \\cos(t) = \\sin\\left(t + \\frac{\\pi}{2}\\right) = \\frac{e^{jt} + e^{-jt}}{2}",
    mathExplanation: "Su simetría par $x(-t) = x(t)$ genera coeficientes de Fourier exclusivamente reales, facilitando los cálculos de respuesta en amplitud de canales lineales.",
    matlabCode: `t = -2*pi:0.001:2*pi;
x = cos(t);

figure('Name', 'Señal Cosenoidal');
plot(t, x);
title('Señal Cosenoidal');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.arange(-2*np.pi, 2*np.pi, 0.001)
x = np.cos(t)

plt.plot(t, x)
plt.grid()
plt.xlabel('t')
plt.ylabel('Amplitud')
plt.title('Señal cosenoidal')
plt.legend(['x(t) = cos(t)'])
plt.show()`,
    plotType: "senal-coseno"
  },
  "dsb-sc": {
    name: "DSB-SC",
    categoryKey: "alex",
    authorName: "Alex Cesar Quispe Yncarroque",
    desc: "La modulación en Doble Banda Lateral con Portadora Suprimida (Double Sideband Suppressed Carrier) consiste en multiplicar directamente la señal mensaje $m(t)$ por una portadora de alta frecuencia $\\cos(\\omega_c t)$ sin sumarle una portadora fija.",
    importance: "Ahorra dos tercios de la potencia del transmisor al eliminar la portadora que no transmite información. Se emplea en transmisiones de radio aficionado, satélites y señales subportadoras estéreo en radiodifusión FM.",
    mathModel: "s(t) = m(t) \\cdot \\cos(\\omega_c t) = \\cos(t) \\cdot \\cos(10t)",
    mathExplanation: "Al aplicar identidades trigonométricas: $\\cos(t)\\cos(10t) = \\frac{1}{2}\\cos(11t) + \\frac{1}{2}\\cos(9t)$, produciendo dos bandas laterales a $9$ rad/s y $11$ rad/s con cero potencia en $\\omega_c = 10$.",
    matlabCode: `t = -2*pi:0.001:2*pi;
m = cos(t);
s = m.*cos(10*t);

figure('Name', 'Modulación DSB-SC');
plot(t, s);
title('Señal DSB-SC');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.arange(-2*np.pi, 2*np.pi, 0.001)
m = np.cos(t)
s = m*np.cos(10*t)

plt.plot(t, s)
plt.grid()
plt.xlabel('t')
plt.ylabel('Amplitud')
plt.title('Señal DSB-SC')
plt.legend(['s(t) = cos(t)cos(10t)'])
plt.show()`,
    plotType: "dsb-sc"
  },
  "senal-am": {
    name: "Señal AM",
    categoryKey: "alex",
    authorName: "Alex Cesar Quispe Yncarroque",
    desc: "La modulación de amplitud convencional (AM) transmite la portadora completa sumada al mensaje modulante: $s(t) = [1 + \\mu m(t)]\\cos(\\omega_c t)$, donde $\\mu$ es el índice de modulación (aquí $\\mu = 0.5$, condición de no sobremodulación).",
    importance: "Permite receptores extremadamente sencillos y económicos que solo requieren un diodo y un filtro RC (detector de envolvente) sin necesidad de recuperación coherente de portadora.",
    mathModel: "s(t) = [1 + \\mu \\cdot m(t)] \\cos(\\omega_c t) = [1 + 0.5\\cos(t)]\\cos(10t)",
    mathExplanation: "La envolvente superior e inferior reproduce de manera proporcional la forma de la señal mensaje $m(t)$, facilitando la recuperación sin oscilador local sincronizado.",
    matlabCode: `t = -2*pi:0.001:2*pi;
m = cos(t);
s = (1 + 0.5*m).*cos(10*t);

figure('Name', 'Modulación AM');
plot(t, s);
title('Señal AM');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.arange(-2*np.pi, 2*np.pi, 0.001)
m = np.cos(t)
s = (1 + 0.5*m)*np.cos(10*t)

plt.plot(t, s)
plt.grid()
plt.xlabel('t')
plt.ylabel('Amplitud')
plt.title('Señal AM')
plt.legend(['s(t) = [1 + 0.5cos(t)]cos(10t)'])
plt.show()`,
    plotType: "senal-am"
  },
  "senal-fm": {
    name: "Señal FM",
    categoryKey: "alex",
    authorName: "Alex Cesar Quispe Yncarroque",
    desc: "En la modulación de frecuencia (FM), la amplitud de la portadora se mantiene rigurosamente constante mientras su frecuencia instantánea varía proporcionalmente al valor instantáneo de la señal mensaje.",
    importance: "Brinda una inmunidad extraordinaria frente al ruido electromagnético e interferencias atmosféricas (las cuales afectan principalmente la amplitud), logrando una alta fidelidad en radiodifusión sonora comercial y enlaces de audio profesional.",
    mathModel: "s(t) = A_c \\cos\\left( \\omega_c t + \\beta \\sin(\\omega_m t) \\right) = \\cos(10t + 5\\sin(t))",
    mathExplanation: "La frecuencia instantánea es la derivada del ángulo: $f_i(t) = \\frac{1}{2\\pi} \\frac{d\\theta(t)}{dt} = \\frac{1}{2\\pi}(10 + 5\\cos(t))$, lo que causa la compresión y dilatación periódica de los ciclos.",
    matlabCode: `t = 0:0.0001:1;
Ac = 1;
fm = 5;
fc = 50;
beta = 5;

s = Ac*cos(2*pi*fc*t + beta*sin(2*pi*fm*t));

figure('Name', 'Modulación FM');
plot(t, s);
title('Señal FM');
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.arange(-2*np.pi, 2*np.pi, 0.001)
s = np.cos(10*t + 5*np.sin(t))

plt.plot(t, s)
plt.grid()
plt.xlabel('t')
plt.ylabel('Amplitud')
plt.title('Señal FM')
plt.legend(['s(t) = cos(10t + 5sin(t))'])
plt.show()`,
    plotType: "senal-fm"
  },

  // ==================== BENJAMIN ====================
  "senal-tangente": {
    name: "Señal Tangente",
    categoryKey: "benjamin",
    authorName: "Benjamín Eduardo Quispe Flores",
    desc: "La función tangente $x(t) = A \\tan(2\\pi f t)$ es periódica con período $T = 1/(2f)$, pero posee asíntotas verticales y singularidades infinitas en cada punto donde el coseno se anula ($2\\pi f t = \\pi/2 + k\\pi$).",
    importance: "Se presenta en análisis de desfasajes de líneas de transmisión de microondas, en la carta de Smith al evaluar impedancias reactivas y en mapeos de filtros analógicos a digitales mediante la Transformación Bilineal.",
    mathModel: "x(t) = A \\tan(2\\pi f t) = A \\frac{\\sin(2\\pi f t)}{\\cos(2\\pi f t)}",
    mathExplanation: "Al aproximarse a los polos de la función, la amplitud tiende a $\\pm \\infty$. En simulación se limita el eje de amplitud para evitar distorsión visual.",
    matlabCode: `A = 3;
f = 2;
T = 1/f;
t = 0:0.001:2*T;

xt = A*tan(2*pi*f*t);

figure('Name', 'Señal Tangente');
plot(t, xt, 'LineWidth', 2);
title('Señal Tangente');
ylim([-4*A 4*A]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

A = 3         
f = 2          
T = 1 / f        
t = np.arange(0, 2 * T + 0.001, 0.001) 
xt = A * np.tan(2 * np.pi * f * t)

plt.figure(figsize=(10, 5))
plt.plot(t, xt, linewidth=2)
plt.ylim(-4 * A, 4 * A)
plt.grid(True)
plt.title(r'Señal Tangente: $x(t) = A \\cdot \\tan(2\\pi f t)$')
plt.xlabel('Tiempo (t) [segundos]')
plt.ylabel('Amplitud x(t)')
plt.show()`,
    plotType: "senal-tangente"
  },
  "senal-escalada-desplazada-y-reflejada": {
    name: "Señal Escalada, Desplazada y Reflejada",
    categoryKey: "benjamin",
    authorName: "Benjamín Eduardo Quispe Flores",
    desc: "Ilustra las tres operaciones de transformación en la variable independiente del tiempo: escalamiento temporal $c \\cdot t$ (compresión si $|c|>1$), desplazamiento temporal $t - t_0$ (retardo) y reflexión temporal $-t$ (inversión de tiempo). Se muestran tres subgráficas comparando la señal original con las transformadas.",
    importance: "Constituyen las operaciones básicas para calcular la convolución gráfica de señales, el filtrado adaptativo y el procesamiento de ecos en sistemas Radar y Sonar.",
    mathModel: "x_{orig}(t), \\qquad x_{trans}(t) = A \\cdot x(c t - t_0), \\qquad x_{ref}(t) = x(-t)",
    mathExplanation: "Para $c = 2$ la señal se comprime temporalmente a la mitad de su duración; el término $t_0 = 1.5$ desplaza el soporte en el eje temporal, y el factor de escala de amplitud $A = 2$ duplica su altura.",
    matlabCode: `t = -3:0.005:5;

x_original = (t >= 0 & t <= 1).*t;

A = 2;
c = 2;
t0 = 1.5;

t_trans = c*t - t0;

x_transformada = A*((t_trans >= 0 & t_trans <= 1).*t_trans);

t_ref = -t;

x_reflejada = (t_ref >= 0 & t_ref <= 1).*t_ref;

figure('Name', 'Transformaciones de Señal');

subplot(3,1,1);
plot(t, x_original, 'b', 'LineWidth', 2);
title('Señal Original');
xlim([-3 5]);
ylim([-0.5 2.5]);
grid on;

subplot(3,1,2);
plot(t, x_transformada, 'r', 'LineWidth', 2);
title('Señal Escalada y Desplazada');
xlim([-3 5]);
ylim([-0.5 2.5]);
grid on;

subplot(3,1,3);
plot(t, x_reflejada, 'g', 'LineWidth', 2);
title('Señal Reflejada');
xlim([-3 5]);
ylim([-0.5 2.5]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.arange(-3, 5.005, 0.005) 
x_original = ((t >= 0) & (t <= 1)) * t

A = 2    
c = 2    
t0 = 1.5  

t_trans = c * t - t0
x_transformada = A * (((t_trans >= 0) & (t_trans <= 1)) * t_trans)
t_ref = -t
x_reflejada = ((t_ref >= 0) & (t_ref <= 1)) * t_ref

fig, axs = plt.subplots(3, 1, figsize=(10, 8), sharex=True)

axs[0].plot(t, x_original, 'b', linewidth=2)
axs[0].set_title('1. Señal Original: x(t) [Rampa asimétrica]')
axs[0].set_ylabel('Amplitud')
axs[0].grid(True)
axs[0].set_ylim(-0.5, 2.5)

axs[1].plot(t, x_transformada, 'r', linewidth=2)
axs[1].set_title(f'2. Escalada y Desplazada: {A} * x({c}t - {t0})')
axs[1].set_ylabel('Amplitud')
axs[1].grid(True)
axs[1].set_ylim(-0.5, 2.5)

axs[2].plot(t, x_reflejada, 'g', linewidth=2)
axs[2].set_title('3. Señal Reflejada: x(-t)')
axs[2].set_xlabel('Tiempo (t) [segundos]')
axs[2].set_ylabel('Amplitud')
axs[2].grid(True)
axs[2].set_ylim(-0.5, 2.5)

plt.xlim(-3, 5)
plt.tight_layout()
plt.show()`,
    plotType: "senal-escalada-desplazada-y-reflejada"
  },
  "tren-de-pulsos": {
    name: "Tren de Pulsos",
    categoryKey: "benjamin",
    authorName: "Benjamín Eduardo Quispe Flores",
    desc: "Un tren de pulsos rectangular es una señal periódica formada por la repetición infinita de un pulso de ancho $W$ espaciado a intervalos iguales al período fundamental $T$. Su cociente $W/T$ se conoce como ciclo de trabajo (duty cycle).",
    importance: "Es el modelo exacto de las señales de muestreo natural y por conmutación en sistemas PAM (Pulse Amplitude Modulation) y en multiplexores por división de tiempo (TDM).",
    mathModel: "x(t) = A \\sum_{k=-\\infty}^{\\infty} \\Pi\\left(\\frac{t - kT}{W}\\right) = \\begin{cases} A, & (t \\bmod T) \\in [0, W] \\\\ 0, & \\text{otro caso} \\end{cases}",
    mathExplanation: "Al evaluarse en el dominio frecuencial, su espectro es un peine de Dirac ponderado por una envolvente sinc centrada en los múltiplos de $1/T$.",
    matlabCode: `t = -4:0.001:6;
T_val = 2;
W = 1;
A_val = 1;

t_periodico = mod(t, T_val);

x_tren = A_val*(t_periodico >= 0 & t_periodico <= W);

figure('Name', 'Tren de Pulsos');
plot(t, x_tren, 'b', 'LineWidth', 2);
title('Tren de Pulsos Periódico');
xlim([-4 6]);
ylim([-0.2 1.2]);
grid on;`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

t = np.arange(-4, 6.001, 0.001) 
T = 2    
W = 1  
A = 1    
t_periodico = t % T
x_tren = A * ((t_periodico >= 0) & (t_periodico <= W))

plt.figure(figsize=(10, 5))
plt.plot(t, x_tren, 'b', linewidth=2)
plt.xlim(-4, 6)
plt.ylim(-0.2, 1.2)
plt.grid(True)
plt.title('Tren de Pulsos Periódico Original: x(t)')
plt.xlabel('Tiempo (t) [segundos]')
plt.ylabel('Amplitud x(t)')
plt.show()`,
    plotType: "tren-de-pulsos"
  },
  "aliasing": {
    name: "Aliasing",
    categoryKey: "benjamin",
    authorName: "Benjamín Eduardo Quispe Flores",
    desc: "El aliasing (solapamiento o falsificación de frecuencia) es la distorsión que ocurre cuando una señal analógica continua se muestrea a una frecuencia $f_s$ inferior al doble de su frecuencia máxima componente ($f_s < 2 f_{\\max}$). Como resultado, la señal reconstruida aparenta tener una frecuencia mucho más baja que la real.",
    importance: "Determina la necesidad obligatoria de incorporar filtros anti-aliasing pasobajas analógicos antes de cualquier convertidor analógico a digital (ADC) en tarjetas de sonido, teléfonos celulares y receptores de radio definida por software (SDR).",
    mathModel: "f_s \\ge 2 f_{\\max} \\quad \\text{(Criterio de Nyquist)}, \\qquad f_{\\text{alias}} = |f - k f_s|",
    mathExplanation: "Al muestrear una onda de 9 Hz a solo $f_s = 10$ Hz, los puntos de muestra coinciden exactamente con una onda senoidal aparente de solo $10 - 9 = 1$ Hz, falseando por completo la información original.",
    matlabCode: `f_val = 9;

t_continua = 0:0.001:1;
x_continua = sin(2*pi*f_val*t_continua);

fs = 18;

t_muestras = 0:1/fs:1;
x_muestras = sin(2*pi*f_val*t_muestras);

figure('Name', 'Aliasing');

plot(t_continua, x_continua, 'b--', 'LineWidth', 1);
hold on;

plot(t_muestras, x_muestras, 'r-o', ...
    'LineWidth', 2, ...
    'MarkerFaceColor', 'r');

title('Aliasing - Muestreo');
xlim([0 1]);
ylim([-1.2 1.2]);
grid on;

legend('Señal Continua', 'Muestras');`,
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

f = 9                      
t_continua = np.arange(0, 1.001, 0.001) 
x_continua = np.sin(2 * np.pi * f * t_continua)

fs = 10                     
t_muestras = np.arange(0, 1 + 1/fs, 1/fs)  
x_muestras = np.sin(2 * np.pi * f * t_muestras) 

plt.figure(figsize=(10, 5))
plt.plot(t_continua, x_continua, 'b--', label='Seno Real (9 Hz)', linewidth=1)
plt.plot(t_muestras, x_muestras, 'r-o', label='Señal Reconstruida', linewidth=2, markerfacecolor='r')

plt.xlim(0, 1)
plt.ylim(-1.2, 1.2)
plt.grid(True)
plt.title(f'Muestreo a fs = {fs} Hz (Límite crítico Nyquist)')
plt.legend()
plt.xlabel('Tiempo (t) [segundos]')
plt.ylabel('Amplitud')
plt.show()`,
    plotType: "aliasing"
  }
};
