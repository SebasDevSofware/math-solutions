import { useParams } from "react-router-dom";
import { lazy } from "react";

const MultiplicationTables = lazy(
  () => import("../pages/MultiplicationTables"),
);
const Length = lazy(() => import("../pages/Length"));
const Mass = lazy(() => import("../pages/Mass"));
const Time = lazy(() => import("../pages/Time"));
const FractionOperations = lazy(() => import("../pages/FractionOperations"));
const ConvertFraction = lazy(() => import("../pages/ConvertFraction"));
const SimplifyFraction = lazy(() => import("../pages/SimplifyFraction"));
const Graphics = lazy(() => import("../pages/Graphics"));
const MatrixCalculator = lazy(() => import("../pages/Matrix"));
const Calculator = lazy(() => import("../pages/Calculator"));

export default function Function() {
  const { funcName } = useParams();

  switch (funcName) {
    case "multiplicationTables":
      return <MultiplicationTables />;
    case "length":
      return <Length />;
    case "mass":
      return <Mass />;
    case "time":
      return <Time />;
    case "fractionOperations":
      return <FractionOperations />;
    case "fractionConverter":
      return <ConvertFraction />;
    case "simplifyFraction":
      return <SimplifyFraction />;
    case "graphics":
      return <Graphics />;
    case "arrays":
      return <MatrixCalculator />;
    case "calculator":
      return <Calculator />;

    default:
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Function not found: {funcName}</h2>
          <p>The requested function does not exist.</p>
        </div>
      );
  }
}
