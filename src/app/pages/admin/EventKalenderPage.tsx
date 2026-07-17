import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import eventService, { type Event } from "../../../services/event.service";

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const COLOR_OPTIONS = [
  { color: "#1A56A0", label: "Kantor Kades" },
  { color: "#E67E22", label: "Kegiatan Desa" },
  { color: "#2E8B57", label: "Kegiatan Tiap Dusun" },
];

const KATEGORI_OPTIONS = ["Festival", "Budaya", "Pasar", "Olahraga", "Pemerintahan"];

export function EventKalenderPage() {
  const today = new Date();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState(KATEGORI_OPTIONS[0]);
  const [desaId, setDesaId] = useState<string>("all");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [warna, setWarna] = useState(COLOR_OPTIONS[0].color);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getAll();
        setEvents(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError("Gagal memuat event dari server.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getEventsForDay = (day: number) => {
    return events.filter(e => {
      const start = new Date(e.tanggal_mulai);
      const end = new Date(e.tanggal_selesai);
      const d = new Date(currentYear, currentMonth, day);
      return d >= start && d <= end && e.aktif;
    });
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const upcomingEvents = events.filter(e => new Date(e.tanggal_mulai) >= today && e.aktif)
    .sort((a, b) => new Date(a.tanggal_mulai).getTime() - new Date(b.tanggal_mulai).getTime());

  const handleReset = () => {
    setJudul("");
    setKategori(KATEGORI_OPTIONS[0]);
    setDesaId("all");
    setTanggalMulai("");
    setTanggalSelesai("");
    setLokasi("");
    setDeskripsi("");
    setWarna(COLOR_OPTIONS[0].color);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !tanggalMulai || !tanggalSelesai || !lokasi) return;

    try {
      const payload = {
        judul,
        kategori,
        village_id: desaId === "all" ? null : parseInt(desaId),
        deskripsi,
        tanggal_mulai: tanggalMulai,
        tanggal_selesai: tanggalSelesai,
        lokasi,
        warna,
        aktif: true,
      };

      if (editingId) {
        const updated = await eventService.update(editingId, payload);
        setEvents((prev) => prev.map((ev) => (ev.id === editingId ? updated : ev)));
      } else {
        console.log("Payload:", payload);
        console.log("Judul:", judul);
        const created = await eventService.create(payload);
        setEvents((prev) => [...prev, created]);
      }

      handleReset();
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan event ke server.";
      setError(message);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setJudul(event.judul);
    setKategori(event.kategori);
    setDesaId(event.village_id ? event.village_id.toString() : "all");
    setTanggalMulai(event.tanggal_mulai);
    setTanggalSelesai(event.tanggal_selesai);
    setLokasi(event.lokasi);
    setDeskripsi(event.deskripsi);
    setWarna(event.warna);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    try {
      await eventService.remove(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setDeleteId(null);
      if (editingId === id) handleReset();
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menghapus event.";
      setError(message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800">Kalender Event</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola dan jadwalkan berbagai kegiatan dan event Desa Toba Indah</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-5">📋 Form Tambah / Edit Event</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Judul Event */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Event</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Festival Danau Toba 2026"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Grid 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal & Waktu Mulai</label>
                <input
                  type="date"
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal & Waktu Selesai</label>
                <input
                  type="date"
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Lokasi</label>
              <input
                type="text"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Contoh: Desa Toba Indah, Aula Serbaguna"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Pilih Warna (Label Kategori) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Warna (Label Kategori)</label>
              <div className="flex gap-3">
                {COLOR_OPTIONS.map(c => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => setWarna(c.color)}
                    className={`w-7 h-7 rounded-full transition-all ${warna === c.color ? "ring-2 ring-offset-2" : ""}`}
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Deskripsi Singkat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Singkat</label>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Tambahkan deskripsi untuk acara ini jika diperlukan..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" className="flex-1 text-white" style={{ backgroundColor: "#1A56A0" }}>
                Simpan Event
              </Button>
            </div>
          </form>
        </div>

        {/* Kalender Section */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: "#1A56A0" }}>
              <button onClick={prevMonth} className="p-1 rounded text-white hover:bg-white/20">
                <ChevronLeft size={18} />
              </button>
              <h3 className="text-white font-semibold">
                {MONTHS[currentMonth]} {currentYear}
              </h3>
              <button onClick={nextMonth} className="p-1 rounded text-white hover:bg-white/20">
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
              {DAYS.map(d => (
                <div key={d} className="text-center py-2 text-xs font-semibold text-gray-500">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 border-r border-b border-gray-50 bg-gray-50/30" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const dayEvents = getEventsForDay(day);
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                return (
                  <div key={day} className={`h-10 border-r border-b border-gray-50 flex items-center justify-center relative ${isToday ? "bg-blue-50" : ""}`}>
                    <span className={`text-xs ${isToday ? "font-bold text-white rounded-full w-6 h-6 flex items-center justify-center" : "text-gray-700"}`}
                      style={isToday ? { backgroundColor: "#1A56A0" } : {}}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1 flex gap-0.5">
                        {dayEvents.slice(0, 3).map(e => (
                          <div key={e.id} className="w-1 h-1 rounded-full" style={{ backgroundColor: e.warna }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-600 mb-2">KATEGORI KETERSEDIAAN</p>
              <div className="space-y-1.5">
                {COLOR_OPTIONS.map(c => (
                  <div key={c.color} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-xs text-gray-600">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-800">📅 Daftar Event Mendatang</h2>
          
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Memuat event...</div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">Belum ada event mendatang</div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.slice(0, 5).map(e => (
              <div key={e.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                <div className="text-center rounded-lg p-3 text-white shrink-0" style={{ backgroundColor: e.warna, width: "60px" }}>
                  <div className="font-bold text-xl leading-none">{new Date(e.tanggal_mulai).getDate()}</div>
                  <div className="text-xs opacity-90 mt-1">{MONTHS[new Date(e.tanggal_mulai).getMonth()].slice(0, 3)}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800">{e.judul}</h3>
                  <p className="text-xs text-gray-500 mt-1">{e.lokasi}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => handleEdit(e)} className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => setDeleteId(e.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
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
