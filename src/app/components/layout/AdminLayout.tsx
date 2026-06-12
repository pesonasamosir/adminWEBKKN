import { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router";
import {
  LayoutDashboard, Newspaper, MapPin, Store, Calendar, Leaf,
  Image, Users, MessageSquare, Settings, ChevronLeft, ChevronRight,
  LogOut, User, Menu, Bell, ChevronDown,
  Home, Building2, UserCog,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const NAVY = "#1B3A6B";
const SIDEBAR_BG = "#F8F9FB";

const MENU_GROUPS = [
  {
    label: "Utama",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Konten Publik",
    items: [
      { label: "Manajemen Desa", href: "/admin/desa", icon: Home },
      { label: "Berita", href: "/admin/berita", icon: Newspaper },
      { label: "Wisata", href: "/admin/wisata", icon: MapPin },
      { label: "UMKM", href: "/admin/umkm", icon: Store },
      { label: "Event & Kalender", href: "/admin/events", icon: Calendar },
      { label: "Informasi Pupuk", href: "/admin/pupuk", icon: Leaf },
    ],
  },
  {
    label: "Profil & Media",
    items: [
      { label: "Profil Kecamatan", href: "/admin/profil", icon: Building2 },
      { label: "Struktur Organisasi", href: "/admin/struktur", icon: Users },
      { label: "Galeri Foto", href: "/admin/galeri", icon: Image },
      { label: "Kategori", href: "/admin/kategori", icon: Settings },
    ],
  },
  {
    label: "Administrasi",
    items: [
      { label: "Pesan Kontak", href: "/admin/kontak", icon: MessageSquare },
      { label: "Pengaturan", href: "/admin/settings", icon: Settings },
      { label: "Manajemen Admin", href: "/admin/users", icon: UserCog },
    ],
  },
];

const ALL_MENU_ITEMS = MENU_GROUPS.flatMap((g) => g.items);

export function AdminLayout() {
  const { isAuthenticated, currentUser, logout, pesan } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActive = (href: string) => location.pathname.startsWith(href);
  const unreadCount = pesan.filter((p: any) => !p.dibaca).length;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-gray-200"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.nama}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: NAVY }}
                >
                  {currentUser?.nama?.charAt(0) ?? "A"}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: NAVY }}>
                {currentUser?.nama ?? "Admin"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentUser?.role === "super_admin" ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: NAVY }}
              >
                {currentUser?.nama?.charAt(0) ?? "A"}
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-6 h-6 rounded-md items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors ml-2 shrink-0"
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {collapsed ? (
          <ul className="space-y-0.5">
            {ALL_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={item.label}
                    className={`flex items-center justify-center w-full p-2.5 rounded-lg transition-all ${
                      active ? "text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                    style={active ? { backgroundColor: NAVY } : {}}
                  >
                    <Icon size={17} />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="space-y-5">
            {MENU_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {group.label}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-sm ${
                            active
                              ? "font-semibold"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                          style={
                            active
                              ? {
                                  backgroundColor: "#EFF6FF",
                                  color: NAVY,
                                }
                              : {}
                          }
                        >
                          <Icon
                            size={16}
                            className="shrink-0"
                            style={active ? { color: NAVY } : {}}
                          />
                          <span className="truncate">{item.label}</span>
                          {item.href === "/admin/kontak" && unreadCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shrink-0 min-w-[18px] text-center" style={{ fontSize: "10px" }}>
                              {unreadCount}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Bottom: Logout */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={logout}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-sm ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={15} className="shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#F3F4F6" }}>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col transition-all duration-300 ${
          collapsed ? "w-[60px]" : "w-60"
        } shrink-0 border-r border-gray-200`}
        style={{ backgroundColor: SIDEBAR_BG }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="relative z-10 flex flex-col w-64 h-full border-r border-gray-200"
            style={{ backgroundColor: SIDEBAR_BG }}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} />
            </button>
            <Link
              to="/"
              target="_blank"
              className="text-xs hover:underline transition-colors hidden sm:flex items-center gap-1"
              style={{ color: NAVY }}
            >
              ← Lihat Website Publik
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification */}
            <button className="relative p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" style={{ fontSize: "10px" }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 shrink-0">
                  <img
                    src={currentUser?.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {currentUser?.nama}
                </span>
                <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 w-48 py-1.5 z-50">
                  <div className="px-3 py-2 border-b border-gray-50 mb-1">
                    <p className="text-sm font-semibold text-gray-800">{currentUser?.nama}</p>
                    <p className="text-xs text-gray-400">{currentUser?.email}</p>
                  </div>
                  <Link
                    to="/admin/profil-saya"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User size={14} /> Profil Saya
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={14} /> Pengaturan
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} /> Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
