/**
 * Hand-drawn doodle library. Single-line ink (currentColor), rounded caps,
 * slightly wobbly paths, occasional flat fill accents from the palette.
 * Strokes carry pathLength=1 so they can "draw themselves" when scrolled into view.
 * Decorative by default (aria-hidden); pass `label` to expose one to assistive tech.
 */
import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./useInView";

type DoodleProps = {
  className?: string;
  label?: string;
  strokeWidth?: number;
  draw?: boolean;
};

export function Doodle({
  viewBox,
  className,
  label,
  strokeWidth = 2,
  draw = true,
  children,
}: DoodleProps & { viewBox: string; children: ReactNode }) {
  const [ref, inView] = useInView<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(draw && "doodle-draw", inView && "is-drawn", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {label ? <title>{label}</title> : null}
      {children}
    </svg>
  );
}

/** An ink stroke that can draw itself. */
const P = ({ className, ...p }: SVGProps<SVGPathElement>) => (
  <path pathLength={1} className={cn("ink-stroke", className)} {...p} />
);
/** A flat fill accent (no stroke) that fades in after the ink. */
const F = ({ className, ...p }: SVGProps<SVGPathElement>) => (
  <path data-fill="" stroke="none" fill="currentColor" className={className} {...p} />
);
const Dot = ({ className, ...p }: SVGProps<SVGCircleElement>) => (
  <circle data-fill="" stroke="none" fill="currentColor" className={className} {...p} />
);

/* ───────────── Shapes (reusable <g> groups) ───────────── */

function SparkleShape({ filled }: { filled?: boolean | undefined }) {
  const d =
    "M12 2.5 C12.7 8.4 15.3 11.2 21.5 12 C15.4 12.9 12.8 15.5 12 21.5 C11.2 15.4 8.7 12.8 2.5 12 C8.6 11.1 11.3 8.5 12 2.5 Z";
  return filled ? <F d={d} /> : <P d={d} />;
}

function BookStackShape() {
  return (
    <g>
      <F className="text-leaf" d="M18 52.5 L100 54 L99 68 L17.5 69.5 Z" />
      <F className="text-rose" d="M28 36 L92 34.5 L93.5 51.5 L27.5 52.5 Z" />
      {/* bottom book */}
      <P d="M10 70.5 C40 69 78 68.5 108 68 L109 84 C78 85 40 85.5 11 86 Z" />
      <P d="M10.5 75 C40 74 80 73 108.5 72.5" />
      <P d="M22 70.5 L22.5 85.6" />
      {/* middle book */}
      <P d="M18 52.5 C46 53.5 74 53.8 100 54 L99 68 C72 68.6 44 69.2 17.5 69.5 Z" />
      <P d="M88 54 L87.5 68.3" />
      {/* top book */}
      <P d="M28 36 C48 35.2 72 34.8 92 34.5 L93.5 51.5 C72 51.8 48 52.2 27.5 52.5 Z" />
      <P d="M36 35.7 L36 52.3" />
      <P d="M40 41 C52 40.6 64 40.4 76 40.2" />
    </g>
  );
}

function CatShape() {
  return (
    <g>
      <F className="text-sage" d="M40 48 C46 30 70 24 90 30 C104 36 108 50 102 59 L40 60 Z" />
      {/* curled body */}
      <P d="M40 48 C46 30 70 23 90 29 C105 35 109 50 102 59" />
      {/* head */}
      <P d="M18 60 C9 56 10 42 21 38 C30 35 39 40 41 49 C42 55 38 60 33 60.5" />
      {/* ears */}
      <P d="M16.5 42 L14 30.5 L24 37" />
      <P d="M31 36.5 L37 28 L38.5 41" />
      {/* sleepy eyes */}
      <P d="M19 49 C21 51 23 51 25 49" />
      <P d="M29.5 48.5 C31.5 50.5 33.5 50.5 35.5 48.5" />
      <P d="M26.5 53.5 L27.5 54.5 L28.5 53.5" />
      {/* tail wrapping the front */}
      <P d="M102 59 C110 63 100 69 80 66 C66 64 54 64 44 63" />
      <P d="M12 61 C40 60.5 80 60 106 60.5" />
      {/* zzz */}
      <P strokeWidth={1.5} d="M52 14 L59 14 L52 21 L59 21" />
      <P strokeWidth={1.5} d="M64 5 L69 5 L64 10 L69 10" />
    </g>
  );
}

