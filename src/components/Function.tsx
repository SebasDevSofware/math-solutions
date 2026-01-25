import { useParams } from "react-router-dom";
import MultiplicationTables from "../pages/MultiplicationTables";
import Length from "../pages/Length";
import Mass from "../pages/Mass";
import Time from "../pages/Time";
import FractionOperations from "../pages/FractionOperations";
import ConvertFraction from "../pages/ConvertFraction";
import SimplifyFraction from "../pages/SimplifyFraction";
import Graphics from "../pages/Graphics";
import MatrixCalculator from "../pages/Matrix";

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

    default:
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Function not found: {funcName}</h2>
          <p>The requested function does not exist.</p>
        </div>
      );
  }
}
