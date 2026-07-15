import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Save, Plus, X } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import { KATEGORI_UMKM } from "../../data/mockData";
import type { UMKM } from "../../data/mockData";

export function UMKMFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { umkm, setUmkm } = useApp();
  const isEdit = id && id !== "create";
  const existing = isEdit ? umkm.find(u => u.id === Number(id)) : null;

  const [form, setForm] = useState({
    nama: existing?.nama || "",
    kategori: existing?.kategori || "Kuliner",
    deskripsi: existing?.deskripsi || "",
    produk: existing?.produk || [],
    foto: existing?.foto || "https://images.unsplash.com/photo-1767678233351-9308d8220fa5?w=400&q=80",
    pemilik: existing?.pemilik || "",
    telepon: existing?.telepon || "",
    instagram: existing?.instagram || "",
    whatsapp: existing?.whatsapp || "",
    alamat: existing?.alamat || "",
    aktif: existing?.aktif !== undefined ? existing.aktif : true,
  });
  const [newProduk, setNewProduk] = useState("");

  const addProduk = () => {
    if (newProduk.trim()) { setForm({ ...form, produk: [...form.produk, newProduk.trim()] }); setNewProduk(""); }
  };

  const handleSave = () => {
    if (!form.nama.trim()) return alert("Nama UMKM wajib diisi");
    if (isEdit && existing) {
      setUmkm(umkm.map(u => u.id === existing.id ? { ...u, ...form } as UMKM : u));
    } else {
      const newId = Math.max(...umkm.map(u => u.id), 0) + 1;
      setUmkm([...umkm, { id: newId, ...form } as UMKM]);
    }
    navigate("/umkm");
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/umkm"><button className="p-1.5 rounded-lg hover:bg-gray-100"><ChevronLeft size={18} /></button></Link>
          <h1 className="text-gray-800">{isEdit ? "Edit UMKM" : "Tambah UMKM"}</h1>
        </div>
        <Button onClick={handleSave} style={{ backgroundColor: "#E67E22" }} className="text-white gap-2"><Save size={14} /> Simpan</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama UMKM *</label>
                <Input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pemilik</label>
                <Input value={form.pemilik} onChange={e => setForm({ ...form, pemilik: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <Textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                <Input value={form.telepon} onChange={e => setForm({ ...form, telepon: e.target.value })} placeholder="0812-xxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (tanpa +)</label>
                <Input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="628xxxxxxxxx" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <Input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="@username" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <Input value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Produk / Layanan</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.produk.map((p, i) => (
                  <span key={i} className="flex items-center gap-1 bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full">
                    {p} <button onClick={() => setForm({ ...form, produk: form.produk.filter((_, j) => j !== i) })}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newProduk} onChange={e => setNewProduk(e.target.value)} onKeyDown={e => e.key === "Enter" && addProduk()} placeholder="Tambah produk" className="h-9" />
                <Button onClick={addProduk} variant="outline" size="sm"><Plus size={14} /></Button>
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
                  {KATEGORI_UMKM.filter(k => k !== "Semua").map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" checked={form.aktif} onChange={e => setForm({ ...form, aktif: e.target.checked })} className="rounded" />
              UMKM aktif / tampilkan
            </label>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-semibold text-gray-700">Foto</h3>
            {form.foto && <img src={form.foto} alt="preview" className="w-full h-36 object-cover rounded-xl" />}
            <Input placeholder="URL foto" value={form.foto} onChange={e => setForm({ ...form, foto: e.target.value })} className="h-9 text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}
