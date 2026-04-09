"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  Building,
  CheckCircle2,
  Loader2,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// ─── Types ────────────────────────────────────────────────────────────────────

type LucideIcon = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

interface FieldProps {
  label: string;
  icon: LucideIcon;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

type Status = "idle" | "loading" | "success" | "error";

// ─── Field Component ──────────────────────────────────────────────────────────

function Field({
  label,
  icon: Icon,
  error,
  children,
  required = false,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500">
        <Icon className="h-3 w-3" strokeWidth={2} />
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] font-medium text-red-500">{error}</p>}
    </div>
  );
}

// ─── Default Form Values ───────────────────────────────────────────────────────

const defaultForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "Other",
  message: "",
};

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const services: string[] = [
    "Other",
    "Web Application Development",
    "Mobile App Development",
    "Digital Growth & Marketing",
    "Graphic Design",
    "SEO Optimization",
  ];

  const validate = (): FormErrors => {
    const e: FormErrors = {};

    // Name
    if (!form.name.trim()) {
      e.name = "Name is required";
    } else if (!/^[a-zA-Z\s'-]+$/.test(form.name.trim())) {
      e.name = "Name cannot contain numbers";
    }

    // Email
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    // Phone
    if (!form.phone.trim()) {
      e.phone = "Phone is required";
    } else if (!/^\d+$/.test(form.phone.trim())) {
      e.phone = "Phone must contain only numbers";
    } else if (form.phone.trim().length !== 10) {
      e.phone = "Phone must be exactly 10 digits";
    }

    // Message
    if (!form.message.trim()) {
      e.message = "Project details are required";
    }

    return e;
  };
  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const inputCls = (err?: string): string =>
    [
      "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all duration-200",
      "placeholder:text-gray-300 bg-white font-heading",
      err
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100 text-gray-800"
        : "border-gray-200 focus:border-[#74c316] focus:ring-2 focus:ring-[#74c316]/20 text-gray-800",
    ].join(" ");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eValidate = validate();
    if (Object.keys(eValidate).length > 0) {
      setErrors(eValidate);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      if (!formRef.current) throw new Error("Form ref is null");

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to send message. Try again.");
      setStatus("error");
    }
  };

  // ─── Success State ───────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-xl shadow-black/5 border border-gray-100"
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
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 border-2 border-green-200"
        >
          <CheckCircle2
            className="h-10 w-10 text-green-500"
            strokeWidth={1.8}
          />
        </motion.div>
        <h3 className="mb-2 text-2xl font-black text-gray-900">
          Request Sent! 🎉
        </h3>
        <p className="text-gray-500 mb-6">
          Thank you for reaching out. Our team will contact you shortly.
        </p>
        <Button
          onClick={() => {
            setForm(defaultForm);
            setStatus("idle");
          }}
          className="rounded-xl bg-[#74c316] px-8 font-bold text-white hover:bg-[#62a611]"
        >
          Send Another Request
        </Button>
      </motion.div>
    );
  }

  // ─── Form ────────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-xl border border-gray-100">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900">
          Let&apos;s work together
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Fill out the form below and we&apos;ll get back to you.
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-heading">
          <Field label="Full Name" icon={User} error={errors.name} required>
            <input
              name="user_name"
              value={form.name}
              onChange={(e) => {
                const val = e.target.value.replace(/[0-9]/g, ""); // strip numbers
                setForm((prev) => ({ ...prev, name: val }));
                if (errors.name)
                  setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Your Name"
              className={inputCls(errors.name)}
            />
          </Field>

          <Field label="Email" icon={Mail} error={errors.email} required>
            <input
              name="user_email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="Your Mail ID"
              className={inputCls(errors.email)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-heading">
          <Field label="Phone" icon={Phone} error={errors.phone} required>
            <input
              name="user_phone"
              value={form.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10); // digits only, max 10
                setForm((prev) => ({ ...prev, phone: val }));
                if (errors.phone)
                  setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="Enter Phone Number"
              className={inputCls(errors.phone)}
            />
          </Field>

          <Field label="Service" icon={Briefcase}>
            <Select
              value={form.service}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, service: value }))
              }
              
            >
              <SelectTrigger
                className="font-heading rounded-xl py-5 cursor-pointer w-full"
              >
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>

              <SelectContent className="rounded-xl shadow-xl border border-gray-100">
                {services.map((s) => (
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
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-5 font-heading">
          <Field
            label="Project Details"
            icon={MessageSquare}
            error={errors.message}
            required
          >
            <textarea
              name="message"
              value={form.message}
              onChange={set("message")}
              rows={5}
              placeholder="Tell us about our query..."
              className={`${inputCls(errors.message)} font-heading`}
            />
          </Field>
        </div>
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#74c316] text-white cursor-pointer font-heading py-3 rounded-xl hover:bg-[#62a611] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              Submit Request
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
