import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-main w-full px-5 py-2 fixed top-0 left-0 right-0 flex justify-between items-center z-50">
      <div>
        <h2 className="text-gray-100 md:text-4xl text-sm font-extrabold">
          Solutions Labs
        </h2>
      </div>

      <ul className="flex gap-3 justify-center items-center">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "md:text-2xl text-sm text-gray-100 underline"
              : "md:text-2xl text-sm text-gray-100"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            isActive
              ? "md:text-2xl text-sm text-gray-100 underline"
              : "md:text-2xl text-sm text-gray-100"
          }
        >
          About
        </NavLink>
        <NavLink
          to={"/funcs"}
          className={({ isActive }) =>
            isActive
              ? "md:text-2xl text-sm text-gray-100 underline"
              : "md:text-2xl text-sm text-gray-100"
          }
        >
          Functions
        </NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
