import { useState } from "react";
import { Link } from "react-router";
import { Search, Calendar, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { KATEGORI_BERITA } from "../../data/mockData";

const NAVY = "#1B3A6B";

export function BeritaPage() {
  const { berita, desa } = useApp();
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const published = berita.filter((b) => b.status === "published");
  const featured = published.find((b) => b.featured);

  const filtered = published.filter((b) => {
    const matchSearch =
      b.judul.toLowerCase().includes(search.toLowerCase()) ||
      b.ringkasan.toLowerCase().includes(search.toLowerCase());
    const matchKat = kategori === "Semua" || b.kategori === kategori;
    return matchSearch && matchKat;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const getDesaName = (village_id: number | null) => {
    if (!village_id) return null;
    return desa.find((d) => d.id === village_id)?.nama?.replace("Desa ", "") ?? null;
  };

  const CATS = ["Semua", ...KATEGORI_BERITA.slice(1, 5)];

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="mb-1" style={{ color: NAVY, fontWeight: 800, fontSize: "1.75rem" }}>
                Berita Desa
              </h1>
              <p className="text-gray-500 text-sm">
                Kabar terbaru, pengumuman, dan cerita inspiratif dari sekitar Danau Toba.
              </p>
            </div>
            {/* Search */}
            <div className="relative w-full md:w-60 shrink-0">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all bg-gray-50"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {CATS.map((k) => (
              <button
                key={k}
                onClick={() => { setKategori(k); setPage(1); }}
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Featured + sidebar layout */}
        {featured && page === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Featured large */}
            <Link
              to={`/berita/${featured.slug}`}
              className="md:col-span-2 group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={featured.foto}
                  alt={featured.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-white text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: "#2E8B57" }}>
                    {featured.kategori}
                  </span>
                </div>
              </div>
              <div className="p-5 bg-white">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Calendar size={11} />
                  {new Date(featured.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <h2 className="mb-2 group-hover:opacity-80 transition-opacity leading-snug" style={{ color: NAVY, fontWeight: 800, fontSize: "1.1rem" }}>
                  {featured.judul}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{featured.ringkasan}</p>
              </div>
            </Link>

            {/* Side article */}
            {published.filter((b) => b.id !== featured.id)[0] && (() => {
              const side = published.filter((b) => b.id !== featured.id)[0];
              return (
                <Link
                  to={`/berita/${side.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={side.foto}
                      alt={side.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-white text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "#E67E22" }}>
                        {side.kategori}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
                      <Calendar size={10} />
                      {new Date(side.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <h3 className="leading-snug line-clamp-2 group-hover:opacity-80 transition-opacity" style={{ color: NAVY, fontWeight: 700, fontSize: "0.9rem" }}>
                      {side.judul}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2 mt-1">{side.ringkasan}</p>
                  </div>
                </Link>
              );
            })()}
          </div>
        )}

        {/* Result count */}
        <p className="text-sm text-gray-400 mb-5">
          Menampilkan <span className="font-semibold text-gray-700">{filtered.length}</span> berita
        </p>

        {/* Grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p>Tidak ada berita ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {paginated.map((b) => {
              const desaName = getDesaName(b.village_id);
              return (
                <Link
                  key={b.id}
                  to={`/berita/${b.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all bg-white"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={b.foto}
                      alt={b.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                      <span
                        className="text-white text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ backgroundColor: NAVY }}
                      >
                        {b.kategori}
                      </span>
                      {desaName && (
                        <span className="text-white text-xs px-2 py-1 rounded-full font-medium bg-black/40">
                          {desaName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                      <Calendar size={11} />
                      {new Date(b.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <h3
                      className="font-bold line-clamp-2 mb-1.5 group-hover:opacity-75 transition-opacity leading-snug"
                      style={{ color: NAVY, fontSize: "0.9rem" }}
                    >
                      {b.judul}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{b.ringkasan}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              ‹
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                  page === p ? "text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                }`}
                style={page === p ? { backgroundColor: NAVY } : {}}
              >
                {p}
              </button>
            ))}
            {totalPages > 5 && (
              <>
                <span className="text-gray-400 text-sm">...</span>
                <button
                  onClick={() => setPage(totalPages)}
                  className="w-8 h-8 rounded-full text-sm font-semibold bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
