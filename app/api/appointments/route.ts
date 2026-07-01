import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertAppointment, listAppointments } from "@/lib/db";

export const runtime = "nodejs";

const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email().optional().or(z.literal("")),
  treatment: z.string().trim().min(2),
  preferredDate: z.string().trim().min(1, "Date is required"),
  preferredTime: z.string().trim().min(1, "Time is required"),
  message: z.string().trim().max(1000).optional().or(z.literal(""))
});

// Very small in-memory rate limiter: max 5 submissions per IP per 10 minutes.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  let record;
  try {
    record = await insertAppointment(parsed.data);
  } catch (err) {
    console.error("Failed to save appointment:", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your appointment right now. Please call us instead." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, appointment: record }, { status: 201 });
}

// Admin-only listing. Pass the key as: Authorization: Bearer <ADMIN_API_KEY>
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const key = auth?.replace("Bearer ", "");

  if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const appointments = await listAppointments();
  return NextResponse.json({ ok: true, appointments });
}
