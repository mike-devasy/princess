# Implementation Plan

## 1. Research Project Structure

**Goal**

Understand the active FLS/Vite assembly flow, existing page entry points, popup implementation, form scripts, assets, and style conventions before making feature changes.

**Files To Inspect**

- `template.config.js`
- `vite.config.js`
- `src/index.html`
- `src/components/templates/main/main.html`
- `src/components/pages/home/home.html`
- `src/components/pages/home/home.scss`
- `src/components/pages/home/home.js`
- `src/components/layout/header/header.html`
- `src/components/layout/footer/footer.html`
- `src/components/layout/popup/popup.html`
- `src/components/layout/popup/popup.js`
- `src/components/layout/popup/popup.scss`
- `src/components/forms`
- `src/assets/img`
- `code-examples`, if additional style patterns are needed

**Concrete Actions**

- Confirm page assembly uses the template/block/include system.
- Confirm page content belongs in `src/components/pages/home`.
- Confirm popup is an existing layout component and must not be duplicated.
- Confirm form logic is already present in `src/components/pages/home`.
- Map available assets under `src/assets/img/hero`, `flash-items`, `popup`, and `svgicons`.
- Identify whether `.code-examples` is needed only as a style/interaction reference.

**Dependencies**

- Existing FLS aliases from `template.config.js`.
- Existing SCSS mixins and breakpoints.
- Existing popup and form scripts.

**Done Criteria**

- Active page, popup, form, asset, and style entry points are identified.
- No assumptions are made from `dist`.
- Real files in `src` are prioritized over `.code-examples`.

**Check Commands**

```bash
rg "data-fls-popup|register-form|data-flash" src
rg --files src/components src/assets/img
```

**Do Not Change**

- Do not edit `dist`.
- Do not create new popup or validation systems.
- Do not modify `.code-examples`.
- Do not install or add packages.

## 2. HTML Hero

**Goal**

Build semantic hero markup for the main landing screen with header composition restored from the 1440 layout and hero proportions guided by the 1920 layout.

**Files To Change**

- `src/components/pages/home/home.html`

**Concrete Actions**

- Add a single hero section inside the existing `.page--home.home`.
- Keep the existing page-level script and stylesheet links.
- Add semantic heading/title content.
- Add header/logo composition based on the 1440 design source.
- Add two semantic flash-item buttons.
- Avoid duplicating `<html>`, `<body>`, `.wrapper`, global header, or footer.

**Dependencies**

- Hero and logo image assets must exist in `src/assets/img`.
- Existing FLS page include flow must remain unchanged.

**Done Criteria**

- Hero HTML is valid, semantic, and BEM-based.
- Both flash-items are buttons.
- Popup can be triggered through existing FLS attributes or JS API.

**Check Commands**

```bash
rg "hero__|flash-item|data-fls-popup-link" src/components/pages/home/home.html
```

**Do Not Change**

- Do not create reusable custom components unless repetition becomes meaningful.
- Do not move page content into `src/index.html`.
- Do not add inline scripts.

## 3. Hero Responsive Layout And Image Wiring

**Goal**

Style the hero across 1920, 1440, 992, 768, and 375 breakpoints while using exported images from `src/assets/img`.

**Files To Change**

- `src/components/pages/home/home.scss`
- `src/components/pages/home/home.html`, only if `picture/source` wiring requires adjustment

**Concrete Actions**

- Use `picture/source` or CSS background strategy with `@img` paths.
- Use `adaptiveValue`, `toEm`, `min()`, `max()`, and stable aspect ratios where useful.
- Keep 1920 as the large hero proportion reference.
- Keep 1440 as the source of truth for header content.
- Ensure text and buttons do not overlap on 992, 768, and 375.

**Dependencies**

- Asset names and dimensions under `src/assets/img/hero`.
- Existing global variables in `src/styles/variables.css`.
- Existing mixins from `@styles/includes/index.scss`.

**Done Criteria**

- Hero fills the first viewport cleanly.
- Correct hero image is selected for desktop, laptop/tablet, and mobile.
- Header/title are visible where expected.
- No layout shift is caused by hover or active states.

**Check Commands**

```bash
rg "@img/hero|hero-image" src/components/pages/home
npm run build
```

**Do Not Change**

- Do not use absolute local Windows paths.
- Do not edit assets destructively.
- Do not add heavy animation/layout libraries.

## 4. Flash-Items

