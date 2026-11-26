# IBSA Editorial Website Redesign

## Status

The editorial direction and expanded specification were approved in conversation on 2026-11-24. The implementation plan is ready for review.

## 1. Product intent

Turn the existing IBSA Nutrición website into a coherent digital clinical nutrition studio with the polish and editorial quality of the selected “Estudio clínico editorial” concept from `/propuestas`. The experience should feel professional, calm, warm, evidence-aware, and personal. The visitor should quickly understand who Mariana is, how her approach works, where she consults, and how to book. Existing tools and informational pages should feel like parts of the same brand while remaining easy to use.

The editorial character comes from typography, image direction, hierarchy, pacing, and composition. It should not rely on decorative interface effects or make utility flows look like magazine spreads at the expense of clarity.

## 2. Routes and scope

Redesign each production route currently declared in `src/App.tsx`:

| Route | Experience |
| --- | --- |
| `/` | Practice introduction, services, trust, routine tool, reviews, locations, and booking |
| `/evento` | Editorial event and community story with image galleries and event details |
| `/guia-desayunos-pre-entreno` | Long-form nutrition guide with recipes and PDF access |
| `/rutinas` | Saved routine library and routine creation entry point |
| `/rutinas/nueva` | Routine creation form |
| `/rutinas/:id` | Routine detail and export actions |
| `/rutinas/:id/editar` | Routine editing form |

Remove `/propuestas` as a proof of concept: remove its React route and lazy import, its proposal selector page, its page-specific stylesheet, and any `proposal-*` image assets that a repository reference check confirms are exclusive to that proof of concept. Do not replace it with another public design gallery. Keep the approved page as a visual reference during implementation, then remove it from the product.

## 3. Art direction

### Overall impression

- A contemporary editorial practice site: crisp white and cool mist surfaces, ink navy typography, confident large headings, image-led storytelling, and thin rules to organize content.
- Let content breathe, but keep the vertical rhythm intentional. Avoid large empty panels, excessive rounded cards, generic dashboard gradients, ornamental numbers, and repeated boxed sections.
- Alternate light editorial sections with a small number of deeper navy sections to create pace. Reserve dark backgrounds for high-value moments such as the routine tool, a focused booking callout, or the footer.
- Use photography in natural color. Avoid applying grayscale to every portrait or placing text over faces. Use overlays only where needed for legibility, with the original photo still visible.

### Color roles

Use the existing IBSA palette as the base and introduce no unrelated bright accent color:

| Role | Starting value | Use |
| --- | --- | --- |
| Ink navy | `#0A1626` | Main headings, primary text, dark hero/footer panels |
| Deep slate | `#222D3B` | Secondary dark surfaces, selected headings |
| Slate | `#3B4451` | Secondary text, labels, subtle interaction accents |
| Muted slate | `#535B67` | Supporting text and quiet dividers on light surfaces |
| Soft gray | `#CED0D3` | Rules, borders, restrained neutral blocks |
| Mist | `#F5F6F7` | Occasional light section backgrounds and utility surfaces |
| White | `#FFFFFF` | Main editorial canvas and contrast text |

Keep the main editorial canvas white. Use mist gray as a cool neutral surface; do not shift the site to beige. Ensure text, controls, and focus indicators remain strongly legible against each surface.

### Typography

- Keep **Albert Sans** as the primary sans-serif for body copy, navigation, labels, forms, and utility interfaces.
- Use **DM Serif Display** for editorial display headings and selected pull quotes, matching the typography already present in the approved `/propuestas` concept. Use its italic face selectively for a phrase or final line, not for every heading.
- Use a restrained mono face only for small metadata such as section labels or dates; do not use it for body text or navigation controls.
- Initial responsive scale: display heading 3.5–6rem on wide screens and 2.75–3.5rem on mobile; section heading 2.5–3.5rem wide and 2–2.75rem mobile; body copy 1–1.125rem with comfortable line height; labels 0.75–0.875rem. These are starting ranges, to be tuned to real copy and avoid awkward wrapping.
- Keep long-form reading measures around 60–70 characters per line. Use sentence case for headings and reserve uppercase tracking for short labels.

### Layout, spacing, and shapes

