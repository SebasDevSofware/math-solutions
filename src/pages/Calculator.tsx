import { useState } from "react";
import { evaluate, format, parse } from "mathjs";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function SmartCalculator() {
  const [expression, setExpression] = useState<string>("");

  let result = "0";
  let latex = "\\text{Escribe una expresión...}";
  let error = { isError: false, errorText: "" };

  if (expression.trim() !== "") {
    try {
      const evaluated = evaluate(expression);
      result = format(evaluated, { precision: 10 });
      latex = parse(expression).toTex();
    } catch (err) {
      if (err instanceof Error) {
        error = { isError: true, errorText: err.message };
      }
      latex = "\\text{Error de sintaxis...}";
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 bg-gray-300 rounded-2xl max-w-2xl mx-auto w-[95%] sm:w-full my-8 shadow-xl">
      <h2 className="text-gray-700 font-bold text-lg md:text-xl uppercase tracking-widest text-center md:text-left">
        Scientific Calculator
      </h2>

      {/* Pantalla de Visualización */}
      <div className="bg-white p-4 md:p-6 rounded-2xl min-h-[120px] flex flex-col items-center justify-center shadow-inner overflow-hidden relative">
        <div
          className={`w-full overflow-x-auto overflow-y-hidden py-2 text-center transition-colors ${
            error.isError ? "text-red-400" : "text-blue-600"
          } text-xl md:text-2xl`}
        >
          <BlockMath math={latex} />
        </div>

        {/* Resultado movido aquí para mejor jerarquía visual */}
        {!error.isError && expression.trim() !== "" && (
          <div className="mt-2 text-gray-500 font-mono text-sm md:text-base border-t border-gray-100 pt-2 w-full text-center">
            Resultado: <span className="font-bold text-gray-800">{result}</span>
          </div>
        )}
      </div>

      {/* Input de Texto */}
      <div className="relative">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="ej: sqrt(75 / 3) + log(100, 10)"
          className={`w-full p-4 rounded-xl bg-gray-100 border-2 outline-none transition-all text-base md:text-lg font-mono
            ${error.isError ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"}`}
        />
      </div>

      {/* Grid de Funciones Responsivo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {[
          { label: "sin(x)", val: "sin(" },
          { label: "cos(x)", val: "cos(" },
          { label: "tan(x)", val: "tan(" },
          { label: "log(x, b)", val: "log(" },
          { label: "sqrt(x)", val: "sqrt(" },
          { label: "pow(x, y)", val: "pow(" },
          { label: "PI", val: "PI" },
          { label: "Limpiar", val: "clear" },
        ].map((func) => (
          <button
            key={func.label}
            onClick={() => {
              if (func.val === "clear") setExpression("");
              else setExpression((prev) => prev + func.val);
            }}
            className={`text-xs md:text-sm py-3 rounded-lg font-bold transition-all border shadow-sm
              ${
                func.val === "clear"
                  ? "bg-red-100 text-red-600 border-red-200 hover:bg-red-600 hover:text-white"
                  : "bg-white/70 text-gray-700 border-gray-400/20 hover:bg-blue-600 hover:text-white"
              }`}
          >
            {func.label}
          </button>
        ))}
      </div>
    </div>
  );
}
