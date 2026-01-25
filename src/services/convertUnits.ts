import type { Unit } from "convert-units";
import convert from "convert-units";

export default function convertUnits(
  inputFromVal: number,
  inputFromUnit: Unit,
  inputToUnit: Unit,
) {
  if (typeof inputFromVal !== "number" || !inputFromUnit || !inputToUnit) {
    return null;
  }
  return convert(inputFromVal).from(inputFromUnit).to(inputToUnit);
}
