import { useState } from "react";
import { Link } from "react-router";
import { useApp } from "../../context/AppContext";
import { ChevronRight } from "lucide-react";

export function BudayaPage() {
  const { budaya, desa } = useApp();
  const [desaFilter, setDesaFilter] = useState<number | null | "all">("all");

  const filtered = desaFilter === "all"
    ? budaya
    : budaya.filter((b: any) => b.village_id === desaFilter);

  const getDesaName = (village_id: number | null) => {
    if (!village_id) return "Kecamatan Harian";
    return desa.find(d => d.id === village_id)?.nama || "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=1400&q=80" alt="Budaya Batak" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            🎭 Budaya
          </div>
          <h1 className="text-white mb-2" style={{ fontWeight: 800 }}>Budaya & Adat</h1>
          <p className="text-yellow-200 text-sm">Warisan leluhur yang terus kami jaga dan lestarikan</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-700">Beranda</Link>
          <ChevronRight size={14} />
          <span style={{ color: "#E67E22" }} className="font-medium">Budaya & Adat</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 text-center">
          <h2 className="text-gray-800 mb-3" style={{ fontWeight: 700 }}>Kekayaan Budaya Batak Toba</h2>
          <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed">
            Kecamatan Harian adalah penjaga warisan budaya Batak yang kaya dan beragam. Dari tarian sakral Tor-Tor, kain tenun ulos, musik gondang, hingga arsitektur rumah adat — semuanya hidup dan diwariskan kepada generasi penerus di Desa Turpuk Sihotang dan Sosor Dolok.
          </p>
        </div>

        {/* Desa Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setDesaFilter("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${desaFilter === "all" ? "text-white" : "bg-white text-gray-600 border border-gray-200"}`} style={desaFilter === "all" ? { backgroundColor: "#E67E22" } : {}}>
            Semua
          </button>
          {desa.filter(d => d.aktif).map(d => (
            <button key={d.id} onClick={() => setDesaFilter(desaFilter === d.id ? "all" : d.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${desaFilter === d.id ? "text-white" : "bg-white text-gray-600 border border-gray-200"}`} style={desaFilter === d.id ? { backgroundColor: d.id === 1 ? "#1A56A0" : "#2E8B57" } : {}}>
              {d.nama.replace("Desa ", "")}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((b: any) => (
            <div key={b.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row">
              <div className="relative w-full md:w-52 h-48 md:h-auto overflow-hidden shrink-0">
                <img src={b.foto} alt={b.judul} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-3 left-3">
                  <span className="text-white text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "#E67E22" }}>{b.kategori}</span>
                </div>
              </div>
              <div className="p-5 flex-1">
                <div className="text-xs font-medium mb-2" style={{ color: b.village_id === 1 ? "#1A56A0" : b.village_id === 2 ? "#2E8B57" : "#E67E22" }}>
                  📍 {getDesaName(b.village_id)}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{b.judul}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}