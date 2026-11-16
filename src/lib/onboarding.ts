/**
 * Pure logic for the "start your shelf" onboarding: bilingual book search,
 * picking up to five favourites, and email validation.
 */
export type Book = {
  id: string;
  fa: string;
  en: string;
  authorFa: string;
  authorEn: string;
  /** palette token used for the spine / cover */
  tone: "seed" | "olive" | "leaf" | "rose" | "sage" | "ink" | "straw";
};

export const MAX_PICKS = 5;

/** A small Persian + English archive used by the landing-page demo. */
export const CATALOG: Book[] = [
  { id: "boof", fa: "بوف کور", en: "The Blind Owl", authorFa: "صادق هدایت", authorEn: "Sadegh Hedayat", tone: "ink" },
  { id: "savushun", fa: "سووشون", en: "Savushun", authorFa: "سیمین دانشور", authorEn: "Simin Daneshvar", tone: "seed" },
  { id: "kelidar", fa: "کلیدر", en: "Kelidar", authorFa: "محمود دولت‌آبادی", authorEn: "Mahmoud Dowlatabadi", tone: "olive" },
  { id: "shazdeh", fa: "شازده احتجاب", en: "Prince Ehtejab", authorFa: "هوشنگ گلشیری", authorEn: "Houshang Golshiri", tone: "rose" },
  { id: "chashmhayash", fa: "چشم‌هایش", en: "Her Eyes", authorFa: "بزرگ علوی", authorEn: "Bozorg Alavi", tone: "leaf" },
  { id: "jayekhali", fa: "جای خالی سلوچ", en: "The Colonel's Absence", authorFa: "محمود دولت‌آبادی", authorEn: "Mahmoud Dowlatabadi", tone: "sage" },
  { id: "golestan", fa: "گلستان", en: "Golestan", authorFa: "سعدی", authorEn: "Saadi", tone: "olive" },
  { id: "shahnameh", fa: "شاهنامه", en: "Shahnameh", authorFa: "فردوسی", authorEn: "Ferdowsi", tone: "seed" },
  { id: "littleprince", fa: "شازده کوچولو", en: "The Little Prince", authorFa: "آنتوان دو سنت‌اگزوپری", authorEn: "Antoine de Saint-Exupéry", tone: "rose" },
  { id: "hundred", fa: "صد سال تنهایی", en: "One Hundred Years of Solitude", authorFa: "گابریل گارسیا مارکز", authorEn: "Gabriel García Márquez", tone: "leaf" },
  { id: "stoner", fa: "استونر", en: "Stoner", authorFa: "جان ویلیامز", authorEn: "John Williams", tone: "sage" },
  { id: "pride", fa: "غرور و تعصب", en: "Pride and Prejudice", authorFa: "جین آستن", authorEn: "Jane Austen", tone: "ink" },
];

/** Normalize Arabic/Persian letter variants, zero-width joiners, case and spacing. */
export function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200f\u200e]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Search the archive in both languages: titles and authors, Persian or English. */
export function searchBooks(query: string, catalog: Book[] = CATALOG): Book[] {
  const q = normalizeQuery(query);
  if (!q) return [];
  return catalog.filter((b) =>
    [b.fa, b.en, b.authorFa, b.authorEn].some((field) => normalizeQuery(field).includes(q)),
  );
}

/** Add a book to the picks: ignores duplicates and never exceeds MAX_PICKS. */
export function addPick(picks: Book[], book: Book): Book[] {
  if (picks.length >= MAX_PICKS) return picks;
  if (picks.some((p) => p.id === book.id)) return picks;
  return [...picks, book];
}

export function removePick(picks: Book[], id: string): Book[] {
  return picks.filter((p) => p.id !== id);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/** Iranian mobile numbers: 09xxxxxxxxx or +989xxxxxxxxx (Persian digits allowed). */
export function isValidPhone(phone: string): boolean {
  const latin = phone.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[\s-]/g, "");
  return /^(\+98|0098|0)?9\d{9}$/.test(latin);
}