function PomegranateShape() {
  return (
    <g>
      <F className="text-rose" d="M40 19 C58 19 69 32 67.5 50 C66 66 52 73.5 38.5 72 C23 70.5 12.5 58.5 13.5 44 C14.5 30.5 24 19.5 40 19 Z" />
      <P d="M40 19 C58 19 69 32 67.5 50 C66 66 52 73.5 38.5 72 C23 70.5 12.5 58.5 13.5 44 C14.5 30.5 24 19.5 40 19 Z" />
      <P d="M33 19.5 L31 10 L36.5 14 L40 6.5 L43.5 14 L49 10 L47 19.8" />
      <P strokeWidth={1.5} d="M23 40 C24 33 27.5 28.5 32 26.5" />
    </g>
  );
}

function PomegranateCutShape() {
  return (
    <g>
      <P d="M9 40 C9.5 60 24 72.5 40 72 C57 71.5 70.5 59 71 40 C50 41.5 30 41 9 40 Z" />
      <P strokeWidth={1.5} d="M16 43 C18.5 56 28 65.5 40 65.5 C52.5 65.5 61.5 56 64 43.5" />
      {[
        [24, 49], [32, 52], [40, 49], [48, 52], [56, 49],
        [28, 58], [36, 60], [44, 60], [52, 58], [40, 55],
      ].map(([cx, cy]) => (
        <Dot key={`${cx}-${cy}`} className="text-rose" cx={cx} cy={cy} r={2.6} />
      ))}
    </g>
  );
}

function OliveBranchShape() {
  const leaves = [
    "M30 58 C25 47 31 40 40 38 C40.5 48 37 54 30 58 Z",
    "M30 58 C20 60 13 55 11 48 C20 46 27 50 30 58 Z",
    "M56 44 C52 33 58 26 67 24.5 C67.5 34 63.5 40 56 44 Z",
    "M56 44 C46 47 39 43 36 36 C45 33 52 37 56 44 Z",
    "M82 29 C79 19 85 13 93 12 C93 21 89 26 82 29 Z",
    "M82 29 C73 32 66 29 63 23 C71 20 78 23 82 29 Z",
  ];
  return (
    <g>
      <F className="text-leaf" d={leaves[0]} />
      <F className="text-sage" d={leaves[3]} />
      <F className="text-leaf" d={leaves[4]} />
      <P d="M5 71 C30 59 62 38 112 13" />
      {leaves.map((d) => (
        <P key={d} d={d} />
      ))}
      <Dot className="text-olive" cx={46} cy={56} r={3.6} />
      <Dot className="text-olive" cx={74} cy={41} r={3.4} />
    </g>
  );
}

function CypressShape() {
  return (
    <g>
      <F className="text-sage" d="M30 6 C22 24 16 46 18 70 C20 81 40 81 42 70 C44 46 38 24 30 6 Z" />
      <P d="M30 6 C22 24 16 46 18 70 C20 81 40 81 42 70 C44 46 38 24 30 6 Z" />
      <P strokeWidth={1.4} d="M30 18 C27 34 26 52 27 70" />
      <P strokeWidth={1.4} d="M26 40 L30 44 L34 38" />
      <P strokeWidth={1.4} d="M24 56 L29 60 L35 54" />
      <P d="M30 80 L30 92" />
      <P d="M18 92 C26 91 34 91 42 92" />
    </g>
  );
}

function TeaGlassShape() {
  return (
    <g>
      <F className="text-rose" d="M27.5 47 C36 49 44 49 52.5 47 C50.5 54 51 58 52 63 C54 72 50 80 40 80 C30 80 26 72 28 63 C29 58 29.5 54 27.5 47 Z" />
      <P d="M24 34 C22.5 45 30 52 28 62 C26 72 30 80.5 40 80.5 C50 80.5 54 72 52 62 C50 52 57.5 45 56 34 C45 35 35 35 24 34 Z" />
      <P strokeWidth={1.5} d="M27.5 47 C36 49 44 49 52.5 47" />
      <P d="M12 85 C28 91 52 91 68 85" />
      <P d="M18 86.5 C30 94 50 94 62 86.5" />
      <g className="animate-steam">
        <P strokeWidth={1.6} d="M34 27 C30 21 38 16.5 34 9" />
        <P strokeWidth={1.6} d="M46 27 C42 21 50 16.5 46 9" />
      </g>
    </g>
  );
}

