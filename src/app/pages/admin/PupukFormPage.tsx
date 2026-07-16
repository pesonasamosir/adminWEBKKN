import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Save, Plus, X } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { KATEGORI_PUPUK } from "../../data/mockData";
import pupukService, { type PupukPayload } from "../../../services/pupuk.service";

export function PupukFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id && id !== "create");
  const [form, setForm] = useState<PupukPayload>({
    nama: "",
    kategori: "Organik",
    merek: "",
    deskripsi: "",
    kegunaan: [],
    panduan: "",
    dosis: "",
    foto: "https://images.unsplash.com/photo-1736259762078-2d2d6f327567?w=400&q=80",
    harga: "",
    ketersediaan: "tersedia",
    subsidi: false,
    aktif: true,
  });
  const [newKegunaan, setNewKegunaan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !id) return;

    const loadPupuk = async () => {
      try {
        setLoading(true);
        const data = await pupukService.getById(id);
        setForm({
          nama: data.nama,
          kategori: data.kategori,
          merek: data.merek,
          deskripsi: data.deskripsi,
          kegunaan: data.kegunaan,
          panduan: data.panduan,
          dosis: data.dosis,
          foto: data.foto,
          harga: data.harga,
          ketersediaan: data.ketersediaan,
          subsidi: data.subsidi,
          aktif: data.aktif,
        });
        setError(null);
      } catch (err) {
        setError("Gagal memuat data pupuk yang dipilih.");
      } finally {
        setLoading(false);
      }
    };

    loadPupuk();
  }, [id, isEdit]);

  const handleSave = async () => {
    if (!form.nama.trim()) return alert("Nama pupuk wajib diisi");

    try {
      setLoading(true);
      setError(null);

      if (isEdit && id) {
        await pupukService.update(id, form);
      } else {
        await pupukService.create(form);
      }

      navigate("/pupuk");
    } catch (err) {
      setError("Gagal menyimpan pupuk ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/pupuk"><button className="p-1.5 rounded-lg hover:bg-gray-100"><ChevronLeft size={18} /></button></Link>
          <h1 className="text-gray-800">{isEdit ? "Edit Pupuk" : "Tambah Pupuk"}</h1>
        </div>
        <Button onClick={handleSave} disabled={loading} style={{ backgroundColor: "#2E8B57" }} className="text-white gap-2"><Save size={14} /> {loading ? "Menyimpan..." : "Simpan"}</Button>
      </div>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      {loading && !isEdit ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Memuat data pupuk...</div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pupuk *</label>
                <Input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Merek</label>
                <Input value={form.merek} onChange={e => setForm({ ...form, merek: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <Textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Panduan Penggunaan</label>
              <Textarea value={form.panduan} onChange={e => setForm({ ...form, panduan: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosis</label>
              <Input value={form.dosis} onChange={e => setForm({ ...form, dosis: e.target.value })} placeholder="Contoh: 100-150 kg/ha" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cocok untuk Tanaman</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.kegunaan.map((k: string, i: number) => (
                  <span key={i} className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                    {k} <button onClick={() => setForm({ ...form, kegunaan: form.kegunaan.filter((_: string, j: number) => j !== i) })}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newKegunaan} onChange={e => setNewKegunaan(e.target.value)} onKeyDown={e => e.key === "Enter" && (form.kegunaan.length < 10 && newKegunaan.trim()) && (setForm({ ...form, kegunaan: [...form.kegunaan, newKegunaan.trim()] }), setNewKegunaan(""))} placeholder="Tambah tanaman" className="h-9" />
                <Button onClick={() => { if (newKegunaan.trim()) { setForm({ ...form, kegunaan: [...form.kegunaan, newKegunaan.trim()] }); setNewKegunaan(""); } }} variant="outline" size="sm"><Plus size={14} /></Button>
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
                  {KATEGORI_PUPUK.filter(k => k !== "Semua").map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Harga</label>
              <Input value={form.harga} onChange={e => setForm({ ...form, harga: e.target.value })} className="h-9" placeholder="Rp xxx.xxx/xx kg" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Ketersediaan</label>
              <Select value={form.ketersediaan} onValueChange={v => setForm({ ...form, ketersediaan: v })}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tersedia">Tersedia</SelectItem>
                  <SelectItem value="terbatas">Terbatas</SelectItem>
                  <SelectItem value="habis">Habis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.subsidi} onChange={e => setForm({ ...form, subsidi: e.target.checked })} className="rounded" />
                Pupuk subsidi pemerintah
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.aktif} onChange={e => setForm({ ...form, aktif: e.target.checked })} className="rounded" />
                Aktif / tampilkan
              </label>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-semibold text-gray-700">Foto Kemasan</h3>
            {form.foto && <img src={form.foto} alt="preview" className="w-full h-32 object-cover rounded-xl opacity-80" />}
            <Input placeholder="URL foto" value={form.foto} onChange={e => setForm({ ...form, foto: e.target.value })} className="h-9 text-xs" />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
