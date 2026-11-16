/**
 * Tiny bilingual (fa / en) layer for the Yoin landing page.
 * Persian is the default; switching flips direction (rtl ⇄ ltr) and digit system.
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict, type Dict } from "./copy";

export type Lang = "fa" | "en";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Convert Latin digits in a number/string to Persian digits. */
export function toPersianDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

/** Localize digits for the given language (Persian digits in fa, Latin in en). */
export function localizeDigits(value: number | string, lang: Lang): string {
  if (lang === "fa") return toPersianDigits(value);
  return String(value).replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
}

type LangContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  n: (value: number | string) => string;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fa");

  // Restore saved choice after hydration (never during render, to avoid mismatches).
  useEffect(() => {
    const saved = window.localStorage.getItem("yoin-lang");
    if (saved === "fa" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "fa" ? "rtl" : "ltr";
    window.localStorage.setItem("yoin-lang", lang);
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dir: lang === "fa" ? "rtl" : "ltr",
      t: dict[lang],
      n: (v) => localizeDigits(v, lang),
      setLang,
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
