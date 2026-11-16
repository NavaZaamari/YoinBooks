<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Landing page lives in `src/components/yoin/*` composed by `src/routes/index.tsx`; keep sections as separate components so each stays small.
- All copy goes through `src/lib/copy.ts` (fa + en share one typed shape) and `useLang()`; never hardcode visible strings, so both languages stay in sync.
- Use CSS logical properties / `start`/`end` utilities and `rtl:`/`ltr:` variants; the page flips direction at runtime.
- Palette colors come only from the tokens in `src/styles.css` (`plaster`, `straw`, `ink`, `olive`, `seed`, `leaf`, `rose`, `sage`); no other hues.
- Doodle strokes use the `P` helper in `Doodles.tsx` (class `ink-stroke`, pathLength=1) so draw-on animation works; CSS attribute selectors on `pathLength` don't match reliably.
- Onboarding/search/validation rules live in `src/lib/onboarding.ts` and are covered by `src/test/onboarding.test.ts`.
- Unreleased entry points (sign up, log in, bookshop) are wrapped in `<ComingSoon>` (`src/components/yoin/ComingSoon.tsx`) and gated by the single flag in `src/lib/coming-soon.ts`; wrap any new such button/link the same way so one flag flip unlocks everything.