function LampShape() {
  return (
    <g>
      <F className="text-leaf" d="M22 34 L58 34 L50 12 L30 12 Z" />
      <P d="M22 34 C34 34.5 46 34.5 58 34 L50 12 C43 11.5 37 11.5 30 12 Z" />
      <P d="M40 34 C41.5 50 38.5 64 40 82" />
      <P d="M24 89 C29 82 51 82 56 89 C46 90 34 90 24 89 Z" />
      <P strokeWidth={1.4} d="M16 44 L11 50" />
      <P strokeWidth={1.4} d="M64 44 L69 50" />
      <P strokeWidth={1.4} d="M40 42 L40 48" />
    </g>
  );
}

function PencilShape() {
  return (
    <g>
      <F className="text-sage" d="M14 58 L50 22 L58 30 L22 66 Z" />
      <P d="M14 58 C26 46 38 34 50 22 L58 30 C46 42 34 54 22 66 Z" />
      <P d="M14 58 L8 72 L22 66" />
      <P d="M44.5 27.5 L52.5 35.5" />
      <P strokeWidth={1.4} d="M10 76 C20 74 30 76 40 74" />
    </g>
  );
}

function OpenBookShape() {
  return (
    <g>
      <P d="M50 16 C38 8 20 8 8 12 L8.5 58 C20 54 38 54.5 50 62 C62 54.5 80 54 91.5 58 L92 12 C80 8 62 8 50 16 Z" />
      <P d="M50 16 C50.5 32 49.5 46 50 62" />
      <P strokeWidth={1.4} d="M16 22 C24 20 34 21 42 24" />
      <P strokeWidth={1.4} d="M16 31 C24 29 34 30 42 33" />
      <P strokeWidth={1.4} d="M58 24 C66 21 76 20 84 22" />
      <P strokeWidth={1.4} d="M58 33 C66 30 76 29 84 31" />
    </g>
  );
}

function BookmarkShape() {
  return (
    <g>
      <F className="text-leaf" d="M14 4 L34 4 L34 44 L24 36 L14 44 Z" />
      <P d="M14 4 C21 3.5 27 3.5 34 4 L34.5 44 L24 36 L13.5 44.5 Z" />
    </g>
  );
}

function HeartShape() {
  return (
    <g>
      <F className="text-rose" d="M20 34 C4 22 7 8 17 11 C21 12.5 20 18 20 18 C21.5 10 34 8 34 18 C34 26 26 30 20 34 Z" />
      <P d="M20 34 C4 22 7 8 17 11 C21 12.5 20 18 20 18 C21.5 10 34 8 34 18 C34 26 26 30 20 34 Z" />
    </g>
  );
}

function ToteShape() {
  return (
    <g>
      <F className="text-sage" d="M20 36 L80 36 L76 92 L24 92 Z" />
      <F className="text-rose" d="M29 36 L31 16 L42 17 L41 36 Z" />
      <F className="text-leaf" d="M57 36 L61 20 L71 22.5 L67 36 Z" />
      <P d="M29 36 L31 16 C35 16.3 38.5 16.6 42 17 L41 36" />
      <P d="M57 36 L61 20 C64.5 20.8 67.5 21.6 71 22.5 L67 36" />
      <P d="M45 36 L46.5 22 L54 22.5 L53 36" />
      <P d="M20 36 C40 35 60 35 80 36 C78.5 54 77.5 74 76 92 C58 93 42 93 24 92 C22.5 74 21.5 54 20 36 Z" />
      <P d="M33 36 C32 24 38 9 50 9 C62 9 68 24 67 36" />
      <P strokeWidth={1.6} d="M21.5 60 C40 64 60 64 78.5 60" />
      <P strokeWidth={1.6} d="M50 63 C42 54 37 69 50 64 C63 69 58 54 50 63" />
      <P strokeWidth={1.6} d="M50 64 L45 74" />
      <P strokeWidth={1.6} d="M50 64 L55.5 73" />
    </g>
  );
}

