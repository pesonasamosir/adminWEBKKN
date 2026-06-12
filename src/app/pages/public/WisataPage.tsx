import { useState } from "react";
import { Link } from "react-router";
import { Search, MapPin, Star, Clock, Ticket } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { KATEGORI_WISATA } from "../../data/mockData";

const NAVY = "#1B3A6B";

export function WisataPage() {
  const { wisata, desa } = useApp();
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");

  const filtered = wisata.filter((w) => {
    const matchSearch =
      w.nama.toLowerCase().includes(search.toLowerCase()) ||
      w.deskripsi.toLowerCase().includes(search.toLowerCase());
    const matchKat = kategori === "Semua" || w.kategori === kategori;
    return matchSearch && matchKat && w.aktif;
  });

  const getDesaName = (village_id: number | null) => {
    if (!village_id) return "Harian";
    return desa.find((d) => d.id === village_id)?.nama?.replace("Desa ", "") || "Harian";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=1400&q=80"
          alt="Wisata Kecamatan Harian"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white mb-2" style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}>
            Kecamatan Harian
          </h1>
          <p className="text-white/80 text-sm">
            Jelajahi keunikan budaya dan pesona alam memukau di setiap desa wisata kami.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-1.5 text-xs text-gray-500">
          <Link to="/" className="hover:text-gray-800">Beranda</Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">Wisata Desa</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {KATEGORI_WISATA.map((k) => (
              <button
                key={k}
                onClick={() => setKategori(k)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  kategori === k
                    ? "text-white border-transparent"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
                style={kategori === k ? { backgroundColor: NAVY, borderColor: NAVY } : {}}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-56 shrink-0">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari lokasi, nama tempat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all bg-gray-50"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-5">
          Menampilkan <span className="font-semibold text-gray-700">{filtered.length}</span> tempat
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p>Tidak ada destinasi ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((w) => (
              <Link
                key={w.id}
                to={`/wisata/${w.slug}`}
                className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all bg-white"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={w.foto}
                    alt={w.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {w.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-gray-700 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                        <Star size={10} className="text-amber-500" fill="currentColor" /> Unggulan
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    <Star size={10} fill="currentColor" className="text-amber-400" /> {w.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1 leading-snug" style={{ color: NAVY, fontSize: "0.95rem" }}>
                    {w.nama}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">{w.deskripsi}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-gray-400">
                      <MapPin size={11} /> {getDesaName(w.village_id)}
                    </span>
                    <span className="font-semibold transition-opacity group-hover:opacity-70" style={{ color: NAVY }}>
                      Lihat Detail →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}