import { describe, expect, it } from "vitest";
import { CATALOG, MAX_PICKS, addPick, isValidEmail, searchBooks } from "@/lib/onboarding";
import { localizeDigits, toPersianDigits } from "@/lib/i18n";

describe("onboarding rules", () => {
  it("finds the same book from a Persian or an English query", () => {
    expect(searchBooks("بوف کور")[0]?.id).toBe("boof");
    expect(searchBooks("the blind owl")[0]?.id).toBe("boof");
  });

  it("accepts Arabic letter variants in Persian queries", () => {
    expect(searchBooks("كليدر").map((b) => b.id)).toContain("kelidar");
  });

  it("caps the shelf at five picks", () => {
    expect(MAX_PICKS).toBe(5);
    const picks = CATALOG.slice(0, 7).reduce(addPick, [] as typeof CATALOG);
    expect(picks).toHaveLength(5);
  });

  it("does not add the same book twice", () => {
    const first = CATALOG[0]!;
    const once = addPick([], first);
    expect(addPick(once, first)).toHaveLength(1);
  });

  it("rejects an invalid email and accepts a valid one", () => {
    expect(isValidEmail("reader@")).toBe(false);
    expect(isValidEmail("reader@yoin.app")).toBe(true);
  });
});

describe("digit localization", () => {
  it("uses Persian digits in Persian and Latin digits in English", () => {
    expect(toPersianDigits("12 of 24")).toBe("۱۲ of ۲۴");
    expect(localizeDigits("۱۲", "en")).toBe("12");
  });
});
