import { useEffect, useRef, useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { MatrixData } from "../types";

export default function MatrixCalculator() {
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);
  const [operation, setOperation] = useState<"add" | "mul">("add");
  const [m1, setM1] = useState<MatrixData>([
    [0, 0],
    [0, 0],
  ]);
  const [m2, setM2] = useState<MatrixData>([
    [0, 0],
    [0, 0],
  ]);
  const [resultTex, setResultTex] = useState<string>("");

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/MatrixCalculator.worker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (e) => {
      setResultTex(e.data);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ operation, m1, m2 });
    }
  }, [operation, m1, m2]);

  const handleDimensionChange = (r: number, c: number) => {
    const newRows = Math.max(1, Math.min(5, r));
    const newCols = Math.max(1, Math.min(5, c));
    setRows(newRows);
    setCols(newCols);

    const newMatrix = Array(newRows)
      .fill(0)
      .map(() => Array(newCols).fill(0));
    setM1(newMatrix);
    setM2(newMatrix);
    setResultTex("");
  };

  const updateValue = (
    mNum: 1 | 2,
    rIdx: number,
    cIdx: number,
    val: string,
  ) => {
    const numVal = parseFloat(val) || 0;
    if (mNum === 1) {
      const newM1 = m1.map((row, r) =>
        r === rIdx ? row.map((col, c) => (c === cIdx ? numVal : col)) : row,
      );
      setM1(newM1);
    } else {
      const newM2 = m2.map((row, r) =>
        r === rIdx ? row.map((col, c) => (c === cIdx ? numVal : col)) : row,
      );
      setM2(newM2);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-gray-300 rounded-3xl w-full mx-auto">
      <h2 className="text-main sm:text-xl text-xs font-bold text-center">
        Matrix Calculator
      </h2>

      <div className="flex flex-wrap justify-center gap-4 bg-white p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold">Rows:</label>
          <input
            type="number"
            value={rows}
            onChange={(e) =>
              handleDimensionChange(parseInt(e.target.value), cols)
            }
            className="w-16 p-1 rounded border-2 border-gray-300 focus:border-main outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold">Columns:</label>
          <input
            type="number"
            value={cols}
            onChange={(e) =>
              handleDimensionChange(rows, parseInt(e.target.value))
            }
            className="w-16 p-1 rounded border-2 border-gray-300 focus:border-main outline-none"
          />
        </div>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value as "add" | "mul")}
          className="p-1 rounded border-2 border-gray-300 bg-white"
        >
          <option value="add">Add (+)</option>
          <option value="mul">Multiplication (×)</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
        {/* Matrix 1 */}
        <div className="flex flex-col items-center">
          <span className="mb-2 font-bold text-main">Matrix A</span>
          <div
            className={`grid gap-2`}
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {m1.map((row, rIdx) =>
              row.map((val, cIdx) => (
                <input
                  key={`m1-${rIdx}-${cIdx}`}
                  type="number"
                  value={val}
                  onChange={(e) => updateValue(1, rIdx, cIdx, e.target.value)}
                  className="w-14 md:w-20 p-2 text-center rounded-xl focus:ring-2 focus:ring-main outline-none bg-white border-gray-300 border"
                />
              )),
            )}
          </div>
        </div>

        <div className="text-3xl font-bold text-gray-500">
          {operation === "add" ? "+" : "×"}
        </div>

        {/* Matrix 2 */}
        <div className="flex flex-col items-center">
          <span className="mb-2 font-bold text-main">Matrix B</span>
          <div
            className={`grid gap-2`}
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {m2.map((row, rIdx) =>
              row.map((val, cIdx) => (
                <input
                  key={`m2-${rIdx}-${cIdx}`}
                  type="number"
                  value={val}
                  onChange={(e) => updateValue(2, rIdx, cIdx, e.target.value)}
                  className="w-14 md:w-20 p-2 text-center rounded-lg border border-gray-300 focus:ring-2 focus:ring-main outline-none bg-white"
                />
              )),
            )}
          </div>
        </div>
      </div>

      {resultTex && (
        <div className="bg-white p-6 rounded-2xl shadow-inner w-full overflow-x-auto border-t-4 border-main">
          <p className="text-xs text-gray-400 uppercase font-bold mb-4">
            Calculation Result:
          </p>
          <div className="text-[#111]">
            <BlockMath math={resultTex} />
          </div>
        </div>
      )}
    </div>
  );
}
