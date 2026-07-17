import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import layananHukumService, { type LayananHukum } from "../../../services/layananHukum.service";

export function LayananHukumListPage() {
  const [layananHukum, setLayananHukum] = useState<LayananHukum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await layananHukumService.getAll();
        setLayananHukum(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError("Gagal memuat layanan hukum dari server.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtered = layananHukum.filter((item) => {
    const query = search.toLowerCase();
    const matchSearch = [item.nama_firma, item.alamat, item.email, item.nama_advokat, item.bidang_layanan.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(query);
    const matchStatus = statusFilter === "all" || (statusFilter === "active" ? item.aktif !== false : item.aktif === false);
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: number) => {
    try {
      await layananHukumService.remove(id);
      setLayananHukum((prev) => prev.filter((item) => item.id !== id));
      setDeleteId(null);
    } catch (err) {
      setError("Gagal menghapus layanan hukum.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-800">Daftar Layanan Hukum</h1>
          <p className="text-gray-500 text-sm mt-0.5">{layananHukum.length} total layanan</p>
        </div>
        <Link to="/berita/create">
          <Button style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2">
            <Plus size={16} /> Tambah Layanan
          </Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari layanan hukum..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <div className="flex gap-2">
          {[["all", "Semua"], ["active", "Aktif"], ["inactive", "Nonaktif"]].map(([val, label]) => (
            <button key={val} onClick={() => setStatusFilter(val)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === val ? "text-white" : "bg-gray-100 text-gray-600"}`} style={statusFilter === val ? { backgroundColor: "#1A56A0" } : {}}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-12">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Firma</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Bidang</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Kontak</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Memuat layanan hukum...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Tidak ada layanan hukum ditemukan</td></tr>
              ) : filtered.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={item.foto || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80"} alt={item.nama_firma} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{item.nama_firma}</p>
                        <p className="text-xs text-gray-400">{item.nama_advokat || "Advokat belum diisi"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.bidang_layanan.slice(0, 2).map((field) => (
                        <span key={field} className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{field}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    <div>{item.no_hp}</div>
                    <div>{item.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.aktif !== false ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {item.aktif !== false ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link to={`/berita/${item.id}/edit`}>
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"><Edit size={14} /></button>
                      </Link>
                      <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
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
            <h3 className="font-bold text-gray-800 mb-2">Hapus Layanan?</h3>
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
