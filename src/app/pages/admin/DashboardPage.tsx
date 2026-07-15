import { Link } from "react-router";
import { Newspaper, MapPin, Store, Calendar, Leaf, Image, MessageSquare, Plus, Home, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

const NAVY = "#1B3A6B";

export function DashboardPage() {
  const { desa, wisata, umkm, berita, events, pupuk, galeri, pesan, currentUser } = useApp();

  

  const latestBerita = berita.filter((b) => b.status === "published").slice(0, 3);
  const upcomingEvents = events.filter((e) => e.aktif).slice(0, 3);
  const unreadPesan = pesan.filter((p: any) => !p.dibaca);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Selamat Datang, {currentUser?.nama?.split(" ")[0] ?? "Admin"}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Berikut adalah ringkasan performa dan aktivitas Kecamatan Harian hari ini.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/wisata/create"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-gray-200"
          >
            <MapPin size={14} style={{ color: NAVY }} /> Tambah Wisata
          </Link>
          <Link
            to="/berita/create"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: NAVY }}
          >
            <Newspaper size={14} /> Tambah Berita
          </Link>
        </div>
      </div>

      

      {/* Desa cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {desa.filter((d) => d.aktif).map((d) => (
          <Link key={d.id} to={`/desa/${d.id}/edit`} className="block group">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all">
              <div className="relative h-20 overflow-hidden">
                <img src={d.banner} alt={d.nama} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center px-4">
                  <div>
                    <p className="text-white font-bold text-sm">{d.nama}</p>
                    <p className="text-white/70 text-xs">{d.penduduk.toLocaleString("id-ID")} jiwa · {d.luas_wilayah}</p>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="px-4 py-2.5 flex items-center gap-4 text-xs text-gray-500">
                <span>{wisata.filter((w) => w.village_id === d.id).length} Wisata</span>
                <span>{umkm.filter((u) => u.village_id === d.id).length} UMKM</span>
                <span>{berita.filter((b) => b.village_id === d.id).length} Berita</span>
                <span className="ml-auto bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Aktif</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick nav stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Berita", value: berita.filter(b => b.status === "published").length, icon: Newspaper, href: "/berita", color: NAVY, bg: "#EFF6FF" },
          { label: "Wisata", value: wisata.filter(w => w.aktif).length, icon: MapPin, href: "/wisata", color: "#059669", bg: "#ECFDF5" },
          { label: "Event", value: events.filter(e => e.aktif).length, icon: Calendar, href: "/events", color: "#7C3AED", bg: "#F3E8FF" },
          { label: "Pupuk", value: pupuk.filter((p: any) => p.aktif).length, icon: Leaf, href: "/pupuk", color: "#D97706", bg: "#FFFBEB" },
        ].map((s) => (
          <Link key={s.label} to={s.href} className="block">
            <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: s.bg }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-lg font-black text-gray-900 leading-none">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom: Latest news + Events */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Berita terbaru */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <Newspaper size={14} style={{ color: NAVY }} /> Berita Terbaru
            </h3>
            <Link to="/berita" className="text-xs font-semibold hover:underline" style={{ color: NAVY }}>
              Lihat Semua →
            </Link>
          </div>
          <div className="space-y-3">
            {latestBerita.map((b) => (
              <div key={b.id} className="flex items-center gap-3">
                <img src={b.foto} alt={b.judul} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{b.judul}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    <span className="font-medium" style={{ color: NAVY }}>{b.kategori}</span>
                    {" · "}
                    {new Date(b.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 shrink-0 font-medium">
                  Terbit
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <Calendar size={14} style={{ color: "#7C3AED" }} /> Event Mendatang
            </h3>
            <Link to="/events" className="text-xs font-semibold hover:underline" style={{ color: NAVY }}>
              Kelola Event →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((e) => {
              const d = new Date(e.tanggal_mulai);
              return (
                <div key={e.id} className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 rounded-lg flex flex-col items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: NAVY }}
                  >
                    <span className="text-xs font-bold uppercase leading-none">
                      {d.toLocaleDateString("id-ID", { month: "short" })}
                    </span>
                    <span className="text-base font-black leading-tight">{d.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{e.judul}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{e.lokasi}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {unreadPesan.length > 0 && (
            <Link
              to="/kontak"
              className="mt-4 flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100"
            >
              <span className="text-xs font-semibold text-red-700">
                {unreadPesan.length} Pesan Belum Dibaca
              </span>
              <span className="text-xs text-red-500">Lihat →</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}