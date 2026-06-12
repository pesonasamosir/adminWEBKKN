import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Edit, Trash2, MessageCircle } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useApp } from "../../context/AppContext";

export function UMKMListPage() {
  const { umkm, setUmkm } = useApp();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = umkm.filter(u => u.nama.toLowerCase().includes(search.toLowerCase()) || u.pemilik.toLowerCase().includes(search.toLowerCase()));
  const toggleAktif = (id: number) => setUmkm(umkm.map(u => u.id === id ? { ...u, aktif: !u.aktif } : u));
  const handleDelete = (id: number) => { setUmkm(umkm.filter(u => u.id !== id)); setDeleteId(null); };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-gray-800">Daftar UMKM</h1><p className="text-gray-500 text-sm">{umkm.length} total UMKM</p></div>
        <Link to="/admin/umkm/create">
          <Button style={{ backgroundColor: "#E67E22" }} className="text-white gap-2"><Plus size={16} /> Tambah UMKM</Button>
        </Link>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari UMKM..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">UMKM</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Kategori</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Pemilik</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Kontak</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={u.foto} alt={u.nama} className="w-10 h-10 rounded-lg object-cover" />
                      <p className="font-medium text-gray-800 line-clamp-1">{u.nama}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{u.kategori}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-600">{u.pemilik}</td>
                  <td className="px-4 py-3">
                    <a href={`https://wa.me/${u.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      <button className="flex items-center gap-1 text-xs text-green-600 hover:underline"><MessageCircle size={12} />{u.telepon}</button>
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleAktif(u.id)} className={`text-xs px-2 py-0.5 rounded-full ${u.aktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {u.aktif ? "Aktif" : "Nonaktif"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Link to={`/admin/umkm/${u.id}/edit`}><button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600"><Edit size={14} /></button></Link>
                      <button onClick={() => setDeleteId(u.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
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
            <h3 className="font-bold text-gray-800 mb-2">Hapus UMKM?</h3>
            <p className="text-gray-500 text-sm mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Batal</Button>
              <Button className="flex-1 text-white bg-red-600" onClick={() => handleDelete(deleteId)}>Hapus</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
