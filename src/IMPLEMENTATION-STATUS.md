# Implementation Status

## Current Stage

Header architecture fixed and footer icons switched to real assets. Waiting for the next explicit command.

## Completed Actions

- Read the FLS/Vite project instructions.
- Read `src/IMPLEMENTATION-PLAN.md`.
- Read `src/IMPLEMENTATION-STATUS.md`.
- Reopened `src/components/pages/home/home.html`.
- Reopened the current layout header in `src/components/layout/header/header.html`.
- Rechecked existing hero, logo, and flash-item images in `src/assets/img`.
- Added semantic hero markup in `src/components/pages/home/home.html`.
- Added a hero-local header/logo structure based on the 1440 layout source.
- Added the main hero title using HTML entities for accented Spanish text.
- Added two semantic flash-item buttons for day and night.
- Added default and active flash-item image layers.
- Added data hooks for future flash animation and existing popup opening.
- Removed previously added flash timer and popup-flow JS from `home.js` so Stage 2 does not include later-stage behavior.
- Opened all local design references:
  - `src/design-reference/hero-1920.png`
  - `src/design-reference/hero-1440.png`
  - `src/design-reference/hero-992.png`
  - `src/design-reference/hero-768.png`
  - `src/design-reference/hero-375.png`
- Compared current hero markup and SCSS against the five references.
- Updated hero image source breakpoints so 768px uses the mobile hero image and 992px uses the tablet hero image.
- Tuned the right hero composition so header, title, and flash-items behave as one vertical block.
- Increased the CUATROBET logo from the previous small desktop sizing to reference-sized desktop/tablet/mobile widths.
- Tuned Princess logo widths per breakpoint.
- Tuned title width, font size, alignment, and spacing above flash-items.
- Tuned flash-item base size and group gap while preserving hover/active selectors and state behavior.
- Inspected footer architecture through `src/index.html` and `src/components/templates/main/main.html`.
- Confirmed footer is connected through the existing `src/components/layout/footer/footer.html` component.
- Confirmed footer is rendered after `<main>` in the normal document flow.
- Confirmed footer is not inside `src/components/pages/home/home.html`.
- Confirmed current footer component was empty and did not match the local PNG references.
- Added footer content in the existing layout footer: copyright, privacy, responsible gaming, contact, licenses label, two license marks, and 18+ link.
- Styled desktop footer as a compact horizontal row below the fullscreen hero.
- Styled tablet/mobile footer as a taller vertical stack matching the reference direction.
- Updated hero minimum height to `100dvh` so desktop hero keeps the full first viewport and footer starts below it.
- Moved CUATROBET and Starlight Princess logos from `home.html` into the existing layout header.
- Removed the duplicate `<header class="hero__header">` from `src/components/pages/home/home.html`.
- Added logo layout styles to `src/components/layout/header/header.scss`.
- Kept the hero title inside `home.html`, directly above flash-items.
- Removed obsolete `.hero__header`, `.hero__brand`, and `.hero__brand-image` styling from `home.scss`.
- Adjusted hero content top offsets to account for the absolute layout header.
- Replaced CSS placeholder footer license/age marks with real SVG files from `src/assets/img/footer/svgicons`.
- Tuned title typography closer to the reference: 42px desktop, white first line, orange second line.
- Adjusted desktop/tablet hero content top offsets after moving logos into layout header.
- Added symmetric orange lightning overlays on both sides of the hero using CSS pseudo-elements.
- Moved the bottom hero fade from `.hero::after` to `.hero__picture::after` so both hero pseudo-elements can render the side lightning.

## Studied Files

- `src/IMPLEMENTATION-PLAN.md`
- `src/IMPLEMENTATION-STATUS.md`
- `src/components/pages/home/home.html`
- `src/components/pages/home/home.js`
- `src/components/layout/header/header.html`
- `src/assets/img/hero/hero-image-desktop.png`
- `src/assets/img/hero/hero-image-laptop.png`
- `src/assets/img/hero/hero-image-tablet.png`
- `src/assets/img/hero/hero-image-mobile.png`
- `src/assets/img/logo.webp`
- `src/assets/img/logo-princess.png`
- `src/assets/img/flash-items/day.png`
- `src/assets/img/flash-items/day-active.png`
- `src/assets/img/flash-items/night.png`
- `src/assets/img/flash-items/night-active.png`
- `src/components/pages/home/home.scss`
- `src/components/layout/footer/footer.html`
- `src/components/layout/footer/footer.scss`
- `src/components/templates/main/main.html`
- `src/components/layout/header/header.html`
- `src/components/layout/header/header.scss`
- `src/assets/img/footer/svgicons/age-18-plus.svg`
- `src/assets/img/footer/svgicons/cga-license.svg`
- `src/assets/img/footer/svgicons/responsible-gambling.svg`

## Decisions

- Work only inside `src`.
- Do not edit `dist` manually.
- Keep the hero inside the existing Home page component.
- Do not duplicate `html`, `body`, `.wrapper`, global header, or global footer.
- Use BEM classes for hero and flash-items.
- Use the 1440 layout as the source for header/title composition.
- Keep responsive styling and final image fitting for Stage 3.
- Keep flash-item timer logic deferred to Stage 5.
- Keep popup bonus-to-form behavior deferred to Stage 7.
- Do not change popup, form markup, or the five ready form scripts during Stage 2.
- Local PNG files are the current visual source of truth for hero layout.
- Do not connect `src/design-reference` images to HTML or SCSS.
- Keep right-side desktop composition as one block: logos, title, flash-items.
- Preserve existing flash-item hover/active behavior; only base size/position may change.
- Footer must remain a single layout component after `<main>`.
- Footer must not be duplicated inside `home.html`.
- Footer must stay in normal document flow and not overlay hero.
- Header must remain a single layout component before `<main>`.
- Header logos belong to `src/components/layout/header/header.html`, not to Home page markup.
- Header is visually over the top of hero via absolute positioning, but not nested inside `.hero`.
- Orange side lightning is decorative CSS in `home.scss` and is hidden on mobile widths where the references do not show the side bolts.

## Risks

- Dependencies are not installed because sandbox network approval is unavailable.
- `npm run build` is not verified in this environment.
- Existing popup files may contain earlier changes from previous work; they were not changed during Stage 2.
- Existing form text contains encoding artifacts that may need a separate content cleanup pass.
- `phone-select.js` expects `window.IMask`, while the visible FLS input mask plugin uses `inputmask`.
- The hero structure still needs visual verification against 1920, 1440, 992, 768, and 375.
- Build and browser rendering were not run because dependencies are absent in the sandbox.
- Final pixel verification should be done locally after dependency installation.
- Footer visual QA is still required against 1920, 1440, 992, 768, and 375 after local build/dev server is available.

## Next Step

Run local visual QA for hero and footer at 1920, 1440, 992, 768, and 375 after dependencies are installed, then continue only after the next explicit command.

## Build Note

- Dependencies are absent in the sandbox.
- No dependency installation was requested or attempted during Stage 2.
- `npm run build` remains unverified here.
- Run `npm install` locally, then run `npm run build` to verify the project.
