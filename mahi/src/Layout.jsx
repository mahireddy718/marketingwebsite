import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      {/* NAVBAR + CATEGORY BAR */}
      <Navbar />

      {/* PAGE CONTENT WILL LOAD HERE */}
      <Outlet />
    </div>
  );
}
