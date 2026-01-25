import { useEffect, useRef, useState, type FormEvent } from "react";
import NumberInput from "../components/NumberInput";
import { BlockMath } from "react-katex";

export default function Length() {
  const [inputFromVal, setInputFromVal] = useState<number | null>(null);
  const [inputFromUnit, setInputFromUnit] = useState<string | null>(null);
  const [inputToUnit, setInputToUnit] = useState<string | null>(null);
  const [result, setResult] = useState<null | {
    n: number | null;
    unit: string;
  }>(null);
  const workerRef = useRef<Worker | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/convertUnits.worker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (e) => {
      setResult(e.data);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        inputFromVal,
        inputFromUnit,
        inputToUnit,
      });
    }
  }, [inputFromVal, inputFromUnit, inputToUnit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const fromVal = formData.get("inputFromVal");

    const fromUnit = formData.get("inputFromUnit");
    const toUnit = formData.get("inputToUnit");

    if (!fromVal || !fromUnit || !toUnit) {
      setErr("Fill all Inputs.");
      return;
    }

    if (fromVal.toString().includes("e")) {
      setErr("The input is invalid");
      return;
    }

    setInputFromVal(Number(fromVal));
    setInputFromUnit(fromUnit.toString());
    setInputToUnit(toUnit.toString());
    setErr(null);
  };

  const renderProcedure = () => {
    if (!result || inputFromVal === null) return null;
    if (result.n === null || !Number.isFinite(result.n)) return null;

    const factor = result.n / inputFromVal;
    return `${inputFromVal}\\text{ ${inputFromUnit}} \\times \\left( \\frac{${factor.toFixed(4)}\\text{ ${inputToUnit}}}{1\\text{ ${inputFromUnit}}} \\right) = ${result.n.toFixed(4)}\\text{ ${inputToUnit}}`;
  };

  return (
    <section className="w-full flex flex-col justify-center items-center gap-4 mb-2">
      <form
        className="w-full flex md:flex-row flex-col justify-center items-center gap-3"
        onSubmit={handleSubmit}
      >
        <NumberInput name="inputFromVal" isError={err} />
        <select
          className="border-2 border-gray-400 px-2 py-2 rounded-md focus:outline-none focus:border-main md:text-xl text-sm"
          name="inputFromUnit"
        >
          <option value="m">m</option>
          <option value="km">km</option>
          <option value="hm">hm</option>
          <option value="dam">dam</option>
          <option value="dm">dm</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="ft">ft</option>
        </select>
        <select
          className="border-2 border-gray-400 px-2 py-2 rounded-md focus:outline-none focus:border-main md:text-xl text-sm"
          name="inputToUnit"
        >
          <option value="km">km</option>
          <option value="hm">hm</option>
          <option value="dam">dam</option>
          <option value="m">m</option>
          <option value="dm">dm</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="ft">ft</option>
        </select>
        <button
          type="submit"
          className=" bg-main px-2 py-2 rounded-md md:text-xl text-sm text-white hover:scale-95 transition-transform hover:cursor-pointer"
        >
          Transform
        </button>
      </form>
      <div className="w-5/6 md:text-3xl text-xl flex justify-center items-center gap-2">
        <span className="text-main font-extrabold">Result: </span>
        <output>
          {result
            ? Number.isFinite(result.n) && result.n !== null
              ? +result.n.toFixed(4)
              : "?"
            : "?"}
        </output>
        <span>{result?.unit ?? ""}</span>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl w-full border-l-4 border-main">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold w-full">
            Mathematical Process:
          </p>
          <div className="md:text-xl text-xs overflow-x-auto py-2 text-main">
            <BlockMath math={renderProcedure() || ""} />
          </div>
        </div>
      )}
    </section>
  );
}
