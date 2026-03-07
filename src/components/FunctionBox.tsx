import { Link } from "react-router-dom";

export default function FunctionBox({
  boxIcon,
  functionName,
  path,
}: {
  functionName: string;
  boxIcon: React.ReactNode;
  path: `/${string}`;
}) {
  return (
    <Link
      to={"/funcs" + path}
      className="bg-main p-4 rounded-xl text-center text-gray-200 md:text-3xl text-sm hover:scale-90 transition-transform flex justify-center items-center gap-3"
    >
      {functionName}
      {boxIcon}
    </Link>
  );
}
