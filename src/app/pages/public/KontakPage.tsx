import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { SITE_CONFIG } from "../../data/mockData";

export function KontakPage() {
  const [form, setForm] = useState({ nama: "", email: "", subjek: "", pesan: "", captcha: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const captchaAnswer = "12"; // 7 + 5

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email tidak valid";
    if (!form.subjek.trim()) e.subjek = "Subjek wajib diisi";
    if (!form.pesan.trim() || form.pesan.length < 10) e.pesan = "Pesan minimal 10 karakter";
    if (form.captcha !== captchaAnswer) e.captcha = "Jawaban captcha salah";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-48" style={{ background: "linear-gradient(135deg, #1A56A0 0%, #0d3d7a 100%)" }}>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-white mb-2">Hubungi Kami</h1>
            <p className="text-blue-200 text-sm">Ada pertanyaan? Kami siap membantu Anda</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: "#2E8B57" }} />
                  <h2 className="text-gray-800 mb-2">Pesan Terkirim!</h2>
                  <p className="text-gray-500 text-sm">Terima kasih, {form.nama}! Kami akan menghubungi Anda segera.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ nama: "", email: "", subjek: "", pesan: "", captcha: "" }); }}
                    className="mt-6 px-5 py-2 rounded-full text-white text-sm font-medium" style={{ backgroundColor: "#1A56A0" }}>
                    Kirim Pesan Lagi
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-gray-800 mb-1">Kirim Pesan</h2>
                  <p className="text-gray-500 text-sm mb-5">Isi formulir di bawah ini dan kami akan membalas sesegera mungkin.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                        <Input placeholder="Nama Anda" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
                        {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <Input type="email" placeholder="email@contoh.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subjek *</label>
                      <Input placeholder="Topik pesan Anda" value={form.subjek} onChange={e => setForm({ ...form, subjek: e.target.value })} />
                      {errors.subjek && <p className="text-red-500 text-xs mt-1">{errors.subjek}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pesan *</label>
                      <Textarea placeholder="Tuliskan pesan Anda..." rows={5} value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
                      {errors.pesan && <p className="text-red-500 text-xs mt-1">{errors.pesan}</p>}
                    </div>
                    {/* CAPTCHA */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Verifikasi: Berapa hasil dari 7 + 5? *</label>
                      <Input placeholder="Masukkan jawaban" value={form.captcha} onChange={e => setForm({ ...form, captcha: e.target.value })} className="max-w-xs" />
                      {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}
                    </div>
                    <Button type="submit" className="text-white gap-2" style={{ backgroundColor: "#1A56A0" }}>
                      <Send size={16} /> Kirim Pesan
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Info & Maps */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Informasi Kontak</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Alamat", val: SITE_CONFIG.alamat, color: "#1A56A0" },
                  { icon: Phone, label: "Telepon", val: SITE_CONFIG.telepon, color: "#2E8B57" },
                  { icon: Mail, label: "Email", val: SITE_CONFIG.email, color: "#E67E22" },
                  { icon: Clock, label: "Jam Layanan", val: SITE_CONFIG.jam_operasional, color: "#7C3AED" },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${info.color}15` }}>
                      <info.icon size={14} style={{ color: info.color }} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">{info.label}</div>
                      <div className="text-sm text-gray-700">{info.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maps */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <h3 className="font-semibold text-gray-800">Peta Lokasi</h3>
              </div>
              <iframe
                title="Lokasi Kantor Desa"
                src={`https://maps.google.com/maps?q=${SITE_CONFIG.koordinat.lat},${SITE_CONFIG.koordinat.lng}&z=14&output=embed`}
                className="w-full h-56"
                loading="lazy"
              />
            </div>

            {/* WA */}
            <a href="https://wa.me/6282165234567" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-medium text-sm" style={{ backgroundColor: "#25D366" }}>
              💬 Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
