import convertUnits from "../services/convertUnits";

// @ts-expect-error - global is not defined in web workers
self.global = self;

const CUSTOM_UNITS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  dm: 0.1,
  m: 1,
  dam: 10,
  hm: 100,
  km: 1000,
  ft: 0.3048,
  mg: 0.001,
  g: 1,
  kg: 1000,
};

self.onmessage = (e: MessageEvent) => {
  const { inputFromVal, inputFromUnit, inputToUnit } = e.data;

  if (inputFromVal === null || !inputFromUnit || !inputToUnit) return;

  let res: number | null;

  if (inputFromUnit in CUSTOM_UNITS && inputToUnit in CUSTOM_UNITS) {
    const valInBase = inputFromVal * CUSTOM_UNITS[inputFromUnit];
    res = valInBase / CUSTOM_UNITS[inputToUnit];
  } else {
    try {
      res = convertUnits(inputFromVal, inputFromUnit, inputToUnit);
    } catch (error) {
      console.error("Error en conversión:", error);
      res = NaN;
    }
  }

  self.postMessage({ n: res, unit: inputToUnit });
};
