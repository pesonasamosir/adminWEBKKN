import { useParams, Link, Navigate } from "react-router";
import { ChevronLeft, CheckCircle2, AlertCircle, Leaf, FlaskConical, Crop } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function PupukDetailPage() {
  const { id } = useParams();
  const { pupuk } = useApp();
  const item = pupuk.find(p => p.id === Number(id));
  if (!item) return <Navigate to="/pupuk" replace />;

  const statusInfo = {
    tersedia: { label: "Tersedia", color: "#2E8B57", icon: CheckCircle2 },
    terbatas: { label: "Stok Terbatas", color: "#E67E22", icon: AlertCircle },
    habis: { label: "Stok Habis", color: "#DC2626", icon: AlertCircle },
  };
  const status = statusInfo[item.ketersediaan as keyof typeof statusInfo];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/pupuk" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-green-700 mb-6 transition-colors">
          <ChevronLeft size={16} /> Kembali ke Informasi Pupuk
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-56 bg-green-50">
                <img src={item.foto} alt={item.nama} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-white text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#2E8B57" }}>{item.kategori}</span>
                  {item.subsidi && <span className="text-white text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#E67E22" }}>Pupuk Subsidi</span>}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-1">{item.merek}</p>
                <h1 className="text-gray-800 mb-2">{item.nama}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <StatusIcon size={14} style={{ color: status.color }} />
                  <span className="text-sm font-medium" style={{ color: status.color }}>{status.label}</span>
                  <span className="mx-2 text-gray-200">|</span>
                  <span className="font-bold" style={{ color: "#1A56A0" }}>{item.harga}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.deskripsi}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Leaf size={16} style={{ color: "#2E8B57" }} /> Cocok untuk Tanaman
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.kegunaan.map((k: string) => (
                  <span key={k} className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FlaskConical size={16} style={{ color: "#1A56A0" }} /> Dosis Penggunaan
              </h3>
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">{item.dosis}</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Crop size={16} style={{ color: "#E67E22" }} /> Panduan Penggunaan
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.panduan}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Informasi Ketersediaan</h3>
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: `${status.color}15` }}>
                <StatusIcon size={18} style={{ color: status.color }} />
                <span className="font-semibold text-sm" style={{ color: status.color }}>{status.label}</span>
              </div>
              {item.subsidi && (
                <div className="mt-3 p-3 rounded-xl bg-orange-50 text-orange-800 text-xs flex items-start gap-2">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <span>Pupuk ini termasuk dalam program pupuk bersubsidi pemerintah. Tersedia dengan harga khusus bagi petani terdaftar.</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Informasi Pupuk Lain</h3>
              <div className="space-y-3">
                {useApp().pupuk.filter(p => p.id !== item.id && p.aktif).slice(0, 3).map((p: any) => (
                  <Link key={p.id} to={`/pupuk/${p.id}`} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1.5 transition-colors">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-green-50 shrink-0">
                      <img src={p.foto} alt={p.nama} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800 hover:text-green-700 line-clamp-1">{p.nama}</div>
                      <div className="text-xs text-gray-400">{p.kategori}</div>
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