- Retain a centered content grid with a maximum width around 1200px and 12-column desktop structure. Use fluid side gutters: about 20–24px on phones, 32–48px on tablets, and 5–7vw on wide screens.
- Use a spacing rhythm based on 8px. Editorial section padding should generally land around 72–112px vertically on desktop and 48–72px on mobile; utility pages can be tighter where task density requires it.
- Prefer square or lightly rounded image corners and simple hairline borders. Keep existing rounded button shapes and button interactions intact.
- Establish hierarchy with alignment, type scale, spacing, and rules before using shadows. Shadows should be subtle and limited to floating overlays or interactive elements that need separation.
- Use breakpoints around the project's existing Tailwind conventions: phone below 640px, tablet from 640px through 1023px, and wide layout from 1024px upward. Test intermediate widths in implementation so columns do not collapse abruptly.

## 4. Shared site frame and interaction rules

- Keep the original IBSA logo, cataloged as `assets.brand.logoWhite` in `src/assets/index.ts` and served from `publicAssets.brand.whiteLogo` for static PDF output. Use the correct light/dark treatment over each background; do not redraw, typeset, crop, or replace the logo with plain text.
- Preserve the current shared `Button` component, its distinctive visual treatment, and its hover/focus behavior. Editorial work can tune surrounding layout and button placement but must not replace the established buttons with a new library style.
- Use the header and mobile staggered menu behavior represented by the approved “Estudio clínico editorial” concept as the reference. In production, retain the existing `Navbar` and `StaggeredMenu` behavior and navigation destinations; update visual tokens and spacing without changing route or anchor semantics.
- Keep the shared footer consistent across the routes that currently use it. Give it a clear final booking/contact hierarchy, social link, and recognizable original logo.
- Preserve skip-to-content behavior, keyboard access, visible focus styles, descriptive accessible names, and logical heading order.
- All controls need a usable touch target of at least 44px high. Avoid introducing hover-only actions.

## 5. Page-by-page composition

### Home (`/`)

1. **Header:** clean light header with the logo, existing desktop navigation and booking CTA; retain the staggered mobile menu. Keep it visually quiet so the first image and headline lead.
2. **Hero:** a two-part editorial opening: text block and primary consultation CTA on one side, Mariana photograph on the other. Target roughly 45/55 text/image balance on desktop with a generous image crop and an intentional focal point. Use `assets.people.formalHero` (the transparent formal PNG showing Mariana in uniform with a measuring tape); keep heading text off her face and preserve the tape where the crop permits. On phones, stack the text before a bounded portrait area and keep the face visible.
3. **Practice statement:** short eyebrow, a clear large statement about clinical and sports nutrition, and a compact paragraph explaining the personal, sustainable approach. Do not invent new claims or prices.
4. **Services/benefits:** present the currently supplied service and benefit content in a calm editorial grid, ideally three or four columns on wide screens with dividing rules and clear text hierarchy rather than a row of identical floating cards. Stack cleanly on mobile.
5. **About Mariana:** split text and portrait composition. Use `assets.people.aboutPortrait`, a naturally colored WebP derived from Mariana's existing casual portrait. Pair it with the short biography and credentials already present in the site.
6. **Routine tool:** preserve its complete current behavior and preview. Give it a distinct deep navy section with clear tool label, concise explanation, and a visible start action; maintain contrast and do not let it read as an unrelated embedded app.
7. **Reviews:** keep review text and attribution intact. Use spacious quote typography and a restrained grid or carousel only if the current behavior already supports it; avoid fabricated rating counts or imagery.
8. **Locations:** present Phyn Clinic as the sole in-person clinic, using its existing address, map/directions, and booking actions. Keep the single-location layout balanced and easy to scan.
9. **Final CTA/footer:** end with one strong booking invitation, the existing button treatment, and the shared footer.

### Events (`/evento`)

- Open with a typographic event title, short introduction, and one strong event image; retain event sections and the existing “show more”, event details, and image modal interactions.
- Treat each event as a story chapter: event title/date/context, a lead image, concise narrative, then an image gallery. Keep the Carrera and Wire Masters content clearly distinct and preserve their image order and descriptions.
- On desktop, use an asymmetrical image grid with varied image sizes and captions. On mobile, use one-column image cards with consistent crop ratios and large tap targets; preserve modal close actions and keyboard handling.
- Retain the community section and its story, but use lighter editorial framing and readable text rather than dark full-page panels.

