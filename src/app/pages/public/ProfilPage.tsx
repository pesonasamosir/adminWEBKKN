import { Link } from "react-router";
import { MapPin, Users, TreePine, Home, CheckCircle2, Navigation, ChevronRight, Building2 } from "lucide-react";
import { KECAMATAN_PROFIL, KECAMATAN_CONFIG } from "../../data/mockData";

export function ProfilPage() {
  const { statistik } = KECAMATAN_PROFIL;
  const { batas } = statistik;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=1400&q=80"
          alt="Kecamatan Harian"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
              <Building2 size={11} /> Pemerintahan
            </div>
            <h1 className="text-white" style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)" }}>
              Profil Kecamatan Harian
            </h1>
            <p className="text-blue-200 text-sm mt-1">Kabupaten Samosir, Sumatera Utara</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-700">Beranda</Link>
          <ChevronRight size={14} />
          <span style={{ color: "#1A56A0" }} className="font-medium">Profil Kecamatan</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Users, label: "Total Penduduk", value: statistik.penduduk.toLocaleString("id-ID"), color: "#1A56A0", bg: "#EBF4FF" },
            { icon: Home, label: "Kepala Keluarga", value: statistik.kepala_keluarga.toLocaleString("id-ID"), color: "#2E8B57", bg: "#E8F5E9" },
            { icon: TreePine, label: "Luas Wilayah", value: statistik.luas_wilayah, color: "#E67E22", bg: "#FFF3E0" },
            { icon: MapPin, label: "Jumlah Desa", value: `${statistik.desa} Desa`, color: "#7C3AED", bg: "#F3E8FF" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <div className="font-bold text-gray-800" style={{ fontSize: "1.2rem", color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Konten Utama */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sejarah */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: "#1A56A0" }}></span>
                Sejarah Kecamatan
              </h2>
              {KECAMATAN_PROFIL.sejarah.split("\n\n").map((p, i) => (
                <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
              ))}
            </div>

            {/* Visi */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: "#2E8B57" }}></span>
                Visi Kecamatan
              </h2>
              <div className="rounded-xl p-5 border-l-4 text-sm text-gray-700 leading-relaxed italic" style={{ backgroundColor: "#EBF4FF", borderColor: "#1A56A0" }}>
                "{KECAMATAN_PROFIL.visi}"
              </div>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: "#E67E22" }}></span>
                Misi Kecamatan
              </h2>
              <ul className="space-y-3">
                {KECAMATAN_PROFIL.misi.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: "#2E8B57", fontSize: "11px", fontWeight: 700 }}
                    >
                      {i + 1}
                    </div>
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desa-desa */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-800 flex items-center gap-2" style={{ fontWeight: 700 }}>
                  <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: "#7C3AED" }}></span>
                  Desa di Kecamatan Harian
                </h2>
                <Link to="/desa" className="text-xs font-medium hover:underline" style={{ color: "#1A56A0" }}>
                  Lihat Detail →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { nama: "Desa Turpuk Sihotang", slug: "turpuk-sihotang", icon: "🪡", desc: "Pusat kerajinan tenun ulos dan wisata budaya Batak", color: "#1A56A0" },
                  { nama: "Desa Sosor Dolok", slug: "sosor-dolok", icon: "☕", desc: "Wisata alam Air Terjun Efrata dan kopi arabika premium", color: "#2E8B57" },
                ].map(d => (
                  <Link
                    key={d.slug}
                    to={`/desa/${d.slug}`}
                    className="group p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{d.icon}</span>
                      <h4 className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">{d.nama}</h4>
                    </div>
                    <p className="text-xs text-gray-500">{d.desc}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs font-medium" style={{ color: d.color }}>
                      Lihat Detail <ChevronRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Demografi */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Demografi Penduduk</h3>
              <div className="space-y-3">
                {[
                  { label: "Laki-laki", value: statistik.pria, total: statistik.penduduk, color: "#1A56A0" },
                  { label: "Perempuan", value: statistik.wanita, total: statistik.penduduk, color: "#E67E22" },
                ].map((d, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{d.label}</span>
                      <span className="font-medium text-gray-800">{d.value.toLocaleString("id-ID")} jiwa</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${(d.value / d.total) * 100}%`, backgroundColor: d.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-3">
                {[
                  { label: "RT", value: statistik.rt },
                  { label: "RW", value: statistik.rw },
                ].map((s, i) => (
                  <div key={i} className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="font-bold text-gray-800">{s.value}</div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Batas Wilayah */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Navigation size={16} style={{ color: "#1A56A0" }} /> Batas Wilayah
              </h3>
              <div className="space-y-2">
                {[
                  { dir: "⬆ Utara", val: batas.utara },
                  { dir: "⬇ Selatan", val: batas.selatan },
                  { dir: "➡ Timur", val: batas.timur },
                  { dir: "⬅ Barat", val: batas.barat },
                ].map((b, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400">{b.dir}</span>
                    <span className="text-xs font-medium text-gray-700">{b.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kontak */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Informasi Kontak</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "#1A56A0" }} />
                  {KECAMATAN_CONFIG.alamat}
                </p>
                <p className="flex items-center gap-2">
                  📞
                  <a href={`tel:${KECAMATAN_CONFIG.telepon}`} className="hover:text-blue-700">{KECAMATAN_CONFIG.telepon}</a>
                </p>
                <p className="flex items-center gap-2">
                  ✉️
                  <a href={`mailto:${KECAMATAN_CONFIG.email}`} className="hover:text-blue-700">{KECAMATAN_CONFIG.email}</a>
                </p>
                <p className="flex items-center gap-2">
                  🕐 {KECAMATAN_CONFIG.jam_operasional}
                </p>
              </div>
            </div>

            {/* Peta */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <h3 className="font-semibold text-gray-800">Peta Lokasi</h3>
              </div>
              <iframe
                title="Peta Kecamatan Harian"
                src={`https://maps.google.com/maps?q=${KECAMATAN_CONFIG.koordinat.lat},${KECAMATAN_CONFIG.koordinat.lng}&z=13&output=embed`}
                className="w-full h-48"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
