import { useState } from "react";
import { Link } from "react-router";
import { Search, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useApp } from "../../context/AppContext";
import { KATEGORI_PUPUK } from "../../data/mockData";

export function PupukPage() {
  const { pupuk } = useApp();
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");

  const filtered = pupuk.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.merek.toLowerCase().includes(search.toLowerCase()) ||
      p.kegunaan.some((k: string) => k.toLowerCase().includes(search.toLowerCase()));
    const matchKat = kategori === "Semua" || p.kategori === kategori;
    return matchSearch && matchKat && p.aktif;
  });

  const statusColor = { tersedia: "#2E8B57", terbatas: "#E67E22", habis: "#DC2626" };
  const statusLabel = { tersedia: "Tersedia", terbatas: "Terbatas", habis: "Habis" };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-48" style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1a5c38 100%)" }}>
        <img src="https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=1400&q=80" alt="Pertanian" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-white mb-2">Informasi Pupuk</h1>
            <p className="text-green-100 text-sm">Panduan pupuk untuk petani Desa Toba Indah</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Cari nama pupuk, merek, atau tanaman..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {KATEGORI_PUPUK.map(k => (
              <button key={k} onClick={() => setKategori(k)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${kategori === k ? "text-white" : "bg-white text-gray-600 border border-gray-200"}`}
                style={kategori === k ? { backgroundColor: "#2E8B57" } : {}}>{k}</button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} jenis pupuk ditemukan</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link key={p.id} to={`/pupuk/${p.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="relative h-44 overflow-hidden bg-green-50">
                <img src={p.foto} alt={p.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" loading="lazy" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-white text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#2E8B57" }}>{p.kategori}</span>
                  {p.subsidi && <span className="text-white text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#E67E22" }}>Subsidi</span>}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1" style={{ backgroundColor: statusColor[p.ketersediaan as keyof typeof statusColor] }}>
                    {p.ketersediaan === "tersedia" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                    {statusLabel[p.ketersediaan as keyof typeof statusLabel]}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-400 mb-0.5">{p.merek}</div>
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{p.nama}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{p.deskripsi}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.kegunaan.slice(0, 3).map((k: string) => (
                    <span key={k} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{k}</span>
                  ))}
                </div>
                <div className="text-sm font-semibold" style={{ color: "#1A56A0" }}>{p.harga}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