### Breakfast guide (`/guia-desayunos-pre-entreno`)

- Make this feel like a digital nutrition publication: masthead/category label, prominent guide title, a short deck, and existing guide metadata above a focused cover image or typographic lead.
- Keep long-form text in a narrow reading column; pair it with a desktop contents index if the existing content structure supports it. On mobile, use a compact in-page contents control or natural section flow without obscuring text.
- Give principles, timing advice, recipes, and disclaimer distinct visual treatments while preserving their existing order and wording. Use restrained borders and one or two photo breaks; do not turn every recipe into a floating card.
- Keep the PDF download action prominent near the guide introduction and available again at the end. Preserve the current downloadable PDF, link, print/export behavior, and responsive header/footer.

### Routine library (`/rutinas`)

- Use the same typography, neutral palette, rules, and shared nav/footer as the rest of the brand, with a task-first page heading and one clear “Crear rutina” action.
- Preserve draft recovery, empty state, saved routines, weekday summary, view/edit/delete actions, and persistence. Routine entries should scan easily with name, schedule/exercise summary, and actions grouped predictably.
- Keep confirmations and destructive actions obvious and keyboard accessible. Style draft and empty-state notices with clear hierarchy and strong contrast, not color alone.

### Routine creation and editing (`/rutinas/nueva`, `/rutinas/:id/editar`)

- Use a calm light form surface with section headings, consistent labels, readable helper text, and visible progress through the current form. Keep forms compact enough to support repeated editing.
- Preserve all existing form fields, weekday selection, exercise picker, custom exercise creation, media display, validation, draft autosave/recovery, save/cancel behavior, and navigation.
- Keep exercise selection, add/remove actions, and save actions visually prominent. Do not introduce animation that delays field interaction or causes layout shift.
- On small screens, stack fields in reading order, keep controls full-width where useful, and make the primary save action easy to reach without covering content.

### Routine detail (`/rutinas/:id`)

- Lead with routine name and summary, then show the week/day organization and exercises in a clear reading order. Keep edit, PDF/export, and back navigation easy to locate.
- Retain exercise media and its toggles, rest/sets/reps information, and all current data. Use typography and dividers to distinguish days and exercises rather than visually heavy panels.
- Ensure exported routine PDF remains functionally and visually usable; coordinate any shared brand changes in `buildRoutinePdfHtml.ts` without changing PDF content or data semantics.

## 6. New photo selection and treatment

The currently selected photo assets have been visually reviewed:

| Asset reference | Content and role | Treatment |
| --- | --- | --- |
| `assets.people.formalHero` | Mariana wearing the IBSA uniform and holding a measuring tape | `src/assets/people/mariana-hero-formal-cutout.png`; retain transparency |
| `assets.people.aboutPortrait`, `profile`, `consultation`, and `portrait` | Mariana profile and consultation views | Optimized WebP files under `src/assets/people/` |
| `assets.events` and `assets.clinic` | Carrera, WireMasters, community, and PHYN clinic imagery | Optimized WebP files grouped under `src/assets/events/` and `src/assets/clinic/` |
| Certificate scans | Nutrition and body recomposition credentials | Keep as JPEG under `src/assets/credentials/` for legible text |

- Keep source photos unchanged in Downloads. Optimized derivatives live under categorized `src/assets/` folders; unused local copies are archived under `src/assets/archive/`.
- Use `src/assets/index.ts` as the import catalog for Vite-managed assets and `src/assets/publicAssets.ts` for stable URLs to `public/` files. Keep that URL-only module free of binary imports so the Node PDF generator can safely share it.
- Store recipe and exercise images under `public/images/guide/` and `public/images/exercises/`, and browser branding files under `public/brand/`.
- Keep active WebP photos dimensioned for their use: 1600–1920px for full-width or gallery photos and 800–1200px for supporting portraits. Preserve visible skin and fabric detail; treat file sizes as optimization targets, not reasons to degrade image quality.
- Use responsive `srcSet`/`sizes` or equivalent Vite-supported imports where useful. Set intrinsic dimensions or aspect ratio to avoid layout shift, lazy-load below-the-fold imagery, and prioritize the hero image.
- Add meaningful alt text for informative photos and empty alt text for purely decorative crops. Avoid baking text or logos into the photo derivatives.
- Final crops and positioning must be reviewed on a wide desktop viewport and a narrow phone viewport before selecting the hero treatment.

