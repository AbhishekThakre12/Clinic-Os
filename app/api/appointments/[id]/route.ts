import { NextRequest, NextResponse } from "next/server";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/db";

export const runtime = "nodejs";

function checkAuth(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const key = auth?.replace("Bearer ", "");
  return !!process.env.ADMIN_API_KEY && key === process.env.ADMIN_API_KEY;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const status = body?.status;

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }

  const updated = await updateAppointmentStatus(Number(id), status);
  if (!updated) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });

  return NextResponse.json({ ok: true, appointment: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  await deleteAppointment(Number(id));
  return NextResponse.json({ ok: true });
}
