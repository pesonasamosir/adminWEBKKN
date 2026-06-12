import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function StrukturPage() {
  const { struktur } = useApp();
  const camat = struktur.find(s => s.jabatan === "Camat");
  const sekCam = struktur.find(s => s.jabatan === "Sekretaris Camat");
  const staf = struktur.filter(s => s.jabatan !== "Camat" && s.jabatan !== "Sekretaris Camat");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-56 md:h-72" style={{ background: "linear-gradient(135deg, #1A56A0 0%, #0d3d7a 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #E67E22 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2E8B57 0%, transparent 50%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            🏛️ Pemerintahan
          </div>
          <h1 className="text-white mb-2" style={{ fontWeight: 800 }}>Struktur Organisasi</h1>
          <p className="text-blue-200 text-sm">Perangkat Kecamatan Harian, Kabupaten Samosir</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-700">Beranda</Link>
          <ChevronRight size={14} />
          <Link to="/profil-kecamatan" className="hover:text-blue-700">Profil</Link>
          <ChevronRight size={14} />
          <span style={{ color: "#1A56A0" }} className="font-medium">Struktur Organisasi</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Camat */}
        {camat && (
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center w-64 border-2" style={{ borderColor: "#E67E22" }}>
              <div className="relative inline-block mb-3">
                <img
                  src={camat.foto}
                  alt={camat.nama}
                  className="w-24 h-24 rounded-full object-cover mx-auto ring-4"
                  style={{ ringColor: "#E67E2240" } as any}
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#E67E22" }}>
                  👑
                </div>
              </div>
              <div className="font-bold text-gray-800">{camat.nama}</div>
              <div className="text-sm font-bold mt-1" style={{ color: "#E67E22" }}>{camat.jabatan}</div>
              {camat.periode && <div className="text-xs text-gray-400 mt-1 bg-gray-50 px-2 py-0.5 rounded-full">{camat.periode}</div>}
            </div>
            <div className="w-0.5 h-10 bg-gradient-to-b from-orange-300 to-blue-300 mt-1" />
          </div>
        )}

        {/* Sekretaris Camat */}
        {sekCam && (
          <div className="flex flex-col items-center mb-10">
            <div className="bg-white rounded-2xl shadow-md p-5 text-center w-56 border-2" style={{ borderColor: "#1A56A0" }}>
              <img src={sekCam.foto} alt={sekCam.nama} className="w-18 h-18 rounded-full object-cover mx-auto mb-3" style={{ width: "72px", height: "72px" }} />
              <div className="font-semibold text-gray-800 text-sm">{sekCam.nama}</div>
              <div className="text-xs font-bold mt-1" style={{ color: "#1A56A0" }}>{sekCam.jabatan}</div>
              {sekCam.periode && <div className="text-xs text-gray-400 mt-1">{sekCam.periode}</div>}
            </div>
            <div className="w-0.5 h-10 bg-gray-200" />
          </div>
        )}

        {/* Divider Label */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 text-xs text-gray-500">
            <span className="flex-1 h-px bg-gray-200 w-20 inline-block"></span>
            Staf & Pejabat Kecamatan
            <span className="flex-1 h-px bg-gray-200 w-20 inline-block"></span>
          </div>
        </div>

        {/* Staf Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {staf.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl shadow-sm p-4 text-center border border-gray-100 hover:shadow-md transition-all hover:border-blue-100"
            >
              <img
                src={s.foto}
                alt={s.nama}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 ring-2"
                style={{ ringColor: "#EBF4FF" } as any}
                loading="lazy"
              />
              <div className="font-semibold text-gray-800 text-xs leading-snug">{s.nama}</div>
              <div className="text-xs mt-1 font-semibold" style={{ color: "#2E8B57" }}>{s.jabatan}</div>
              {s.periode && (
                <div className="text-xs text-gray-400 mt-1 bg-gray-50 px-2 py-0.5 rounded-full inline-block">
                  {s.periode}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Keterangan</h3>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: "#E67E22", fontSize: "10px" }}>👑</div>
              <span>Camat — Pimpinan Tertinggi Kecamatan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-2 rounded" style={{ borderColor: "#1A56A0" }}></div>
              <span>Sekretaris Camat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border border-dashed border-gray-300 rounded"></div>
              <span>Staf & Pejabat Kecamatan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
