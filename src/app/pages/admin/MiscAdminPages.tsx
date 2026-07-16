// Miscellaneous Admin Pages: Profil, Struktur, Galeri, Kategori, Kontak, Settings, Users, ProfilSaya, Desa

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { Save, Plus, Trash2, Edit, Mail, Check, X, ChevronRight, Eye } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import { KECAMATAN_PROFIL, KECAMATAN_CONFIG, type Desa } from "../../data/mockData";
import desaService, { type Desa as DesaApi } from "../../../services/desa.service";
import strukturService, { type StrukturItem } from "../../../services/struktur.service";
import galeriService, { type GaleriItem } from "../../../services/galeri.service";
import kontakService, { type KontakItem } from "../../../services/kontak.service";
import kategoriService from "../../../services/kategori.service";

// backward compat aliases
const DESA_PROFIL = KECAMATAN_PROFIL;
const SITE_CONFIG = KECAMATAN_CONFIG;

// ============================================================
// Manajemen Desa Admin (List)
// ============================================================
export function DesaListAdminPage() {
  const { desa, setDesa } = useApp();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDesa = async () => {
      try {
        setLoading(true);
        const data = await desaService.getAll();
        setDesa(data as Desa[]);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data desa dari server.");
      } finally {
        setLoading(false);
      }
    };

    loadDesa();
  }, [setDesa]);

  const toggleActive = async (id: number) => {
    const target = desa.find((d) => d.id === id);
    if (!target) return;
    try {
      const updated = await desaService.update(id, { ...target, aktif: !target.aktif });
      setDesa(desa.map((d) => (d.id === id ? updated : d)) as Desa[]);
    } catch (err) {
      setError("Gagal mengubah status desa.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-800">Manajemen Desa</h1>
          <p className="text-gray-500 text-sm mt-1">{desa.length} desa di Kecamatan Harian</p>
        </div>
        <Link to="/desa/create">
          <Button style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2">
            <Plus size={16} /> Tambah Desa
          </Button>
        </Link>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Memuat data desa...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {desa.map(d => (
            <div key={d.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40 overflow-hidden">
              <img src={d.banner} alt={d.nama} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h3 className="text-white font-bold text-sm">{d.nama}</h3>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${d.aktif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {d.aktif ? "Aktif" : "Nonaktif"}
                </span>
              </div>
            </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{d.deskripsi}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span>👤 {d.penduduk.toLocaleString("id-ID")} jiwa</span>
                  <span>📍 {d.luas_wilayah}</span>
                  <span>🏠 {d.rt} RT / {d.rw} RW</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/desa/${d.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full gap-2 text-sm"><Edit size={14} /> Edit</Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => toggleActive(d.id)}
                    className={`text-sm ${d.aktif ? "text-orange-600 border-orange-200 hover:bg-orange-50" : "text-green-600 border-green-200 hover:bg-green-50"}`}
                  >
                    {d.aktif ? "Nonaktifkan" : "Aktifkan"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Form Desa Admin (Create/Edit)
// ============================================================
export function DesaFormAdminPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { desa, setDesa } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const existingDesa = id ? desa.find(d => d.id === Number(id)) : null;
  const isEdit = !!existingDesa;

  const [form, setForm] = useState({
    nama: existingDesa?.nama || "",
    slug: existingDesa?.slug || "",
    deskripsi: existingDesa?.deskripsi || "",
    foto: existingDesa?.foto || "",
    banner: existingDesa?.banner || "",
    kepala_desa: existingDesa?.kepala_desa || "",
    sekretaris: existingDesa?.sekretaris || "",
    penduduk: existingDesa?.penduduk || 0,
    luas_wilayah: existingDesa?.luas_wilayah || "",
    rt: existingDesa?.rt || 0,
    rw: existingDesa?.rw || 0,
    sejarah: existingDesa?.sejarah || "",
    visi: existingDesa?.visi || "",
    misi: existingDesa?.misi?.join("\n") || "",
    aktif: existingDesa?.aktif ?? true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!form.nama || !form.slug) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        nama: form.nama,
        slug: form.slug,
        deskripsi: form.deskripsi,
        foto: form.foto || "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=600&q=80",
        banner: form.banner || "https://images.unsplash.com/photo-1643005264349-aae1772b2186?w=1400&q=80",
        kepala_desa: form.kepala_desa,
        sekretaris: form.sekretaris,
        penduduk: Number(form.penduduk),
        luas_wilayah: form.luas_wilayah,
        rt: Number(form.rt),
        rw: Number(form.rw),
        sejarah: form.sejarah,
        visi: form.visi,
        misi: form.misi.split("\n").filter((m) => m.trim()),
        aktif: form.aktif,
      };

      let savedDesa: DesaApi;
      if (isEdit && existingDesa) {
        savedDesa = await desaService.update(existingDesa.id, payload);
        setDesa(desa.map((d) => (d.id === existingDesa.id ? savedDesa : d)) as Desa[]);
      } else {
        savedDesa = await desaService.create(payload);
        setDesa([...desa, savedDesa] as Desa[]);
      }

      setSaved(true);
      setTimeout(() => {
        navigate("/desa");
      }, 1000);
    } catch (err) {
      setError("Gagal menyimpan desa ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/desa" className="hover:text-blue-700">Manajemen Desa</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">{isEdit ? "Edit Desa" : "Tambah Desa"}</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-gray-800">{isEdit ? `Edit: ${existingDesa?.nama}` : "Tambah Desa Baru"}</h1>
        <Button onClick={handleSave} disabled={loading} style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2">
          {saved ? <><Check size={14} /> Tersimpan!</> : <><Save size={14} /> {loading ? "Menyimpan..." : "Simpan"}</>}
        </Button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Informasi Dasar</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Desa *</label>
            <Input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Desa Turpuk Sihotang" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug URL *</label>
            <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="turpuk-sihotang" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
          <Textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={3} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto Card</label>
            <Input value={form.foto} onChange={e => setForm({ ...form, foto: e.target.value })} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Banner/Header</label>
            <Input value={form.banner} onChange={e => setForm({ ...form, banner: e.target.value })} placeholder="https://..." />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Pejabat Desa</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kepala Desa</label>
            <Input value={form.kepala_desa} onChange={e => setForm({ ...form, kepala_desa: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sekretaris Desa</label>
            <Input value={form.sekretaris} onChange={e => setForm({ ...form, sekretaris: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Data Wilayah</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penduduk (jiwa)</label>
            <Input type="number" value={form.penduduk} onChange={e => setForm({ ...form, penduduk: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Luas Wilayah</label>
            <Input value={form.luas_wilayah} onChange={e => setForm({ ...form, luas_wilayah: e.target.value })} placeholder="12,8 km²" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah RT</label>
            <Input type="number" value={form.rt} onChange={e => setForm({ ...form, rt: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah RW</label>
            <Input type="number" value={form.rw} onChange={e => setForm({ ...form, rw: Number(e.target.value) })} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Visi, Misi & Sejarah</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Visi Desa</label>
          <Textarea value={form.visi} onChange={e => setForm({ ...form, visi: e.target.value })} rows={2} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Misi Desa (satu per baris)</label>
          <Textarea value={form.misi} onChange={e => setForm({ ...form, misi: e.target.value })} rows={4} placeholder="Misi pertama&#10;Misi kedua&#10;Misi ketiga" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sejarah Desa</label>
          <Textarea value={form.sejarah} onChange={e => setForm({ ...form, sejarah: e.target.value })} rows={5} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-800 text-sm">Status Desa</div>
          <div className="text-xs text-gray-500">Aktifkan agar desa tampil di website publik</div>
        </div>
        <button
          onClick={() => setForm({ ...form, aktif: !form.aktif })}
          className={`w-12 h-6 rounded-full transition-colors relative ${form.aktif ? "bg-green-500" : "bg-gray-300"}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.aktif ? "translate-x-6" : "translate-x-0.5"}`} />
        </button>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSave} style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2">
          {saved ? <><Check size={14} /> Tersimpan!</> : <><Save size={14} /> Simpan Desa</>}
        </Button>
        <Link to="/desa">
          <Button variant="outline">Batal</Button>
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// Profil Desa Admin
// ============================================================
export function ProfilAdminPage() {
  const [form, setForm] = useState({
    nama: SITE_CONFIG.nama,
    tagline: SITE_CONFIG.tagline,
    alamat: SITE_CONFIG.alamat,
    telepon: SITE_CONFIG.telepon,
    email: SITE_CONFIG.email,
    jam_ops: SITE_CONFIG.jam_operasional,
    visi: DESA_PROFIL.visi,
    sejarah: DESA_PROFIL.sejarah,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-800">Profil Desa</h1>
        <Button onClick={handleSave} style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2">
          {saved ? <><Check size={14} /> Tersimpan!</> : <><Save size={14} /> Simpan</>}
        </Button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Desa</label><Input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label><Input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label><Textarea value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })} rows={2} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label><Input value={form.telepon} onChange={e => setForm({ ...form, telepon: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Jam Operasional</label><Input value={form.jam_ops} onChange={e => setForm({ ...form, jam_ops: e.target.value })} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Visi Desa</label><Textarea value={form.visi} onChange={e => setForm({ ...form, visi: e.target.value })} rows={2} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Sejarah Desa</label><Textarea value={form.sejarah} onChange={e => setForm({ ...form, sejarah: e.target.value })} rows={6} /></div>
      </div>
    </div>
  );
}

// ============================================================
// Struktur Organisasi Admin
// ============================================================
export function StrukturAdminPage() {
  const { struktur, setStruktur } = useApp();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ nama: "", jabatan: "", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", periode: "" });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const loadStruktur = async () => {
      try {
        setLoading(true);
        const data = await strukturService.getAll();
        setStruktur(data as any[]);
        setError(null);
      } catch (err) {
        setError("Gagal memuat struktur organisasi dari server.");
      } finally {
        setLoading(false);
      }
    };

    loadStruktur();
  }, [setStruktur]);

  const handleAdd = async () => {
    if (!newItem.nama || !newItem.jabatan) return;
    try {
      const created = await strukturService.create(newItem);
      setStruktur([...struktur, created] as any[]);
      setNewItem({ nama: "", jabatan: "", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", periode: "" });
      setShowAdd(false);
      setError(null);
    } catch (err) {
      setError("Gagal menambah perangkat desa.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await strukturService.remove(id);
      setStruktur(struktur.filter((x) => x.id !== id));
    } catch (err) {
      setError("Gagal menghapus perangkat desa.");
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-800">Struktur Organisasi</h1>
        <Button onClick={() => setShowAdd(!showAdd)} style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2"><Plus size={16} /> Tambah Perangkat</Button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-4">Tambah Perangkat Desa</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm text-gray-600 mb-1 block">Nama *</label><Input value={newItem.nama} onChange={e => setNewItem({ ...newItem, nama: e.target.value })} /></div>
            <div><label className="text-sm text-gray-600 mb-1 block">Jabatan *</label><Input value={newItem.jabatan} onChange={e => setNewItem({ ...newItem, jabatan: e.target.value })} /></div>
            <div><label className="text-sm text-gray-600 mb-1 block">Periode</label><Input value={newItem.periode} onChange={e => setNewItem({ ...newItem, periode: e.target.value })} placeholder="2021-2027" /></div>
            <div><label className="text-sm text-gray-600 mb-1 block">URL Foto</label><Input value={newItem.foto} onChange={e => setNewItem({ ...newItem, foto: e.target.value })} /></div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button onClick={handleAdd} style={{ backgroundColor: "#2E8B57" }} className="text-white text-sm">Tambah</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)} className="text-sm">Batal</Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Perangkat</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Jabatan</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Periode</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Memuat struktur...</td></tr>
            ) : struktur.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={s.foto} alt={s.nama} className="w-9 h-9 rounded-full object-cover" />
                    <span className="font-medium text-gray-800 text-sm">{s.nama}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{s.jabatan}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{s.periode || "-"}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// Galeri Admin
// ============================================================
export function GaleriAdminPage() {
  const { galeri, setGaleri } = useApp();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newFoto, setNewFoto] = useState({ foto: "", judul: "", kategori: "Wisata" });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const loadGaleri = async () => {
      try {
        setLoading(true);
        const data = await galeriService.getAll();
        setGaleri(data as any[]);
        setError(null);
      } catch (err) {
        setError("Gagal memuat galeri dari server.");
      } finally {
        setLoading(false);
      }
    };

    loadGaleri();
  }, [setGaleri]);

  const handleAdd = async () => {
    if (!newFoto.foto || !newFoto.judul) return;
    try {
      const created = await galeriService.create({ foto: newFoto.foto, judul: newFoto.judul, kategori: newFoto.kategori, village_id: null });
      setGaleri([...galeri, created] as any[]);
      setNewFoto({ foto: "", judul: "", kategori: "Wisata" });
      setShowAdd(false);
      setError(null);
    } catch (err) {
      setError("Gagal menambah foto ke galeri.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await galeriService.remove(id);
      setGaleri(galeri.filter((x) => x.id !== id));
    } catch (err) {
      setError("Gagal menghapus foto galeri.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-gray-800">Galeri Foto</h1><p className="text-gray-500 text-sm">{galeri.length} foto</p></div>
        <Button onClick={() => setShowAdd(!showAdd)} style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2"><Plus size={16} /> Tambah Foto</Button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-200 space-y-3">
          <h3 className="font-semibold text-gray-800">Tambah Foto Baru</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2"><label className="text-sm text-gray-600 mb-1 block">URL Foto *</label><Input value={newFoto.foto} onChange={e => setNewFoto({ ...newFoto, foto: e.target.value })} placeholder="https://..." /></div>
            <div><label className="text-sm text-gray-600 mb-1 block">Kategori</label>
              <Select value={newFoto.kategori} onValueChange={v => setNewFoto({ ...newFoto, kategori: v })}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Wisata", "Budaya", "UMKM", "Kegiatan Desa", "Event"].map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-3"><label className="text-sm text-gray-600 mb-1 block">Judul Foto *</label><Input value={newFoto.judul} onChange={e => setNewFoto({ ...newFoto, judul: e.target.value })} /></div>
          </div>
          {newFoto.foto && <img src={newFoto.foto} alt="preview" className="h-32 rounded-xl object-cover" />}
          <div className="flex gap-2">
            <Button onClick={handleAdd} style={{ backgroundColor: "#2E8B57" }} className="text-white text-sm">Tambah</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)} className="text-sm">Batal</Button>
          </div>
        </div>
      )}

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Memuat galeri...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {galeri.map(g => (
            <div key={g.id} className="group relative rounded-xl overflow-hidden shadow-sm">
              <img src={g.foto} alt={g.judul} className="w-full h-28 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all" />
              <button
                onClick={() => handleDelete(g.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X size={12} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-xs truncate">{g.judul}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Kategori Admin
// ============================================================
export function KategoriPage() {
  const [kategoriGroups, setKategoriGroups] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadKategori = async () => {
      try {
        setLoading(true);
        const data = await kategoriService.getAll();
        setKategoriGroups(data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat kategori dari server.");
      } finally {
        setLoading(false);
      }
    };

    loadKategori();
  }, []);

  const groups = Object.entries(kategoriGroups).map(([key, items]) => ({
    nama: `Kategori ${key.charAt(0).toUpperCase()}${key.slice(1)}`,
    items,
  }));

  return (
    <div className="space-y-5">
      <h1 className="text-gray-800">Manajemen Kategori</h1>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Memuat kategori...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div key={group.nama} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">{group.nama}</h3>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div key={item} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700">{item}</span>
                    <div className="flex gap-1">
                      <button className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600"><Edit size={13} /></button>
                      <button className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-1 py-2 rounded-lg border border-dashed border-gray-200 text-xs text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors">
                <Plus size={12} /> Tambah Kategori
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Pesan Kontak Admin
// ============================================================
export function KontakAdminPage() {
  const { pesan, setPesan } = useApp();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = pesan.find((p: any) => p.id === selectedId);

  useEffect(() => {
    const loadKontak = async () => {
      try {
        setLoading(true);
        const data = await kontakService.getAll();
        setPesan(data as any[]);
        setError(null);
      } catch (err) {
        setError("Gagal memuat pesan kontak dari server.");
      } finally {
        setLoading(false);
      }
    };

    loadKontak();
  }, [setPesan]);

  const markRead = async (id: number) => {
    try {
      const updated = await kontakService.markAsRead(id);
      setPesan(pesan.map((p: any) => (p.id === id ? updated : p)));
    } catch (err) {
      setError("Gagal menandai pesan sebagai dibaca.");
    }
  };
  const deletePesan = async (id: number) => {
    try {
      await kontakService.remove(id);
      setPesan(pesan.filter((p: any) => p.id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (err) {
      setError("Gagal menghapus pesan.");
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-gray-800">Pesan Kontak</h1>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-700">Semua Pesan ({pesan.length}) — {pesan.filter((p: any) => !p.dibaca).length} belum dibaca</p>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="p-4 text-sm text-gray-400">Memuat pesan...</div>
            ) : pesan.map((p: any) => (
              <div key={p.id} onClick={() => { setSelectedId(p.id); markRead(p.id); }}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedId === p.id ? "bg-blue-50" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!p.dibaca && <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                      <p className={`text-sm ${!p.dibaca ? "font-semibold text-gray-800" : "font-medium text-gray-600"} truncate`}>{p.nama}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{p.subjek}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.tanggal}</p>
                  </div>
                  <button onClick={e => { e.stopPropagation(); deletePesan(p.id); }} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 ml-2">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">{selected.subjek}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Dari: {selected.nama} ({selected.email})</p>
                  <p className="text-xs text-gray-400">{selected.tanggal}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${selected.dibaca ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {selected.dibaca ? "Dibaca" : "Belum Dibaca"}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{selected.pesan}</div>
              <div className="mt-4 flex gap-2">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subjek}`}>
                  <Button style={{ backgroundColor: "#1A56A0" }} className="text-white gap-2 text-sm"><Mail size={14} /> Balas Email</Button>
                </a>
                <Button variant="outline" onClick={() => deletePesan(selected.id)} className="text-sm gap-2 text-red-600 border-red-200 hover:bg-red-50"><Trash2 size={14} /> Hapus</Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <Mail size={40} className="mx-auto mb-2 opacity-30" />
                <p>Pilih pesan untuk membaca</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



