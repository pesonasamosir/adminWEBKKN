import { Link } from "react-router";
import { MapPin, Users, ArrowRight, Home, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function DesaListPage() {
  const { desa } = useApp();
  const activeDesa = desa.filter(d => d.aktif);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=1400&q=80"
          alt="Kecamatan Harian"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
            <Home size={12} /> Kecamatan Harian
          </div>
          <h1 className="text-white" style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            Desa di Kecamatan Harian
          </h1>
          <p className="text-blue-200 text-sm mt-2 max-w-md">
            Jelajahi keunikan dan kekayaan setiap desa yang ada di Kecamatan Harian
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-700">Beranda</Link>
          <ChevronRight size={14} />
          <span style={{ color: "#1A56A0" }} className="font-medium">Daftar Desa</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-gray-800 mb-3" style={{ fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
            {activeDesa.length} Desa di Kecamatan Harian
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Setiap desa memiliki keunikan, potensi wisata, budaya, dan UMKM tersendiri yang menjadi kekayaan Kecamatan Harian, Kabupaten Samosir.
          </p>
        </div>

        {/* Desa Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeDesa.map((d, idx) => (
            <div
              key={d.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Banner */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={d.banner}
                  alt={d.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span
                    className="text-white text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: idx === 0 ? "#1A56A0" : "#2E8B57" }}
                  >
                    Desa {idx + 1}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white" style={{ fontWeight: 700, fontSize: "1.25rem" }}>{d.nama}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-blue-200 text-xs flex items-center gap-1">
                      <Users size={11} /> {d.penduduk.toLocaleString("id-ID")} jiwa
                    </span>
                    <span className="text-blue-200 text-xs flex items-center gap-1">
                      <MapPin size={11} /> {d.luas_wilayah}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.deskripsi}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Penduduk", value: d.penduduk.toLocaleString("id-ID"), color: "#1A56A0" },
                    { label: "RT / RW", value: `${d.rt}/${d.rw}`, color: "#2E8B57" },
                    { label: "Luas", value: d.luas_wilayah, color: "#E67E22" },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-3 rounded-xl" style={{ backgroundColor: `${s.color}10` }}>
                      <div className="font-bold text-sm" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Kepala Desa */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: idx === 0 ? "#1A56A0" : "#2E8B57" }}
                  >
                    {d.kepala_desa.split(" ")[0][0]}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Kepala Desa</div>
                    <div className="font-semibold text-gray-800 text-sm">{d.kepala_desa}</div>
                  </div>
                </div>

                <Link
                  to={`/desa/${d.slug}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: idx === 0 ? "#1A56A0" : "#2E8B57" }}
                >
                  Lihat Detail Desa <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Info kecamatan */}
        <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1A56A0 0%, #0d3d7a 100%)" }}>
          <h3 className="text-white mb-2" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
            Ingin Mengenal Kecamatan Harian?
          </h3>
          <p className="text-blue-200 text-sm mb-5">
            Pelajari sejarah, visi misi, dan profil lengkap Kecamatan Harian
          </p>
          <Link
            to="/profil-kecamatan"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Profil Kecamatan <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
