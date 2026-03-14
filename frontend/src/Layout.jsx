import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import SupportChat from "./components/SupportChat";

export default function Layout() {
  return (
    <div>
      {/* NAVBAR + CATEGORY BAR */}
      <Navbar />

      {/* PAGE CONTENT WILL LOAD HERE */}
      <Outlet />

      {/* FLOATING SUPPORT CHAT */}
      <SupportChat />
    </div>
  );
}
