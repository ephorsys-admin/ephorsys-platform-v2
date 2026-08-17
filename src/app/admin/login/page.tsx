"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setStatus("error");
      setError("Invalid email or password.");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 overflow-hidden select-none">
      {/* Background radial glow spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#74c316]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gray-200/50 blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#74c316]/5 blur-[90px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #74c316 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Header/Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#74c316] animate-pulse" />
            <span
              className="text-2xl font-black tracking-tight text-[#042407]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Ephorsys Console
            </span>
          </div>
          <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">Authentication Portal</p>
        </div>

        {/* Frosted Glass Login Card */}
        <div className="bg-white/80 border border-gray-200/50 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
          <div className="mb-6">
            <h1 className="text-xl font-black text-[#042407] tracking-tight">System Login</h1>
            <p className="text-gray-500 text-xs mt-1 font-medium">Enter your administrative credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#42720e]">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ephorsys.com"
                required
                className="w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 px-4 py-3 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#42720e]">
                <Lock className="w-3.5 h-3.5" />
                Security Key
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 px-4 py-3 pr-11 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 leading-relaxed font-medium">
                {error}
              </div>
            )}

            <button
              id="admin-login-submit"
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#74c316] hover:bg-[#85e219] text-[#021004] font-black py-3.5 px-4 rounded-xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(116,195,22,0.2)] hover:shadow-[0_4px_30px_rgba(116,195,22,0.3)]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />
                  Establishing connection...
                </>
              ) : (
                "Access Control"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
