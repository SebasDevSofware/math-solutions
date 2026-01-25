import { add, format, matrix, multiply, parse, type MathType } from "mathjs";
import type { MatrixData } from "../types";

export default function calculate(
  m1: MatrixData,
  m2: MatrixData,
  operation: "add" | "mul",
) {
  try {
    const mat1 = matrix(m1);
    const mat2 = matrix(m2);
    let res: MathType;

    if (operation === "add") {
      res = add(mat1, mat2);
    } else {
      res = multiply(mat1, mat2);
    }

    const m1Tex = parse(format(mat1)).toTex();
    const m2Tex = parse(format(mat2)).toTex();
    const resTex = parse(format(res)).toTex();
    const opSym = operation === "add" ? "+" : "\\times";

    return `${m1Tex} ${opSym} ${m2Tex} = ${resTex}`;
  } catch (error) {
    alert(error);
  }
}
