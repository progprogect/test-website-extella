import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimOrNull(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const t = value.trim();
  return t.length === 0 ? undefined : t;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Неверный формат данных" }, { status: 400 });
  }

  const { name, email, phone, company } = body as Record<string, unknown>;

  const nameStr =
    typeof name === "string" ? name.trim() : "";
  const emailStr =
    typeof email === "string" ? email.trim() : "";

  if (nameStr.length < 2) {
    return NextResponse.json(
      { error: "Укажите имя (минимум 2 символа)" },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(emailStr)) {
    return NextResponse.json(
      { error: "Укажите корректный email" },
      { status: 400 },
    );
  }

  try {
    const lead = await prisma.webinarLead.create({
      data: {
        name: nameStr.slice(0, 200),
        email: emailStr.slice(0, 320),
        phone: trimOrNull(phone)?.slice(0, 50),
        company: trimOrNull(company)?.slice(0, 200),
      },
    });

    return NextResponse.json({
      ok: true,
      id: lead.id,
    });
  } catch (err) {
    console.error("[api/leads]", err);
    return NextResponse.json(
      { error: "Не удалось сохранить заявку. Попробуйте позже." },
      { status: 500 },
    );
  }
}
