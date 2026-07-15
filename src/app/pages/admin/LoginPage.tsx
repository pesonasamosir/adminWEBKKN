import { useState } from "react";
import { Navigate } from "react-router";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useApp } from "../../context/AppContext";

const NAVY = "#1B3A6B";

export function LoginPage() {
  const { isAuthenticated, login } = useApp();
  const [form, setForm] = useState({ email: "admin@kecharian.id", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const success = login(form.email, form.password);
    if (!success) setError("Email atau password salah.");
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay — very soft, like the reference */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(1px)" }} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/80 p-8">

          {/* Header */}
          <div className="text-center mb-7">
            <h1 className="text-xl font-bold" style={{ color: NAVY }}>
              Kecamatan Harian
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Portal Administrasi Kecamatan</p>
          </div>

          {/* Hint */}
          <div className="bg-blue-50 rounded-lg px-3 py-2 mb-5 text-xs text-blue-700 text-center">
            Demo: password <span className="font-semibold">admin123</span>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Masukkan email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 accent-blue-700"
                />
                <span className="text-sm text-gray-600">Ingat Saya</span>
              </label>
              <button type="button" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: NAVY }}>
                Lupa Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: NAVY }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : null}
              {loading ? "Memproses..." : "Masuk →"}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 mt-5">
            Hanya untuk staf berwenang.
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <p className="relative z-10 mt-6 text-xs text-white/70">
        © {new Date().getFullYear()} Kecamatan Harian, Kab. Samosir. Horas!
      </p>
    </div>
  );
}
