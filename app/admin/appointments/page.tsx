"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, Calendar, Clock, Trash2, Check, X, Lock, RefreshCw } from "lucide-react";
import type { AppointmentRecord, AppointmentStatus } from "@/lib/db";

const STORAGE_KEY = "clinicos_admin_key";

export default function AdminAppointmentsPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      setKey(saved);
      setAuthed(true);
    }
  }, []);

  const load = async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        headers: { Authorization: `Bearer ${adminKey}` }
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError("Invalid admin key.");
        setAuthed(false);
        sessionStorage.removeItem(STORAGE_KEY);
        return;
      }
      setAppointments(data.appointments);
      setAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, adminKey);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed && key) load(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const updateStatus = async (id: number, status: AppointmentStatus) => {
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ status })
    });
    load(key);
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this appointment permanently?")) return;
    await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${key}` }
    });
    load(key);
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
        <form
          onSubmit={(e) => { e.preventDefault(); load(key); }}
          className="w-full max-w-sm rounded-xl2 border border-ink/5 bg-white p-8 shadow-card"
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-center font-display text-xl font-semibold text-ink">Admin Access</h1>
          <p className="mt-1 text-center text-sm text-ink/50">Enter your admin key to view appointment bookings.</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin API key"
            className="mt-6 w-full rounded-xl border border-ink/10 px-4 py-3 text-sm focus:border-primary focus:outline-none"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Checking..." : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  const statusStyles: Record<AppointmentStatus, string> = {
    pending: "bg-amber-50 text-amber-700",
    confirmed: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-red-50 text-red-700"
  };

  return (
    <div className="min-h-screen bg-canvas px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">Appointment Bookings</h1>
            <p className="mt-1 text-sm text-ink/50">{appointments.length} total submissions</p>
          </div>
          <button
            onClick={() => load(key)}
            className="flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink/70 hover:border-primary hover:text-primary"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl2 border border-ink/5 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-canvas text-xs font-semibold uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">Treatment</th>
                  <th className="px-5 py-3">Preferred Slot</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Booked</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td className="px-5 py-4">
                      <div className="font-medium text-ink">{a.name}</div>
                      <div className="mt-1 flex flex-col gap-0.5 text-xs text-ink/50">
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {a.phone}</span>
                        {a.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {a.email}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink/70">{a.treatment}</td>
                    <td className="px-5 py-4 text-ink/70">
                      <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {a.preferred_date}</div>
                      <div className="mt-1 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.preferred_time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-ink/40">{new Date(a.created_at).toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <button onClick={() => updateStatus(a.id, "confirmed")} aria-label="Confirm" className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100">
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={() => updateStatus(a.id, "cancelled")} aria-label="Cancel" className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100">
                          <X className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(a.id)} aria-label="Delete" className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-ink/40">No appointments yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
