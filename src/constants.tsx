import {
  faCalculator,
  faTimes,
  faChartArea,
  faBorderAll,
  faDivide,
  faExchangeAlt,
  faCut,
  faWeightHanging,
  faClock,
  faRulerHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FunctionsBox } from "./types";

export const FUNCTIONS_BOXES: FunctionsBox[] = [
  {
    functionName: "Calculator",
    boxIcon: <FontAwesomeIcon icon={faCalculator} />,
    path: "/calculator",
    funcId: 1,
  },
  {
    functionName: "Multiplication Tables",
    boxIcon: <FontAwesomeIcon icon={faTimes} />,
    path: "/multiplicationTables",
    funcId: 2,
  },
  {
    functionName: "Graphics",
    boxIcon: <FontAwesomeIcon icon={faChartArea} />,
    path: "/graphics",
    funcId: 6,
  },

  {
    functionName: "Arrays",
    boxIcon: <FontAwesomeIcon icon={faBorderAll} />,
    path: "/arrays",
    funcId: 7,
  },

  {
    functionName: "Fraction Converter",
    boxIcon: <FontAwesomeIcon icon={faExchangeAlt} />,
    path: "/fractionConverter",
    funcId: 9,
  },

  {
    functionName: "Length",
    boxIcon: <FontAwesomeIcon icon={faRulerHorizontal} />,
    path: "/length",
    funcId: 8,
  },

  {
    functionName: "Simplify Fraction",
    boxIcon: <FontAwesomeIcon icon={faCut} />,
    path: "/simplifyFraction",
    funcId: 10,
  },

  {
    functionName: "Time",
    boxIcon: <FontAwesomeIcon icon={faClock} />,
    path: "/time",
    funcId: 12,
  },

  {
    functionName: "Fraction Operations",
    boxIcon: <FontAwesomeIcon icon={faDivide} />,
    path: "/fractionOperations",
    funcId: 13,
  },

  {
    functionName: "Mass",
    boxIcon: <FontAwesomeIcon icon={faWeightHanging} />,
    path: "/mass",
    funcId: 11,
  },
];

/* {
    functionName: "Derivatives",
    boxIcon: <FontAwesomeIcon icon={faPencilRuler} />,
    path: "/derivatives",
    funcId: 4,
  },
  {
    functionName: "Integral",
    boxIcon: <FontAwesomeIcon icon={faInfinity} />,
    path: "/integral",
    funcId: 5,
  */
