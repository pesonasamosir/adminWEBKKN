import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Save, Eye } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import { KATEGORI_BERITA } from "../../data/mockData";
import beritaService, { type BeritaPayload } from "../../../services/berita.service";

type BeritaFormValues = BeritaPayload & { slug?: string };

const createInitialForm = (source?: Partial<BeritaPayload>): BeritaFormValues => ({
  judul: source?.judul || "",
  kategori: source?.kategori || "Umum",
  ringkasan: source?.ringkasan || "",
  isi: source?.isi || "",
  foto: source?.foto || "https://images.unsplash.com/photo-1773562629318-03fc9fcef40e?w=800&q=80",
  penulis: source?.penulis || "Admin Kecamatan",
  status: (source?.status as "draft" | "published") || "draft",
  tanggal: source?.tanggal || new Date().toISOString().split("T")[0],
  featured: source?.featured || false,
  village_id: source?.village_id ?? null,
  slug: source?.slug || "",
});

export function BeritaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { desa } = useApp();
  const isEdit = Boolean(id && id !== "create");
  const [form, setForm] = useState<BeritaFormValues>(() => createInitialForm());
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) {
      setForm(createInitialForm());
      setError(null);
      return;
    }

    const loadBerita = async () => {
      try {
        setIsLoading(true);
        const data = await beritaService.getById(id!);
        setForm(createInitialForm(data));
        setError(null);
      } catch (err) {
        setError("Gagal memuat berita yang dipilih.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBerita();
  }, [id, isEdit]);

  const handleSave = async () => {
    if (!form.judul.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const payload: BeritaPayload = {
        judul: form.judul.trim(),
        kategori: form.kategori,
        ringkasan: form.ringkasan,
        isi: form.isi,
        foto: form.foto,
        penulis: form.penulis,
        tanggal: form.tanggal,
        status: form.status as "draft" | "published",
        featured: form.featured,
        village_id: form.village_id,
      };

      const slug = form.judul.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 50);
      const payloadToSend = { ...payload, slug: form.slug || `${slug}-${Date.now()}` };

      if (isEdit && id) {
        await beritaService.update(id, payloadToSend);
      } else {
        await beritaService.create(payloadToSend);
      }

      navigate("/berita");
    } catch (err) {
      setError("Gagal menyimpan berita ke server.");
    } finally {
      setIsSaving(false);
    }
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
            <p className="text-gray-500 text-sm">{isEdit ? "Mengedit berita yang dipilih" : "Buat berita baru"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-sm">
            <Eye size={14} /> Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving || isLoading} style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2 text-sm">
            <Save size={14} /> {isSaving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      {isLoading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Memuat data berita...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita *</label>
                <Input placeholder="Masukkan judul berita" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan</label>
                <Textarea placeholder="Ringkasan singkat berita" rows={2} value={form.ringkasan} onChange={(e) => setForm({ ...form, ringkasan: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita *</label>
                <Textarea
                  placeholder="Tulis isi berita di sini... (HTML diperbolehkan)"
                  rows={12}
                  value={form.isi}
                  onChange={(e) => setForm({ ...form, isi: e.target.value })}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-gray-400 mt-1">HTML diperbolehkan: &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, dll</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-semibold text-gray-700">Pengaturan Publikasi</h3>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Status</label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as "published" | "draft" })}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Tayang</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Kategori</label>
                <Select value={form.kategori} onValueChange={(v) => setForm({ ...form, kategori: v })}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {KATEGORI_BERITA.filter((k) => k !== "Semua").map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Desa (opsional)</label>
                <Select
                  value={form.village_id === null ? "kecamatan" : String(form.village_id)}
                  onValueChange={(v) => setForm({ ...form, village_id: v === "kecamatan" ? null : Number(v) })}
                >
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kecamatan">Level Kecamatan</SelectItem>
                    {desa.filter((d) => d.aktif).map((d) => <SelectItem key={d.id} value={String(d.id)}>{d.nama}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tanggal Publish</label>
                <Input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="h-9" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Penulis</label>
                <Input value={form.penulis} onChange={(e) => setForm({ ...form, penulis: e.target.value })} className="h-9" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                <label htmlFor="featured" className="text-sm text-gray-600">Tampilkan sebagai unggulan</label>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-semibold text-gray-700">Thumbnail</h3>
              <div className="rounded-xl overflow-hidden h-32 bg-gray-100">
                {form.foto && <img src={form.foto} alt="preview" className="w-full h-full object-cover" />}
              </div>
              <Input placeholder="URL gambar thumbnail" value={form.foto} onChange={(e) => setForm({ ...form, foto: e.target.value })} className="h-9 text-xs" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}