import { useState } from "react";
import { Link } from "react-router";
import { Search, MessageCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { KATEGORI_UMKM } from "../../data/mockData";

const NAVY = "#1B3A6B";

export function UMKMPage() {
  const { umkm, desa } = useApp();
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = umkm.filter((u) => {
    const matchSearch =
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.pemilik.toLowerCase().includes(search.toLowerCase());
    const matchKat = kategori === "Semua" || u.kategori === kategori;
    return matchSearch && matchKat && u.aktif;
  });

  const visible = filtered.slice(0, visibleCount);

  const getDesaName = (village_id: number | null) => {
    if (!village_id) return "Kecamatan";
    return desa.find((d) => d.id === village_id)?.nama?.replace("Desa ", "") ?? "";
  };

  const CATS = ["Semua", ...KATEGORI_UMKM.filter((k) => k !== "Semua").slice(0, 4)];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with photo */}
      <div className="relative h-56 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80"
          alt="UMKM Desa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white mb-2" style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
            UMKM Desa
          </h1>
          <p className="text-white/80 text-sm max-w-md">
            Dukung pertumbuhan ekonomi lokal dengan menjelajahi berbagai produk dan jasa unggulan dari masyarakat Kecamatan Harian.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="border-b border-gray-100 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {CATS.map((k) => (
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
          <div className="relative w-full sm:w-52 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk atau toko..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all bg-gray-50"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p>Tidak ada UMKM yang sesuai pencarian</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={u.foto}
                    alt={u.nama}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className="text-white text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: "#2E8B57" }}
                    >
                      {u.kategori}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-0.5 leading-snug" style={{ color: NAVY, fontSize: "0.95rem" }}>
                    {u.nama}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">{u.deskripsi}</p>
                  <div className="flex gap-2">
                    <Link
                      to={`/umkm/${u.id}`}
                      className="flex-1 flex items-center justify-center py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Lihat Detail
                    </Link>
                    <a
                      href={`https://wa.me/${u.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-white text-xs font-semibold transition-opacity hover:opacity-80 shrink-0"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <MessageCircle size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1.5 mx-auto"
            >
              Muat Lebih Banyak ↓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}