## 7. Motion and accessibility

- Reuse the existing GSAP/ScrollTrigger setup for subtle entry transitions and image reveals only where it adds clarity. Favor short opacity/translate transitions; avoid parallax, scroll hijacking, excessive blur, cursor effects, and motion that competes with reading.
- Respect `prefers-reduced-motion: reduce` for all new and retained page-level motion; core information and content must render without animation.
- Avoid animation before the page has meaningful content; ensure content is not left hidden if animation initialization fails.
- Maintain keyboard operation, focus visibility, semantic buttons/links, accessible modal behavior, and minimum 16px body text. Captions and secondary metadata must remain comfortably readable.
- Check contrast for navy, slate, muted text, borders, disabled controls, and focus indicators on white, mist, and dark surfaces.

## 8. Component/library and code strategy

- Keep React 18, React Router, Tailwind CSS 3, the current `Button`, `Navbar`, `StaggeredMenu`, and GSAP architecture.
- Do not add HeroUI as the base system or upgrade React/Tailwind to accommodate it during this redesign.
- Treat React Bits, Magic UI, Radix, and shadcn/ui as reference/component sources rather than a visual system to install wholesale. Prefer zero new runtime dependencies. If a copied component is chosen, adapt its styling to these tokens, respect reduced motion, and document why it improves a real route.
- Centralize shared colors, typography, spacing, page widths, and focus styles in the existing CSS/Tailwind design layer. Avoid page-local overrides that make production routes drift apart.
- Keep page-specific editorial compositions in the owning route/section components; share only genuinely common elements such as section labels, editorial headings, image treatments, and page wrappers.

## 9. Preserve existing behavior and work

The current checkout contains substantial uncommitted routine, content, and proposal work. The exact pre-redesign workspace was captured at `.checkpoints/ibsa-before-editorial-redesign-2026-11-24.zip`.

Preserve existing behavior and data for:

- React Router destinations, local navigation, hash scrolling, and mobile menu close/navigation behavior.
- Routine storage, draft recovery, custom exercises, editor validation, media toggles, PDF export, and routine detail actions.
- Event gallery expansion, event detail modals, image viewing and closing, and all existing event content.
- Breakfast guide content, metadata, guide PDF, and download behavior.
- Booking URLs, the Phyn Clinic address/directions, Instagram and LinkedIn destinations, accessibility affordances, SEO metadata, sitemap, and redirects.

Do not reset, stash, revert, or replace any existing uncommitted change. Before removing any proposal image or support file, verify it is not referenced by another production route or by the user's unrelated current edits.

## 10. Exclusions

- Deployment or publication.
- A new logo or brand identity, new service/pricing claims, or copywriting that changes the business offer.
- Replacing routing, persistence, booking, or PDF systems.
- A React/Tailwind major-version migration or broad component-framework adoption.
- New backend capabilities, tracking, or third-party services.

## 11. Acceptance criteria

1. The `/propuestas` proof of concept and its exclusive route/page/style/assets are removed after reference checks; no production navigation points to it.
2. The homepage has a distinctive editorial hero using an optimized supplied photo, a confident type hierarchy, and an immediately clear booking path.
3. Each production route listed in Section 2 shares the same brand system and uses a composition appropriate to its job.
4. Existing button design, original IBSA logo, header behavior, and mobile staggered menu remain recognizable and functional.
5. All existing route behaviors and content listed in Section 9 remain available.
6. The four provided images are assessed; selected photos are optimized, appropriately cropped, and delivered without altering their originals.
7. Desktop, tablet, and phone layouts remain readable, with no text over faces, clipped controls, inaccessible interactions, or hidden content caused by motion.
8. Any implementation verification performed is reported with the final change summary.

## 12. Decisions to make during implementation

- Final hero crop and responsive focal positions after viewing the exact image in its final container.
- Keep optional source imagery out of active sections unless it has a clear editorial role and is present in the central asset catalog.
- Whether to self-host the display font or keep the current Google Fonts approach, based on the repository's current font loading and performance constraints.