/* ───────────── Exported doodles ───────────── */

export const Sparkle = ({ filled, ...p }: DoodleProps & { filled?: boolean }) => (
  <Doodle viewBox="0 0 24 24" strokeWidth={1.6} {...p}>
    <SparkleShape filled={filled} />
  </Doodle>
);

export const Star = ({ filled = true, ...p }: DoodleProps & { filled?: boolean }) => {
  const d = "M12 2.5 L14.7 8.6 L21.5 9.3 L16.4 13.8 L18 20.8 L12 17.2 L6 20.8 L7.6 13.8 L2.5 9.3 L9.3 8.6 Z";
  return (
    <Doodle viewBox="0 0 24 24" strokeWidth={1.4} draw={false} {...p}>
      {filled ? <path d={d} fill="currentColor" stroke="none" /> : <path d={d} />}
    </Doodle>
  );
};

/** Hand-drawn arrow, drawn for RTL (pointing down-right). Mirror with ltr:-scale-x-100. */
export const Arrow = (p: DoodleProps) => (
  <Doodle viewBox="0 0 110 80" {...p}>
    <P d="M8 10 C34 2 64 8 80 30 C88 41 91 52 92 64" />
    <P d="M81 55 C85 59 89 64 92.5 68 C95 63 98 58 102 53" />
  </Doodle>
);

export const Squiggle = (p: DoodleProps) => (
  <Doodle viewBox="0 0 200 14" strokeWidth={2.4} {...p}>
    <P d="M3 9 C20 3 32 13 50 7 S82 3 100 8 S135 13 152 6 S185 4 197 8" />
  </Doodle>
);

export const PenCircle = (p: DoodleProps) => (
  <Doodle viewBox="0 0 170 64" strokeWidth={1.8} {...p}>
    <P d="M24 26 C20 10 116 2 150 20 C172 34 132 58 72 56 C22 54 4 40 20 24 C30 14 52 9 70 8" />
  </Doodle>
);

/** Rough pen ring, for circling step numbers. */
export const InkRing = (p: DoodleProps) => (
  <Doodle viewBox="0 0 48 48" strokeWidth={1.8} {...p}>
    <P d="M30 6.5 C40 8 45 17 43.5 27 C42 38 32 44 22 42.5 C11 41 4.5 32 6 21.5 C7.5 11 16 5.5 26 6 C29 6.2 32 7 34.5 8.5" />
  </Doodle>
);

export const BookStack = (p: DoodleProps) => (
  <Doodle viewBox="0 25 120 66" {...p}>
    <BookStackShape />
  </Doodle>
);
export const SleepyCat = (p: DoodleProps) => (
  <Doodle viewBox="0 0 120 72" {...p}>
    <CatShape />
  </Doodle>
);
export const Pomegranate = (p: DoodleProps) => (
  <Doodle viewBox="8 2 66 76" {...p}>
    <PomegranateShape />
  </Doodle>
);
export const PomegranateCut = (p: DoodleProps) => (
  <Doodle viewBox="4 34 72 44" {...p}>
    <PomegranateCutShape />
  </Doodle>
);
export const OliveBranch = (p: DoodleProps) => (
  <Doodle viewBox="0 6 118 70" {...p}>
    <OliveBranchShape />
  </Doodle>
);
export const Cypress = (p: DoodleProps) => (
  <Doodle viewBox="10 2 40 94" {...p}>
    <CypressShape />
  </Doodle>
);
export const TeaGlass = (p: DoodleProps) => (
  <Doodle viewBox="6 4 68 92" {...p}>
    <TeaGlassShape />
  </Doodle>
);
export const Lamp = (p: DoodleProps) => (
  <Doodle viewBox="6 6 68 88" {...p}>
    <LampShape />
  </Doodle>
);
export const Pencil = (p: DoodleProps) => (
  <Doodle viewBox="4 18 58 62" {...p}>
    <PencilShape />
  </Doodle>
);
export const OpenBook = (p: DoodleProps) => (
  <Doodle viewBox="2 4 96 62" {...p}>
    <OpenBookShape />
  </Doodle>
);
export const Bookmark = (p: DoodleProps) => (
  <Doodle viewBox="8 0 32 48" {...p}>
    <BookmarkShape />
  </Doodle>
);
export const Heart = (p: DoodleProps) => (
  <Doodle viewBox="4 6 34 32" {...p}>
    <HeartShape />
  </Doodle>
);
export const Tote = (p: DoodleProps) => (
  <Doodle viewBox="14 4 72 92" {...p}>
    <ToteShape />
  </Doodle>
);