**Goal**

Implement the two interactive day/night flash-items with default and active images, semantic controls, and visual active effects.

**Files To Change**

- `src/components/pages/home/home.html`
- `src/components/pages/home/home.scss`
- `src/components/pages/home/home.js`

**Concrete Actions**

- Use one button per item.
- Add default and active image layers for each item.
- Use `is-active` for item state.
- Add the orange triangle via CSS pseudo-element using `var(--orangeColor)`.
- Add hover and focus-visible states matching active visuals.

**Dependencies**

- `src/assets/img/flash-items/day.png`
- `src/assets/img/flash-items/day-active.png`
- `src/assets/img/flash-items/night.png`
- `src/assets/img/flash-items/night-active.png`

**Done Criteria**

- Only one flash-item is active at a time.
- Active image replaces or overlays the inactive image.
- Triangle appears only for the active/interactive item.
- Buttons remain keyboard accessible.

**Check Commands**

```bash
rg "flash-item|data-flash-item|is-active" src/components/pages/home
npm run build
```

**Do Not Change**

- Do not use non-semantic clickable divs.
- Do not bake text into JS.
- Do not add duplicate flash-item systems in `custom`.

## 5. Sequential Active Animation

**Goal**

Add the automatic flash-item demonstration sequence: day active, day inactive, night active, night inactive, repeat until user interaction.

**Files To Change**

- `src/components/pages/home/home.js`

**Concrete Actions**

- Use one controlled timer.
- Store sequence state in a small local function.
- Activate day, clear active state, activate night, clear active state.
- Stop the timer on `hover`, `focus`, or `click`.
- Ensure user click still opens popup.

**Dependencies**

- Flash-item buttons exist in DOM.
- Existing popup trigger remains available.

**Done Criteria**

- Exactly one timer controls the loop.
- Timer is cleared permanently after first user interaction.
- No item remains active after stopping unless explicitly set by interaction design.
- Missing elements do not break page JS.

**Check Commands**

```bash
rg "setInterval|clearInterval|data-flash-item" src/components/pages/home/home.js
npm run build
```

**Do Not Change**

- Do not use GSAP or other external animation libraries.
- Do not create multiple intervals per item.
- Do not rely on global mutable state outside the page module.

## 6. Existing Popup Integration

**Goal**

Open the already existing `src/components/layout/popup` component from either flash-item without creating a second popup.

**Files To Change**

- `src/index.html`
- `src/components/pages/home/home.html`
- `src/components/pages/home/home.js`, if JS-based opening is required

**Concrete Actions**

- Ensure `src/index.html` includes `@components/layout/popup/popup.html` in the `popup` block.
- Use `data-fls-popup-link="popup"` or `window.flsPopup.open("popup")`.
- Preserve `data-fls-popup="popup"` in the existing popup.

**Dependencies**

- Existing `popup.js` initializes `window.flsPopup`.
- Popup markup remains in `src/components/layout/popup/popup.html`.

**Done Criteria**

- Both flash-items open the same popup instance.
- No duplicate `[data-fls-popup="popup"]` exists.
- Popup can close with the existing popup behavior.

**Check Commands**

```bash
rg "data-fls-popup=\"popup\"|data-fls-popup-link=\"popup\"|window.flsPopup" src
npm run build
```

**Do Not Change**

- Do not create another popup component.
- Do not copy popup logic into page JS.
- Do not rewrite `popup.js` unless a verified bug requires a scoped fix.

## 7. Bonus To Form Flow

**Goal**

Inside the existing popup, show the bonus first, then switch to the ready-made form after the bonus button is clicked.

**Files To Change**

- `src/components/layout/popup/popup.html`
- `src/components/layout/popup/popup.scss`
- `src/components/pages/home/home.js`, for state switching

**Concrete Actions**

- Wrap popup content in a flow container with `data-step`.
- Add a bonus view before the form.
- Hide the form initially without removing it from markup.
- On bonus button click, switch class or `data-step` to show form.
- Do not close popup when the bonus button is clicked.
- Do not recreate the form with `innerHTML`.

**Dependencies**

- Existing form markup remains available in popup.
- Existing form scripts bind to `#register-form`.
- Bonus image exists in `src/assets/img/popup`.

**Done Criteria**

- Popup opens on bonus step.
- Clicking the bonus button reveals the existing form.
- There is no return-to-bonus control.
- Form DOM is stable before and after switching.

