"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Phone, Mail, Calendar, Clock, Trash2, Check, X,
  Lock, RefreshCw, Search, ChevronUp, ChevronDown,
  ChevronsUpDown, Download, Stethoscope, LogOut,
  ClipboardList, CheckCircle2, XCircle, Hourglass
} from "lucide-react";
import type { AppointmentRecord, AppointmentStatus } from "@/lib/db";

const STORAGE_KEY = "clinicos_admin_key";

type SortField = "name" | "treatment" | "preferred_date" | "status" | "created_at";
type SortDir = "asc" | "desc";

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; icon: typeof CheckCircle2; pill: string; row: string }> = {
  pending:   { label: "Pending",   icon: Hourglass,     pill: "bg-amber-50  text-amber-700  border border-amber-200",  row: "" },
  confirmed: { label: "Confirmed", icon: CheckCircle2,  pill: "bg-emerald-50 text-emerald-700 border border-emerald-200", row: "bg-emerald-50/30" },
  cancelled: { label: "Cancelled", icon: XCircle,       pill: "bg-red-50    text-red-700    border border-red-200",    row: "bg-red-50/30" },
};

export default function AdminAppointmentsPage() {
  const [key, setKey]               = useState("");
  const [authed, setAuthed]         = useState(false);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading]       = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError]           = useState("");
  const [search, setSearch]         = useState("");
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | "all">("all");
  const [sort, setSort]             = useState<{ field: SortField; dir: SortDir }>({ field: "created_at", dir: "desc" });
  const [selected, setSelected]     = useState<Set<number>>(new Set());

  // ── Auth ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) { setKey(saved); setAuthed(true); }
  }, []);

  const load = async (adminKey: string, silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/appointments", { headers: { Authorization: `Bearer ${adminKey}` } });
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
    } catch { setError("Could not reach the server."); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { if (authed && key) load(key); }, [authed]); // eslint-disable-line

  // ── Mutations ────────────────────────────────────────────────────────────
  const updateStatus = async (id: number, status: AppointmentStatus) => {
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ status }),
    });
    load(key, true);
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this appointment permanently?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${key}` } });
    setSelected((s) => { const n = new Set(s); n.delete(id); return n; });
    load(key, true);
  };

  const bulkDelete = async () => {
    if (!confirm(`Delete ${selected.size} appointments permanently?`)) return;
    await Promise.all([...selected].map((id) =>
      fetch(`/api/appointments/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${key}` } })
    ));
    setSelected(new Set());
    load(key, true);
  };

  // ── Sort / filter / search ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    let rows = [...appointments];
    if (filterStatus !== "all") rows = rows.filter((r) => r.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        (r.email ?? "").toLowerCase().includes(q) ||
        r.treatment.toLowerCase().includes(q) ||
        (r.message ?? "").toLowerCase().includes(q)
      );
    }
    rows.sort((a, b) => {
      const av = a[sort.field] ?? "";
      const bv = b[sort.field] ?? "";
      return sort.dir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return rows;
  }, [appointments, filterStatus, search, sort]);

  const toggleSort = (field: SortField) =>
    setSort((s) => s.field === field ? { field, dir: s.dir === "asc" ? "desc" : "asc" } : { field, dir: "asc" });

  // ── CSV export ───────────────────────────────────────────────────────────
  const exportCSV = () => {
    const header = ["ID","Name","Phone","Email","Treatment","Date","Time","Message","Status","Booked At"];
    const rows   = filtered.map((a) => [
      a.id, a.name, a.phone, a.email ?? "", a.treatment,
      a.preferred_date, a.preferred_time, (a.message ?? "").replace(/"/g, '""'),
      a.status, new Date(a.created_at).toLocaleString()
    ].map((v) => `"${v}"`).join(","));
    const csv  = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href = url; a.download = "appointments.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Select helpers ────────────────────────────────────────────────────────
  const allSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  const toggleAll   = () => setSelected(allSelected ? new Set() : new Set(filtered.map((r) => r.id)));
  const toggleOne   = (id: number) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total:     appointments.length,
    pending:   appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  }), [appointments]);

  // ── Sort icon helper ──────────────────────────────────────────────────────
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sort.field !== field) return <ChevronsUpDown className="h-3.5 w-3.5 text-ink/30" />;
    return sort.dir === "asc"
      ? <ChevronUp className="h-3.5 w-3.5 text-primary" />
      : <ChevronDown className="h-3.5 w-3.5 text-primary" />;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ═══════════════════════════════════════════════════════════════════════════
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
        <form
          onSubmit={(e) => { e.preventDefault(); load(key); }}
          className="w-full max-w-sm rounded-2xl border border-ink/5 bg-white p-8 shadow-card"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-soft">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-5 text-center font-display text-xl font-semibold text-ink">Clinic Admin</h1>
          <p className="mt-1 text-center text-sm text-ink/45">Enter your admin key to manage bookings.</p>
          <input
            type="password" value={key} onChange={(e) => setKey(e.target.value)}
            placeholder="Admin API key"
            className="mt-6 w-full rounded-xl border border-ink/10 px-4 py-3 text-sm focus:border-primary focus:outline-none"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans">

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/8 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Stethoscope className="h-4 w-4" />
          </div>
          <span className="font-display text-base font-semibold text-ink">Vimalai Dental</span>
          <span className="hidden text-ink/25 sm:block">/</span>
          <span className="hidden text-sm text-ink/50 sm:block">Appointments</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => load(key, true)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink/60 hover:bg-ink/5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={() => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false); setKey(""); }}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink/60 hover:bg-ink/5"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total", value: stats.total,     icon: ClipboardList, color: "text-primary",     bg: "bg-primary-50" },
            { label: "Pending",   value: stats.pending,   icon: Hourglass,     color: "text-amber-600",  bg: "bg-amber-50" },
            { label: "Confirmed", value: stats.confirmed, icon: CheckCircle2,  color: "text-emerald-600",bg: "bg-emerald-50" },
            { label: "Cancelled", value: stats.cancelled, icon: XCircle,       color: "text-red-500",    bg: "bg-red-50" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-xl bg-white px-4 py-4 shadow-sm border border-ink/5">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.bg} ${s.color}`}>
                <s.icon className="h-4.5 w-4.5" size={18} />
              </div>
              <div>
                <div className="text-xl font-semibold text-ink">{s.value}</div>
                <div className="text-xs text-ink/45">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, treatment…"
              className="w-full rounded-lg border border-ink/10 bg-white py-2 pl-9 pr-4 text-sm shadow-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Status filter */}
          <div className="flex rounded-lg border border-ink/10 bg-white shadow-sm overflow-hidden text-sm">
            {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 font-medium capitalize transition-colors ${
                  filterStatus === s ? "bg-primary text-white" : "text-ink/60 hover:bg-ink/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {selected.size > 0 && (
              <button
                onClick={bulkDelete}
                className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete {selected.size}
              </button>
            )}
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm font-medium text-ink/70 shadow-sm hover:border-primary hover:text-primary"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Sheet table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/8 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/8 bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-ink/50">
                  {/* Row number col */}
                  <th className="w-10 border-r border-ink/8 px-3 py-3 text-center text-ink/30">#</th>
                  {/* Checkbox */}
                  <th className="w-10 border-r border-ink/8 px-3 py-3">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded accent-primary" />
                  </th>
                  {([ 
                    { label: "Patient",   field: "name" as SortField },
{ label: "Phone",     field: null },
{ label: "Treatment", field: "treatment" as SortField },
{ label: "Date",      field: "preferred_date" as SortField },
{ label: "Time",      field: null },
{ label: "Message",   field: null },
{ label: "Status",    field: "status" as SortField },
{ label: "Booked At", field: "created_at" as SortField },
{ label: "Actions",   field: null },
{ label: "Email",     field: null },
                  ]).map(({ label, field }) => (
                    <th
                      key={label}
                      onClick={() => field && toggleSort(field)}
                      className={`whitespace-nowrap border-r border-ink/8 px-4 py-3 text-left last:border-r-0 ${field ? "cursor-pointer hover:bg-ink/5 select-none" : ""}`}
                    >
                      <span className="flex items-center gap-1">
                        {label}
                        {field && <SortIcon field={field} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, idx) => {
                  const cfg = STATUS_CONFIG[a.status];
                  const isSelected = selected.has(a.id);
                  return (
                    <tr
                      key={a.id}
                      className={`group border-b border-ink/5 transition-colors last:border-b-0 hover:bg-primary-50/40 ${isSelected ? "bg-primary-50/60" : cfg.row}`}
                    >
                      {/* Row number */}
                      <td className="border-r border-ink/5 px-3 py-3 text-center text-xs text-ink/30 font-mono">{idx + 1}</td>
                      {/* Checkbox */}
                      <td className="border-r border-ink/5 px-3 py-3">
                        <input type="checkbox" checked={isSelected} onChange={() => toggleOne(a.id)} className="rounded accent-primary" />
                      </td>
                      {/* Name */}
                      <td className="border-r border-ink/5 px-4 py-3 font-medium text-ink whitespace-nowrap">{a.name}</td>
                      {/* Phone */}
                      <td className="border-r border-ink/5 px-4 py-3 whitespace-nowrap">
                        <a href={`tel:${a.phone}`} className="flex items-center gap-1.5 text-ink/60 hover:text-primary">
                          <Phone className="h-3.5 w-3.5 shrink-0" />{a.phone}
                        </a>
                      </td>
            
                      {/* Treatment */}
                      <td className="border-r border-ink/5 px-4 py-3 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-ink/70"><Stethoscope className="h-3.5 w-3.5 shrink-0 text-primary/50" />{a.treatment}</span>
                      </td>
                      {/* Date */}
                      <td className="border-r border-ink/5 px-4 py-3 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-ink/70"><Calendar className="h-3.5 w-3.5 shrink-0 text-ink/35" />{a.preferred_date}</span>
                      </td>
                      {/* Time */}
                      <td className="border-r border-ink/5 px-4 py-3 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-ink/70"><Clock className="h-3.5 w-3.5 shrink-0 text-ink/35" />{a.preferred_time}</span>
                      </td>
                      {/* Message */}
                      <td className="border-r border-ink/5 px-4 py-3 max-w-[220px]">
                        {a.message
                          ? <span className="block truncate text-ink/55" title={a.message}>{a.message}</span>
                          : <span className="text-ink/25">—</span>}
                      </td>
                      {/* Status */}
                      <td className="border-r border-ink/5 px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${cfg.pill}`}>
                          <cfg.icon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </td>
                      {/* Booked at */}
                      <td className="border-r border-ink/5 px-4 py-3 whitespace-nowrap text-xs text-ink/40 font-mono">
                        {new Date(a.created_at).toLocaleString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })}
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateStatus(a.id, "confirmed")}
                            title="Mark confirmed"
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          ><Check className="h-3.5 w-3.5" /></button>
                          <button
                            onClick={() => updateStatus(a.id, "cancelled")}
                            title="Mark cancelled"
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                          ><X className="h-3.5 w-3.5" /></button>
                          <button
                            onClick={() => remove(a.id)}
                            title="Delete"
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                          ><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                       {/* Email */}
                      <td className="border-r border-ink/5 px-4 py-3">
                        {a.email
                          ? <a href={`mailto:${a.email}`} className="flex items-center gap-1.5 text-ink/60 hover:text-primary whitespace-nowrap"><Mail className="h-3.5 w-3.5 shrink-0" />{a.email}</a>
                          : <span className="text-ink/25">—</span>}
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={12} className="px-6 py-16 text-center text-sm text-ink/35">
                      {appointments.length === 0 ? "No appointments yet — they'll appear here once patients book." : "No results match your search or filter."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between border-t border-ink/8 bg-[#F8FAFC] px-5 py-2.5 text-xs text-ink/40">
            <span>{filtered.length} of {appointments.length} rows</span>
            <span>{selected.size > 0 ? `${selected.size} selected` : "Click a row's checkbox to select"}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
