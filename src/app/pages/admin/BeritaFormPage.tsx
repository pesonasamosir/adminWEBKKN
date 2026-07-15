import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Save, Eye } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import { KATEGORI_BERITA } from "../../data/mockData";
import type { Berita } from "../../data/mockData";

export function BeritaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { berita, setBerita, desa } = useApp();
  const isEdit = id && id !== "create";
  const existing = isEdit ? berita.find(b => b.id === Number(id)) : null;

  const [form, setForm] = useState({
    judul: existing?.judul || "",
    kategori: existing?.kategori || "Umum",
    ringkasan: existing?.ringkasan || "",
    isi: existing?.isi || "",
    foto: existing?.foto || "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=800&q=80",
    penulis: existing?.penulis || "Admin Kecamatan",
    status: existing?.status || "draft",
    tanggal: existing?.tanggal || new Date().toISOString().split("T")[0],
    featured: existing?.featured || false,
    village_id: existing?.village_id ?? null as number | null,
  });

  const handleSave = () => {
    if (!form.judul.trim()) return alert("Judul wajib diisi");
    if (isEdit && existing) {
      setBerita(berita.map(b => b.id === existing.id ? { ...b, ...form } as Berita : b));
    } else {
      const newId = Math.max(...berita.map(b => b.id), 0) + 1;
      const slug = form.judul.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 50);
      setBerita([...berita, { id: newId, slug: `${slug}-${newId}`, ...form } as Berita]);
    }
    navigate("/berita");
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/berita">
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"><ChevronLeft size={18} /></button>
          </Link>
          <div>
            <h1 className="text-gray-800">{isEdit ? "Edit Berita" : "Tambah Berita"}</h1>
            <p className="text-gray-500 text-sm">{isEdit ? `Mengedit: ${existing?.judul}` : "Buat berita baru"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-sm">
            <Eye size={14} /> Preview
          </Button>
          <Button onClick={handleSave} style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2 text-sm">
            <Save size={14} /> Simpan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita *</label>
              <Input placeholder="Masukkan judul berita" value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan</label>
              <Textarea placeholder="Ringkasan singkat berita" rows={2} value={form.ringkasan} onChange={e => setForm({ ...form, ringkasan: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita *</label>
              <Textarea
                placeholder="Tulis isi berita di sini... (HTML diperbolehkan)"
                rows={12}
                value={form.isi}
                onChange={e => setForm({ ...form, isi: e.target.value })}
                className="font-mono text-xs"
              />
              <p className="text-xs text-gray-400 mt-1">HTML diperbolehkan: &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, dll</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-semibold text-gray-700">Pengaturan Publikasi</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v as "published" | "draft" })}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Tayang</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Kategori</label>
              <Select value={form.kategori} onValueChange={v => setForm({ ...form, kategori: v })}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {KATEGORI_BERITA.filter(k => k !== "Semua").map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Desa (opsional)</label>
              <Select
                value={form.village_id === null ? "kecamatan" : String(form.village_id)}
                onValueChange={v => setForm({ ...form, village_id: v === "kecamatan" ? null : Number(v) })}
              >
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kecamatan">Level Kecamatan</SelectItem>
                  {desa.filter(d => d.aktif).map(d => <SelectItem key={d.id} value={String(d.id)}>{d.nama}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tanggal Publish</label>
              <Input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })} className="h-9" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Penulis</label>
              <Input value={form.penulis} onChange={e => setForm({ ...form, penulis: e.target.value })} className="h-9" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
              <label htmlFor="featured" className="text-sm text-gray-600">Tampilkan sebagai unggulan</label>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-semibold text-gray-700">Thumbnail</h3>
            <div className="rounded-xl overflow-hidden h-32 bg-gray-100">
              {form.foto && <img src={form.foto} alt="preview" className="w-full h-full object-cover" />}
            </div>
            <Input placeholder="URL gambar thumbnail" value={form.foto} onChange={e => setForm({ ...form, foto: e.target.value })} className="h-9 text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}