import Plot from "react-plotly.js";
import { BlockMath } from "react-katex";
import { useState } from "react";

export default function Graphics() {
  const [xValues, setXValues] = useState<number[]>(
    Array.from({ length: 21 }, (_, i) => i - 10),
  );
  const [yValues, setYValues] = useState<number[]>(xValues.map((x) => x ** 2));

  const [newX, setNewX] = useState<string>("");
  const [newY, setNewY] = useState<string>("");

  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (newX !== "" && newY !== "") {
      setXValues([...xValues, Number(newX)]);
      setYValues([...yValues, Number(newY)]);
      setNewX("");
      setNewY("");
    }
  };

  const handleRemoveLast = () => {
    setXValues(xValues.slice(0, -1));
    setYValues(yValues.slice(0, -1));
  };

  const displayY = yValues.slice(-6).join(", ");
  const katexString = `f(x) = y \\Rightarrow \\{${displayY}${yValues.length > 6 ? ", ..." : ""}\\}`;

  return (
    <div className="flex md:flex-row flex-col gap-6 p-6 bg-gray-300 rounded-2xl w-full mx-auto">
      <form
        onSubmit={handleAddPoint}
        className="md:w-2/12 w-full flex flex-col gap-4 p-4 rounded-xl text-black"
      >
        <div className="flex flex-col">
          <label className=" text-sm mb-1 ml-1">Valor X</label>
          <input
            type="number"
            value={newX}
            onChange={(e) => setNewX(e.target.value)}
            className="p-2 rounded-lg bg-white  outline-none focus:ring-2"
            placeholder="Ej: 5"
            max={100000}
          />
        </div>
        <div className="flex flex-col">
          <label className=" text-sm mb-1 ml-1">Valor Y</label>
          <input
            type="number"
            value={newY}
            onChange={(e) => setNewY(e.target.value)}
            className="p-2 rounded-lg bg-white  outline-none focus:ring-2"
            placeholder="Ej: 20"
            max={100000}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            type="submit"
            className="flex-1 hover:bg-[#9132e6] bg-main text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleRemoveLast}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Remove Last
          </button>
        </div>
      </form>

      <div className="bg-gray-200 rounded-xl overflow-hidden p-4 shadow-xl md:w-11/12 w-full">
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              type: "scatter",
              mode: "lines+markers",
              line: { shape: "spline", color: "#ad46ff" },
              marker: { color: "#ad46ff", size: 8 },
              name: "Datos Dinámicos",
            },
          ]}
          layout={{
            autosize: true,
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#111" },
            xaxis: {
              title: { text: "X" },
              zeroline: true,
              zerolinecolor: "#000",
              gridcolor: "#000",
            },
            yaxis: {
              title: { text: "Y" },
              zeroline: true,
              zerolinecolor: "#000",
              gridcolor: "#000",
            },
            margin: { t: 40, b: 40, l: 50, r: 20 },
          }}
          style={{ width: "100%", height: "400px" }}
          useResizeHandler={true}
        />

        <div className="text-main sm:text-2xl text-xs">
          <BlockMath math={katexString} />
        </div>
      </div>
    </div>
  );
}
