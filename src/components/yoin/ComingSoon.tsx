import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { COMING_SOON_ENABLED } from "@/lib/coming-soon";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ChildProps = {
  className?: string;
  onClick?: (e: MouseEvent) => void;
  tabIndex?: number;
  "aria-disabled"?: boolean | "true" | "false";
  "aria-describedby"?: string;
};

/** How far the sticker overhangs the button's inline-end corner (0.4rem). */
const OVERHANG = 6.4;
/** How far the sticker sits above the button's top edge (0.75rem). */
const LIFT = 12;

type BadgePos = { top: number; insetInlineEnd: number };

/* ── Shared "follow" loop ────────────────────────────────────────────────────────────────────
 * Sections fade/slide in on scroll, which moves a locked button without resizing anything.
 * While any transition or animation is running we re-measure every frame, then go quiet again. */
const measures = new Set<() => void>();
let raf = 0;
let followUntil = 0;

function pump(now: number) {
  for (const m of measures) m();
  if (now < followUntil) raf = requestAnimationFrame(pump);
  else raf = 0;
}

function follow(ms: number) {
  followUntil = Math.max(followUntil, performance.now() + ms);
  if (!raf) raf = requestAnimationFrame(pump);
}

let motionWatched = false;
function watchMotion() {
  if (motionWatched || typeof document === "undefined") return;
  motionWatched = true;
  const start = () => follow(1000);
  const tail = () => follow(150);
  for (const e of ["transitionrun", "animationstart"]) document.addEventListener(e, start, true);
  for (const e of ["transitionend", "animationend", "transitioncancel", "animationcancel"])
    document.addEventListener(e, tail, true);
}

/**
 * Tracks the locked element's corner in viewport space so the badge can be rendered outside it.
 * A `filter: blur()` on any ancestor blurs its whole subtree, so a badge that must stay sharp
 * cannot live inside the locked element — or inside a blurred section around it.
 */
function useBadgeAnchor<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState<BadgePos | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof document === "undefined") return;

    const measure = () => {
      // Hidden entry points (e.g. the desktop-only log-in button on a phone) get no sticker.
      // checkVisibility also covers ancestors that are hidden, like the collapsed desktop nav.
      const hidden =
        typeof el.checkVisibility === "function"
          ? !el.checkVisibility({ opacityProperty: false })
          : getComputedStyle(el).display === "none";
      if (hidden) {
        setPos((p) => (p === null ? p : null));
        return;
      }
      const r = el.getBoundingClientRect();
      const rtl = document.documentElement.dir === "rtl";
      const next: BadgePos = {
        top: Math.round(r.top - LIFT),
        insetInlineEnd: Math.round(rtl ? r.left - OVERHANG : window.innerWidth - r.right - OVERHANG),
      };
      setPos((p) => (p && p.top === next.top && p.insetInlineEnd === next.insetInlineEnd ? p : next));
    };

    watchMotion();
    measures.add(measure);
    measure();

    // Catches layout shifts that move the element without resizing it (errors, opened menus).
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    ro?.observe(el);
    ro?.observe(document.documentElement);
    window.addEventListener("scroll", measure, { capture: true, passive: true });
    window.addEventListener("resize", measure);
    return () => {
      measures.delete(measure);
      ro?.disconnect();
      window.removeEventListener("scroll", measure, { capture: true });
      window.removeEventListener("resize", measure);
    };
  }, [enabled]);

  return { ref, pos };
}

/**
 * Locks one button/link that leads to an unreleased feature.
 * The child stays in place (same size, position, href and handlers in code) but is blurred and
 * made inert; a sharp "coming soon" badge is rendered as a body-level overlay pinned to the
 * button's corner, so it is never blurred — not by the button, nor by a blurred section around it.
 *
 * - `layoutClassName`: spacing/visibility classes the child needs in its parent (e.g. `mt-8`,
 *   `hidden md:inline-flex`). They move to the wrapper while locked and back onto the child when off.
 * - `className`: extra wrapper-only classes, used only while locked.
 * - `enabled`: defaults to the global COMING_SOON_ENABLED flag.
 */
export function ComingSoon({
  children,
  layoutClassName,
  className,
  enabled = COMING_SOON_ENABLED,
}: {
  children: ReactElement<ChildProps>;
  layoutClassName?: string;
  className?: string;
  enabled?: boolean;
}) {
  const { t, lang } = useLang();
  const badgeId = useId();
  const { ref, pos } = useBadgeAnchor<HTMLSpanElement>(enabled);

  if (!isValidElement<ChildProps>(children)) return <>{children as ReactNode}</>;

  if (!enabled) {
    return layoutClassName
      ? cloneElement(children, { className: cn(children.props.className, layoutClassName) })
      : children;
  }

  const locked = cloneElement(children, {
    className: cn(children.props.className, "coming-soon-locked"),
    tabIndex: -1,
    "aria-disabled": "true",
    "aria-describedby": badgeId,
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
  });

  return (
    <span ref={ref} className={cn("coming-soon", layoutClassName, className)} data-coming-soon>
      {locked}
      {pos
        ? createPortal(
            <span
              id={badgeId}
              lang={lang}
              className="coming-soon-badge"
              style={{ top: pos.top, insetInlineEnd: pos.insetInlineEnd }}
            >
              {t.comingSoon}
            </span>,
            document.body,
          )
        : null}
    </span>
  );
}
