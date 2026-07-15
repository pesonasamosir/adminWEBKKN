import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Save } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import { KATEGORI_EVENT } from "../../data/mockData";
import type { Event } from "../../data/mockData";

const COLORS = ["#1A56A0", "#2E8B57", "#E67E22", "#7C3AED", "#DC2626", "#0891B2", "#D97706", "#059669"];

export function EventFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, setEvents } = useApp();
  const isEdit = id && id !== "create";
  const existing = isEdit ? events.find(e => e.id === Number(id)) : null;

  const [form, setForm] = useState({
    judul: existing?.judul || "",
    kategori: existing?.kategori || "Festival",
    deskripsi: existing?.deskripsi || "",
    tanggal_mulai: existing?.tanggal_mulai || "",
    tanggal_selesai: existing?.tanggal_selesai || "",
    lokasi: existing?.lokasi || "",
    warna: existing?.warna || "#1A56A0",
    aktif: existing?.aktif !== undefined ? existing.aktif : true,
  });

  const handleSave = () => {
    if (!form.judul.trim() || !form.tanggal_mulai) return alert("Judul dan tanggal wajib diisi");
    if (isEdit && existing) {
      setEvents(events.map(e => e.id === existing.id ? { ...e, ...form } as Event : e));
    } else {
      const newId = Math.max(...events.map(e => e.id), 0) + 1;
      setEvents([...events, { id: newId, ...form } as Event]);
    }
    navigate("/events");
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/events"><button className="p-1.5 rounded-lg hover:bg-gray-100"><ChevronLeft size={18} /></button></Link>
          <h1 className="text-gray-800">{isEdit ? "Edit Event" : "Tambah Event"}</h1>
        </div>
        <Button onClick={handleSave} style={{ backgroundColor: "#7C3AED" }} className="text-white gap-2"><Save size={14} /> Simpan</Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul Event *</label>
          <Input value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} placeholder="Nama event" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <Select value={form.kategori} onValueChange={v => setForm({ ...form, kategori: v })}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {KATEGORI_EVENT.filter(k => k !== "Semua").map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
            <Input value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })} className="h-9" placeholder="Tempat pelaksanaan" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai *</label>
            <Input type="date" value={form.tanggal_mulai} onChange={e => setForm({ ...form, tanggal_mulai: e.target.value, tanggal_selesai: form.tanggal_selesai || e.target.value })} className="h-9" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
            <Input type="date" value={form.tanggal_selesai} onChange={e => setForm({ ...form, tanggal_selesai: e.target.value })} className="h-9" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <Textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={3} placeholder="Keterangan event" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Warna Kategori</label>
          <div className="flex gap-2">
            {COLORS.map(c => (
              <button key={c} onClick={() => setForm({ ...form, warna: c })}
                className={`w-8 h-8 rounded-full transition-transform ${form.warna === c ? "scale-125 ring-2 ring-offset-1 ring-gray-400" : ""}`}
                style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" checked={form.aktif} onChange={e => setForm({ ...form, aktif: e.target.checked })} className="rounded" />
          Event aktif / tampilkan di kalender
        </label>
      </div>
    </div>
  );
}
