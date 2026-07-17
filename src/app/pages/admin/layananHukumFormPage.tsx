import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Save } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import layananHukumService, { type LayananHukumPayload } from "../../../services/layananHukum.service";

type LayananHukumFormValues = LayananHukumPayload & {
  jamOperasionalText: string;
  persyaratanText: string;
};

const bidangLayananOptions = [
  "Hukum Perdata",
  "Hukum Pidana",
  "Pertanahan",
  "Waris",
  "Perceraian",
  "UMKM",
  "Mediasi",
];

const createInitialForm = (source?: Partial<LayananHukumPayload>): LayananHukumFormValues => ({
  nama_firma: source?.nama_firma || "",
  foto: source?.foto || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
  deskripsi: source?.deskripsi || "",
  alamat: source?.alamat || "",
  link_gmaps: source?.link_gmaps || "",
  no_hp: source?.no_hp || "",
  email: source?.email || "",
  jam_operasional: Array.isArray(source?.jam_operasional) ? source.jam_operasional : [],
  bidang_layanan: Array.isArray(source?.bidang_layanan) ? source.bidang_layanan : [],
  nama_advokat: source?.nama_advokat || "",
  persyaratan_konsultasi: Array.isArray(source?.persyaratan_konsultasi) ? source.persyaratan_konsultasi : [],
  aktif: source?.aktif ?? true,
  jamOperasionalText: Array.isArray(source?.jam_operasional) ? source.jam_operasional.join("\n") : "",
  persyaratanText: Array.isArray(source?.persyaratan_konsultasi) ? source.persyaratan_konsultasi.join("\n") : "",
});

export function LayananHukumFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id && id !== "create");
  const [form, setForm] = useState<LayananHukumFormValues>(() => createInitialForm());
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) {
      setForm(createInitialForm());
      setError(null);
      return;
    }

    const loadLayanan = async () => {
      try {
        setIsLoading(true);
        const data = await layananHukumService.getById(id!);
        setForm(createInitialForm(data));
        setError(null);
      } catch (err) {
        setError("Gagal memuat layanan hukum yang dipilih.");
      } finally {
        setIsLoading(false);
      }
    };

    loadLayanan();
  }, [id, isEdit]);

  const parseList = (value: string) => value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);

  const handleSave = async () => {
    if (!(form.nama_firma || "").trim()) {
      alert("Nama firma wajib diisi");
      return;
    }

    if (!(form.deskripsi || "").trim()) {
      alert("Deskripsi wajib diisi");
      return;
    }

    if (form.bidang_layanan.length === 0) {
      alert("Pilih minimal satu bidang layanan");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      // Menambahkan ( || "" ) pada semua string sebelum di-.trim()
      // untuk mencegah error jika value-nya kebetulan undefined
      const payload: LayananHukumPayload = {
        nama_firma: (form.nama_firma || "").trim(),
        foto: (form.foto || "").trim(),
        deskripsi: (form.deskripsi || "").trim(),
        alamat: (form.alamat || "").trim(),
        link_gmaps: (form.link_gmaps || "").trim(),
        no_hp: (form.no_hp || "").trim(),
        email: (form.email || "").trim(),
        jam_operasional: parseList(form.jamOperasionalText || ""),
        bidang_layanan: form.bidang_layanan,
        nama_advokat: (form.nama_advokat || "").trim(),
        persyaratan_konsultasi: parseList(form.persyaratanText || ""),
        aktif: form.aktif,
      };

      if (isEdit && id) {
        await layananHukumService.update(id, payload);
      } else {
        await layananHukumService.create(payload);
      }

      navigate("/berita");
    } catch (err) {
      setError("Gagal menyimpan layanan hukum ke server.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/berita">
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"><ChevronLeft size={18} /></button>
          </Link>
          <div>
            <h1 className="text-gray-800">{isEdit ? "Edit Layanan Hukum" : "Tambah Layanan Hukum"}</h1>
            <p className="text-gray-500 text-sm">{isEdit ? "Mengedit data layanan hukum" : "Buat data layanan hukum baru"}</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving || isLoading} style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2 text-sm">
          <Save size={14} /> {isSaving ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      {isLoading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Memuat data layanan hukum...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Firma *</label>
                <Input placeholder="Contoh: Firma Hukum Harian" value={form.nama_firma || ""} onChange={(e) => setForm({ ...form, nama_firma: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Advokat</label>
                <Input placeholder="Nama pengacara / konsultan" value={form.nama_advokat || ""} onChange={(e) => setForm({ ...form, nama_advokat: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                <Textarea placeholder="Jelaskan layanan yang tersedia" rows={5} value={form.deskripsi || ""} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <Textarea placeholder="Alamat kantor / ruang konsultasi" rows={3} value={form.alamat || ""} onChange={(e) => setForm({ ...form, alamat: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Persyaratan Konsultasi</label>
                <Textarea placeholder="Masukkan satu persyaratan per baris" rows={4} value={form.persyaratanText || ""} onChange={(e) => setForm({ ...form, persyaratanText: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-semibold text-gray-700">Informasi Kontak</h3>
              <div>
                <label className="block text-sm text-gray-600 mb-1">No. HP</label>
                <Input placeholder="08xxxxxxxxxx" value={form.no_hp || ""} onChange={(e) => setForm({ ...form, no_hp: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <Input type="email" placeholder="nama@email.com" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Link Google Maps</label>
                <Input placeholder="https://maps.google.com/..." value={form.link_gmaps || ""} onChange={(e) => setForm({ ...form, link_gmaps: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Jam Operasional</label>
                <Textarea placeholder="Senin - Jumat, 08:00 - 16:00" rows={3} value={form.jamOperasionalText || ""} onChange={(e) => setForm({ ...form, jamOperasionalText: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="aktif" checked={form.aktif} onChange={(e) => setForm({ ...form, aktif: e.target.checked })} className="rounded" />
                <label htmlFor="aktif" className="text-sm text-gray-600">Tampilkan layanan ini</label>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-semibold text-gray-700">Bidang Layanan</h3>
              <div className="grid grid-cols-1 gap-2">
                {bidangLayananOptions.map((option) => {
                  const checked = form.bidang_layanan.includes(option);
                  return (
                    <label key={option} className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" checked={checked} onChange={() => {
                        const next = checked
                          ? form.bidang_layanan.filter((item) => item !== option)
                          : [...form.bidang_layanan, option];
                        setForm({ ...form, bidang_layanan: next });
                      }} />
                      {option}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-semibold text-gray-700">Thumbnail</h3>
              <div className="rounded-xl overflow-hidden h-32 bg-gray-100">
                {form.foto && <img src={form.foto} alt="preview" className="w-full h-full object-cover" />}
              </div>
              <Input placeholder="URL gambar thumbnail" value={form.foto || ""} onChange={(e) => setForm({ ...form, foto: e.target.value })} className="h-9 text-xs" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}