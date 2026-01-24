import { useEffect, useRef, useState, type FormEvent } from "react";
import NumberInput from "../components/NumberInput";

export default function SimplifyFraction() {
  const [result, setResult] = useState<{ n: number; d: number } | null>(null);
  const [num, setNum] = useState<number | null>(null);
  const [den, setDen] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/simplifyFraction.worker.ts", import.meta.url),
      { type: "module" }
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
      workerRef.current.postMessage({ num, den });
    }
  }, [num, den]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const n = formData.get("num");
    const d = formData.get("den");

    const nStr = n?.toString() ?? "";
    const dStr = d?.toString() ?? "";

    if (nStr === "" || dStr === "") {
      setErr("Invalid Input");
      return;
    }

    if (nStr.includes("e") || dStr.includes("e")) {
      setErr("Invalid Input");
      return;
    }

    const nNum = Number(nStr);
    const dNum = Number(dStr);

    if (
      !Number.isFinite(nNum) ||
      !Number.isFinite(dNum) ||
      isNaN(nNum) ||
      isNaN(dNum)
    ) {
      setErr("Invalid Input");
      return;
    }

    setNum(nNum);
    setDen(dNum);
    setErr(null);
  };

  return (
    <section className="w-full flex flex-col justify-center items-center gap-3">
      <form
        className="w-full flex justify-center items-center gap-3"
        onSubmit={handleSubmit}
      >
        <div className="md:w-2/8 w-full flex justify-center items-center flex-col gap-2">
          <NumberInput name="num" />
          <div className="w-full border border-main"></div>
          <NumberInput name="den" />
        </div>
        <button
          type="submit"
          className=" bg-main px-2 py-2 rounded-md md:text-xl text-sm text-white hover:scale-95 transition-transform hover:cursor-pointer"
        >
          Convert
        </button>
      </form>
      <div className="w-fill md:text-3xl text-xl flex flex-col justify-center items-center gap-2">
        <span className="text-main font-extrabold">Result: </span>

        {result ? (
          !isNaN(result.d) ? (
            <>
              <output>{result ? result.n : "?"}</output>
              <div className="w-full border border-main"></div>
              <output>{result ? result.d : "?"}</output>
            </>
          ) : (
            <output>{result?.n}</output>
          )
        ) : (
          "?"
        )}
        {err ? (
          <span className="text-red-500 md:text-2xl text-xl">{err}</span>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
