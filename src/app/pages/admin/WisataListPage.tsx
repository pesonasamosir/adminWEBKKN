  import { useState } from "react";
  import { Link } from "react-router";
  import { Plus, Search, Edit, Trash2, Star, Eye } from "lucide-react";
  import { Input } from "../../components/ui/input";
  import { Button } from "../../components/ui/button";
  import { useApp } from "../../context/AppContext";

  export function WisataListPage() {
    const { wisata, setWisata } = useApp();
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const filtered = wisata.filter(w => w.nama.toLowerCase().includes(search.toLowerCase()));

    const toggleFeatured = (id: number) => setWisata(wisata.map(w => w.id === id ? { ...w, featured: !w.featured } : w));
    const toggleAktif = (id: number) => setWisata(wisata.map(w => w.id === id ? { ...w, aktif: !w.aktif } : w));
    const handleDelete = (id: number) => { setWisata(wisata.filter(w => w.id !== id)); setDeleteId(null); };

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-800">Daftar Wisata</h1>
            <p className="text-gray-500 text-sm">{wisata.length} total destinasi</p>
          </div>
          <Link to="/wisata/create">
            <Button style={{ backgroundColor: "#2E8B57" }} className="text-white gap-2"><Plus size={16} /> Tambah Wisata</Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Cari wisata..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 max-w-sm" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Wisata</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Kategori</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Rating</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Featured</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((w) => (
                  <tr key={w.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={w.foto} alt={w.nama} className="w-12 h-10 rounded-lg object-cover shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 line-clamp-1">{w.nama}</p>
                          <p className="text-xs text-gray-400">{w.lokasi.split(",")[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">{w.kategori}</span></td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-yellow-600 text-xs"><Star size={11} fill="currentColor" />{w.rating}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleFeatured(w.id)}
                        className={`text-xs px-2 py-0.5 rounded-full transition-colors ${w.featured ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}`}>
                        {w.featured ? "Unggulan" : "Biasa"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleAktif(w.id)}
                        className={`text-xs px-2 py-0.5 rounded-full ${w.aktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {w.aktif ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link to={`/wisata/${w.id}/edit`}>
                          <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600"><Edit size={14} /></button>
                        </Link>
                        <button onClick={() => setDeleteId(w.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>  
          </div>
        </div>

        {deleteId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <h3 className="font-bold text-gray-800 mb-2">Hapus Wisata?</h3>
              <p className="text-gray-500 text-sm mb-5">Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Batal</Button>
                <Button className="flex-1 text-white bg-red-600 hover:bg-red-700" onClick={() => handleDelete(deleteId)}>Hapus</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
