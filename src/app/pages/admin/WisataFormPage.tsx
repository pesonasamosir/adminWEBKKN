import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Save, Plus, X } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import { KATEGORI_WISATA } from "../../data/mockData";
import type { Wisata } from "../../data/mockData";

export function WisataFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wisata, setWisata, desa } = useApp();
  const isEdit = id && id !== "create";
  const existing = isEdit ? wisata.find(w => w.id === Number(id)) : null;

  const [form, setForm] = useState({
    nama: existing?.nama || "",
    kategori: existing?.kategori || "Alam",
    deskripsi: existing?.deskripsi || "",
    foto: existing?.foto || "https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=800&q=80",
    galeri: existing?.galeri || [],
    jam_buka: existing?.jam_buka || "08.00 - 17.00 WIB",
    tiket: existing?.tiket || "Gratis",
    fasilitas: existing?.fasilitas || [],
    lokasi: existing?.lokasi || "",
    rating: existing?.rating || 4.5,
    featured: existing?.featured || false,
    aktif: existing?.aktif !== undefined ? existing.aktif : true,
    village_id: existing?.village_id ?? null as number | null,
  });

  const [newFasilitas, setNewFasilitas] = useState("");

  const addFasilitas = () => {
    if (newFasilitas.trim()) {
      setForm({ ...form, fasilitas: [...form.fasilitas, newFasilitas.trim()] });
      setNewFasilitas("");
    }
  };

  const handleSave = () => {
    if (!form.nama.trim()) return alert("Nama wisata wajib diisi");
    const slug = form.nama.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    if (isEdit && existing) {
      setWisata(wisata.map(w => w.id === existing.id ? { ...w, ...form, slug: w.slug } as Wisata : w));
    } else {
      const newId = Math.max(...wisata.map(w => w.id), 0) + 1;
      setWisata([...wisata, { id: newId, slug: `${slug}-${newId}`, koordinat: { lat: 2.6833, lng: 98.8517 }, ...form } as Wisata]);
    }
    navigate("/wisata");
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/wisata"><button className="p-1.5 rounded-lg hover:bg-gray-100"><ChevronLeft size={18} /></button></Link>
          <h1 className="text-gray-800">{isEdit ? "Edit Wisata" : "Tambah Wisata"}</h1>
        </div>
        <Button onClick={handleSave} style={{ backgroundColor: "#2E8B57" }} className="text-white gap-2"><Save size={14} /> Simpan</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Wisata *</label>
              <Input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Nama destinasi wisata" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <Textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={4} placeholder="Deskripsi lengkap wisata" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Buka</label>
                <Input value={form.jam_buka} onChange={e => setForm({ ...form, jam_buka: e.target.value })} className="h-9" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga Tiket</label>
                <Input value={form.tiket} onChange={e => setForm({ ...form, tiket: e.target.value })} className="h-9" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <Input value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })} placeholder="Nama jalan, desa, kecamatan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fasilitas</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.fasilitas.map((f, i) => (
                  <span key={i} className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                    {f} <button onClick={() => setForm({ ...form, fasilitas: form.fasilitas.filter((_, j) => j !== i) })}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newFasilitas} onChange={e => setNewFasilitas(e.target.value)} onKeyDown={e => e.key === "Enter" && addFasilitas()} placeholder="Tambah fasilitas" className="h-9" />
                <Button onClick={addFasilitas} variant="outline" size="sm"><Plus size={14} /></Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Kategori</label>
              <Select value={form.kategori} onValueChange={v => setForm({ ...form, kategori: v })}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {KATEGORI_WISATA.filter(k => k !== "Semua").map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Rating (1-5)</label>
              <Input type="number" min={1} max={5} step={0.1} value={form.rating} onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) })} className="h-9" />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                Tampilkan sebagai unggulan
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.aktif} onChange={e => setForm({ ...form, aktif: e.target.checked })} className="rounded" />
                Aktifkan wisata
              </label>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-semibold text-gray-700">Foto Utama</h3>
            {form.foto && <img src={form.foto} alt="preview" className="w-full h-36 object-cover rounded-xl" />}
            <Input placeholder="URL foto utama" value={form.foto} onChange={e => setForm({ ...form, foto: e.target.value })} className="h-9 text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}