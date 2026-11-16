# Yoin Persian Reading Circle

Design and build a complete, responsive landing page for "Yoin" — a Persian-first (RTL) reading-community web app (a "Goodreads-style" product made for Persian and English readers). The page must feel like a quiet, handmade, minimal literary space: the whole page should read as if it were printed on a warm, slightly aged book page, decorated with sparse hand-drawn doodles.

────────────────────────

1. BRAND & MOOD

────────────────────────

- Product: Yoin lets readers shelve books, track their reading, set a yearly reading goal, rate/review books (with spoiler protection), and discover what other readers read. It also links to an online bookshop.

- Mood keywords: library, autumn, old Iranian house, warm paper, handwritten margin notes, calm, intimate, unhurried.

- Style: MINIMAL. Lots of whitespace, few elements per section, one idea per section, restrained decoration. Doodles are accents, never clutter.

- Culture: Iranian, NOT Islamic. Absolutely no mosque/dome/arabesque/calligraphic-ornament imagery. Iranian-feeling references should be secular and gentle: pomegranates, olive branches, cypress, a tea glass (estekan), a sleepy cat, a sash window / courtyard arch silhouette, reading lamp, books.

- Do NOT feature AI, robots, or chatbot imagery anywhere on this page. The recommendation feature shown here is community-based ("what other readers read").

────────────────────────

2. COLOR PALETTE (use ONLY these colors + opacity/tints of them)

────────────────────────

- Plaster / گچ‌بری — #F7F0E0 → main page background base, card surfaces, text on dark buttons

- Straw Paper / کاغذ کاهی — #E9DCBC → aged-paper tint, alternate section background, page edges, input fills, paper vignette

- Pomegranate Night / انار شب — #4A1220 → headings, primary body text, main doodle ink color

- Dark Olive / زیتون تیره — #3F4524 → secondary text, footer background, secondary buttons, logo badge

- Pomegranate Seed / دانه‌ی انار — #7B1E34 → primary CTA buttons, links, key highlights, focus rings

- Olive Leaf / برگ زیتون — #7A7F3F → progress bars, doodle fills, small accents (large elements only — NOT for small body text, contrast is low)

- Dried Rose / گل سرخ خشک — #A65260 → hover states, tags, rating stars, soft accents (non-text or large text only)

- Sage / مریم‌گلی — #B3B88F → dividers, thin borders, subtle fills, disabled states, book-spine colors

