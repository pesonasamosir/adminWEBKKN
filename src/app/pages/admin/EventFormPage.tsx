import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Save } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { KATEGORI_EVENT } from "../../data/mockData";
import eventService, { type EventPayload } from "../../../services/event.service";

const COLORS = ["#1A56A0", "#2E8B57", "#E67E22", "#7C3AED", "#DC2626", "#0891B2", "#D97706", "#059669"];

type EventFormValues = EventPayload & { id?: number };

const createInitialForm = (source?: Partial<EventPayload>): EventFormValues => ({
  judul: source?.judul || "",
  kategori: source?.kategori || "Festival",
  deskripsi: source?.deskripsi || "",
  tanggal_mulai: source?.tanggal_mulai || "",
  tanggal_selesai: source?.tanggal_selesai || "",
  lokasi: source?.lokasi || "",
  warna: source?.warna || "#1A56A0",
  village_id: source?.village_id ?? null,
  aktif: source?.aktif ?? true,
});

export function EventFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id && id !== "create");
  const [form, setForm] = useState<EventFormValues>(() => createInitialForm());
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) {
      setForm(createInitialForm());
      setError(null);
      return;
    }

    const loadEvent = async () => {
      try {
        setIsLoading(true);
        const data = await eventService.getById(id!);
        setForm(createInitialForm(data));
        setError(null);
      } catch (err) {
        setError("Gagal memuat event yang dipilih.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [id, isEdit]);

  const handleSave = async () => {
    if (!form.judul.trim() || !form.tanggal_mulai) {
      alert("Judul dan tanggal wajib diisi");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const payload: EventPayload = {
        judul: form.judul.trim(),
        kategori: form.kategori,
        deskripsi: form.deskripsi,
        tanggal_mulai: form.tanggal_mulai,
        tanggal_selesai: form.tanggal_selesai || form.tanggal_mulai,
        lokasi: form.lokasi,
        warna: form.warna,
        village_id: form.village_id ?? null,
        aktif: form.aktif,
      };

      if (isEdit && id) {
        await eventService.update(id, payload);
      } else {
        await eventService.create(payload);
      }

      navigate("/events");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan event ke server.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/events"><button className="p-1.5 rounded-lg hover:bg-gray-100"><ChevronLeft size={18} /></button></Link>
          <h1 className="text-gray-800">{isEdit ? "Edit Event" : "Tambah Event"}</h1>
        </div>
        <Button onClick={handleSave} disabled={isSaving || isLoading} style={{ backgroundColor: "#7C3AED" }} className="text-white gap-2"><Save size={14} /> {isSaving ? "Menyimpan..." : "Simpan"}</Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      {isLoading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Memuat event...</div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Event *</label>
            <Input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder="Nama event" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <Select value={form.kategori} onValueChange={(v) => setForm({ ...form, kategori: v })}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {KATEGORI_EVENT.filter((k) => k !== "Semua").map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <Input value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} className="h-9" placeholder="Tempat pelaksanaan" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai *</label>
              <Input type="date" value={form.tanggal_mulai} onChange={(e) => setForm({ ...form, tanggal_mulai: e.target.value, tanggal_selesai: form.tanggal_selesai || e.target.value })} className="h-9" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
              <Input type="date" value={form.tanggal_selesai} onChange={(e) => setForm({ ...form, tanggal_selesai: e.target.value })} className="h-9" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <Textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} rows={3} placeholder="Keterangan event" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warna Kategori</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button key={c} onClick={() => setForm({ ...form, warna: c })}
                  className={`w-8 h-8 rounded-full transition-transform ${form.warna === c ? "scale-125 ring-2 ring-offset-1 ring-gray-400" : ""}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={form.aktif} onChange={(e) => setForm({ ...form, aktif: e.target.checked })} className="rounded" />
            Event aktif / tampilkan di kalender
          </label>
        </div>
      )}
    </div>
  );
}
