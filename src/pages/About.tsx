export default function About() {
  const stack = [
    "React",
    "TypeScript",
    "MathJS",
    "KaTeX",
    "Tailwind CSS",
    "FractionJS",
    "Plotly JS",
    "Convert-UnitsJS",
    "React Icons",
  ];

  const autors = [
    "Camila Acevedo",
    "Sofia Herrera",
    "Ginger Mejías",
    "Stefany Ramírez",
    "Sharon Rivero",
    "Yoseannys Valera",
  ];

  return (
    <section className="flex flex-col gap-12 p-8 md:p-16 bg-gray-300 rounded-[2.5rem] w-full max-w-4xl mx-auto my-10 border border-white/40">
      <div className="space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
          Desarrollado por
        </h3>
        <div className="flex flex-wrap gap-4">
          {autors.map((author) => {
            return (
              <div className="flex items-center gap-4 bg-white/50 px-6 py-3 rounded-2xl border border-white/50 shadow-sm">
                <div className="w-10 h-10 bg-main rounded-full flex items-center justify-center text-white font-bold">
                  {author[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-800 leading-none">
                    {author}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
          Tecnologías
        </h3>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-gray-700 shadow-sm border border-gray-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <footer className="mt-10 pt-10 border-t border-gray-400/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500 font-medium">
          © {new Date().getFullYear()}. Prototipo Educativo.
        </p>
      </footer>
    </section>
  );
}
