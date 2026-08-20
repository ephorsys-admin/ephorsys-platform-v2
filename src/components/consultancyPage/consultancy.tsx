"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Send,
  Shield,
  Clock,
  MessageCircle,
  Target,
  Users,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  CONSULTANCY_SERVICES,
  BUDGET_RANGES,
  TIMELINES,
} from "@/schemas/consultancy.schema";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  city: string;
  country: string;
  service: string;
  budgetRange: string;
  timeline: string;
  requirements: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "loading" | "success" | "error";

/* ─── Defaults ───────────────────────────────────────────────────────────────── */

const defaultForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  companyName: "",
  city: "",
  country: "India",
  service: "",
  budgetRange: "",
  timeline: "",
  requirements: "",
};

/* ─── Benefits list ──────────────────────────────────────────────────────────── */

const BENEFITS = [
  { icon: Clock, text: "30-minute free strategy call — no obligation" },
  { icon: MessageCircle, text: "Discuss your specific business challenge" },
  { icon: Target, text: "Get a clear solution recommendation" },
  { icon: Zap, text: "Understand timeline and pricing" },
  { icon: Users, text: "Speak directly with our technical team" },
  { icon: Shield, text: "Response within 4-8 business hours" },
] as const;

/* ─── Service tags ───────────────────────────────────────────────────────────── */

const SERVICE_TAGS = [
  "Website Development",
  "E-commerce",
  "Social Media",
  "SEO",
  "Google/Meta Ads",
  "HRMS",
  "CRM",
  "Fleet Management",
  "Custom Dashboard",
  "ERP",
  "Mobile App",
  "Offshore Development",
] as const;

