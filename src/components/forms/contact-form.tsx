"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactFormSchema, type ContactFormValues } from "@/lib/validators/contact";

export function ContactForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      website: ""
    }
  });

  async function onSubmit(values: ContactFormValues) {
    setError(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      setError(payload?.message ?? "Something went wrong.");
      return;
    }

    form.reset();
    setSubmitted(true);
    router.push("/thank-you");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Send Us a Message</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Tell us what you are building</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Name
          <input {...form.register("name")} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="John Doe" />
          {form.formState.errors.name ? <span className="mt-1 block text-xs text-red-600">{form.formState.errors.name.message}</span> : null}
        </label>
        <label className="text-sm font-medium text-slate-700">
          Email
          <input {...form.register("email")} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="john@example.com" />
          {form.formState.errors.email ? <span className="mt-1 block text-xs text-red-600">{form.formState.errors.email.message}</span> : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Phone
          <input {...form.register("phone")} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="+1 (713) 555-0148" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Company
          <input {...form.register("company")} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Your company" />
        </label>
      </div>
      <label className="hidden">
        Website
        <input {...form.register("website")} tabIndex={-1} autoComplete="off" />
      </label>
      <label className="text-sm font-medium text-slate-700">
        Message
        <textarea {...form.register("message")} rows={6} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Tell us more about your project, timeline, and what success looks like." />
        {form.formState.errors.message ? <span className="mt-1 block text-xs text-red-600">{form.formState.errors.message.message}</span> : null}
      </label>

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="rounded-full bg-gradient-to-r from-sky-600 to-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] disabled:opacity-60"
      >
        {form.formState.isSubmitting ? "Sending..." : "Send message"}
      </button>

      {submitted ? <p className="text-sm text-moss">Thanks. Your message was submitted successfully.</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
