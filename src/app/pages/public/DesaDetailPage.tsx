import { useParams, Link } from "react-router";
import { MapPin, Users, Home, ArrowRight, ChevronRight, CheckCircle2, Star, Phone } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function DesaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { desa, wisata, umkm, berita, events } = useApp();

  const currentDesa = desa.find(d => d.slug === slug);
  if (!currentDesa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-800 mb-2">Desa tidak ditemukan</h2>
          <Link to="/desa" className="text-blue-600 hover:underline">Kembali ke Daftar Desa</Link>
        </div>
      </div>
    );
  }

  const desaWisata = wisata.filter(w => w.village_id === currentDesa.id && w.aktif);
  const desaUMKM = umkm.filter(u => u.village_id === currentDesa.id && u.aktif);
  const desaBerita = berita.filter(b => b.village_id === currentDesa.id && b.status === "published").slice(0, 3);
  const desaEvents = events.filter(e => e.village_id === currentDesa.id && e.aktif).slice(0, 3);

  const primaryColor = currentDesa.id === 1 ? "#1A56A0" : "#2E8B57";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={currentDesa.banner} alt={currentDesa.nama} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: primaryColor }}>
                Kecamatan Harian
              </span>
            </div>
            <h1 className="text-white" style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
              {currentDesa.nama}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="text-blue-200 text-sm flex items-center gap-1">
                <Users size={13} /> {currentDesa.penduduk.toLocaleString("id-ID")} jiwa
              </span>
              <span className="text-blue-200 text-sm flex items-center gap-1">
                <MapPin size={13} /> {currentDesa.luas_wilayah}
              </span>
              <span className="text-blue-200 text-sm flex items-center gap-1">
                <Home size={13} /> {currentDesa.rt} RT / {currentDesa.rw} RW
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-700">Beranda</Link>
          <ChevronRight size={14} />
          <Link to="/desa" className="hover:text-blue-700">Daftar Desa</Link>
          <ChevronRight size={14} />
          <span style={{ color: primaryColor }} className="font-medium">{currentDesa.nama}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profil Desa */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                Tentang {currentDesa.nama}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{currentDesa.deskripsi}</p>

              <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: `${primaryColor}08`, borderLeft: `4px solid ${primaryColor}` }}>
                <div className="text-xs font-semibold mb-1" style={{ color: primaryColor }}>VISI DESA</div>
                <p className="text-gray-700 text-sm italic">"{currentDesa.visi}"</p>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Misi Desa</div>
                <ul className="space-y-2">
                  {currentDesa.misi.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "#2E8B57" }} />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sejarah */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: "#E67E22" }}></span>
                Sejarah Desa
              </h2>
              {currentDesa.sejarah.split("\n\n").map((p, i) => (
                <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
              ))}
            </div>

            {/* Wisata Desa */}
            {desaWisata.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-800 flex items-center gap-2" style={{ fontWeight: 700 }}>
                    <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                    Wisata {currentDesa.nama}
                  </h2>
                  <Link to="/wisata" className="text-xs font-medium hover:underline" style={{ color: primaryColor }}>
                    Lihat Semua
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {desaWisata.slice(0, 4).map(w => (
                    <Link
                      key={w.id}
                      to={`/wisata/${w.slug}`}
                      className="group flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
                    >
                      <img src={w.foto} alt={w.nama} className="w-16 h-16 rounded-lg object-cover shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 line-clamp-1">{w.nama}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star size={11} fill="#F59E0B" stroke="none" />
                          <span className="text-xs text-gray-500">{w.rating}</span>
                          <span className="text-xs text-gray-300 mx-1">•</span>
                          <span className="text-xs text-gray-400">{w.kategori}</span>
                        </div>
                        <span className="text-xs font-medium mt-1 block" style={{ color: "#2E8B57" }}>{w.tiket}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* UMKM Desa */}
            {desaUMKM.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-800 flex items-center gap-2" style={{ fontWeight: 700 }}>
                    <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: "#2E8B57" }}></span>
                    UMKM {currentDesa.nama}
                  </h2>
                  <Link to="/umkm" className="text-xs font-medium hover:underline" style={{ color: primaryColor }}>
                    Lihat Semua
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {desaUMKM.slice(0, 4).map(u => (
                    <Link
                      key={u.id}
                      to={`/umkm/${u.id}`}
                      className="group flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all"
                    >
                      <img src={u.foto} alt={u.nama} className="w-14 h-14 rounded-lg object-cover shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-green-700 line-clamp-1">{u.nama}</h4>
                        <span className="text-xs text-gray-400">{u.kategori}</span>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{u.pemilik}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Berita Desa */}
            {desaBerita.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-800 flex items-center gap-2" style={{ fontWeight: 700 }}>
                    <span className="w-1 h-6 rounded-full inline-block" style={{ backgroundColor: "#E67E22" }}></span>
                    Berita {currentDesa.nama}
                  </h2>
                  <Link to="/berita" className="text-xs font-medium hover:underline" style={{ color: primaryColor }}>
                    Lihat Semua
                  </Link>
                </div>
                <div className="space-y-3">
                  {desaBerita.map(b => (
                    <Link
                      key={b.id}
                      to={`/berita/${b.slug}`}
                      className="group flex gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors"
                    >
                      <img src={b.foto} alt={b.judul} className="w-16 h-16 rounded-lg object-cover shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EBF4FF", color: "#1A56A0" }}>{b.kategori}</span>
                        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-2 mt-1">{b.judul}</h4>
                        <p className="text-xs text-gray-400">{new Date(b.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Info Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <img src={currentDesa.foto} alt={currentDesa.nama} className="w-full h-40 object-cover rounded-xl mb-4" loading="lazy" />
              <h3 className="font-bold text-gray-800 mb-3">{currentDesa.nama}</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Kepala Desa", value: currentDesa.kepala_desa },
                  { label: "Sekretaris", value: currentDesa.sekretaris },
                  { label: "Jumlah Penduduk", value: `${currentDesa.penduduk.toLocaleString("id-ID")} jiwa` },
                  { label: "Luas Wilayah", value: currentDesa.luas_wilayah },
                  { label: "RT / RW", value: `${currentDesa.rt} RT / ${currentDesa.rw} RW` },
                ].map((info, i) => (
                  <div key={i} className="flex items-start justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-400 text-xs">{info.label}</span>
                    <span className="text-gray-700 text-xs font-medium text-right max-w-32">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            {desaEvents.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">Event Mendatang</h3>
                <div className="space-y-2">
                  {desaEvents.map(e => (
                    <div key={e.id} className="flex gap-3 items-start">
                      <div
                        className="text-center rounded-lg p-2 text-white shrink-0 w-10"
                        style={{ backgroundColor: e.warna }}
                      >
                        <div className="font-bold text-xs leading-tight">{new Date(e.tanggal_mulai).getDate()}</div>
                        <div className="text-xs opacity-80">{new Date(e.tanggal_mulai).toLocaleDateString("id-ID", { month: "short" })}</div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-xs">{e.judul}</p>
                        <p className="text-xs text-gray-400">{e.lokasi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: primaryColor }}>
              <h3 className="font-semibold mb-3 text-sm">Hubungi Desa</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-100 text-xs">
                  <MapPin size={12} /> Kecamatan Harian, Kab. Samosir
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-xs">
                  <Phone size={12} /> +62 626-20001
                </div>
              </div>
              <Link
                to="/kontak"
                className="mt-4 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Kirim Pesan <ArrowRight size={13} />
              </Link>
            </div>

            {/* Desa lainnya */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Desa Lainnya</h3>
              <div className="space-y-2">
                {desa.filter(d => d.id !== currentDesa.id && d.aktif).map(d => (
                  <Link
                    key={d.id}
                    to={`/desa/${d.slug}`}
                    className="flex gap-3 items-center p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <img src={d.foto} alt={d.nama} className="w-12 h-12 rounded-lg object-cover shrink-0" loading="lazy" />
                    <div>
                      <p className="font-medium text-gray-800 text-xs group-hover:text-blue-700">{d.nama}</p>
                      <p className="text-xs text-gray-400">{d.penduduk.toLocaleString("id-ID")} jiwa</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}