**Check Commands**

```bash
rg "data-step|data-popup-bonus|data-popup-form|register-form" src/components/layout/popup src/components/pages/home
npm run build
```

**Do Not Change**

- Do not duplicate form markup.
- Do not add a new validation system.
- Do not replace form scripts.
- Do not use `innerHTML` to create the form.

## 8. Popup And Form Responsive Styling

**Goal**

Make the bonus view and existing form fit the popup across the target breakpoints without breaking existing validation, password toggle, phone input, or submit behavior.

**Files To Change**

- `src/components/layout/popup/popup.scss`
- `src/components/layout/popup/popup.html`, only for structural hooks if needed

**Concrete Actions**

- Style the bonus view as a responsive popup state.
- Keep form styles scoped to existing `.form`, `.register-form`, `.field`, `.check`, and `.bonus-card` classes.
- Adjust spacing and scaling for 1920, 1440, 992, 768, and 375.
- Ensure error messages do not overlap fields.
- Ensure popup content can scroll if viewport height is constrained.

**Dependencies**

- Current popup background image and form assets.
- Existing CSS variables and FLS helpers.

**Done Criteria**

- Bonus and form are usable on 375px width.
- Content does not overflow horizontally.
- Form fields, checkbox, and submit remain readable.
- Hidden inactive step does not take layout space.

**Check Commands**

```bash
rg "popup-bonus|register-form|field--invalid|data-popup-form" src/components/layout/popup/popup.scss
npm run build
```

**Do Not Change**

- Do not remove validation classes used by existing scripts.
- Do not hide required fields.
- Do not hardcode absolute local asset paths.

## 9. Validation And Edge Case Check

**Goal**

Verify that existing form behavior still works after the popup flow changes.

**Files To Inspect Or Change**

- `src/components/pages/home/form-submit.js`
- `src/components/pages/home/form-validation.js`
- `src/components/pages/home/password-toggle.js`
- `src/components/pages/home/phone-select.js`
- `src/components/pages/home/phone-utils.js`
- `src/components/pages/home/home.js`
- `src/components/layout/popup/popup.html`

**Concrete Actions**

- Confirm `#register-form` exists exactly once.
- Confirm hidden form still initializes safely.
- Confirm password toggle handles optional/missing elements.
- Confirm phone mask dependency is available or guarded.
- Confirm submit button pending/default labels remain appropriate.
- Confirm opening popup repeatedly starts from the bonus step.

**Dependencies**

- Existing form files in `src/components/pages/home`.
- Existing adapter contract: `window.patrickLandingAdapter.submit`.
- Existing phone mask dependency behavior.

**Done Criteria**

- Missing optional adapter shows existing error safely.
- Invalid phone, email, password, and checkbox show existing errors.
- Bonus-to-form transition does not create duplicate listeners.
- Reopening popup starts from bonus view.

**Check Commands**

```bash
rg "#register-form|register-form__submit|field__toggle|window.IMask|patrickLandingAdapter" src/components/pages/home src/components/layout/popup
npm run build
```

**Do Not Change**

- Do not create a second validation path.
- Do not submit test data to production endpoints.
- Do not change the adapter API without explicit approval.
- Do not use `--force` or dependency updates to hide implementation issues.

## 10. Final Build And Cleanup

**Goal**

Run the final project check, clean up only implementation artifacts, and report the final state.

**Files To Change**

- Only files with verified implementation or documentation changes.
- `src/IMPLEMENTATION-STATUS.md`, to record final verification status.

**Concrete Actions**

- Install dependencies only if permitted and only from existing `package.json`.
- Prefer `npm ci` if a valid lock-file exists.
- Otherwise use `npm install` without `--force` or `--legacy-peer-deps`, only after approval.
- Run `npm run build`.
- Fix scoped source errors if build fails.
- Document unresolved environment issues.

**Dependencies**

- Local dependency installation.
- Network approval if dependencies are missing.
- No manual edits to generated `dist`.

**Done Criteria**

- Build passes, or the exact blocker is documented.
- No unrelated files are modified.
- `dist` is not manually edited.
- Final report lists changed files, verification status, assumptions, and risks.

**Check Commands**

```bash
npm ci
npm install
npm run build
```

**Do Not Change**

- Do not add new packages.
- Do not manually change dependency versions.
- Do not use `--force` or `--legacy-peer-deps` without separate approval.
- Do not manually edit `dist`.
