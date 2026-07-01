import { neon } from "@neondatabase/serverless";

// Neon serverless Postgres — works perfectly on Vercel's serverless runtime.
// POSTGRES_URL is injected automatically by Vercel once you add the Neon
// integration from the Vercel Marketplace (Storage tab → Add Database → Neon).
// For local dev: run `vercel env pull .env.local` to pull the same value down.

function getSQL() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL is not set. See README for setup instructions.");
  return neon(url);
}

let tableReady: Promise<void> | null = null;

function ensureTable(): Promise<void> {
  if (!tableReady) {
    const sql = getSQL();
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        clinic_slug TEXT NOT NULL DEFAULT 'vimalai-orthodontic-multispeciality',
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        treatment TEXT NOT NULL,
        preferred_date TEXT NOT NULL,
        preferred_time TEXT NOT NULL,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `.then(() => undefined);
  }
  return tableReady;
}

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface AppointmentRecord {
  id: number;
  clinic_slug: string;
  name: string;
  phone: string;
  email: string | null;
  treatment: string;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: AppointmentStatus;
  created_at: string;
}

export interface NewAppointment {
  name: string;
  phone: string;
  email?: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export async function insertAppointment(data: NewAppointment): Promise<AppointmentRecord> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`
    INSERT INTO appointments (name, phone, email, treatment, preferred_date, preferred_time, message)
    VALUES (
      ${data.name},
      ${data.phone},
      ${data.email || null},
      ${data.treatment},
      ${data.preferredDate},
      ${data.preferredTime},
      ${data.message || null}
    )
    RETURNING *;
  `;
  return rows[0] as AppointmentRecord;
}

export async function listAppointments(): Promise<AppointmentRecord[]> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`SELECT * FROM appointments ORDER BY created_at DESC;`;
  return rows as AppointmentRecord[];
}

export async function updateAppointmentStatus(
  id: number,
  status: AppointmentStatus
): Promise<AppointmentRecord | undefined> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`
    UPDATE appointments SET status = ${status} WHERE id = ${id} RETURNING *;
  `;
  return rows[0] as AppointmentRecord | undefined;
}

export async function deleteAppointment(id: number): Promise<void> {
  await ensureTable();
  const sql = getSQL();
  await sql`DELETE FROM appointments WHERE id = ${id};`;
}
