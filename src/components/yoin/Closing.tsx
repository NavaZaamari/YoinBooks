/** Bookshop link, final call-to-action, and footer. */
import { useLang } from "@/lib/i18n";
import { OliveBranch, SleepyCat, Sparkle, TeaGlass, Tote } from "./Doodles";
import { ComingSoon } from "./ComingSoon";
import type { AuthMode } from "./Header";
import { DeckleEdge, LangToggle, Logo, Section, YButton } from "./primitives";
import { Reveal } from "./Reveal";

/** Placeholder address for the Yoin online bookshop. */
export const BOOKSHOP_URL = "https://shop.yoin.app";

export function Bookshop() {
  const { t, n } = useLang();
  return (
    <Section id="bookshop" folio={`Yoin · ${n(5)}`} labelledBy="shop-title">
      <Reveal>
        <div className="paper-card mx-auto flex max-w-3xl flex-col items-center gap-6 bg-straw px-6 py-10 text-center sm:flex-row sm:gap-8 sm:px-10 sm:text-start">
          <Tote className="h-24 w-auto shrink-0 text-ink" />
          <div className="flex-1">
            <h2 id="shop-title" className="text-[22px] md:text-[26px]">
              {t.shop.title}
            </h2>
            <p className="mt-1 text-olive">{t.shop.sub}</p>
          </div>
          <ComingSoon>
            <YButton asChild variant="secondary" size="md">
              <a href={BOOKSHOP_URL} target="_blank" rel="noreferrer">
                {t.shop.cta}
              </a>
            </YButton>
          </ComingSoon>
        </div>
      </Reveal>
    </Section>
  );
}

export function FinalCta({ onAuth }: { onAuth: (m: AuthMode) => void }) {
  const { t, n } = useLang();
  return (
    <Section tone="straw" folio={`Yoin · ${n(6)}`} labelledBy="final-title" edgeBottom={false} className="pb-32 md:pb-40">
      <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="flex items-end gap-2">
          <TeaGlass className="h-24 w-auto text-ink" />
          <SleepyCat className="h-14 w-auto text-ink" />
        </div>
        <h2 id="final-title" className="mt-8 text-[28px] md:text-[36px]">
          {t.final.title}
        </h2>
        <ComingSoon layoutClassName="mt-8">
          <YButton size="lg" onClick={() => onAuth("signup")}>
            {t.final.cta}
          </YButton>
        </ComingSoon>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  const { t, n } = useLang();
  const hrefs = [
    "https://www.instagram.com/yoinbook/",
    BOOKSHOP_URL,
];
  return (
    <footer className="relative bg-olive text-plaster">
      <DeckleEdge className="text-olive" />
      <div className="mx-auto max-w-[1120px] px-5 pt-16 pb-10 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <Logo onDark className="self-start" />
            <p className="text-[15px] text-sage">{t.footer.tagline}</p>
            <OliveBranch className="h-12 w-auto self-start text-plaster [&_[data-fill]]:text-sage" />
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {t.footer.links.map((label, i) => {
                const link = (
                  <a
                    href={hrefs[i]}
                    target={i === 0 ? "_blank" : undefined}
                    rel={i === 0 ? "noopener noreferrer" : undefined}
                    className="text-[15px] text-plaster transition-colors duration-300 hover:text-sage"
                  >
                    {label}
                  </a>
                );
                // Index 1 is the Bookshop link.
                return <li key={label}>{hrefs[i] === BOOKSHOP_URL ? <ComingSoon>{link}</ComingSoon> : link}</li>;
              })}
            </ul>
          </nav>
          <LangToggle onDark />
        </div>
        <div className="mt-12 flex items-center gap-2 border-t border-sage/30 pt-6 text-[13px] text-sage">
          <Sparkle filled className="h-3 w-3 text-sage" />
          {t.footer.copy(n(new Date().getFullYear()))}
        </div>
      </div>
    </footer>
  );
}
