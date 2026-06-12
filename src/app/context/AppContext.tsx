import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  WISATA_DATA, UMKM_DATA, BERITA_DATA, EVENT_DATA, PUPUK_DATA, GALERI_DATA,
  STRUKTUR_ORGANISASI, PESAN_KONTAK, BUDAYA_DATA, DESA_DATA,
  type Wisata, type UMKM, type Berita, type Event, type Pupuk, type Desa,
} from "../data/mockData";

interface AdminUser {
  id: number;
  nama: string;
  email: string;
  role: "super_admin" | "admin";
  avatar: string;
}

interface AppContextType {
  // Auth
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Data
  desa: Desa[];
  setDesa: (data: Desa[]) => void;
  wisata: Wisata[];
  setWisata: (data: Wisata[]) => void;
  umkm: UMKM[];
  setUmkm: (data: UMKM[]) => void;
  berita: Berita[];
  setBerita: (data: Berita[]) => void;
  events: Event[];
  setEvents: (data: Event[]) => void;
  pupuk: any[];
  setPupuk: (data: any[]) => void;
  galeri: any[];
  setGaleri: (data: any[]) => void;
  struktur: any[];
  setStruktur: (data: any[]) => void;
  pesan: any[];
  setPesan: (data: any[]) => void;
  budaya: any[];
  setBudaya: (data: any[]) => void;
  users: AdminUser[];
  setUsers: (data: AdminUser[]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const MOCK_USERS: AdminUser[] = [
  { id: 1, nama: "Super Admin", email: "admin@kecharian.id", role: "super_admin", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { id: 2, nama: "Operator Kecamatan", email: "operator@kecharian.id", role: "admin", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("kec_auth") === "true";
  });
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem("kec_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [desa, setDesa] = useState<Desa[]>(DESA_DATA);
  const [wisata, setWisata] = useState<Wisata[]>(WISATA_DATA);
  const [umkm, setUmkm] = useState<UMKM[]>(UMKM_DATA);
  const [berita, setBerita] = useState<Berita[]>(BERITA_DATA);
  const [events, setEvents] = useState<Event[]>(EVENT_DATA);
  const [pupuk, setPupuk] = useState<any[]>(PUPUK_DATA);
  const [galeri, setGaleri] = useState<any[]>(GALERI_DATA);
  const [struktur, setStruktur] = useState<any[]>(STRUKTUR_ORGANISASI);
  const [pesan, setPesan] = useState<any[]>(PESAN_KONTAK);
  const [budaya, setBudaya] = useState<any[]>(BUDAYA_DATA);
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);

  const login = (email: string, password: string): boolean => {
    if (password !== "admin123") return false;
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) return false;
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem("kec_auth", "true");
    localStorage.setItem("kec_user", JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("kec_auth");
    localStorage.removeItem("kec_user");
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated, currentUser, login, logout,
      desa, setDesa,
      wisata, setWisata, umkm, setUmkm, berita, setBerita,
      events, setEvents, pupuk, setPupuk, galeri, setGaleri,
      struktur, setStruktur, pesan, setPesan, budaya, setBudaya,
      users, setUsers,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
