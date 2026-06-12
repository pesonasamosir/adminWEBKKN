import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { KATEGORI_GALERI } from "../../data/mockData";

export function GaleriPage() {
  const { galeri } = useApp();
  const [kategori, setKategori] = useState("Semua");
  const [lightbox, setLightbox] = useState<{ foto: string; judul: string } | null>(null);

  const filtered = galeri.filter(g => kategori === "Semua" || g.kategori === kategori);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-48" style={{ background: "linear-gradient(135deg, #1A56A0 0%, #0d3d7a 100%)" }}>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-white mb-2">Galeri Foto</h1>
            <p className="text-blue-200 text-sm">Momen-momen indah dari Kecamatan Harian</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {KATEGORI_GALERI.map(k => (
            <button key={k} onClick={() => setKategori(k)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${kategori === k ? "text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"}`}
              style={kategori === k ? { backgroundColor: "#1A56A0" } : {}}>
              {k}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-6 text-center">{filtered.length} foto</p>

        {/* Grid Layout - Landscape Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {filtered.map((g) => (
            <div
              key={g.id}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-white"
              onClick={() => setLightbox({ foto: g.foto, judul: g.judul })}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={g.foto}
                  alt={g.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn size={28} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                <p className="text-white text-sm font-medium line-clamp-1">{g.judul}</p>
                <p className="text-gray-300 text-xs mt-0.5">{g.kategori}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setLightbox(null)}>
            <X size={22} />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.foto.replace("w=800", "w=1400")} alt={lightbox.judul} className="w-full rounded-xl max-h-screen object-contain" />
            <p className="text-white text-center mt-3 text-sm">{lightbox.judul}</p>
          </div>
        </div>
      )}
    </div>
  );
}
