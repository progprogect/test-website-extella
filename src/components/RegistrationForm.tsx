"use client";

import { useState } from "react";

export function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          company: company || undefined,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Что-то пошло не так");
        return;
      }

      setStatus("success");
      setMessage("Заявка отправлена. Мы отправим ссылку на почту перед эфиром.");
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
    } catch {
      setStatus("error");
      setMessage("Сеть недоступна. Проверьте подключение и попробуйте снова.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-6 shadow-xl backdrop-blur sm:p-8"
      noValidate
    >
      <h2 className="text-lg font-semibold text-neutral-100">
        Регистрация на эфир
      </h2>
      <p className="mt-1 text-sm text-neutral-400">
        Отправьте контакты — пришлём напоминание и запись после вебинара.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-neutral-300">
            Имя
          </label>
          <input
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900/80 px-3 py-2.5 text-sm text-neutral-100 outline-none ring-violet-500/40 placeholder:text-neutral-600 focus:border-violet-500 focus:ring-2"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Иван Петров"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-neutral-300">
            Email
          </label>
          <input
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900/80 px-3 py-2.5 text-sm text-neutral-100 outline-none ring-violet-500/40 placeholder:text-neutral-600 focus:border-violet-500 focus:ring-2"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="ivan@компания.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-neutral-300">
            Телефон <span className="text-neutral-500">(необязательно)</span>
          </label>
          <input
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900/80 px-3 py-2.5 text-sm text-neutral-100 outline-none ring-violet-500/40 placeholder:text-neutral-600 focus:border-violet-500 focus:ring-2"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+7 …"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-neutral-300">
            Компания / роль <span className="text-neutral-500">(необязательно)</span>
          </label>
          <input
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900/80 px-3 py-2.5 text-sm text-neutral-100 outline-none ring-violet-500/40 placeholder:text-neutral-600 focus:border-violet-500 focus:ring-2"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Product lead, стартап…"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={status === "loading"}
          />
        </div>
      </div>

      {message ? (
        <p
          className={
            status === "success"
              ? "mt-4 text-sm text-emerald-400"
              : "mt-4 text-sm text-amber-400"
          }
          role="status"
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Отправка…" : "Забронировать место"}
      </button>

      <p className="mt-3 text-center text-[11px] text-neutral-500">
        Регистрируясь, вы соглашаетесь на обработку контактных данных для связи по
        вебинару.
      </p>
    </form>
  );
}
