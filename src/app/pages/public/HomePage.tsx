import { Link } from "react-router";
import { ArrowRight, MapPin, Users, TreePine, Award, Calendar, ChevronRight, Phone, Star, Mountain, Coffee, Layers } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { KECAMATAN_PROFIL } from "../../data/mockData";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=1920&q=80')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,45,94,0.92) 0%, rgba(10,45,94,0.7) 50%, rgba(10,45,94,0.3) 100%)" }} />

      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20" style={{ background: "linear-gradient(to left, #E67E22, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: "#E67E22" }}>
            <MapPin size={12} /> Danau Toba, Kabupaten Samosir
          </div>

          <h1 className="text-white mb-5" style={{ fontSize: "clamp(2rem, 5.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Selamat Datang di<br />
            <span style={{ color: "#F59E0B" }}>Kecamatan</span><br />
            <span style={{ color: "#F59E0B" }}>Harian</span>
          </h1>

          <p className="text-blue-200 mb-8 leading-relaxed" style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", maxWidth: "480px" }}>
            Surga tersembunyi di tepi Danau Toba. Nikmati keindahan Air Terjun Efrata, keajaiban tenun ulos, dan keramahan masyarakat Batak yang tak terlupakan.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/wisata">
              <button
                className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:translate-y-[-1px]"
                style={{ backgroundColor: "#E67E22" }}
              >
                Jelajahi Wisata <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/desa">
              <button className="flex items-center gap-2 text-white border-2 border-white/40 hover:border-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold text-sm transition-all">
                Daftar Desa <Layers size={16} />
              </button>
            </Link>
          </div>

          {/* Quick info */}
          <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/20">
            {[
              { icon: "🏘️", label: "2 Desa" },
              { icon: "🏔️", label: "Tepi Danau Toba" },
              { icon: "🪡", label: "Tenun Ulos" },
              { icon: "☕", label: "Kopi Arabika" },
            ].map((q, i) => (
              <div key={i} className="flex items-center gap-2 text-blue-200 text-sm">
                <span>{q.icon}</span>
                <span>{q.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-5 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Total Penduduk", value: "4.019" },
            { icon: MapPin, label: "Luas Wilayah", value: "28,1 km²" },
            { icon: Mountain, label: "Destinasi Wisata", value: "6 Tempat" },
            { icon: Award, label: "UMKM Aktif", value: "6 Usaha" },
          ].map((s, i) => (
            <div key={i} className="text-center text-white">
              <s.icon size={20} className="mx-auto mb-1" style={{ color: "#F59E0B" }} />
              <div className="font-black text-xl" style={{ color: "#F59E0B" }}>{s.value}</div>
              <div className="text-xs text-blue-200">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle, href, accent = "#1A56A0" }: {
  title: string;
  subtitle?: string;
  href?: string;
  accent?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-1 rounded-full inline-block" style={{ backgroundColor: accent }}></span>
          <span className="w-2 h-1 rounded-full inline-block" style={{ backgroundColor: accent, opacity: 0.5 }}></span>
        </div>
        <h2 className="text-gray-900" style={{ fontSize: "clamp(1.3rem, 2.8vw, 1.7rem)", fontWeight: 800 }}>{title}</h2>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {href && (
        <Link
          to={href}
          className="flex items-center gap-1 text-sm font-semibold hover:underline shrink-0"
          style={{ color: accent }}
        >
          Lihat Semua <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}

export function HomePage() {
  const { desa, wisata, berita, events, umkm } = useApp();
  const activeDesa = desa.filter(d => d.aktif);
  const featuredWisata = wisata.filter(w => w.featured && w.aktif).slice(0, 3);
  const latestBerita = berita.filter(b => b.status === "published").slice(0, 3);
  const upcomingEvents = events.filter(e => e.aktif).slice(0, 4);
  const featuredUMKM = umkm.filter(u => u.aktif).slice(0, 4);

  return (
    <div>
      <HeroSection />

      {/* Daftar Desa Section */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #EBF4FF 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Desa di Kecamatan Harian"
            subtitle="Dua desa dengan keunikan dan kekayaan masing-masing"
            href="/desa"
            accent="#1A56A0"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeDesa.map((d, idx) => (
              <Link
                key={d.id}
                to={`/desa/${d.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-72"
              >
                <img
                  src={d.banner}
                  alt={d.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Desa badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: idx === 0 ? "#1A56A0" : "#2E8B57" }}
                  >
                    {idx === 0 ? "🪡 Budaya & Ulos" : "☕ Alam & Kopi"}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-black text-xl mb-1">{d.nama}</h3>
                  <p className="text-blue-200 text-sm line-clamp-2 mb-3">{d.deskripsi}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-200 text-xs flex items-center gap-1">
                        <Users size={11} /> {d.penduduk.toLocaleString("id-ID")} jiwa
                      </span>
                      <span className="text-blue-200 text-xs flex items-center gap-1">
                        <MapPin size={11} /> {d.luas_wilayah}
                      </span>
                    </div>
                    <span
                      className="flex items-center gap-1 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity group-hover:opacity-90"
                      style={{ backgroundColor: idx === 0 ? "#1A56A0" : "#2E8B57" }}
                    >
                      Lihat Detail <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wisata Unggulan */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Wisata Unggulan"
            subtitle="Destinasi terbaik di Kecamatan Harian"
            href="/wisata"
            accent="#E67E22"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWisata.map((w) => {
              const desaName = w.village_id
                ? desa.find(d => d.id === w.village_id)?.nama?.replace("Desa ", "") || ""
                : "Kecamatan";
              return (
                <Link
                  key={w.id}
                  to={`/wisata/${w.slug}`}
                  className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={w.foto}
                      alt={w.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold">{w.kategori}</span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 text-yellow-500 text-xs px-2 py-0.5 rounded-full font-semibold">
                      <Star size={11} fill="currentColor" /> {w.rating}
                    </div>
                    {w.village_id && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">{desaName}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">{w.nama}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{w.deskripsi}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={11} />{w.lokasi.split(",")[0]}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#E8F5E9", color: "#2E8B57" }}>
                        {w.tiket}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profil Singkat Kecamatan */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #1A56A0 0%, #0d3d7a 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              🏛️ Tentang Kami
            </div>
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2 }}>
              Mengenal Kecamatan Harian
            </h2>
            <p className="text-blue-200 leading-relaxed mb-6 text-sm">
              {KECAMATAN_PROFIL.sejarah.slice(0, 350)}...
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Kabupaten", value: "Samosir" },
                { label: "Provinsi", value: "Sumatera Utara" },
                { label: "Jumlah Desa", value: "2 Desa" },
                { label: "Di Tepi", value: "Danau Toba" },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-3">
                  <div className="text-xs text-blue-300">{s.label}</div>
                  <div className="font-bold text-white text-sm">{s.value}</div>
                </div>
              ))}
            </div>
            <Link to="/profil-kecamatan">
              <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                Profil Lengkap <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1566205865731-51803de32a35?w=800&q=80"
              alt="Kecamatan Harian"
              className="rounded-2xl shadow-2xl w-full object-cover h-80"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#FFF3E0" }}>
                  <Award size={20} style={{ color: "#E67E22" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Destinasi Wisata</div>
                  <div className="text-xs text-gray-500">Kabupaten Samosir</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UMKM Unggulan */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="UMKM Unggulan"
            subtitle="Produk dan jasa lokal terbaik dari Kecamatan Harian"
            href="/umkm"
            accent="#2E8B57"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredUMKM.map((u) => {
              const desaName = u.village_id
                ? desa.find(d => d.id === u.village_id)?.nama?.replace("Desa ", "") || ""
                : "Kecamatan";
              return (
                <Link
                  key={u.id}
                  to={`/umkm/${u.id}`}
                  className="group block bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-green-200"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={u.foto}
                      alt={u.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-white text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "#2E8B57" }}>
                        {u.kategori}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-green-700 transition-colors">{u.nama}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{u.pemilik}</p>
                    <p className="text-xs mt-1 font-medium" style={{ color: "#1A56A0" }}>{desaName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Berita & Event */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Berita */}
          <div className="lg:col-span-2">
            <SectionHeader
              title="Berita Terbaru"
              subtitle="Informasi dan kabar terkini dari Kecamatan Harian"
              href="/berita"
              accent="#1A56A0"
            />
            <div className="space-y-4">
              {latestBerita.map((b) => {
                const desaName = b.village_id
                  ? desa.find(d => d.id === b.village_id)?.nama?.replace("Desa ", "") || ""
                  : null;
                return (
                  <Link
                    key={b.id}
                    to={`/berita/${b.slug}`}
                    className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group border border-gray-100 hover:border-blue-100"
                  >
                    <img
                      src={b.foto}
                      alt={b.judul}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EBF4FF", color: "#1A56A0" }}>
                          {b.kategori}
                        </span>
                        {desaName && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#E8F5E9", color: "#2E8B57" }}>
                            {desaName}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">{b.judul}</h4>
                      <p className="text-xs text-gray-400 mt-1.5">
                        {new Date(b.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Events */}
          <div>
            <SectionHeader title="Event Mendatang" href="/kalender" accent="#7C3AED" />
            <div className="space-y-3">
              {upcomingEvents.map((e) => {
                const desaName = e.village_id
                  ? desa.find(d => d.id === e.village_id)?.nama?.replace("Desa ", "") || ""
                  : "Kecamatan";
                return (
                  <div key={e.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div
                        className="text-center rounded-xl p-2 text-white shrink-0 w-12"
                        style={{ backgroundColor: e.warna }}
                      >
                        <div className="font-black text-sm leading-tight">
                          {new Date(e.tanggal_mulai).getDate()}
                        </div>
                        <div className="text-xs leading-tight opacity-90">
                          {new Date(e.tanggal_mulai).toLocaleDateString("id-ID", { month: "short" })}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-gray-900 text-sm line-clamp-1">{e.judul}</h5>
                        <p className="text-xs text-gray-500 mt-0.5">{e.lokasi}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: e.warna }}>
                            {e.kategori}
                          </span>
                          <span className="text-xs text-gray-400">{desaName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #1A56A0 0%, #0d3d7a 100%)" }}>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: "#E67E22", transform: "translate(30%, -30%)" }}></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ backgroundColor: "#2E8B57", transform: "translate(-30%, 30%)" }}></div>

            <div className="relative z-10 py-12 px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                📞 Layanan Kecamatan
              </div>
              <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 800 }}>
                Ada yang Bisa Kami Bantu?
              </h2>
              <p className="text-blue-200 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
                Ingin tahu lebih lanjut tentang wisata, UMKM, atau layanan Kecamatan Harian? Tim kami siap membantu Anda!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/kontak">
                  <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                    <Phone size={15} /> Hubungi Kami
                  </button>
                </Link>
                <a href={`https://wa.me/62626200010`} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 text-white border-2 border-white/40 hover:border-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold text-sm transition-all">
                    💬 WhatsApp
                  </button>
                </a>
                <Link to="/profil-kecamatan">
                  <button className="flex items-center gap-2 text-white border-2 border-white/40 hover:border-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold text-sm transition-all">
                    🏛️ Profil Kecamatan
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
