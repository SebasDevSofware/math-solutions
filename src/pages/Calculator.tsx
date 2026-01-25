import { useState } from "react";
import { evaluate, format, parse } from "mathjs";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function SmartCalculator() {
  const [expression, setExpression] = useState<string>("");

  let result = "0";
  let latex = "\\text{Write an Expression...}";
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
      latex = "\\text{Syntax Error...}";
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-300 rounded-xl max-w-2xl mx-auto w-full">
      <h2 className="text-main font-bold text-xl uppercase tracking-widest">
        Cientific Calculator
      </h2>
      <div className="bg-white p-6 rounded-2xl min-h-[100px] flex items-center justify-center shadow-inner overflow-hidden">
        <div
          className={`${error.isError ? "text-red-400" : "text-main"} text-2xl transition-colors`}
        >
          <BlockMath math={latex} />
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="ej: sqrt(75 / 3) + log(100, 10)"
          className={`w-full p-4 rounded-xl bg-gray-100 border-2 outline-none transition-all text-lg font-mono
            ${error.isError ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:border-main focus:ring-4 focus:ring-main/20"}`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-600">
          = {result}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          "sin(x)",
          "cos(x)",
          "tan(x)",
          "log(x, base)",
          "sqrt(x)",
          "pow(x, y)",
        ].map((func) => (
          <button
            key={func}
            onClick={() => setExpression((prev) => prev + func)}
            className="text-xs bg-white/50 hover:bg-main hover:text-white py-2 rounded-lg font-bold transition-colors border border-gray-400/20"
          >
            {func}
          </button>
        ))}
      </div>
    </div>
  );
}
