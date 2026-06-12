import { useState } from "react";
import { Link } from "react-router";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useApp } from "../../context/AppContext";

export function EventListPage() {
  const { events, setEvents } = useApp();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => { setEvents(events.filter(e => e.id !== id)); setDeleteId(null); };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-gray-800">Event & Kalender</h1><p className="text-gray-500 text-sm">{events.length} total event</p></div>
        <Link to="/admin/events/create">
          <Button style={{ backgroundColor: "#7C3AED" }} className="text-white gap-2"><Plus size={16} /> Tambah Event</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Event</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Kategori</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Tanggal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Lokasi</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: e.warna }} />
                      <p className="font-medium text-gray-800 line-clamp-1">{e.judul}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: e.warna }}>{e.kategori}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {new Date(e.tanggal_mulai).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    {e.tanggal_mulai !== e.tanggal_selesai && ` - ${new Date(e.tanggal_selesai).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}`}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{e.lokasi}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${e.aktif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {e.aktif ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Link to={`/admin/events/${e.id}/edit`}><button className="p-1.5 rounded-lg hover:bg-purple-50 text-gray-400 hover:text-purple-600"><Edit size={14} /></button></Link>
                      <button onClick={() => setDeleteId(e.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
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
            <h3 className="font-bold text-gray-800 mb-2">Hapus Event?</h3>
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
