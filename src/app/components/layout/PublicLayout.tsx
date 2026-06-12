import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PublicLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Offset for fixed navbar — 64px (h-16) */}
      <div style={{ height: "64px" }} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