/**
 * Hero illustration: a cat curled on a small stack of books, peeking at an open book.
 * Deliberately sparse: outline only, two light fills, three tiny accents.
 * The tail sways very slowly (disabled under prefers-reduced-motion).
 */
export const ReadingCat = (p: DoodleProps) => (
  <Doodle viewBox="6 80 248 102" strokeWidth={1.8} {...p}>
    {/* light fills: top book (paper tan) and the cat (sage) */}
    <F className="text-straw" d="M120 132 C145 131 175 131 200 132 L201 150 C176 150.5 146 150.5 119 151 Z" />
    <F className="text-sage opacity-50" d="M137 108 C148 95 171 91 187 97 C201 103 206 118 201 131.5 L131 132 C127 124 131 114 137 108 Z" />

    {/* ground line */}
    <P strokeWidth={1.4} d="M12 176 C80 174.5 170 174.5 248 176.5" />

    {/* open book on the floor, the cat is reading it */}
    <P d="M60 157 C50 151.5 35 151 22 154 L23.5 171 C36 168.5 50 169 60 173 C70 169 84 168.5 97 171 L98 154 C85 151 70 151.5 60 157 Z" />
    <P strokeWidth={1.2} d="M60 157 C60.5 162 59.5 168 60 173" />
    <P strokeWidth={1.2} d="M30 159.5 C37 158.5 44 158.8 52 160.5" />
    <P strokeWidth={1.2} d="M68 160.5 C75 158.8 82 158.5 90 159.5" />

    {/* book stack: bottom book */}
    <P d="M108 151 C140 150 180 150 214 151 L213.5 171 C180 172 140 172 108.5 171.5 Z" />
    <P strokeWidth={1.3} d="M120 151.3 L120.5 171.6" />
    {/* top book */}
    <P d="M120 132 C145 131 175 131 200 132 L201 150 C176 150.5 146 150.5 119 151 Z" />
    <P strokeWidth={1.3} d="M190 132 L190.5 150.4" />

    {/* cat: curled body resting on the top book */}
    <P d="M137 108 C148 95 171 91 187 97 C201 103 206 118 201 131.5" />
    {/* head, tilted down toward the open book */}
    <P d="M131 131 C122 132 112 127 110 118 C108 108 114 100 124 99 C134 98.5 141 105 141.5 114 C142 121 139 127 134 130" />
    <P d="M112.5 108 L108 95 L119.5 100.5" />
    <P d="M131 99.5 L139 89 L140.5 106" />
    {/* closed, content eyes + nose */}
    <P strokeWidth={1.4} d="M116 114 C118 116.2 120.5 116.2 122.5 114" />
    <P strokeWidth={1.4} d="M128 114 C130 116.2 132.5 116.2 134.5 114" />
    <P strokeWidth={1.3} d="M124 119.5 L125.3 120.8 L126.6 119.5" />
    {/* front paw draped over the edge of the books */}
    <P d="M126 131.5 C124 136 118 138 114.5 135" />
    {/* tail hanging over the side, swaying */}
    <g className="animate-tail">
      <P d="M201 131.5 C211 134 216 143 211 152 C208 157 201 156 202 150" />
    </g>

    {/* three tiny accents */}
    <g transform="translate(38 92) scale(0.7)" className="text-olive" strokeWidth={2}>
      <SparkleShape />
    </g>
    <Dot className="text-olive" cx={78} cy={118} r={1.8} />
    <Dot className="text-rose" cx={226} cy={96} r={2} />
  </Doodle>
);
