import { Outlet } from "react-router-dom";
import FunctionBox from "../FunctionBox";
import { FUNCTIONS_BOXES } from "../../constants";
import { Suspense } from "react";
import PageLoader from "../Loader";

export default function FunctionsLayout() {
  return (
    <article className="w-11/12 flex flex-col gap-5 justify-center items-center">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <div className="w-full p-1 flex flex-col justify-center items-start">
        <h3 className="text-black text-md text-start text-gray-500">
          Functions :
        </h3>
        <div className="border border-gray-300 w-full"></div>
      </div>
      <section className="grid grid-cols-2 w-full gap-2 col-span-2 ">
        {FUNCTIONS_BOXES.map((func) => {
          return (
            <FunctionBox
              functionName={func.functionName}
              boxIcon={func.boxIcon}
              key={func.funcId}
              path={func.path}
            />
          );
        })}
      </section>
    </article>
  );
}
