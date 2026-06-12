import { useParams, Link, Navigate } from "react-router";
import { MapPin, Clock, Ticket, Star, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/button";

export function WisataDetailPage() {
  const { slug } = useParams();
  const { wisata } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const item = wisata.find(w => w.slug === slug);

  if (!item) return <Navigate to="/wisata" replace />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/wisata" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-700 mb-6 transition-colors">
          <ChevronLeft size={16} /> Kembali ke Wisata
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kiri - Foto & Detail */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden h-72 md:h-96 mb-3 shadow-lg">
              <img src={item.galeri[activeImg] || item.foto} alt={item.nama} className="w-full h-full object-cover" />
            </div>
            {/* Thumbnails */}
            {item.galeri.length > 1 && (
              <div className="flex gap-2 mb-6">
                {item.galeri.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-blue-500 scale-105" : "border-transparent opacity-60"}`}
                  >
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">{item.kategori}</span>
                  <h1 className="text-gray-800 mt-2">{item.nama}</h1>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg">
                  <Star size={14} fill="currentColor" />
                  <span className="font-bold text-sm">{item.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.deskripsi}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {[
                  { icon: Clock, label: "Jam Buka", val: item.jam_buka, color: "#2E8B57" },
                  { icon: Ticket, label: "Tiket Masuk", val: item.tiket, color: "#E67E22" },
                  { icon: MapPin, label: "Lokasi", val: item.lokasi.split(",")[0], color: "#1A56A0" },
                ].map((info, i) => (
                  <div key={i} className="rounded-xl p-3 border border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-1 mb-1">
                      <info.icon size={13} style={{ color: info.color }} />
                      <span className="text-xs text-gray-400">{info.label}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{info.val}</span>
                  </div>
                ))}
              </div>

              {/* Fasilitas */}
              <h3 className="font-semibold text-gray-800 mb-3">Fasilitas</h3>
              <div className="flex flex-wrap gap-2">
                {item.fasilitas.map((f) => (
                  <span key={f} className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                    <CheckCircle2 size={11} /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Kanan - Maps & CTA */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <h3 className="font-semibold text-gray-800">Lokasi</h3>
                <p className="text-xs text-gray-500 mt-0.5">{item.lokasi}</p>
              </div>
              <iframe
                title="maps"
                src={`https://maps.google.com/maps?q=${item.koordinat.lat},${item.koordinat.lng}&z=15&output=embed`}
                className="w-full h-56"
                loading="lazy"
              />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Hubungi Kami</h3>
              <p className="text-sm text-gray-600 mb-4">Butuh informasi lebih lanjut tentang destinasi ini?</p>
              <a href="https://wa.me/6282165234567" target="_blank" rel="noopener noreferrer">
                <Button className="w-full text-white" style={{ backgroundColor: "#25D366" }}>
                  Tanya via WhatsApp
                </Button>
              </a>
            </div>

            {/* Wisata Lain */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Wisata Lainnya</h3>
              <div className="space-y-3">
                {useApp().wisata.filter(w => w.id !== item.id && w.aktif).slice(0, 3).map(w => (
                  <Link key={w.id} to={`/wisata/${w.slug}`} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1.5 transition-colors">
                    <img src={w.foto} alt={w.nama} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-blue-700">{w.nama}</div>
                      <div className="text-xs text-gray-400">{w.kategori}</div>
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
