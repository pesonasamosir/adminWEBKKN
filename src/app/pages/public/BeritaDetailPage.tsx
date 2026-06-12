import { useParams, Link, Navigate } from "react-router";
import { ChevronLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function BeritaDetailPage() {
  const { slug } = useParams();
  const { berita } = useApp();
  const item = berita.find(b => b.slug === slug);
  if (!item) return <Navigate to="/berita" replace />;

  const related = berita.filter(b => b.id !== item.id && b.kategori === item.kategori && b.status === "published").slice(0, 3);

  const shareWA = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${item.judul} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/berita" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-700 mb-6 transition-colors">
          <ChevronLeft size={16} /> Kembali ke Berita
        </Link>

        {/* Main Article */}
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="h-64 md:h-80 overflow-hidden">
            <img src={item.foto} alt={item.judul} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-white text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "#1A56A0" }}>{item.kategori}</span>
            </div>
            <h1 className="text-gray-800 mb-4 leading-tight">{item.judul}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100">
              <span className="flex items-center gap-1"><Calendar size={12} />{new Date(item.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><User size={12} />{item.penulis}</span>
              <span className="flex items-center gap-1"><Tag size={12} />{item.kategori}</span>
              <button onClick={shareWA} className="flex items-center gap-1 ml-auto text-green-600 hover:text-green-700 font-medium">
                <Share2 size={12} /> Bagikan WA
              </button>
            </div>

            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
              style={{ lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: item.isi }}
            />
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-gray-800 mb-4">Berita Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((b) => (
                <Link key={b.id} to={`/berita/${b.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="h-32 overflow-hidden">
                    <img src={b.foto} alt={b.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-blue-700">{b.judul}</h4>
                    <p className="text-xs text-gray-400 mt-1">{new Date(b.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
