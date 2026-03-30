"use client";

import { useActionState } from "react";

import { authenticate } from "@/app/dashboard/login/actions";

export default function DashboardLoginPage() {
  const [state, formAction, pending] = useActionState(authenticate, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <form action={formAction} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-panel">
        <p className="text-sm uppercase tracking-[0.2em] text-clay">Client Dashboard</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">Sign in</h1>
        <div className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input name="email" type="email" required className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input name="password" type="password" required className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3" />
          </label>
        </div>
        {state?.error ? <p className="mt-4 text-sm text-red-600">{state.error}</p> : null}
        <button type="submit" disabled={pending} className="mt-6 w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
