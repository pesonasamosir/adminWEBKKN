import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "/profil-kecamatan",
    children: [
      { label: "Profil Kecamatan", href: "/profil-kecamatan" },
      { label: "Struktur Organisasi", href: "/profil/struktur" },
      { label: "Daftar Desa", href: "/desa" },
    ],
  },
  { label: "Wisata", href: "/wisata" },
  { label: "UMKM", href: "/umkm" },
  { label: "Budaya", href: "/budaya" },
  { label: "Berita", href: "/berita" },
  {
    label: "Layanan",
    href: "#",
    children: [
      { label: "Kalender Event", href: "/kalender" },
      { label: "Informasi Pupuk", href: "/pupuk" },
      { label: "Galeri Foto", href: "/galeri" },
      { label: "Kontak", href: "/kontak" },
    ],
  },
];

// Brand primary color
const NAVY = "#1B3A6B";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href === "#") return false;
    return location.pathname.startsWith(href);
  };

  const isGroupActive = (item: typeof NAV_ITEMS[0]) => {
    if (isActive(item.href)) return true;
    if (item.children) return item.children.some(c => location.pathname.startsWith(c.href));
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200 ${
        scrolled ? "shadow-sm border-b border-gray-200" : "border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: NAVY, fontSize: "11px", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              KH
            </div>
            <span
              className="hidden sm:block text-sm"
              style={{ color: NAVY, fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              Kecamatan Harian
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-0">
            {NAV_ITEMS.map((item) => {
              const active = isGroupActive(item);
              return (
                <li key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <button
                        className={`flex items-center gap-1 px-3.5 py-2 text-sm transition-colors ${
                          active
                            ? "font-semibold"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        style={active ? { color: NAVY, fontWeight: 600 } : {}}
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className="transition-transform duration-200 group-hover:rotate-180 opacity-60"
                        />
                        {/* Active underline */}
                        {active && (
                          <span
                            className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full"
                            style={{ backgroundColor: NAVY }}
                          />
                        )}
                      </button>

                      {/* Dropdown */}
                      <div className="absolute top-full left-0 pt-1 hidden group-hover:block z-50">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 min-w-48 py-1.5 overflow-hidden">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={`flex items-center px-4 py-2 text-sm transition-colors ${
                                location.pathname === child.href
                                  ? "font-semibold bg-blue-50"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                              style={
                                location.pathname === child.href
                                  ? { color: NAVY }
                                  : {}
                              }
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`relative flex items-center px-3.5 py-2 text-sm transition-colors ${
                        active ? "" : "text-gray-600 hover:text-gray-900"
                      }`}
                      style={active ? { color: NAVY, fontWeight: 600 } : {}}
                    >
                      {item.label}
                      {active && (
                        <span
                          className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full"
                          style={{ backgroundColor: NAVY }}
                        />
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right: Login + hamburger */}
          <div className="flex items-center gap-2">
            {/* Search icon (desktop) */}
            <button className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <Search size={16} />
            </button>

            {/* Login button */}
            <Link
              to="/login"
              className="hidden md:inline-flex items-center text-sm font-semibold text-white px-4 py-1.5 rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              Login
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-md max-h-[80vh] overflow-y-auto">
          <ul className="px-3 py-3 space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isGroupActive(item);
              return (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          )
                        }
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          active
                            ? "font-semibold bg-blue-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        style={active ? { color: NAVY } : {}}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform opacity-60 ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div className="pl-3 mt-0.5 space-y-0.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === child.href
                                  ? "font-medium bg-blue-50"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                              style={
                                location.pathname === child.href
                                  ? { color: NAVY }
                                  : {}
                              }
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        active
                          ? "font-semibold bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={active ? { color: NAVY } : {}}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}

            {/* Mobile Login */}
            <li className="pt-2 border-t border-gray-100 mt-1">
              <Link
                to="/login"
                className="flex items-center justify-center w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
