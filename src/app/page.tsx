import { RegistrationForm } from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.28),transparent)]" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-4 py-14 sm:flex-row sm:items-start sm:gap-16 sm:py-24">
        <section className="flex-1 space-y-6">
          <p className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-violet-200">
            Бесплатный вебинар · онлайн
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl lg:text-[2.7rem] lg:leading-[1.1]">
            ИИ в продуктах: от промптов до реальных задач без лишнего хайпа
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-neutral-400 sm:text-lg">
            Разберём, где нейросети реально экономят время, как встроить их в процессы
            и какие ошибки дорого обходятся командам. Практический разбор кейсов без
            «магии чёрного ящика».
          </p>

          <ul className="grid gap-3 text-sm text-neutral-300 sm:max-w-md">
            {[
              "Карта применений: генерация, поиск, классификация, ассистенты",
              "Оценка рисков: данные, безопасность, галлюцинации, ответственность",
              "Как тестировать гипотезы за неделю, а не за квартал",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
            <span>
              <strong className="text-neutral-200">Когда:</strong> скоро согласуем дату
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>
              <strong className="text-neutral-200">Формат:</strong> 45 мин + ответы на
              вопросы
            </span>
          </div>
        </section>

        <aside className="w-full shrink-0 sm:max-w-md sm:pt-2">
          <RegistrationForm />
        </aside>
      </div>

      <footer className="relative border-t border-neutral-800/80 py-6 text-center text-xs text-neutral-600">
        Тестовая страница для проверки сценариев веб-аналитики. Пиксель Meta пока не
        подключён.
      </footer>
    </main>
  );
}
