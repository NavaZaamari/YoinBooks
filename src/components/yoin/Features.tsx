import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { CATALOG } from "@/lib/onboarding";
import { Bookmark, BookStack, OpenBook, Pencil, Sparkle, Star } from "./Doodles";
import { BookCover, ChapterLabel, Section, YButton } from "./primitives";
import { Reveal } from "./Reveal";

const byId = (id: string) => CATALOG.find((b) => b.id === id)!;
const GOAL = 24;

/** Card shell for one feature: doodle icon, title, one sentence, tiny UI mock. */
function FeatureCard({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <article className="paper-card paper-card-lift flex h-full flex-col p-6 md:p-8">
      <div className="h-11 text-ink">{icon}</div>
      <h3 className="mt-4 text-xl md:text-[22px]">{title}</h3>
      <p className="mt-2 text-[16px] text-olive">{desc}</p>
      <div className="mt-6 flex-1 content-end">{children}</div>
    </article>
  );
}

export function Features() {
  const { t, n, lang, dir } = useLang();
  const arrow = dir === "rtl" ? "←" : "→";
  const w = t.what;
  const [finished, setFinished] = useState(false);
  const [spoiler, setSpoiler] = useState(false);

  // Finishing the book moves it Reading → Read and nudges the yearly goal.
  const counts: [number, number, number, number] = finished ? [8, 1, 12, 3] : [8, 2, 11, 3];
  const read = counts[2];
  const activeShelf = finished ? 2 : 1;
  const book = byId("savushun");

  return (
    <Section id="features" folio={`Yoin · ${n(3)}`} labelledBy="what-title">
      <Reveal className="max-w-[36rem]">
        <ChapterLabel>{w.chapter}</ChapterLabel>
        <h2 id="what-title" className="text-[28px] md:text-[36px]">
          {w.title}
        </h2>
        <p className="mt-4 text-olive">{w.intro}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
        {/* 1. Four shelves */}
        <Reveal>
          <FeatureCard icon={<BookStack className="h-11 w-auto" />} title={w.shelves.title} desc={w.shelves.desc}>
            <div className="rounded-[12px] border border-sage bg-straw/60 p-3">
              <ul className="flex flex-wrap gap-1.5">
                {w.shelves.tabs.map((label, i) => (
                  <li
                    key={label}
                    className={cn(
                      "rounded-[8px] px-2.5 py-1 text-[13px] transition-colors duration-500",
                      i === activeShelf ? "bg-plaster font-medium text-ink shadow-paper" : "text-olive",
                    )}
                  >
                    {label} <span className="ms-1 font-bold">{n(counts[i] ?? 0)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center gap-3 rounded-[10px] border border-sage/60 bg-plaster p-2.5">
                <div className="w-9 shrink-0">
                  <BookCover book={book} className="p-1 [&>span:nth-child(2)]:hidden" />
                </div>
                <div className="min-w-0 flex-1 leading-snug">
                  <p className="truncate text-[15px] font-bold">{lang === "fa" ? book.fa : book.en}</p>
                  <p className="text-[13px] text-olive">{w.shelves.tabs[activeShelf]}</p>
                </div>
                <YButton
                  size="sm"
                  variant={finished ? "ghost" : "secondary"}
                  aria-pressed={finished}
                  onClick={() => setFinished((v) => !v)}
                >
                  {finished ? w.shelves.undo : w.shelves.finish}
                </YButton>
              </div>
            </div>
          </FeatureCard>
        </Reveal>

        {/* 2. Yearly goal — bookmark-ribbon progress */}
        <Reveal delay={80}>
          <FeatureCard icon={<Bookmark className="h-11 w-auto" />} title={w.goal.title} desc={w.goal.desc}>
            <div className="rounded-[12px] border border-sage bg-straw/60 p-4">
              <div className="flex items-baseline justify-between text-[14px]">
                <span className="text-olive">{w.goal.year}</span>
                <span className="font-bold text-ink">{w.goal.of(n(read), n(GOAL))}</span>
              </div>
              <div
                role="progressbar"
                aria-label={w.goal.title}
                aria-valuemin={0}
                aria-valuemax={GOAL}
                aria-valuenow={read}
                aria-valuetext={w.goal.of(n(read), n(GOAL))}
                className="mt-3 h-3.5 rounded-[3px] bg-sage/35"
              >
                <div
                  className="goal-ribbon h-full bg-leaf transition-[width] duration-700 ease-out"
                  style={{ width: `${(read / GOAL) * 100}%` }}
                />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[13px] text-olive">
                <Sparkle filled className="h-3 w-3 text-leaf" />
                {w.shelves.tabs[1]} {arrow} {w.shelves.tabs[2]}
              </div>
            </div>
          </FeatureCard>
        </Reveal>

        {/* 3. Ratings & reviews with Spoiler Alert */}
        <Reveal>
          <FeatureCard icon={<Pencil className="h-11 w-auto" />} title={w.review.title} desc={w.review.desc}>
            <article className="rounded-[12px] border border-sage bg-straw/60 p-4">
              <div className="flex items-center gap-2.5">
                <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage text-[14px] font-bold text-ink">
                  {w.review.reviewer.slice(0, 1)}
                </span>
                <span className="text-[15px] font-bold">{w.review.reviewer}</span>
                <span role="img" aria-label={w.review.stars} className="ms-auto flex gap-0.5 text-rose">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} filled={i < 4} className="h-4 w-4" />
                  ))}
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed">{w.review.body}</p>
              <div className="mt-3 rounded-[10px] border border-dashed border-rose/60 bg-plaster p-3">
                <span className="inline-block rounded-full bg-rose/15 px-2 py-0.5 text-[12px] font-medium text-seed">
                  {w.review.badge}
                </span>
                <p
                  id="spoiler-line"
                  aria-hidden={!spoiler}
                  className={cn("mt-2 text-[15px] leading-relaxed transition-[filter] duration-500", !spoiler && "spoiler-redacted")}
                >
                  {w.review.spoiler}
                </p>
                <button
                  type="button"
                  aria-expanded={spoiler}
                  aria-controls="spoiler-line"
                  onClick={() => setSpoiler((v) => !v)}
                  className="ink-link mt-1 cursor-pointer text-[14px]"
                >
                  {spoiler ? w.review.hide : w.review.show}
                </button>
              </div>
            </article>
          </FeatureCard>
        </Reveal>

        {/* 4. What other readers read */}
        <Reveal delay={80}>
          <FeatureCard icon={<OpenBook className="h-11 w-auto" />} title={w.readers.title} desc={w.readers.desc}>
            <div className="rounded-[12px] border border-sage bg-straw/60 p-4">
              <p className="mb-3 text-[13px] font-medium text-olive">{w.readers.row}</p>
              <div className="grid grid-cols-5 gap-2">
                {["boof", "shazdeh", "chashmhayash", "stoner", "hundred"].map((id) => (
                  <BookCover key={id} book={byId(id)} className="[&>span:nth-child(2)]:text-[9px]" />
                ))}
              </div>
            </div>
          </FeatureCard>
        </Reveal>
      </div>

      {/* Bilingual archive search, in one small line */}
      <Reveal className="mt-14 flex flex-col items-center gap-4 text-center md:mt-16">
        <p className="text-[16px] text-olive">{w.search.line}</p>
        <div className="flex flex-wrap items-center justify-center gap-3" aria-hidden>
          <span lang="fa" dir="rtl" className="rounded-[10px] border border-sage bg-straw px-3 py-1.5 text-[14px]">
            {w.search.q1}
          </span>
          <span className="text-olive">/</span>
          <span lang="en" dir="ltr" className="rounded-[10px] border border-sage bg-straw px-3 py-1.5 font-serif text-[14px]">
            {w.search.q2}
          </span>
          <span className="text-olive">{arrow}</span>
          <span className="w-8">
            <BookCover book={byId("boof")} className="p-1 [&>span:nth-child(2)]:hidden" />
          </span>
          <span className="margin-note -rotate-2">{w.search.same}</span>
        </div>
      </Reveal>
    </Section>
  );
}
