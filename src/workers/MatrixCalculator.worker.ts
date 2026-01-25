import calculate from "../services/MatrixCalculator";

self.onmessage = (e: MessageEvent) => {
  const { operation, m1, m2 } = e.data;

  const result = calculate(m1, m2, operation);

  self.postMessage(result);
};