/* ─── Animation variants ─────────────────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ═══════════════════════════════════════════════════════════════════════════════
   ConsultancyPage Component
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function ConsultancyPage() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* ── Validation ──────────────────────────────────────────────────────────── */

  const validate = (): FormErrors => {
    const e: FormErrors = {};

    if (!form.fullName.trim()) {
      e.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\s'-]+$/.test(form.fullName.trim())) {
      e.fullName = "Name cannot contain numbers";
    }

    if (!form.phone.trim()) {
      e.phone = "Phone / WhatsApp is required";
    } else if (!/^\+?\d{7,15}$/.test(form.phone.trim())) {
      e.phone = "Enter a valid phone number";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    if (!form.service) {
      e.service = "Please select a service";
    }

    return e;
  };

  /* ── Helpers ─────────────────────────────────────────────────────────────── */

  const set =
    (field: keyof FormState) =>
    (
      ev: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [field]: ev.target.value }));
      if (errors[field])
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const inputCls = (err?: string): string =>
    [
      "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all duration-200",
      "placeholder:text-gray-400 bg-white font-heading",
      err
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100 text-gray-800"
        : "border-gray-200 focus:border-[#74c316] focus:ring-2 focus:ring-[#74c316]/20 text-gray-800",
    ].join(" ");

  /* ── Submit ──────────────────────────────────────────────────────────────── */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/consultancy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error?.message || "Server error");
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to send your request. Please try again.");
      setStatus("error");
    }
  };

  /* ── Success State ───────────────────────────────────────────────────────── */

  if (status === "success") {
    return (
      <section className="w-full py-16 sm:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-xl shadow-black/5 border border-gray-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 300,
              delay: 0.1,
            }}
            className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-200"
            style={{ background: "rgba(116,194,22,0.08)" }}
          >
            <CheckCircle2
              className="h-10 w-10"
              strokeWidth={1.8}
              style={{ color: "#74c316" }}
            />
          </motion.div>
          <h3 className="mb-2 text-2xl font-black text-gray-900">
            Request Sent! 🎉
          </h3>
          <p className="text-gray-500 mb-6">
            Thank you for reaching out. Our team will contact you within 4-8
            business hours.
          </p>
          <button
            onClick={() => {
              setForm(defaultForm);
              setStatus("idle");
            }}
            className="rounded-xl px-8 py-3 font-bold text-white cursor-pointer transition-all duration-200 hover:brightness-110"
            style={{ background: "#74c316" }}
          >
            Send Another Request
          </button>
        </motion.div>
      </section>
    );
  }

  /* ── Main Render ─────────────────────────────────────────────────────────── */

  return (
    <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ═══ Left Column — Info ═══ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-8 lg:sticky lg:top-32"
          >
            {/* Heading */}
            <motion.div custom={0} variants={fadeUp}>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-gray-900 leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                What Happens in the Consultation?
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed text-[0.95rem] max-w-lg">
                Our team will understand your business, your current challenges
                and what you are looking to build or improve. We will recommend
                the right solution, share a rough timeline and give you an
                honest cost estimate.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.ul custom={1} variants={fadeUp} className="space-y-3.5">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 group">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(116,194,22,0.12)" }}
                  >
                    <Icon
                      className="h-3.5 w-3.5"
                      strokeWidth={2.4}
                      style={{ color: "#74c316" }}
                    />
                  </span>
                  <span className="text-gray-600 text-[0.9rem] leading-snug">
                    {text}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Service tags */}
            <motion.div custom={2} variants={fadeUp}>
              <h4
                className="text-sm font-bold text-gray-900 mb-3 tracking-wide"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                We can help you with:
              </h4>
              <div className="flex flex-wrap gap-2">
                {SERVICE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.04] cursor-default"
                    style={{
                      background: "rgba(116,194,22,0.08)",
                      color: "#4a8a10",
                      border: "1px solid rgba(116,194,22,0.18)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ Right Column — Form ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/[0.04] border border-gray-100"
          >
            {/* Form header */}
            <div className="mb-7">
              <h3
                className="text-xl sm:text-2xl font-extrabold text-gray-900"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Fill the Form Below
              </h3>
              <p className="text-sm text-gray-400 mt-1.5">
                We will contact you within 4-8 business hours to schedule the
                consultation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.fullName}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[0-9]/g, "");
                      setForm((prev) => ({ ...prev, fullName: val }));
                      if (errors.fullName)
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    placeholder="Your full name"
                    className={inputCls(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] font-medium text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^+\d]/g, "").slice(0, 15);
                      setForm((prev) => ({ ...prev, phone: val }));
                      if (errors.phone)
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="+91 9777780688"
                    className={inputCls(errors.phone)}
                  />
                  {errors.phone && (
                    <p className="text-[11px] font-medium text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@company.com"
                    className={inputCls(errors.email)}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Company Name
                  </label>
                  <input
                    value={form.companyName}
                    onChange={set("companyName")}
                    placeholder="Your company name"
                    className={inputCls()}
                  />
                </div>
              </div>

              {/* Row 3: City + Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    City
                  </label>
                  <input
                    value={form.city}
                    onChange={set("city")}
                    placeholder="Your city"
                    className={inputCls()}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Country
                  </label>
                  <input
                    value={form.country}
                    onChange={set("country")}
                    placeholder="India"
                    className={inputCls()}
                  />
                </div>
              </div>

              {/* Row 4: Service + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    What Do You Need? <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={form.service}
                    onValueChange={(value) => {
                      setForm((prev) => ({ ...prev, service: value }));
                      if (errors.service)
                        setErrors((prev) => ({ ...prev, service: undefined }));
                    }}
                  >
                    <SelectTrigger
                      className={`font-heading rounded-xl py-5 cursor-pointer w-full ${
                        errors.service
                          ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select service..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border border-gray-100 max-h-64">
                      {CONSULTANCY_SERVICES.map((s) => (
                        <SelectItem
                          key={s}
                          value={s}
                          className="cursor-pointer rounded-lg"
                        >
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-[11px] font-medium text-red-500">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Budget Range
                  </label>
                  <Select
                    value={form.budgetRange}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, budgetRange: value }))
                    }
                  >
                    <SelectTrigger className="font-heading rounded-xl py-5 cursor-pointer w-full">
                      <SelectValue placeholder="Select budget..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border border-gray-100 max-h-64">
                      {BUDGET_RANGES.map((b) => (
                        <SelectItem
                          key={b}
                          value={b}
                          className="cursor-pointer rounded-lg"
                        >
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 5: Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Timeline
                  </label>
                  <Select
                    value={form.timeline}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, timeline: value }))
                    }
                  >
                    <SelectTrigger className="font-heading rounded-xl py-5 cursor-pointer w-full">
                      <SelectValue placeholder="Select timeline..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border border-gray-100">
                      {TIMELINES.map((t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          className="cursor-pointer rounded-lg"
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 6: Requirements */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Your Requirements (Optional)
                </label>
                <textarea
                  value={form.requirements}
                  onChange={set("requirements")}
                  rows={4}
                  placeholder="Tell us about your project or business challenge..."
                  className={`${inputCls()} resize-none font-heading`}
                />
              </div>

              {/* Error message */}
              {errorMsg && (
                <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative w-full py-3.5 rounded-xl text-base font-bold tracking-wide overflow-hidden transition-all duration-200 hover:brightness-110 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #74c316 0%, #5fa010 100%)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(116,194,22,0.3)",
                }}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="relative">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 relative" />
                    <span className="relative">Send My Requirements</span>
                  </>
                )}
              </button>

              {/* Footer note */}
              <p className="text-center text-xs text-gray-400 mt-1">
                We respond within 4-8 business hours. No spam, ever.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
