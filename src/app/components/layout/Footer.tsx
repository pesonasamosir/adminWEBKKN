import { Link } from "react-router";
import { Facebook, Instagram, Youtube, Share2 } from "lucide-react";
import { KECAMATAN_CONFIG } from "../../data/mockData";

const NAVY = "#1B3A6B";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: NAVY, fontSize: "10px", fontWeight: 800 }}
              >
                KH
              </div>
              <span className="text-sm font-bold" style={{ color: NAVY }}>
                Kecamatan Harian
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Menghadirkan pesona alam dan kekayaan budaya Batak untuk dunia. Jelajahi Danau Toba dari sini.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={KECAMATAN_CONFIG.sosmed.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Facebook size={15} />
              </a>
              <a
                href={KECAMATAN_CONFIG.sosmed.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Instagram size={15} />
              </a>
              <a
                href={KECAMATAN_CONFIG.sosmed.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Youtube size={15} />
              </a>
              <span className="ml-1">
                <Share2 size={13} className="text-gray-300" />
              </span>
            </div>
          </div>

          {/* Tentang Kami */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Tentang Kami</h4>
            <ul className="space-y-2">
              {[
                { label: "Profil Kecamatan", href: "/profil-kecamatan" },
                { label: "Struktur Organisasi", href: "/profil/struktur" },
                { label: "Daftar Desa", href: "/desa" },
                { label: "Budaya & Adat", href: "/budaya" },
                { label: "Galeri Foto", href: "/galeri" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Layanan & Informasi</h4>
            <ul className="space-y-2">
              {[
                { label: "Wisata", href: "/wisata" },
                { label: "UMKM Lokal", href: "/umkm" },
                { label: "Berita Terkini", href: "/berita" },
                { label: "Kalender Event", href: "/kalender" },
                { label: "Informasi Pupuk", href: "/pupuk" },
                { label: "Kontak Kami", href: "/kontak" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Informasi Lainnya</h4>
            <ul className="space-y-2">
              {[
                { label: "Kebijakan Privasi", href: "/kontak" },
                { label: "Peta Situs", href: "/kontak" },
                { label: "Hubungi Kami", href: "/kontak" },
                { label: "Admin Panel", href: "/login" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 leading-relaxed">
                {KECAMATAN_CONFIG.jam_operasional}
              </p>
              <p className="text-xs text-gray-400 mt-1">{KECAMATAN_CONFIG.telepon}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Kecamatan Harian, Kabupaten Samosir. Horas!
          </p>
          <p className="text-xs text-gray-400 text-center">
            Portal Resmi Kecamatan Harian · Danau Toba
          </p>
        </div>
      </div>
    </footer>
  );
}
