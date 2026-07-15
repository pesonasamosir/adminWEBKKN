import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Edit, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useApp } from "../../context/AppContext";

export function PupukListPage() {
  const { pupuk, setPupuk } = useApp();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = pupuk.filter(p => p.nama.toLowerCase().includes(search.toLowerCase()) || p.merek.toLowerCase().includes(search.toLowerCase()));
  const handleDelete = (id: number) => { setPupuk(pupuk.filter(p => p.id !== id)); setDeleteId(null); };

  const statusColor = { tersedia: "#2E8B57", terbatas: "#E67E22", habis: "#DC2626" };
  const statusLabel = { tersedia: "Tersedia", terbatas: "Terbatas", habis: "Habis" };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-gray-800">Informasi Pupuk</h1><p className="text-gray-500 text-sm">{pupuk.length} total pupuk</p></div>
        <Link to="/pupuk/create">
          <Button style={{ backgroundColor: "#2E8B57" }} className="text-white gap-2"><Plus size={16} /> Tambah Pupuk</Button>
        </Link>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari pupuk..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Pupuk</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Kategori</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Harga</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Subsidi</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Ketersediaan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{p.nama}</p>
                    <p className="text-xs text-gray-400">{p.merek}</p>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{p.kategori}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.harga}</td>
                  <td className="px-4 py-3">
                    {p.subsidi ? <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Subsidi</span> : <span className="text-xs text-gray-400">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs font-medium" style={{ color: statusColor[p.ketersediaan as keyof typeof statusColor] }}>
                      {p.ketersediaan === "tersedia" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {statusLabel[p.ketersediaan as keyof typeof statusLabel]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Link to={`/pupuk/${p.id}/edit`}><button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600"><Edit size={14} /></button></Link>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
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
            <h3 className="font-bold text-gray-800 mb-2">Hapus Pupuk?</h3>
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
