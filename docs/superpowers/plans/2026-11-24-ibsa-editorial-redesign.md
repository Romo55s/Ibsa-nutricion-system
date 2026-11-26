# IBSA Editorial Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current site presentation with the approved “Estudio clínico editorial” visual system across every production route, remove the `/propuestas` proof of concept, and integrate optimized Mariana photos without changing existing product behavior.

**Architecture:** Retain the current React 18, React Router, Tailwind 3, and GSAP foundation. Put shared editorial tokens and global defaults in the current CSS/Tailwind layer, keep the existing Button/Navbar/StaggeredMenu/Logo, and reshape each route in its existing page and section components. Optimize source photos into project-owned WebP derivatives and remove proof-of-concept files only after repository-wide reference checks.

**Tech Stack:** React 18, TypeScript, React Router 6, Tailwind CSS 3, GSAP/ScrollTrigger, Sharp (already installed).

**Spec:** `docs/superpowers/specs/2026-11-24-ibsa-editorial-redesign.md`

## Global Constraints

- Keep React 18, React Router, Tailwind CSS 3, the current `Button`, `Navbar`, `StaggeredMenu`, and GSAP architecture.
- Do not add HeroUI as the base system or upgrade React/Tailwind to accommodate it during this redesign.
- Prefer zero new runtime dependencies.
- Preserve the original IBSA logo asset, current button appearance, proposal header behavior, and mobile staggered menu behavior.
- Keep source photos unchanged in Downloads; add optimized derivatives to the app asset tree.
- Do not reset, stash, revert, or replace any existing uncommitted change.
- Before removing proposal assets/support files, verify they are not referenced by another route or unrelated current edits.
- Do not deploy or publish the redesign.
- Do not add or run automated tests unless requested; any implementation verification performed must be reported.

## Review Focus

Review these user-facing edge cases against the existing implementation while changing the owning task:

1. **User's dirty work:** Existing routine and homepage edits may overlap planned visual changes; inspect the current diff before touching those files and preserve all functional edits.
2. **Photo crop/focal point:** The hero needs Mariana, the IBSA uniform, and ideally the measuring tape visible at desktop and phone crops; avoid covering her face with copy.
3. **Small screens:** At 360px wide, long Spanish headings, forms, image galleries, navigation, and PDF actions must not overflow or become hard to operate.
4. **Reduced motion and failed animation setup:** Content must remain visible and usable when reduced motion is requested or GSAP animation does not run.
5. **Route-specific behaviors:** Routine drafts/storage/export, guide download, event galleries/modals, hash navigation, and menu closure must keep their existing semantics and destinations.

## File Map

- `src/App.tsx` — remove only the `/propuestas` lazy import and route.
- `src/pages/DesignApproachesPage.tsx`, `src/pages/design-approaches.css` — delete the proof-of-concept page and its styles after confirming no other imports.
- `src/assets/proposal-*.png` — delete only the assets proven to be exclusive to the deleted proof of concept.
- `src/global.css`, `tailwind.config.cjs`, `index.html` — establish shared palette, typography, reading widths, focus treatment, and DM Serif Display font loading while retaining Albert Sans.
- `src/components/Navbar.tsx`, `src/components/StaggeredMenu.tsx`, `src/components/Button.tsx`, `src/components/Footer.tsx` — preserve existing interactions and button visuals while aligning shared shell styling to the new tokens.
- `src/sections/Hero.tsx`, `Benefits.tsx`, `About.tsx`, `Credibility.tsx`, `RoutineTool.tsx`, `Reviews.tsx`, `Locations.tsx`, `FlowingMenu.tsx`, `FinalCTA.tsx`, `src/pages/Home.tsx` — compose the editorial homepage using current business copy and behavior.
- `src/pages/EventPage.tsx`, `src/components/EventImageCard.tsx`, `src/components/EventImageGallery.tsx`, `src/components/EventModal.tsx` — apply the event-story layout while retaining gallery and modal behavior.
- `src/pages/BreakfastGuidePage.tsx` — apply a publication-like guide layout while retaining all existing content and PDF actions.
- `src/pages/RoutinesPage.tsx`, `RoutineEditorPage.tsx`, `RoutineDetailPage.tsx`, `src/components/routines/*`, `src/sections/RoutinePlanPreview.tsx`, `src/lib/buildRoutinePdfHtml.ts` — restyle all routine views, editor controls, preview, and PDF while preserving routines behavior.
- `src/assets/index.ts` and `src/assets/publicAssets.ts` — central typed catalog for imported app images and stable public URLs.
- `src/assets/people/`, `events/`, `clinic/`, `credentials/`, and `brand/` — organized optimized assets used by the UI; source images remain in Downloads or `src/assets/archive/`.
- `public/images/guide/`, `public/images/exercises/`, and `public/brand/` — optimized static assets used by pages, PDFs, and browser metadata.

## Execution Steps

### Task 1: Remove the `/propuestas` proof of concept

