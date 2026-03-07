import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Error404 from "../components/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      {
        path: "/funcs",
        lazy: {
          loader: async () => (await import("../components/Loader")).default,
          Component: async () =>
            (await import("../components/layouts/FunctionsLayout")).default,
        },
        children: [
          {
            path: ":funcName",
            lazy: {
              loader: async () =>
                (await import("../components/Loader")).default,
              Component: async () =>
                (await import("../components/Function")).default,
            },
          },
        ],
      },
    ],
    errorElement: <Error404 />,
  },
]);

export default router;
