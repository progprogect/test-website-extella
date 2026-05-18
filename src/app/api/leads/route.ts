import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimOrNull(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const t = value.trim();
  return t.length === 0 ? undefined : t;
}


// Meta Conversions API — server-side Lead event (installed by Extella)
async function sendCapiLeadEvent(userData: {
  email?: string;
  phone?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}) {
  const crypto = await import('crypto');
  const hash = (val: string) =>
    crypto.createHash('sha256').update(val.trim().toLowerCase()).digest('hex');

  const payload = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        ...(userData.email && { em: hash(userData.email) }),
        ...(userData.phone && { ph: hash(userData.phone) }),
        ...(userData.ip && { client_ip_address: userData.ip }),
        ...(userData.userAgent && { client_user_agent: userData.userAgent }),
        ...(userData.fbp && { fbp: userData.fbp }),
        ...(userData.fbc && { fbc: userData.fbc }),
      },
    }],
  };

  await fetch(
    'https://graph.facebook.com/v25.0/2038279200131167/events?access_token=EAAVCAe4MBbUBRaJvZBEOBH6Obi4j3grzNZCeX8Q2OZBjTt9KfwunO4AG73ZCJuEDui6EYWPQDZCO0lq8PeWxgV2yr2OUEQBQgjKnreBi8ZCY84sZBUipmYftGjbYiXADf6gP650myQIW0ZAlDC8Dek78w6Sv86q0yKICMBNdStuqyf4c0qOjzti0TNcfp6zgCE2JfCueT5eI9pw20jLWSwZCWogfUzx2SREoz29psTEUNO61R8kmjnhSUKn2VlCVGdYzw4fR4R30Bw9YULHhvryulZCXm7bl4a',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
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
