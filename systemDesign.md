# Whofy UI — Styling System

How CSS is organised in this app, and the rules to follow when adding to it.

Nothing here changes what the app *does*. This is the structure behind the
same UI: one place for every design decision, one copy of every recurring
pattern.

---

## 1. The layout of `src/styles/`

```
src/styles/
  index.css          ← the only stylesheet main.jsx imports
  tokens.css         ← every design decision, as custom properties
  reset.css          ← browser normalisation
  base.css           ← bare element defaults
  animations.css     ← shared @keyframes
  layout.css         ← page scaffolding (.container, .section)
  utilities.css      ← small global helpers (.btn, .fade-in)
  shared/            ← reusable component recipes, consumed via `composes:`
    typography.module.css
    surface.module.css
    button.module.css
    form.module.css
    menu.module.css
    media.module.css
    skeleton.module.css
```

Component and page styles stay next to their component as
`Thing.module.css`, exactly as before.

### Cascade order

`index.css` declares the order explicitly, so a rule's *origin* decides who
wins — not where it happens to land in the bundle:

```css
@layer reset, base, layout, utilities;
```

| Layer         | Holds                                        |
| ------------- | -------------------------------------------- |
| `reset`       | box-sizing, margin zeroing, reduced-motion    |
| `base`        | `body`, focus ring, selection, scrollbars     |
| `layout`      | `.container`, `.section`, `.page-min`         |
| `utilities`   | `.btn` family, `.fade-in`, `.visually-hidden` |
| *(unlayered)* | **all CSS Modules** — always win              |

CSS Modules are unlayered on purpose: unlayered rules beat layered ones, so a
component's own intent always overrides a global default without needing
`!important` or specificity games.

---

## 2. Tokens

`tokens.css` is the single source of truth. **No other file should contain a
raw hex colour, shadow, easing curve, or z-index.**

| Group      | Examples                                                    |
| ---------- | ----------------------------------------------------------- |
| Brand      | `--hc-primary` (raw ramp) → `--primary`, `--primary-hover`   |
| Surface    | `--bg`, `--surface`, `--bg-subtle`, `--border`               |
| Text       | `--text`, `--text-secondary`, `--text-faint`                 |
| Status     | `--success`, `--warning`, `--danger`                         |
| Type       | `--fs-micro` … `--fs-5xl`, plus fluid `--fs-display/page/section` |
| Weight     | `--fw-regular` … `--fw-extrabold`                            |
| Spacing    | `--space-1` (4px) … `--space-24` (96px)                      |
| Radius     | `--radius-sm/md/(base)/lg/xl/pill/circle`                    |
| Elevation  | `--shadow-xs/sm/(base)/lg/float`, `--focus-ring`             |
| Motion     | `--ease`, `--dur-fast/quick/base/slow`, `--transition-base`  |
| Layering   | `--z-base/sticky/header/overlay`                             |
| Layout     | `--header-h`, `--container`, `--section-py`, `--page-min-h`  |

Two conventions worth knowing:

- **Type tokens are named by role, not size.** A component asks for
  `--fs-caption`, not `12px`. Body copy is `--fs-body` (14px).
- **Spacing is a 4px scale.** Values that genuinely fall between steps
  (6, 14, 18, 22…) stay literal at the call site rather than inflating the
  scale with near-duplicates. Don't add `--space-4-5`.

Brand and shadow colours also exist in channel form (`--primary-rgb`,
`--shadow-rgb`) so alpha variants are derived rather than hand-written —
`rgba(31, 71, 224, 0.1)` used to appear verbatim in three files.

---

## 3. Shared recipes and `composes`

Patterns that appeared in more than one module live in `styles/shared/*` and
are pulled in with CSS Modules' `composes:`. The consuming module keeps its
own local class name, so **no JSX changes**:

```css
/* Careers.module.css */
.formGroup {
  composes: group from '../../styles/shared/form.module.css';
}
```

What's in there:

| File          | Recipes                                                          |
| ------------- | ---------------------------------------------------------------- |
| `typography`  | `eyebrow`, `pageTitle`, `sectionTitle`, `lead`, `headBlock`, `overline`, `prose` |
| `surface`     | `card`, `cardSoft`, `well`, `calloutPrimary`                     |
| `button`      | `base`, `solid`, `ghost`, `pill`, `icon`, `link`                 |
| `form`        | `group`, `form`, `row2`, `checkbox`, `hint`, `searchWrap/Icon/Input` |
| `menu`        | `menu`, `option`, `list`, `empty`, `footer`                      |
| `media`       | `logo`, `logoImg`, `chips`                                       |
| `skeleton`    | `bar`, `block`                                                   |

### ⚠️ The one rule you must not break

> **A consumer must never redeclare a property that a shared recipe sets.**
> Every point of variation is a custom property with a `var()` fallback.
> Set the property; don't override the declaration.

This is not style preference — it is a correctness requirement.

`composes` adds **no specificity**: the shared class and the local class are
both a single class, so ties are broken by source order. And source order
differs between builds:

- **dev** — Vite inlines the composed dependency into *every* consumer's
  stylesheet, so the shared rule lands **after** the consumer and wins.
