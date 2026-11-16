import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { ComingSoon } from "./ComingSoon";
import { LangToggle, Logo, YButton } from "./primitives";

export type AuthMode = "signup" | "login";

/** Sticky paper-coloured header. On mobile the links collapse into a menu; Sign up stays visible. */
export function Header({ onAuth }: { onAuth: (mode: AuthMode) => void }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-sage/50 bg-plaster/90 backdrop-blur-[6px]">
      <div className="mx-auto flex h-[72px] max-w-[1120px] items-center gap-4 px-5 md:px-8">
        <a href="#top" aria-label="Yoin" className="shrink-0 rounded-[12px]">
          <Logo />
        </a>

        <nav aria-label={t.nav.menu} className="ms-6 hidden items-center gap-7 md:flex">
          <a href="#features" className="ink-link text-[15px]">
            {t.nav.features}
          </a>
          <ComingSoon>
            <a href="#bookshop" className="ink-link text-[15px]">
              {t.nav.bookshop}
            </a>
          </ComingSoon>
        </nav>

        <div className="ms-auto flex items-center gap-2 md:gap-3">
          <LangToggle className="hidden md:inline-flex" />
          <ComingSoon layoutClassName="hidden md:inline-flex">
            <YButton variant="secondary" size="sm" onClick={() => onAuth("login")}>
              {t.nav.login}
            </YButton>
          </ComingSoon>
          <ComingSoon>
            <YButton size="sm" onClick={() => onAuth("signup")}>
              {t.nav.signup}
            </YButton>
          </ComingSoon>
          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] text-ink hover:bg-straw md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6.5 C10 10 14 14 18 17.5" />
                  <path d="M18 6 C14 10 10 14 6.5 18" />
                </>
              ) : (
                <>
                  <path d="M4 7 C9 6.4 14 7.4 20 6.8" />
                  <path d="M4 12.2 C9 11.6 15 12.6 20 12" />
                  <path d="M4 17.4 C10 16.8 14 17.8 20 17.2" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-sage/50 bg-plaster px-5 pt-3 pb-5 md:hidden">
          <nav aria-label={t.nav.menu} className="flex flex-col">
            <a href="#features" onClick={() => setOpen(false)} className="py-3 text-ink">
              {t.nav.features}
            </a>
            <ComingSoon className="self-start">
              <a href="#bookshop" onClick={() => setOpen(false)} className="py-3 text-ink">
                {t.nav.bookshop}
              </a>
            </ComingSoon>
          </nav>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-sage/50 pt-4">
            <LangToggle />
            <ComingSoon>
              <YButton
                variant="secondary"
                size="sm"
                onClick={() => {
                  setOpen(false);
                  onAuth("login");
                }}
              >
                {t.nav.login}
              </YButton>
            </ComingSoon>
          </div>
        </div>
      ) : null}
    </header>
  );
}