**Files:**
- Modify: `src/App.tsx`
- Delete after reference check: `src/pages/DesignApproachesPage.tsx`
- Delete after reference check: `src/pages/design-approaches.css`
- Delete only if exclusive: `src/assets/proposal-*.png`

**Interfaces:**
- Consumes: Current production routes and the existing proposal page's local imports.
- Produces: Production route list without `/propuestas`; no import may refer to deleted proposal files.

- [ ] Inspect every `proposal-*` image and support-file reference with `rg`; identify whether any production component uses them.
- [ ] Remove the `DesignApproachesPage` lazy import and `/propuestas` route from `src/App.tsx`, preserving all other route declarations and router behavior.
- [ ] Delete the proof-of-concept page and CSS; delete only assets with no remaining production or user-work references.
- [ ] Record in the change summary which proof-of-concept assets were removed and which were retained due to other references.

**Completion check:** `/propuestas` is no longer declared, and no source import references a deleted file.

### Task 2: Establish shared editorial tokens and site frame

**Files:**
- Modify: `src/global.css`
- Modify: `tailwind.config.cjs`
- Modify: `index.html`
- Modify: `src/components/Navbar.tsx`, `src/components/StaggeredMenu.tsx`, `src/components/Button.tsx`, `src/components/Footer.tsx`

**Interfaces:**
- Consumes: Existing colors in `src/global.css`/Tailwind and current shared components.
- Produces: Shared CSS/Tailwind tokens for ink navy `#0A1626`, deep slate `#222D3B`, slate `#3B4451`, muted `#535B67`, light gray `#CED0D3`, mist `#F5F6F7`, and white; Albert Sans body face and DM Serif Display editorial display face.

- [ ] Inspect existing diffs in all touched shell files; preserve unrelated behavior and styles already modified by the user.
- [ ] Add shared type, color, grid/container, editorial spacing, border, and focus variables in `src/global.css`; align Tailwind values to the same palette and retain existing utility names relied on by the site.
- [ ] Load DM Serif Display alongside the existing Albert Sans in `index.html`; keep existing metadata and structured data unchanged.
- [ ] Restyle the shared shell using the light editorial canvas and existing logo. Keep header destinations, booking URL, Button variants, menu animation/state, and mobile menu close behavior unchanged.
- [ ] Confirm global body and `.page` backgrounds no longer impose the old radial treatment on unrelated routes.

**Completion check:** Shared components use one visual token set, and all existing shell actions and destinations remain represented in source.

### Task 3: Redesign the homepage and integrate supplied photos

**Files:**
- Create: `src/assets/index.ts`, `src/assets/publicAssets.ts`, and organized optimized asset folders
- Modify: `src/sections/Hero.tsx`, `Benefits.tsx`, `About.tsx`, `Credibility.tsx`, `RoutineTool.tsx`, `Reviews.tsx`, `Locations.tsx`, `FlowingMenu.tsx`, `FinalCTA.tsx`, `src/pages/Home.tsx`
- Modify: `src/components/CertificationsModal.tsx` for keyboard-operable certification/image viewing as part of the homepage credibility flow.
- Modify: `src/components/Button.tsx` to use its link-rendering mode for homepage external actions and to respect reduced-motion preferences for magnetic pointer effects.

**Interfaces:**
- Consumes: Task 2 tokens and the existing section data/content/handlers.
- Produces: Editorial home flow with responsive local photo derivatives, existing section interactions, and booking calls to action.

- [ ] Inspect current diffs in all homepage sections and preserve existing copy, booking destinations, section anchors, and routine-tool behavior.
- [ ] Use Sharp to create optimized WebP derivatives for active photos and guide images; preserve certificates as JPEG, the original logo as SVG, and the transparent hero portrait as PNG.
- [ ] Centralize imported image references in `src/assets/index.ts` and static public URL references in `src/assets/publicAssets.ts`; use the URL catalog from PDF generation code that runs outside Vite.
- [ ] Implement the desktop hero as a text/image split near 45/55; set mobile text before a full-width portrait crop. Keep all copy away from faces, and provide focal positioning per viewport.
- [ ] Use the shared Button's anchor mode for external booking, directions, and WhatsApp actions so each destination is one semantic link with the established button visual and hover treatment.
- [ ] Disable magnetic pointer translations/fill growth when `prefers-reduced-motion: reduce` is active; preserve label contrast and the non-motion button appearance.
- [ ] Recompose the remaining home sections in this order: practice statement, services/benefits, profile/credentials, routine tool, reviews, locations, final booking CTA, footer. Keep section spacing and image use varied rather than repeating one card grid.
- [ ] Keep Phyn Clinic as the only in-person location; retain its existing address, map/directions, and booking links, and use a single-location layout.
- [ ] Keep certification thumbnails keyboard-operable and add dialog semantics, Escape handling for both modal layers, and focus restoration to the opener without changing the GSAP/scroll-lock lifecycle.
- [ ] Add image `alt` text and intrinsic dimensions/aspect ratios; prioritize the hero and lazy-load below-the-fold photos.

