import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function Layout() {
  return (
    <div className="w-full min-h-screen bg-gray-200">
      <header>
        <NavBar />
      </header>

      <div className="h-14 md:h-16" />
      <main className="flex justify-center items-center py-4">
        <Outlet />
      </main>
    </div>
  );
}
