/** Small shared building blocks: buttons, logo, language toggle, book cover, section shell, deckle edge. */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import type { Book } from "@/lib/onboarding";
import { Sparkle } from "./Doodles";

/* ───────────── Buttons ───────────── */
export const yoinButton = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-medium transition-[background-color,color,box-shadow,transform] duration-300 ease-out active:translate-y-px disabled:cursor-not-allowed disabled:border-sage disabled:bg-sage disabled:text-olive",
  {
    variants: {
      variant: {
        primary: "bg-seed text-plaster shadow-paper hover:bg-ink",
        secondary: "border-[1.5px] border-olive text-olive hover:bg-olive hover:text-plaster",
        ghost: "text-olive hover:bg-straw",
        onDark: "border-[1.5px] border-sage text-plaster hover:bg-plaster hover:text-olive",
      },
      size: {
        sm: "h-10 px-4 text-[15px]",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-7 text-[17px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof yoinButton> & { asChild?: boolean };

export const YButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(yoinButton({ variant, size }), className)} {...props} />;
  },
);
YButton.displayName = "YButton";

/* ───────────── Logo: cream serif wordmark on an olive rounded square ───────────── */

/** The wordmark image already reads on light and dark grounds; `onDark` is accepted for call-site clarity. */
export function Logo({ className }: { className?: string; onDark?: boolean }) {
  return (
    <img
      src="/Logo.svg"
      alt="Yoin"
      className={cn("h-11 w-auto object-contain", className)}
    />
  );
}


/* ───────────── FA | EN toggle ───────────── */
export function LangToggle({ onDark, className }: { onDark?: boolean; className?: string }) {
  const { lang, setLang, t } = useLang();
  const opt = (value: "fa" | "en", label: string) => (
    <button
      type="button"
      lang={value}
      aria-pressed={lang === value}
      onClick={() => setLang(value)}
      className={cn(
        "h-8 min-w-10 cursor-pointer rounded-[8px] px-2.5 text-[13px] font-medium transition-colors duration-300",
        onDark
          ? lang === value
            ? "bg-plaster text-olive"
            : "text-plaster hover:bg-plaster/10"
          : lang === value
            ? "bg-olive text-plaster"
            : "text-olive hover:bg-straw",
      )}
    >
      {label}
    </button>
  );
  return (
    <div
      role="group"
      aria-label={t.langToggle}
      dir="ltr"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-[10px] border p-0.5",
        onDark ? "border-sage/50" : "border-sage",
        className,
      )}
    >
      {opt("fa", "فا")}
      <span aria-hidden className={cn("text-xs", onDark ? "text-sage" : "text-sage")}>
        |
      </span>
      {opt("en", "EN")}
    </div>
  );
}

/* ───────────── Flat placeholder book cover with a slim spine highlight ───────────── */
const tone: Record<Book["tone"], string> = {
  seed: "bg-seed text-plaster",
  olive: "bg-olive text-plaster",
  leaf: "bg-leaf text-plaster",
  rose: "bg-rose text-plaster",
  sage: "bg-sage text-ink",
  ink: "bg-ink text-plaster",
  straw: "bg-straw text-ink",
};
export const toneClass = (t: Book["tone"]) => tone[t];

export function BookCover({ book, className }: { book: Book; className?: string }) {
  const { lang } = useLang();
  const title = lang === "fa" ? book.fa : book.en;
  return (
    <div
      role="img"
      aria-label={title}
      className={cn(
        "relative flex aspect-[2/3] w-full flex-col justify-between overflow-hidden rounded-[4px] rounded-e-[8px] p-2 shadow-paper",
        tone[book.tone],
        className,
      )}
    >
      <span aria-hidden className="absolute inset-y-0 start-1.5 w-[2px] bg-plaster/25" />
      <span className="ps-2 text-[11px] leading-snug font-bold">{title}</span>
      <span aria-hidden className="mx-auto mb-1 h-px w-1/2 bg-current opacity-40" />
    </div>
  );
}

/* ───────────── Deckle (torn paper) edge between sections ───────────── */
export function DeckleEdge({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 24"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-[1] h-4 w-full md:h-6",
        flip ? "top-full -mt-px rotate-180" : "-top-[15px] md:-top-[23px]",
        className,
      )}
    >
      <path
        fill="currentColor"
        d="M0 24 L0 14 C40 12 62 17 96 13 S160 9 204 14 S280 18 330 12 S410 8 462 13 S540 17 600 11 S690 9 740 14 S820 18 880 12 S960 8 1010 13 S1092 17 1150 11 S1240 9 1290 14 S1370 17 1440 12 L1440 24 Z"
      />
      <path
        fill="currentColor"
        opacity="0.6"
        d="M0 24 L0 18 C60 16 120 20 200 17 S340 15 420 18 S560 21 660 17 S800 15 900 18 S1050 21 1150 17 S1320 15 1440 18 L1440 24 Z"
      />
    </svg>
  );
}

/* ───────────── Section shell with running header (folio) + chapter label ───────────── */
export function Section({
  id,
  tone: bg = "plaster",
  folio,
  className,
  children,
  labelledBy,
  edgeTop = true,
  edgeBottom = true,
}: {
  id?: string;
  tone?: "plaster" | "straw";
  folio?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
  edgeTop?: boolean;
  edgeBottom?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-24 md:py-32", bg === "straw" ? "bg-straw" : "bg-plaster", className)}
    >
      {bg === "straw" ? (
        <>
          {edgeTop ? <DeckleEdge className="text-straw" /> : null}
          {edgeBottom ? <DeckleEdge flip className="text-straw" /> : null}
        </>
      ) : null}
      {folio ? (
        <div aria-hidden className="folio absolute top-6 end-5 md:top-8 md:end-10">
          {folio}
        </div>
      ) : null}
      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">{children}</div>
    </section>
  );
}

export function ChapterLabel({ children }: { children: ReactNode }) {
  return <p className="chapter-label mb-4">{children}</p>;
}
