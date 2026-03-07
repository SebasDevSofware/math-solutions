import { BlockMath } from "react-katex";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "Cálculo Avanzado",
      desc: "Resolución de matrices, fracciones y funciones complejas mediante MathJS.",
      icon: "f(x)",
    },
    {
      title: "Renderizado Profesional",
      desc: "Visualización de ecuaciones en alta calidad con KaTeX.",
      icon: "\\sum",
    },
    {
      title: "Rendimiento Optimizado",
      desc: "Uso de Web Workers para cálculos pesados sin bloquear la interfaz.",
      icon: "0101",
    },
  ];

  return (
    <section className="flex flex-col gap-10 p-6 md:p-12 bg-gray-300 rounded-[2.5rem] w-full max-w-5xl mx-auto my-10 border border-white/20">
      {/* Encabezado Principal */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tighter uppercase">
          Solutions <span className="text-main">Labs</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Una suite de herramientas matemáticas diseñada para la precisión, la
          claridad y el aprendizaje interactivo.
        </p>
      </div>

      {/* Grid de Características */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/60 p-6 rounded-3xl hover:bg-white transition-all group shadow-sm"
          >
            <div className="text-2xl font-mono text-main mb-3 bg-white w-fit px-3 py-1 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Sección "Cómo funciona" con KaTeX */}
      <div className="bg-main text-white p-8 rounded-[2rem] shadow-lg flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Potencia Matemática
          </h2>
          <p className="opacity-90 leading-relaxed">
            Nuestra aplicación no solo calcula resultados, sino que interpreta
            la sintaxis matemática para presentarte el proceso formal. Desde la
            aritmética básica hasta el álgebra lineal avanzada.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 overflow-x-auto w-full md:w-auto md:text-xl text-xs">
          <BlockMath math="\int_{a}^{b} f(x)dx = F(b) - F(a)" />
        </div>
      </div>

      <Link
        to="/funcs"
        className="bg-main px-2 py-4 text-gray-100 md:text-2xl text-xl font-bold rounded-xl text-center hover:scale-90 transition-transform"
      >
        Go to functions.
      </Link>
    </section>
  );
}
