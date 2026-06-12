import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black mb-4" style={{ color: "#1A56A0", opacity: 0.2 }}>404</div>
        <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#EBF4FF" }}>
          <span className="text-4xl">🗺️</span>
        </div>
        <h1 className="text-gray-800 mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari tidak ditemukan. Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="text-white gap-2" style={{ backgroundColor: "#1A56A0" }}>
              <Home size={16} /> Kembali ke Beranda
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft size={16} /> Halaman Sebelumnya
          </Button>
        </div>
      </div>
    </div>
  );
}
