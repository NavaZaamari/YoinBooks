import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { Arrow, ReadingCat, Sparkle, Squiggle } from "./Doodles";
import { ComingSoon } from "./ComingSoon";
import type { AuthMode } from "./Header";
import { DeckleEdge, YButton } from "./primitives";

/** Folded page corner. Drawn for the bottom-right corner; mirror with scale utilities. */
function PageCurl({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 56 56" className={cn("page-curl absolute z-10 h-11 w-11 md:h-14 md:w-14", className)}>
      <path d="M56 0 L56 56 L0 56 Z" className="fill-straw" />
      <path d="M56 1 Q17 13 1 56 Q31 41 56 1 Z" className="fill-plaster stroke-sage" strokeWidth={1} />
    </svg>
  );
}

/** Hero rendered as an open book: two facing pages on desktop, one page on mobile. */
export function Hero({ onAuth }: { onAuth: (m: AuthMode) => void }) {
  const { t, n, lang } = useLang();
  const h = t.hero;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative bg-straw pt-10 pb-24 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-[1120px] px-4 md:px-8">
        <div className="book-spread animate-page-in relative grid rounded-[6px] bg-plaster md:grid-cols-2">
          <div aria-hidden className="book-gutter hidden md:block" />

          {/* Curled corners: bottom outer corners on desktop, a single top corner on mobile */}
          <PageCurl className="right-0 bottom-0 hidden md:block" />
          <PageCurl className="bottom-0 left-0 hidden -scale-x-100 md:block" />
          <PageCurl className="end-0 top-0 -scale-y-100 rtl:-scale-x-100 md:hidden" />

          {/* ── First page: the promise ── */}
          <div className="relative px-6 pt-14 pb-8 sm:px-10 md:px-12 md:pt-20 md:pb-20 lg:px-14">
            <p aria-hidden className="folio absolute top-5 start-6 md:start-12 lg:start-16">
              Yoin
            </p>

            <h1 id="hero-title" className="relative max-w-[18ch] text-[36px] sm:text-[40px] md:text-[44px] lg:text-[56px]">
              {h.title}
              <Sparkle className="absolute -top-6 -end-2 h-7 w-7 text-seed md:-end-6" />
            </h1>
            <Squiggle className="mt-3 h-3 w-40 text-rose" />

            <p className="mt-6 max-w-[42ch] text-olive">{h.sub}</p>

            <div className="mt-8">
              <div aria-hidden className="flex items-end gap-1 ps-3">
                <span className="margin-note -rotate-3 pb-5">{h.note}</span>
                <Arrow className="h-12 w-16 text-ink ltr:-scale-x-100" />
              </div>
              <div className="flex flex-wrap gap-3">
                <ComingSoon>
                  <YButton size="lg" onClick={() => onAuth("signup")}>
                    {h.cta}
                  </YButton>
                </ComingSoon>
                <ComingSoon>
                  <YButton asChild variant="secondary" size="lg">
                    <a href="#bookshop">{h.cta2}</a>
                  </YButton>
                </ComingSoon>
              </div>
            </div>

            <p aria-hidden className="folio absolute bottom-4 start-6 hidden md:block md:start-12 lg:start-16">
              {n(1)}
            </p>
          </div>

          {/* ── Facing page: the illustration ── */}
          <div className="relative flex flex-col items-center justify-center px-6 pt-2 pb-14 sm:px-10 md:px-12 md:py-20">
            <p aria-hidden className="folio absolute top-5 end-6 hidden md:block md:end-12">
              {lang === "en" ? "Prologue" : "پیش‌گفتار"}
            </p>
            <ReadingCat label={h.illustration} className="w-[80%] max-w-[320px] text-ink md:w-[72%] md:max-w-[400px]" />
            <p className="mt-6 text-center text-[15px] font-light text-olive [[lang=en]_&]:font-serif [[lang=en]_&]:italic">
              {h.pageLeft}
            </p>
            <p aria-hidden className="folio absolute bottom-4 end-6 hidden md:block md:end-12">
              {n(2)}
            </p>
          </div>
        </div>
      </div>
      <DeckleEdge flip className="text-straw" />
    </section>
  );
}
