import { useParams, Link, Navigate } from "react-router";
import { ChevronLeft, MessageCircle, Phone, Instagram, MapPin, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function UMKMDetailPage() {
  const { id } = useParams();
  const { umkm } = useApp();
  const item = umkm.find(u => u.id === Number(id));
  if (!item) return <Navigate to="/umkm" replace />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/umkm" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-green-700 mb-6 transition-colors">
          <ChevronLeft size={16} /> Kembali ke UMKM
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detail */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-64 overflow-hidden">
                <img src={item.foto} alt={item.nama} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <span className="text-white text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#2E8B57" }}>{item.kategori}</span>
                <h1 className="text-gray-800 mt-2 mb-1">{item.nama}</h1>
                <p className="text-sm text-gray-400 mb-4">Pemilik: {item.pemilik}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.deskripsi}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Produk & Layanan</h3>
              <div className="grid grid-cols-2 gap-2">
                {item.produk.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={14} style={{ color: "#2E8B57" }} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Informasi Kontak</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={15} style={{ color: "#1A56A0" }} />
                  <span>{item.alamat}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={15} style={{ color: "#2E8B57" }} />
                  <a href={`tel:${item.telepon}`} className="hover:text-green-700">{item.telepon}</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Instagram size={15} style={{ color: "#E67E22" }} />
                  <a href={`https://instagram.com/${item.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">{item.instagram}</a>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <a href={`https://wa.me/${item.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle size={18} /> Hubungi via WhatsApp
                </button>
              </a>
              <a href={`tel:${item.telepon}`}>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "#1A56A0" }}>
                  <Phone size={18} /> Hubungi Sekarang
                </button>
              </a>
            </div>

            {/* UMKM lain */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">UMKM Lainnya</h3>
              <div className="space-y-3">
                {useApp().umkm.filter(u => u.id !== item.id && u.aktif).slice(0, 3).map(u => (
                  <Link key={u.id} to={`/umkm/${u.id}`} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1.5 transition-colors">
                    <img src={u.foto} alt={u.nama} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="text-sm font-medium text-gray-800 hover:text-green-700 line-clamp-1">{u.nama}</div>
                      <div className="text-xs text-gray-400">{u.kategori}</div>
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