**Completion check:** Homepage sections follow the defined hierarchy and supplied images have optimized project-local derivatives with source originals untouched.

### Task 4: Redesign the event story and gallery presentation

**Files:**
- Modify: `src/pages/EventPage.tsx`
- Modify: `src/components/EventImageCard.tsx`, `EventImageGallery.tsx`, `EventModal.tsx`
- Modify: `src/components/Button.tsx` to add a link-rendering mode while preserving its current button mode, visuals, and animation.

**Interfaces:**
- Consumes: Task 2 tokens, current event content, image arrays, modal state, and gallery expansion state.
- Produces: Editorial event chapters and responsive galleries with current event/image modal interactions; shared Button supports semantic external links without nesting an anchor and a button.

- [ ] Inspect the existing diff in the event page and verify all image arrays, descriptions, dates, details, and handlers before restyling.
- [ ] Recompose the event page with a typographic intro, clear Carrera and Wire Masters chapters, lead images, captions, and asymmetrical desktop galleries.
- [ ] Extend the shared Button with an `href`-based anchor mode that accepts `target`/`rel`, preserves the existing button mode and magnetic fill behavior, then use it for the community booking CTA instead of a separately styled anchor or nested interactive elements.
- [ ] Preserve “show more”, event-details modal, image-view modal, close behavior, and gallery order. Ensure modal controls remain reachable and clearly visible on touch screens.
- [ ] Keep the community narrative and existing copy, and make the mobile image sequence a readable single column without horizontal overflow.

**Completion check:** Event story has a consistent editorial hierarchy and all current event/gallery actions remain in place.

### Task 5: Redesign the breakfast guide as a digital publication

**Files:**
- Modify: `src/pages/BreakfastGuidePage.tsx`

**Interfaces:**
- Consumes: Existing guide content modules, metadata, `guideMeta.pdfFileName`, shared shell, and Task 2 tokens.
- Produces: A publication-like guide layout with prominent PDF access and unchanged guide content.

- [ ] Inspect current guide page and preserve breadcrumb/navigation, content order, print/download controls, metadata, and generated-PDF link.
- [ ] Add a publication masthead/category label, large title, readable summary/metadata, narrow reading column, clear section breaks, and a desktop contents index only if it can use the existing section structure without duplicating guide copy.
- [ ] Make principles, timing, recipes, disclaimer, and closing sections visually distinct using typography, rules, and limited neutral surfaces; keep body copy at 16px or above.
- [ ] Keep the PDF download action visible near the beginning and again at the end; preserve existing responsive controls and accessible names.

**Completion check:** Guide reading structure is clear on desktop and mobile, with the existing PDF action and content source intact.

### Task 6: Restyle routine library, editor, detail, and PDF surfaces

**Files:**
- Modify: `src/pages/RoutinesPage.tsx`, `RoutineEditorPage.tsx`, `RoutineDetailPage.tsx`
- Modify: `src/components/routines/ExerciseMedia.tsx`, `ExercisePickerModal.tsx`, `FormControls.tsx`, `RoutineExerciseCard.tsx`, `RoutineForm.tsx`
- Modify: `src/sections/RoutinePlanPreview.tsx`, `src/sections/routine-plan-preview.css`
- Modify: `src/lib/buildRoutinePdfHtml.ts`

**Interfaces:**
- Consumes: Task 2 tokens, current routine types/storage/hooks, custom exercise storage, draft recovery, and PDF builder data.
- Produces: Consistent light editorial routine-management UI and styled PDF output without changing storage or routine semantics.

- [ ] Inspect every current diff in routine pages/components/types/helpers and preserve the user's existing routine feature work before changing presentation.
- [ ] Restyle the library list, draft notice, empty state, routine summary, weekday/exercise rows, and action groups. Preserve create/view/edit/delete/PDF affordances and status text.
- [ ] Restyle routine creation/edit forms, controls, exercise picker, custom exercise flow, media toggles, validation messages, preview, and save/cancel controls. Keep each field and action in its existing functional order unless a layout-only change improves reading order.
- [ ] Restyle detail view and PDF markup using the same palette and type roles. Preserve all data, sets/reps/rest labels, exercise media, day groupings, and export semantics.
- [ ] Use single-column form layout on phones; maintain at least 44px control/touch height, visible labels and focus, and clear destructive-action confirmation styling.

**Completion check:** Routine-related pages and PDF use shared visual tokens, while the reviewed source retains all currently implemented data and interaction paths.

## Scope and execution notes

- The redesign is one cohesive project because all routes share one visual system, shell, booking identity, and interaction language; route-specific implementation tasks remain reviewable in sequence.
- The current worktree is dirty. Before every task, inspect the relevant file diff and modify only what the task needs. Do not use reset, checkout, stash, or blanket formatting on the repository.
- No dependency install is planned. Use current installed React/Tailwind/GSAP/Sharp dependencies.
- No deployment, automated test additions, or automated test runs are included unless requested.
- The spec's responsive and reduced-motion requirements are part of each task's completion review; final visual verification should be reported if performed.
