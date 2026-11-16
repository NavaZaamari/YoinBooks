/**
 * "Start your shelf in 30 seconds": pick 5 favourite books (bilingual search), then an email.
 * States: empty → partially filled → complete, plus validation errors. Front-end demo only.
 */
import { useId, useMemo, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { MAX_PICKS, addPick, isValidEmail, removePick, searchBooks, type Book } from "@/lib/onboarding";
import { Arrow, InkRing, Sparkle } from "./Doodles";
import type { AuthMode } from "./Header";
import { fieldClass } from "./AuthModal";
import { ComingSoon } from "./ComingSoon";
import { ChapterLabel, Section, YButton, toneClass } from "./primitives";
import { Reveal } from "./Reveal";

function StepBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center text-[15px] font-bold text-seed">
      <InkRing className="absolute -inset-2 h-12 w-12 text-seed" />
      {children}
    </span>
  );
}

/** One slim book spine on the shelf (empty outline or filled with a picked book). */
function Spine({ book, index, onRemove }: { book?: Book | undefined; index: number; onRemove: (id: string) => void }) {
  const { t, lang, n } = useLang();
  const heights = ["h-32", "h-36", "h-[136px]", "h-[148px]", "h-[128px]"];
  if (!book) {
    return (
      <div
        aria-label={`${t.onboard.emptySlot} ${n(index + 1)}`}
        role="img"
        className={cn("w-11 rounded-t-[5px] border-[1.5px] border-dashed border-sage bg-plaster/40 sm:w-12", heights[index])}
      />
    );
  }
  const title = lang === "fa" ? book.fa : book.en;
  return (
    <button
      type="button"
      onClick={() => onRemove(book.id)}
      aria-label={t.onboard.remove(title)}
      className={cn(
        "animate-page-in relative flex w-11 cursor-pointer items-center justify-center overflow-hidden rounded-t-[5px] py-2 transition-transform duration-300 hover:-translate-y-1 sm:w-12",
        heights[index],
        toneClass(book.tone),
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-2.5 h-px bg-current opacity-40" />
      <span aria-hidden className="absolute inset-x-0 bottom-2.5 h-px bg-current opacity-40" />
      <span className="max-h-full overflow-hidden text-[12px] leading-tight font-bold [writing-mode:vertical-rl]">{title}</span>
    </button>
  );
}

export function Onboarding({ onAuth }: { onAuth: (m: AuthMode) => void }) {
  const { t, n, lang } = useLang();
  const o = t.onboard;
  const uid = useId();
  const [query, setQuery] = useState("");
  const [picks, setPicks] = useState<Book[]>([]);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ picks?: boolean; email?: boolean }>({});
  const [done, setDone] = useState(false);

  const results = useMemo(() => searchBooks(query).slice(0, 5), [query]);
  const full = picks.length >= MAX_PICKS;

  const pick = (b: Book) => {
    setPicks((p) => addPick(p, b));
    setQuery("");
    setErrors((e) => ({ ...e, picks: false }));
    setDone(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = { picks: picks.length < MAX_PICKS, email: !isValidEmail(email) };
    setErrors(next);
    setDone(!next.picks && !next.email);
  };

  return (
    <Section tone="straw" folio={`Yoin · ${n(4)}`} labelledBy="onboard-title" className="paper-ruled">
      <Reveal className="mx-auto max-w-xl text-center">
        <ChapterLabel>{o.chapter}</ChapterLabel>
        <h2 id="onboard-title" className="text-[28px] md:text-[36px]">
          {o.title}
        </h2>
      </Reveal>

      <Reveal className="relative mx-auto mt-12 max-w-xl">
        <form noValidate onSubmit={submit} aria-disabled="true" tabIndex={-1} className="paper-card relative pointer-events-none opacity-60 blur-[2.5px] p-6 sm:p-8 md:p-10">
          {/* ── Step 1 ── */}
          <div className="flex items-center gap-3">
            <StepBadge>{n(1)}</StepBadge>
            <h3 className="text-lg md:text-xl">{o.step1}</h3>
          </div>

          <div className="relative mt-5">
            <label htmlFor={`${uid}-q`} className="sr-only">
              {o.searchLabel}
            </label>
            <input
              id={`${uid}-q`}
              type="search"
              dir="auto"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={`${uid}-list`}
              aria-autocomplete="list"
              disabled={full}
              placeholder={full ? o.full : o.searchPh}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={cn(fieldClass, "text-start disabled:cursor-not-allowed disabled:opacity-70")}
            />
            {/* margin note + arrow guiding to the search box (desktop margin only) */}
            <div aria-hidden className="pointer-events-none absolute top-1/2 -start-40 hidden -translate-y-1/2 items-center gap-1 lg:flex">
              <span className="margin-note -rotate-6">{o.noteSearch}</span>
              <Arrow className="h-9 w-12 -rotate-[30deg] text-ink ltr:-scale-x-100" />
            </div>

            {query && !full ? (
              <ul
                id={`${uid}-list`}
                role="listbox"
                aria-label={o.searchLabel}
                className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-[12px] border border-sage bg-plaster shadow-paper-lift"
              >
                {results.length === 0 ? (
                  <li className="px-4 py-3 text-[15px] text-olive">{o.noResults}</li>
                ) : (
                  results.map((b) => {
                    const taken = picks.some((p) => p.id === b.id);
                    return (
                      <li key={b.id} role="option" aria-selected={taken} aria-disabled={taken}>
                        <button
                          type="button"
                          disabled={taken}
                          onClick={() => pick(b)}
                          aria-label={o.add(lang === "fa" ? b.fa : b.en)}
                          className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-start hover:bg-straw disabled:cursor-default disabled:opacity-50"
                        >
                          <span aria-hidden className={cn("h-8 w-1.5 shrink-0 rounded-sm", toneClass(b.tone))} />
                          <span className="min-w-0 flex-1 leading-snug">
                            <span className="block truncate text-[15px] font-bold">
                              {b.fa} <span className="font-serif font-normal text-olive">· {b.en}</span>
                            </span>
                            <span className="block truncate text-[13px] text-olive">
                              {lang === "fa" ? b.authorFa : b.authorEn}
                            </span>
                          </span>
                          {taken ? <Sparkle filled className="h-3.5 w-3.5 text-leaf" /> : null}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            ) : null}
          </div>

          {/* The shelf */}
          <div className="mt-8">
            <div className="flex items-end justify-center gap-2.5 px-2 sm:gap-3">
              {Array.from({ length: MAX_PICKS }, (_, i) => (
                <Spine key={picks[i]?.id ?? `empty-${i}`} book={picks[i]} index={i} onRemove={(id) => setPicks((p) => removePick(p, id))} />
              ))}
            </div>
            <div aria-hidden className="h-2.5 rounded-[3px] bg-olive" />
            <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
              <span aria-live="polite" className={cn("font-bold", full ? "text-olive" : "text-ink")}>
                {full ? o.full : o.counter(n(picks.length), n(MAX_PICKS))}
              </span>
              {picks.length > 0 ? <span className="margin-note">{o.noteShelf}</span> : null}
            </div>
            {errors.picks ? (
              <p role="alert" className="mt-2 text-[14px] text-seed">
                {o.picksError}
              </p>
            ) : null}
          </div>

          <div aria-hidden className="my-8 h-px bg-sage/70" />

          {/* ── Step 2 ── */}
          <div className="flex items-center gap-3">
            <StepBadge>{n(2)}</StepBadge>
            <label htmlFor={`${uid}-email`} className="text-lg font-extrabold text-ink md:text-xl [[lang=en]_&]:font-serif [[lang=en]_&]:font-semibold">
              {o.step2}
            </label>
          </div>
          <input
            id={`${uid}-email`}
            type="email"
            dir="ltr"
            inputMode="email"
            autoComplete="email"
            placeholder={o.emailPh}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((er) => ({ ...er, email: false }));
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            className={cn(fieldClass, "mt-5 text-start")}
          />
          {errors.email ? (
            <p id={`${uid}-email-err`} role="alert" className="mt-2 text-[14px] text-seed">
              {o.emailError}
            </p>
          ) : null}

          <ComingSoon layoutClassName="mt-8 w-full">
            <YButton type="submit" size="lg" className="w-full">
              {o.cta}
            </YButton>
          </ComingSoon>

          {done ? (
            <p role="status" className="mt-4 flex items-center justify-center gap-2 text-center text-[15px] text-olive">
              <Sparkle filled className="h-4 w-4 shrink-0 text-leaf" />
              {o.success}
            </p>
          ) : null}

          <p className="mt-5 text-center text-[15px] text-olive">
            {o.have}{" "}
            <ComingSoon>
              <button type="button" onClick={() => onAuth("login")} className="ink-link cursor-pointer">
                {o.login}
              </button>
            </ComingSoon>
          </p>
        </form>
        {/* Big sticker sized to the blurred card. Sibling of the form (not a child) so its blur never reaches it. */}
        <span lang={lang} className="coming-soon-sticker">
          {t.comingSoon}
        </span>
      </Reveal>
    </Section>
  );
}