- **production** — the dependency is deduplicated and emitted **once, before**
  the consumers, so the consumer wins.

An override therefore renders one way in `npm run dev` and the other way in
`npm run build`. Custom properties sidestep this entirely: the shared rule
never declares the property, so there is nothing to out-specify.

```css
/* shared/button.module.css */
.pill { padding: var(--btn-pad, 7px 14px); }

/* ✅ consumer — sets the property */
.trigger { composes: base pill from '…/button.module.css'; }
@media (max-width: 640px) {
  .trigger { --btn-pad: 6px 10px; }
}

/* ❌ consumer — redeclares; flips between dev and prod */
@media (max-width: 640px) {
  .trigger { padding: 6px 10px; }
}
```

The tunable properties per recipe are documented in each shared file's header.
Common ones: `--btn-fs`, `--btn-pad`, `--btn-radius`, `--btn-bg`,
`--btn-hover-*`, `--field-pad`, `--field-fs`, `--head-align`, `--head-max`,
`--head-title-fs`, `--logo-size`, `--overline-fs`, `--card-bg`,
`--option-pad`, `--menu-min-w`.

Two further constraints from CSS Modules itself:

- `composes` is only legal on a **single local class selector**. Not
  `.a, .b`, not `.a .b`, not `.a.b`. Footer's column headings are written out
  longhand for exactly this reason.
- A recipe that must style bare descendants (`headBlock h2`, `prose p`) does
  so from the shared file, which is why those routes needed no markup change.

---

## 4. Animations

All shared `@keyframes` live in `styles/animations.css`: `fadeIn`, `shimmer`,
`pulseDot`, `popIn`, `panelIn`, `blink`.

That file is a **plain stylesheet, not a module**, on purpose. CSS Modules
only rewrites an `animation-name` when a matching `@keyframes` is declared in
the *same* file, so modules can reference these by their literal name.

Genuinely component-local keyframes stay in their own module — the Hero
mockup's `mockScan` / `orbSpin` / `flowDash` are only meaningful there, and
their `:global(…)` selectors match class names baked into inline SVG markup.

Reduced motion is handled once, globally, in `reset.css`. Components do not
need their own `@media (prefers-reduced-motion)` blocks.

---

## 5. Adding something new

**A new page section**

```jsx
<section className={styles.section}>
  <div className="container">
    <div className={styles.head}>
      <div className={styles.eyebrow}>Kicker</div>
      <h2>Heading</h2>
      <p>Supporting copy.</p>
    </div>
  </div>
</section>
```

```css
.section { padding: var(--section-py) 0; background: var(--surface); }
.head    { composes: headBlock from '../../styles/shared/typography.module.css'; }
.eyebrow { composes: eyebrow   from '../../styles/shared/typography.module.css'; }
```

**A new card** — `composes: card from '…/surface.module.css'`, then add only
padding and layout.

**A new button** — `composes: base solid from '…/button.module.css'` (or
`base ghost`, `base pill`, `base icon`). For markup that writes classes
directly in JSX, the global `.btn btn-theme` / `.btn btn-ghost` family in
`utilities.css` is the same recipe.

**A new content width** — add a `.container-*` modifier in `layout.css`.
Don't reach for `style={{ maxWidth: … }}`; the three inline widths that used
to exist are now `.container-form` (720px) and `.container-narrow` (780px).

**Before adding a token**, check whether an existing one fits. The scale is
deliberately small.

---

## 6. Deliberate exceptions

Three literal values survive outside `tokens.css`, each on purpose:

| Where                       | Value            | Why                                                             |
| --------------------------- | ---------------- | --------------------------------------------------------------- |
| `shared/media.module.css`   | `background:#fff`| Logo letterboxing must stay white so dark marks stay legible — it is not a themeable surface. |
| `FilterBar.module.css`      | `font-size:9px`  | Count badge sits below the type scale's floor; a token for one use would be noise. |
| `Process.module.css`        | `z-index:0`      | Local stacking context for the connector rail, not an app layer. |

The select-chevron SVG in `form.module.css` repeats `%2364748B`
(`--hc-text-muted`) because data URIs cannot read custom properties. If that
token changes, update the data URI too.

---

## 7. Visual changes introduced by this reorganisation

The refactor was intended to preserve appearance, and does almost everywhere.
Two headings were deliberately normalised, because the drift between them was
unintentional and unifying it is the point of a type scale:

- **Page titles** (`About`, `Careers`, `Contacts`, `FAQ`, `Legal`) previously
  used five slightly different sizes — two fixed at `40px`, three different
  `clamp()` values topping out at 44–48px. All now use `--fs-page`
  (`clamp(1.9rem, 4vw, 2.5rem)`, i.e. 30.4–40px). About and Careers get
  slightly smaller titles on wide screens.
- **Careers' section heading** was a fixed `32px`; it now uses
  `--fs-section`, which is fluid and reaches 40px on wide screens.

Everything else — spacing, colour, radius, shadow, per-component sizing —
was verified against the pre-refactor computed styles in the browser.