Rules: no pure white, no pure black, no gradients except the very subtle paper vignette described below, no neon, no extra hues. Body text must meet WCAG AA contrast (use #4A1220 or #3F4524 on #F7F0E0).

────────────────────────

3. BACKGROUND: "BOOK PAGE" VIBE (key requirement)

────────────────────────

Make the page background look and feel like a real book page:

- Base: #F7F0E0 with a very subtle paper grain (inline SVG feTurbulence noise at ~3–5% opacity, no external images) plus faint paper fibers.

- Aged edges: a soft inner vignette toward #E9DCBC at the viewport/section edges, like yellowed page margins. Very subtle.

- Tiny "foxing" speckles (a few scattered 1–2px dots in #E9DCBC / #B3B88F at very low opacity). Sparse, random-looking, never distracting.

- Hero section: render the hero as an OPEN BOOK SPREAD on desktop — two facing pages with a soft center gutter shadow (very light, warm, not gray), slightly curled bottom corners, and thin page-edge lines (stacked paper edges) on the left and right. On mobile, collapse to a single page with just the top-corner curl.

- Book-page details used as quiet UI decoration: a faint margin line (1px #B3B88F at ~40% opacity) running down one side of the content, tiny running headers/folios (e.g., a small page number or the word "Yoin" at the top corner of sections), and chapter-style section labels ("فصل ۱ / Chapter 1") in a small size above section titles.

- Section transitions: instead of hard color blocks, separate sections with a gentle paper-edge/deckle-edge divider or a subtle "turning page" effect. Alternate between #F7F0E0 and #E9DCBC page tones.

- Optional very faint ruled lines or dotted notebook lines behind the onboarding section only.

- Keep it light and performant (CSS + inline SVG only).

────────────────────────

4. TYPOGRAPHY

────────────────────────

- Persian: Estedad (primary font for headings AND body). Headings: Estedad Bold/ExtraBold; body: Estedad Regular/Light; generous line-height (1.8–2 for Persian body). Fallback stack: Estedad, Vazirmatn, Tahoma, sans-serif.

- Latin / English: pair with a warm literary serif (e.g., Fraunces, Lora, or Source Serif) for English headings and the "Yoin" wordmark, matching the cream serif wordmark in the logo; Estedad's Latin glyphs or a clean sans for English body.

- Use Persian digits (۱۲۳) in Persian mode and Latin digits in English mode.

- Optional: one tiny handwritten accent font (e.g., Caveat for Latin) used VERY sparingly for margin-note-style annotations next to doodles.

- Type scale: Hero H1 ≈ 56–64px desktop / 36–40px mobile; H2 ≈ 36px / 28px; body 17–18px; small labels 13–14px. Strong hierarchy, short line lengths (max ~60 characters).

────────────────────────

5. DOODLE VECTOR STYLE

────────────────────────

- Hand-drawn, single-line style: 1.5–2.5px stroke, rounded caps and joins, slightly imperfect/wobbly lines, mostly unfilled outlines with occasional flat fill accents (#B3B88F, #7A7F3F, #A65260).

- Ink color: mainly #4A1220, sometimes #3F4524. No gradients, no shadows on doodles.

- Doodle vocabulary: stack of books, single open book, bookmark ribbon, pomegranate (whole and cut open), olive branch, cypress tree, tea glass with curling steam, a sleepy cat curled on a book stack, reading lamp, pencil/pen, four-point sparkle (echoing the logo), tiny stars, hand-drawn arrows, squiggle underlines, little hearts, circles around words like a pen annotation, small shopping tote of books tied with string (for the bookshop section).

- Placement: sparse and intentional — 1 to 3 doodles per section, tucked in margins, wrapping around headings, or interacting with UI (an arrow pointing to the main CTA, a squiggle under a key word, a sparkle near the logo). Never behind body text in a way that harms readability.

- Optional micro-animation: doodles "draw themselves" on scroll via stroke-dashoffset. Respect prefers-reduced-motion.

- All doodles delivered as inline SVG with currentColor/CSS variables so they are recolorable.

────────────────────────

6. LAYOUT, COMPONENTS & UI SYSTEM

────────────────────────

- RTL-first (dir="rtl", lang="fa") with a Persian/English language toggle that flips the layout to LTR. Use CSS logical properties (margin-inline, padding-inline, inset-inline-start, etc.) so both directions work.

- Mobile-first, PWA-friendly: breakpoints at 360 / 768 / 1120+. Content max-width ~1120px, 8pt spacing grid, very generous vertical rhythm (96–128px between sections on desktop).

- Corner radius: soft and small-to-medium (10–16px), echoing the rounded-square logo badge.

- Cards: paper-like surfaces (#F7F0E0 on #E9DCBC sections or vice versa) with a 1px #B3B88F border and a very soft warm shadow (rgba(74,18,32,0.08)). No heavy drop shadows.

- Primary button: filled #7B1E34, text #F7F0E0, hover #4A1220. Secondary button: 1.5px outline #3F4524, text #3F4524, hover fill #3F4524 with cream text. Text-link: #7B1E34 with a hand-drawn squiggle underline on hover.

- Inputs: #E9DCBC fill, 1px #B3B88F border, focus ring 2px #7B1E34 with 2px offset.

- Book covers (placeholders): flat color rectangles from the palette with simple Persian/English title text and a slim spine highlight — no photos.

- Icons: if needed, hand-drawn doodle-style, same stroke weight as the doodles.

────────────────────────

7. PAGE STRUCTURE (top to bottom)

────────────────────────

A) HEADER (sticky, paper-colored with slight blur)

   - Logo: "Yoin" cream serif wordmark on a dark-olive (#3F4524) rounded square with a small four-point sparkle at the top corner (place a logo placeholder).

   - Nav links: Features, Bookshop. Language toggle (FA | EN).

   - Right side (RTL: left side): "Login" (secondary/text button) and "Sign up" (primary button). Mobile: collapse into a simple menu while keeping the Sign up button visible.

B) HERO — the open-book spread

   - H1 (placeholder): FA «کتاب‌هایت را کنار هم بچین، خواندنت را دنبال کن» / EN "Shelve what you love. Track what you read."

   - Subheadline: one or two short lines explaining Yoin as a home for Persian and English readers.

   - CTAs: primary "Sign up free" + secondary "Visit the bookshop".

   - Visual: doodle illustration (book stack + pomegranate + olive branch + cat) sitting on the page spread, with a hand-drawn arrow pointing at the Sign up button and a sparkle near the headline.

C) PRODUCT EXPLANATION — "What is Yoin?" (chapter-style label)

   - One short intro paragraph, then a minimal 4-item feature grid. Each item = small doodle icon + short title + one-sentence description + (optional) a tiny UI mock card:

     1. Four shelves — Want to read · Reading · Read · DNFed (mock: four shelf tabs with counts; moving a book between them).

     2. Yearly reading goal — set a yearly target; it moves closer each time a book goes from Reading to Read (mock: slim #7A7F3F progress bar styled like a bookmark ribbon, e.g., "۱۲ از ۲۴ کتاب / 12 of 24 books").

     3. Ratings & reviews with Spoiler Alert — rate any book and write your opinion; spoilers are hidden until tapped (mock: review card with a blurred/redacted spoiler line and a "Show spoiler" toggle).

     4. What other readers read — recommendations on each book page based on real readers (mock: a horizontal row of 4–5 placeholder book covers under "Readers of this book also read").

   - Also mention (small line): Persian and English book archive with search in both languages (mock: a search field showing a Persian query and an English query returning the same book).

D) SIMPLE ONBOARDING — "Start your shelf in 30 seconds"

   - A single centered card on a ruled-notebook-style paper background.

   - Step 1: "Pick 5 of your favorite books" — a search input (supports Persian and English) with 5 empty book slots displayed as slim book spines/outlines on a shelf; each picked book fills one slot with a spine in a palette color and its title; counter "۰ از ۵ / 0 of 5".

   - Step 2: email address input.

   - Primary CTA: "Create my shelf". Under it: a small "Already have an account? Log in" link.

   - Include hand-drawn arrows/circles guiding the steps. Show states: empty, partially filled, completed, error (invalid email).

   - Full sign-up (email or phone number, with password or OTP) happens in a modal/page opened from the Sign up button — design a minimal modal with two tab toggles (Email | Phone) and (Password | OTP), plus a Login version of it.

E) BOOKSHOP LINK SECTION

   - A slim, warm banner or card: short line like "Found something you want to keep? Browse the Yoin bookshop." with a primary/secondary button linking to the bookshop, and a doodle of a book tote tied with string. No cart UI on the landing.

F) FINAL CTA

   - A calm closing block: one line + the Sign up button + a small doodle (tea glass or sleeping cat).

G) FOOTER (#3F4524 background, #F7F0E0 text, #B3B88F secondary text)

   - Logo, a few links (About, Bookshop, Contact, Terms, Privacy), language toggle, small copyright, a tiny olive-branch doodle in cream.

────────────────────────

8. INTERACTION & MOTION (subtle)

────────────────────────

- Gentle fade/slide-in on scroll, doodle draw-on animation, soft hover lift on cards (2–4px), page-curl hover on the hero corner (optional).

- Smooth, slow, calm easing (ease-out, 300–500ms). Everything disabled under prefers-reduced-motion.

────────────────────────

9. ACCESSIBILITY & TECH

────────────────────────

- WCAG AA contrast, visible focus states, keyboard-navigable, semantic HTML landmarks, alt text/aria-labels for doodles (decorative doodles use aria-hidden).

- Proper RTL/LTR handling, Persian-friendly text rendering (no letter-spacing on Persian text), correct digit localization.

- Lightweight: inline SVG, CSS variables for the palette (define --plaster, --straw, --pomegranate-night, --olive-dark, --pomegranate-seed, --olive-leaf, --dried-rose, --sage), no heavy raster images, no external image dependencies.

- Deliver as a single responsive page (React + Tailwind, or HTML/CSS/JS) with clean, commented, reusable components.

────────────────────────

10. DON'Ts

────────────────────────

- No stock photos, no glossy 3D, no gradients/glassmorphism (except the paper vignette), no dark neon, no busy patterns, no heavy borders/frames.

- No Islamic/religious ornamentation. No AI/robot imagery.

- Don't overcrowd: if a section feels busy, remove elements instead of shrinking them.

- Don't use colors outside the palette.

GOAL: When someone lands on the page, it should feel like opening a beloved, slightly worn book in a warm room — calm, personal, a little playful, unmistakably Iranian in spirit, and instantly clear about what Yoin does and how to start.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4f1c759c-247d-435d-97dd-e4a11c7b4c38).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
