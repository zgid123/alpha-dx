# Component baseline before refactoring

Snapshot date: **2026-09-07**. Package: **@alphacifer/slidev-addon-theme 0.0.6**.
Source commit: **f4c0af4b125d69a03c162e4ca184e69fa1d3bb2b** (clean working tree before this documentation change).

This is a frozen inventory of the implementation before the refactor, for migrating
presentations in other projects. Keep this baseline unchanged when APIs change;
record replacements and before/after examples in a separate migration guide.
The commit above is the reference for exact source, CSS, geometry, and placeholder copy.
This document records source behavior; it is not a visual screenshot baseline.

## Package and usage contract

- 57 Vue components in 11 families, plus 5 Slidev layouts.
- Enable the addon in slide frontmatter with `addons: ['@alphacifer/slidev-addon-theme']`.
  Use the component names below in slide markup and layout names in `layout:`.
- Peer dependencies: `@slidev/client >=52.18.0`, `vue ^3.5.40`.
  Dependencies: `@alphacifer/core-utils workspace:^`, `@vueuse/motion 3.0.3`.
  Preview dependencies use Slidev client/CLI `52.19.0` and Seriph `0.25.0`.
- The package ships `components/`, `layouts/`, `utils/`, and `README.md`.
  There is no `exports` map or package-root component barrel. Record any direct
  component or utility imports in consuming projects before moving these files.
  This baseline is repository documentation, outside the current package file allowlist.
- [slides.md](./slides.md) is the Seriph example deck;
  [academic-slides.md](./academic-slides.md) uses the sibling academic theme.
  Theme styles and consumer utility classes contribute to the rendered appearance.

## Reading the inventory

Each component links to its current source. Prop tables use TypeScript names;
Vue templates may use kebab-case (`start-delay`, `card-bg`, `has-icon-circle`).
All props are optional unless marked **required**. `undefined` means no explicit
value at the prop boundary; a component may then inherit context or derive a value.
Slots have no declared scoped payload. “Default” includes slots whose VNodes are
inspected and rearranged rather than rendered through a literal `<slot>`.
No component declares `defineEmits`, `defineModel`, or `defineExpose`.

### Shared migration considerations

- Composition is significant: many roots/callouts flatten Vue fragments and identify
  immediate children by component name (and sometimes component identity).
  Renaming a child, wrapping it in an ordinary element, or changing its order can
  change extraction, numbering, placement, and fallback rendering.
- Several diagram callouts use provide/inject context and registration order.
  Keep callouts inside their matching root and text/icon/badge children inside their
  matching callout. Explicit `index`, where supported, is zero-based.
- `ArrowTriad`, `ArcCompare`, `ArcArrowProcess`, `QuadHub`, and `HexTriad` default
  to animation enabled. Explicit `active` overrides the injected active state;
  `animation: false` disables it. Inside `shifting-intro`, activity follows clicks
  greater than zero. An omitted `startDelay` becomes 600 ms during the heading
  shift and 0 otherwise. Explicit delays are milliseconds.
- `ArrowTriad` and `ArcCompare` use `useDiagramAutoScale`; `QuadHub` has its own
  sizing implementation. Explicit `scale` wins; otherwise `autoScale: false`
  yields 1, and `maxScale` caps automatic scaling. Do not assume every diagram
  supports these props: `HexTriad` and `ArcArrowProcess` do not.
- `hidePagy` on `ArrowTriad`/`ArcCompare` adds `hide-pagy` and `data-hide-pagy`
  hooks. Its visible effect depends on consumer/theme CSS.
- Components using `useMergedUnoAttrs` merge consumer classes with defaults and
  forward other attributes. This is not universal: check the per-component marker.
  Existing `.alpha-*` selectors and theme overrides are migration dependencies too.
- Numeric width/height values generally become pixels; CSS string values are
  supported only where declared. Icon types differ by family; do not normalize
  them without a migration note.

## Component inventory

[Core](#core) · [Shifting heading](#shifting-heading) · [Thanks](#thanks) ·
[Hex triad](#hex-triad) · [Horizontal card](#horizontal-card) ·
[Vertical card](#vertical-card) · [Chevron card](#chevron-card) ·
[Arrow triad](#arrow-triad) · [Quad hub](#quad-hub) ·
[Arc compare](#arc-compare) · [Arc arrow process](#arc-arrow-process)

See also [item data](#item-data-contracts), [layouts](#layout-inventory),
[supporting modules](#supporting-modules-to-audit-in-consumers), and
[migration workflow](#using-this-baseline-during-migration).
### Core

Date formatting, speaker metadata, quotations, and animated titles. `Date` falls back to the current date and renders `Date: dd/MM/yyyy`. `Speaker` requires `date`; a nonempty `team` replaces the author line. `Quote` requires `text`, adds quotation marks, and optionally renders an author. `ReflectedTitle` requires `title` and repeats it through a CSS pseudo-element. `QnA` renders fixed “Q & A” lettering with a default 11,500 ms delay.

#### Date

[Source](./components/core/Date.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `date` | `string` | `undefined` |

Slots: none. Class/attribute handling: `useMergedUnoAttrs`.

#### QnA

[Source](./components/core/QnA.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `startDelay` | `number` | `11_500` |

Slots: none. Class/attribute handling: `useMergedUnoAttrs`.

#### Quote

[Source](./components/core/Quote.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `text` | `string` | **required** |
| `author` | `string` | `undefined` |
| `titleClass` | `string` | `undefined` |

Slots: none. Class/attribute handling: `useMergedUnoAttrs`.

#### ReflectedTitle

[Source](./components/core/ReflectedTitle.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `title` | `string` | **required** |

Slots: none. Class/attribute handling: `useMergedUnoAttrs`.

#### Speaker

[Source](./components/core/Speaker.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `author` | `string` | `'Alpha'` |
| `team` | `string[]` | `[]` |
| `date` | `string` | **required** |

Slots: none. Class/attribute handling: `useMergedUnoAttrs`.

### Shifting heading

`TransitionHeading` wraps default content. `center` positions it in the middle; `idle` or `!center` applies the top-left position. Its CSS transition lasts 700 ms. The `shifting-intro` layout coordinates these props.

#### TransitionHeading

[Source](./components/shifting-heading/TransitionHeading.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `idle` | `boolean` | `false` |
| `center` | `boolean` | `false` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

### Thanks

`ThanksContent` renders decorative squares and fixed “Thank You / for your attention!” text. It has multiple root nodes; consumer attributes do not have a single automatic fallthrough target. `animation: false` renders final motion states immediately. `ThanksSquare` and `ThanksOutlineSquare` are empty decorative elements sized/positioned by classes.

#### ThanksContent

[Source](./components/thanks/ThanksContent.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `animation` | `boolean` | `true` |

Slots: none. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ThanksOutlineSquare

[Source](./components/thanks/ThanksOutlineSquare.vue)

Props: none.

Slots: none. Class/attribute handling: `useMergedUnoAttrs`.

#### ThanksSquare

[Source](./components/thanks/ThanksSquare.vue)

Props: none.

Slots: none. Class/attribute handling: `useMergedUnoAttrs`.

### Hex triad

Three overlapping hexagons with three callouts. Item resolution takes the first three entries and fills missing entries with defaults. Callouts register in order; indices beyond two do not render. Root slots: title/subtitle plus default callouts; the header is rendered only when a title prop or title slot exists. `HexTriadCallout` extracts badge, heading, and content children. It has no props. **Current quirk:** item `title` and `description` do not populate the heading/content fallback text; those children use fixed placeholders unless given slots. `HexTriadBadge` synchronizes textual slot content or its ID with the center badge. `HexTriadLayer` renders an SVG path; `HexTriadCenterBadge` renders an SVG group and expects an SVG coordinate system/filter definitions.

#### HexTriad

[Source](./components/hex-triad/HexTriad.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `title` | `string` | `undefined` |
| `subtitle` | `string` | `undefined` |
| `animation` | `boolean` | `true` |
| `items` | `readonly IHexTriadItem[]` | `undefined` |
| `startDelay` | `number` | `undefined` |
| `active` | `boolean` | `undefined` |

Slots: `default`, `subtitle`, `title`. Class/attribute handling: `useMergedUnoAttrs`.

#### HexTriadBadge

[Source](./components/hex-triad/HexTriadBadge.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `id` | `string \| number` | `undefined` |
| `color` | `string` | `undefined` |
| `lightColor` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### HexTriadCallout

[Source](./components/hex-triad/HexTriadCallout.vue)

Props: none.

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### HexTriadCenterBadge

[Source](./components/hex-triad/HexTriadCenterBadge.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `x` | `number` | **required** |
| `y` | `number` | **required** |
| `text` | `string \| number` | **required** |
| `color` | `string` | **required** |
| `filter` | `string` | `'url(#hex-badge-shadow)'` |
| `radius` | `number` | **required** |

Slots: none. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### HexTriadContent

[Source](./components/hex-triad/HexTriadContent.vue)

Props: none.

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### HexTriadHeading

[Source](./components/hex-triad/HexTriadHeading.vue)

Props: none.

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### HexTriadLayer

[Source](./components/hex-triad/HexTriadLayer.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `d` | `string` | **required** |
| `fill` | `string` | `undefined` |
| `filter` | `string` | `undefined` |
| `opacity` | `number \| string` | `1` |

Slots: none. Class/attribute handling: component-specific Vue fallthrough/template behavior.

### Horizontal card

Rounded horizontal card with a ribbon badge, optional icon circle, title, description, and dots. Named slots take precedence over extracted `HorizCardBadge`, `HorizCardIcon`, `HorizCardHeading`, and `HorizCardContent` children, then prop/default content. Other default children render as extra content. The icon circle is enabled by an icon prop/slot/child unless `hasIconCircle` explicitly overrides it. Descendants inherit card colors and step where applicable. Default accent is `#ea583a`; light color derives from that accent at alpha 0.16.

#### HorizCard

[Source](./components/horiz-card/HorizCard.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `'#ea583a'` |
| `dots` | `boolean` | `true` |
| `title` | `string` | `'Lorem Ipsum'` |
| `cardBg` | `string` | `'#ffffff'` |
| `textColor` | `string` | `undefined` |
| `titleColor` | `string` | `undefined` |
| `lightColor` | `string` | `undefined` |
| `description` | `string` | `undefined` |
| `step` | `string \| number` | `'01'` |
| `icon` | `string \| object` | `undefined` |
| `hasIconCircle` | `boolean` | `undefined` |

Slots: `badge`, `default`, `description`, `dots`, `icon`, `title`. Class/attribute handling: `useMergedUnoAttrs`.

#### HorizCardBadge

[Source](./components/horiz-card/HorizCardBadge.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |
| `step` | `string \| number` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### HorizCardContent

[Source](./components/horiz-card/HorizCardContent.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### HorizCardHeading

[Source](./components/horiz-card/HorizCardHeading.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### HorizCardIcon

[Source](./components/horiz-card/HorizCardIcon.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `icon` | `string \| object` | `undefined` |
| `color` | `string` | `undefined` |
| `lightColor` | `string` | `undefined` |
| `size` | `number \| string` | `96` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

### Vertical card

Vertical card with corner accents, badge, optional icon circle, divider, and dots. Named slots take precedence over extracted children, then props. Both `VertCardTitle` and `VertCardHeading` are recognized as the title. `variant` overrides `badgeVariant`; accepted values are `outside`, `inside`, `none`, and `hidden`. **Current quirk:** only `outside` renders a badge; `inside` is declared but has no rendered placement. `VertCardTitle` inherits the parent divider setting, while `VertCardHeading` defaults its own `hasDivider` to true. The icon circle is inferred from icon content unless explicitly controlled. Descendants inherit the card context; light color defaults to accent at alpha 0.16.

#### VertCard

[Source](./components/vert-card/VertCard.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `'#ea583a'` |
| `dots` | `boolean` | `true` |
| `title` | `string` | `undefined` |
| `cardBg` | `string` | `'#ffffff'` |
| `textColor` | `string` | `undefined` |
| `titleColor` | `string` | `undefined` |
| `lightColor` | `string` | `undefined` |
| `stripeColor` | `string` | `undefined` |
| `description` | `string` | `undefined` |
| `hasDivider` | `boolean` | `true` |
| `step` | `string \| number` | `'01'` |
| `icon` | `string \| object` | `undefined` |
| `hasIconCircle` | `boolean` | `undefined` |
| `variant` | `TVertCardBadgeVariant` | `undefined` |
| `badgeVariant` | `TVertCardBadgeVariant` | `'outside'` |

Slots: `badge`, `default`, `description`, `dots`, `icon`, `title`. Class/attribute handling: `useMergedUnoAttrs`.

#### VertCardBadge

[Source](./components/vert-card/VertCardBadge.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |
| `step` | `string \| number` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### VertCardContent

[Source](./components/vert-card/VertCardContent.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### VertCardHeading

[Source](./components/vert-card/VertCardHeading.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |
| `hasDivider` | `boolean` | `true` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### VertCardIcon

[Source](./components/vert-card/VertCardIcon.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `icon` | `string \| object` | `undefined` |
| `color` | `string` | `undefined` |
| `lightColor` | `string` | `undefined` |
| `size` | `number \| string` | `108` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### VertCardTitle

[Source](./components/vert-card/VertCardTitle.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |
| `hasDivider` | `boolean` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

### Chevron card

Horizontal row with a chevron badge. Named badge/title/description slots override extracted `ChevronCardBadge`, `ChevronCardHeading`, and `ChevronCardContent` children. The root has **no title or description props**; provide those through slots/children. Width is optional; height becomes minimum height, defaulting to 112 px. The badge supports an icon slot and default step text. Animation is controlled directly by `animation`, without the shifting-intro activation contract.

#### ChevronCard

[Source](./components/chevron-card/ChevronCard.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `step` | `string \| number` | `'01'` |
| `icon` | `string \| object` | `undefined` |
| `color` | `string` | `'#f59e0b'` |
| `width` | `number \| string` | `undefined` |
| `cardBg` | `string` | `'#f5f5f7'` |
| `height` | `number \| string` | `undefined` |
| `textColor` | `string` | `undefined` |
| `animation` | `boolean` | `true` |
| `notchDepth` | `number` | `26` |
| `titleColor` | `string` | `undefined` |
| `chevronWidth` | `number` | `130` |
| `borderRadius` | `number` | `18` |

Slots: `badge`, `default`, `description`, `title`. Class/attribute handling: `useMergedUnoAttrs`.

#### ChevronCardBadge

[Source](./components/chevron-card/ChevronCardBadge.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `step` | `string \| number` | `undefined` |
| `icon` | `string \| object` | `undefined` |
| `color` | `string` | `undefined` |
| `width` | `number` | `130` |
| `height` | `number \| string` | `undefined` |
| `notchDepth` | `number` | `26` |

Slots: `default`, `icon`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ChevronCardContent

[Source](./components/chevron-card/ChevronCardContent.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ChevronCardHeading

[Source](./components/chevron-card/ChevronCardHeading.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

### Arrow triad

Arrow diagram with layouts `2-left-1-right` (default), `1-left-2-right`, `2-left`, and `1-left`. The item resolver always resolves three entries; layout controls visible arrangement. Callouts accept prop overrides and extract heading/content/icon children; named title/description/icon slots override their fallbacks. Root default content replaces generated callouts. Item color and depthColor resolve independently. Default accents are `#fec201`, `#71ad49`, and `#5b9bd5`.

#### ArrowTriad

[Source](./components/arrow-triad/ArrowTriad.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `items` | `readonly IArrowTriadItem[]` | `undefined` |
| `animation` | `boolean` | `true` |
| `height` | `number \| string` | `undefined` |
| `startDelay` | `number` | `undefined` |
| `active` | `boolean` | `undefined` |
| `triangleHead` | `boolean` | `true` |
| `neckLine` | `boolean` | `true` |
| `scale` | `number` | `undefined` |
| `autoScale` | `boolean` | `true` |
| `maxScale` | `number` | `undefined` |
| `hidePagy` | `boolean` | `undefined` |
| `layout` | `TArrowTriadLayout` | `'2-left-1-right'` |
| `offsetX` | `number` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArrowTriadCallout

[Source](./components/arrow-triad/ArrowTriadCallout.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `id` | `string \| number` | `undefined` |
| `index` | `number` | `undefined` |
| `icon` | `string \| object \| false` | `undefined` |
| `color` | `string` | `undefined` |
| `cardBg` | `string` | `undefined` |
| `textColor` | `string` | `undefined` |
| `titleColor` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `description` | `string` | `undefined` |

Slots: `default`, `description`, `icon`, `title`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ArrowTriadContent

[Source](./components/arrow-triad/ArrowTriadContent.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ArrowTriadHeading

[Source](./components/arrow-triad/ArrowTriadHeading.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ArrowTriadIcon

[Source](./components/arrow-triad/ArrowTriadIcon.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `size` | `number` | `32` |
| `color` | `string` | `'#334155'` |
| `icon` | `string \| object \| false` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

### Quad hub

Four surrounding blocks ordered top-left, top-right, bottom-right, bottom-left. Item resolution always produces four entries. Callouts register by order and expose styling props, **not title/description props**; use `QuadHubHeading` and `QuadHubContent` in the default slot for text. The root merges item data, matching slotted props, then registered props. It does not generate fallback callouts; add them explicitly. Root `hub` slot replaces the center. `QuadHubCenter` supports default/title/subtitle slots and a diameter of twice its radius. Built-in icon names are `user`, `academic`, `briefcase`, and `target`; the icon type also accepts strings, objects, and booleans. Default accents are `#f29e4b`, `#a4cb81`, `#62b6a8`, and `#e9717a`.

#### QuadHub

[Source](./components/quad-hub/QuadHub.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `title` | `string` | `undefined` |
| `items` | `readonly IQuadHubItem[]` | `undefined` |
| `active` | `boolean` | `undefined` |
| `height` | `number \| string` | `undefined` |
| `arcRatio` | `number` | `0.55` |
| `subtitle` | `string` | `undefined` |
| `animation` | `boolean` | `true` |
| `startDelay` | `number` | `undefined` |
| `arcBorderRatio` | `number` | `0.8` |
| `scale` | `number` | `undefined` |
| `autoScale` | `boolean` | `true` |
| `maxScale` | `number` | `undefined` |

Slots: `default`, `hub`. Class/attribute handling: `useMergedUnoAttrs`.

#### QuadHubCallout

[Source](./components/quad-hub/QuadHubCallout.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `id` | `string \| number` | `undefined` |
| `icon` | `TQuadHubIcon` | `undefined` |
| `color` | `string` | `undefined` |
| `cardBg` | `string` | `undefined` |
| `arcColor` | `string` | `undefined` |
| `textColor` | `string` | `undefined` |
| `titleColor` | `string` | `undefined` |
| `arcBorderColor` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### QuadHubCenter

[Source](./components/quad-hub/QuadHubCenter.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `title` | `string` | `undefined` |
| `radius` | `number` | `58` |
| `subtitle` | `string` | `undefined` |

Slots: `default`, `subtitle`, `title`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### QuadHubContent

[Source](./components/quad-hub/QuadHubContent.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### QuadHubHeading

[Source](./components/quad-hub/QuadHubHeading.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### QuadHubIcon

[Source](./components/quad-hub/QuadHubIcon.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `size` | `number` | `34` |
| `color` | `string` | `'#ffffff'` |
| `icon` | `TQuadHubIcon` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

### Arc compare

Two colored semicircle hubs and surrounding comparison points. Compose root → `ArcCompareLeft`/`ArcCompareRight` → `ArcCompareTitle` and `ArcCompareContents` → `ArcCompareCallout` → badge/heading/content. Default slots are inspected and reconstructed. Root geometry uses four points when its count or an immediate default child count equals 4 (also accepts string `4` at runtime); otherwise it uses three. It does not infer geometry from the number of nested callouts. Side count falls back to root count, then 3. Use consistent counts across root/sides. Default side colors are left `#e87a36`, right `#208b9e`. A side title initializes to `Add Project\nName`; `ArcCompareTitle` supplies custom content. The root has no items prop. A callout inherits side and registration index unless explicitly set.

#### ArcCompare

[Source](./components/arc-compare/ArcCompare.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `vsText` | `string` | `'Vs'` |
| `vsSize` | `number` | `14` |
| `count` | `number` | `undefined` |
| `hubRadius` | `number` | `undefined` |
| `arcRadius` | `number` | `undefined` |
| `arcOffset` | `number` | `undefined` |
| `animation` | `boolean` | `true` |
| `height` | `number \| string` | `undefined` |
| `startDelay` | `number` | `undefined` |
| `active` | `boolean` | `undefined` |
| `scale` | `number` | `undefined` |
| `autoScale` | `boolean` | `true` |
| `maxScale` | `number` | `undefined` |
| `hidePagy` | `boolean` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcCompareBadge

[Source](./components/arc-compare/ArcCompareBadge.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `id` | `string \| number` | `undefined` |
| `color` | `string` | `undefined` |
| `size` | `number` | `52` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcCompareCallout

[Source](./components/arc-compare/ArcCompareCallout.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `side` | `'left' \| 'right'` | `undefined` |
| `index` | `number` | `undefined` |
| `id` | `string \| number` | `undefined` |
| `title` | `string` | `undefined` |
| `description` | `string` | `undefined` |
| `color` | `string` | `undefined` |
| `textColor` | `string` | `undefined` |
| `textGap` | `number` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcCompareContent

[Source](./components/arc-compare/ArcCompareContent.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcCompareContents

[Source](./components/arc-compare/ArcCompareContents.vue)

Props: none.

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcCompareHeading

[Source](./components/arc-compare/ArcCompareHeading.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcCompareLeft

[Source](./components/arc-compare/ArcCompareLeft.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `'#e87a36'` |
| `title` | `string` | `undefined` |
| `count` | `number` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcCompareRight

[Source](./components/arc-compare/ArcCompareRight.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `'#208b9e'` |
| `title` | `string` | `undefined` |
| `count` | `number` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcCompareTitle

[Source](./components/arc-compare/ArcCompareTitle.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

### Arc arrow process

Curved arrow process with dedicated placements for 2, 3, and 4 callouts. Count precedence: explicit count → recognized default-slot callout count → nonempty items length → 4. Other counts are not validated into that supported placement set. Default height is 370 px with a 340 px minimum. Callouts support named title/description/icon slots and extracted children; explicit color also affects the corresponding arrow. `ArcArrowProcessArrow` is usable separately: standalone is inferred from rotation equal to zero unless explicitly supplied; default standalone size is 380 × 215 px, otherwise 100% × 100%. Default viewBox is `-125 335 310 150` standalone or `0 -30 1000 370` in-diagram. Path defaults to `DEFAULT_ARC_ARROW_PATH`; generated gradient/shadow IDs use a random suffix.

#### ArcArrowProcess

[Source](./components/arc-arrow-process/ArcArrowProcess.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `items` | `readonly IArcArrowProcessItem[]` | `undefined` |
| `count` | `number` | `undefined` |
| `animation` | `boolean` | `true` |
| `height` | `number \| string` | `370` |
| `startDelay` | `number` | `undefined` |
| `active` | `boolean` | `undefined` |
| `rotationOffset` | `number` | `undefined` |

Slots: `default`. Class/attribute handling: `useMergedUnoAttrs`.

#### ArcArrowProcessArrow

[Source](./components/arc-arrow-process/ArcArrowProcessArrow.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `'#6fa3b5'` |
| `gradientEnd` | `string` | `'#8cb8c8'` |
| `stroke` | `string` | `'#ffffff'` |
| `strokeWidth` | `number` | `2.5` |
| `width` | `number \| string` | `undefined` |
| `height` | `number \| string` | `undefined` |
| `rotation` | `number` | `0` |
| `standalone` | `boolean` | `undefined` |
| `path` | `string` | `undefined` |
| `viewBox` | `string` | `undefined` |
| `originY` | `number` | `-220` |

Slots: none. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ArcArrowProcessCallout

[Source](./components/arc-arrow-process/ArcArrowProcessCallout.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `id` | `string \| number` | `undefined` |
| `index` | `number` | `undefined` |
| `icon` | `string \| object \| false` | `undefined` |
| `color` | `string` | `undefined` |
| `textColor` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `description` | `string` | `undefined` |

Slots: `default`, `description`, `icon`, `title`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ArcArrowProcessContent

[Source](./components/arc-arrow-process/ArcArrowProcessContent.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ArcArrowProcessHeading

[Source](./components/arc-arrow-process/ArcArrowProcessHeading.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `color` | `string` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

#### ArcArrowProcessIcon

[Source](./components/arc-arrow-process/ArcArrowProcessIcon.vue)

| Prop | Type | Declared default |
| --- | --- | --- |
| `size` | `number` | `36` |
| `color` | `string` | `'#888d94'` |
| `icon` | `string \| object \| false` | `undefined` |

Slots: `default`. Class/attribute handling: component-specific Vue fallthrough/template behavior.

## Item data contracts

These types are available through the corresponding `utils/<family>/index.ts`.
All fields below are optional except `IHexTriadItem.title`.

| Type | Fields |
| --- | --- |
| `IHexTriadItem` | `id: string \| number`; **`title: string` required**; `description`, `color`, `depthColor`, `lightColor`: string |
| `IArrowTriadItem` | `id: string \| number`; `icon: string \| object \| false`; `color`, `depthColor`, `title`, `description`, `cardBg`, `textColor`, `titleColor`: string |
| `IQuadHubItem` | `id: string \| number`; `icon: TQuadHubIcon` (`string \| object \| boolean`); `color`, `cardBg`, `arcColor`, `textColor`, `titleColor`, `arcBorderColor`: string; `arcRatio`, `arcBorderRatio`: number |
| `IArcCompareItem` | `id: string \| number`; `title`, `description`, `color`, `textColor`: string; utility input, not a root prop |
| `IArcArrowProcessItem` | `id: string \| number`; `icon: string \| object \| false`; `color`, `gradientEnd`, `title`, `description`, `titleColor`, `textColor`: string |

Exact default item records and resolution behavior:
[hex triad](./utils/hexTriad/resolveHexTriadItems.ts),
[arrow triad](./utils/arrowTriad/resolveArrowTriadItems.ts),
[quad hub](./utils/quadHub/resolveQuadHubItems.ts),
[arc compare](./utils/arcCompare/resolveArcCompareItems.ts),
[arc arrow process](./utils/arcArrowProcess/resolveArcArrowProcessItems.ts).

## Layout inventory

| Layout | Props and defaults | Slot and behavior |
| --- | --- | --- |
| [arc-toc](./layouts/core/arc-toc.vue) | `maxItems: number \| string = 7`; `maxDepth: number \| string = 1`; `indexed: boolean = false` | Default heading slot, fallback “Table of Contents”. Reads top-level navigation TOC, up to seven items; draws measured connectors and links to slide/presenter routes. CSS hides non-h1 content in the heading area. **`maxDepth` is declared but unused.** |
| [bg-center](./layouts/core/bg-center.vue) | `background = ''` (no explicit runtime type); `indexed: boolean = false`; `dim: boolean = true` | Centers default content; background passed to Slidev `handleBackground`. Optional two-digit index from the current slide's top-level TOC position; absent when slide is not in that TOC. |
| [table-of-contents](./layouts/core/table-of-contents.vue) | `maxDepth: number \| string = 1` | Default heading slot, fallback “Table of Contents”; renders Slidev `Toc` with maxDepth. |
| [shifting-intro](./layouts/shifting-heading/shifting-intro.vue) | None | Extracts first immediate h1 from default content. Centers heading at click 0; first click moves it to the corner and reveals body. Remaps implicit v-click steps after that reveal. Provides `SLIDEV_LAYOUT_SHIFTING_INTRO`. |
| [thanks](./layouts/thanks/thanks.vue) | None | Renders `ThanksContent` with its default animation; no content slot and no declared animation prop. |

All five layouts use `useMergedUnoAttrs`. The standard TOC and arc TOC are separate
layouts with different rendering and depth behavior.

## Supporting modules to audit in consumers

The following shipped modules can be direct-import dependencies even though they
are not slide components. Preserve paths or provide migration mappings if moved.

| Module | Current role |
| --- | --- |
| [mergeUno](./utils/mergeUno/index.ts) | `mergeUno(...values)` and `createUnoClassMerger(options?)`, plus exported class/merger/conflict types. Resolves class conflicts. |
| [useMergedUnoAttrs](./utils/useMergedUnoAttrs.ts) | Merges default classes with attrs.class and forwards remaining attributes. |
| [useDiagramAutoScale](./utils/useDiagramAutoScale.ts) | Measures slide/parent space and pagination clearance; exposes scale, container height, and updateScale. |
| [shiftingHeading](./utils/shiftingHeading/collectShiftingIntroNodes.ts) | `collectShiftingIntroNodes`: title/body extraction and implicit click remapping. |
| [tableOfContents](./utils/tableOfContents/index.ts) | Item count, marker placement, arc/connector paths, article widths and alignment. |
| [hexTriad](./utils/hexTriad/index.ts) | Geometry, context keys/types, default items and resolver. |
| [arrowTriad](./utils/arrowTriad/index.ts) | Geometry, layout/context types, context keys and item resolvers. |
| [quadHub](./utils/quadHub/index.ts) | Geometry/color helpers, context keys/types and item resolvers. |
| [arcCompare](./utils/arcCompare/index.ts) | Geometry, side/callout contexts, defaults and side item resolver. |
| [arcArrowProcess](./utils/arcArrowProcess/index.ts) | Arrow path geometry, contexts, defaults and item resolvers. |
| [horizCard](./utils/horizCard/index.ts) | Card geometry/color helpers and context. |
| [vertCard](./utils/vertCard/index.ts) | Card geometry/color helpers, context and badge variant type. |
| [chevronCard](./utils/chevronCard/index.ts) | Badge geometry and context. |

## Existing composition examples

These examples illustrate the old API to compare with future migration examples.
The preview decks linked above contain more complete slide setups.

```vue
<HorizCard step="01" title="Discovery" description="Explore ideas." color="#2563eb">
  <template #icon><div class="i-carbon-search text-4xl" /></template>
</HorizCard>

<VertCard :has-divider="false" badge-variant="outside">
  <VertCardTitle>Discovery</VertCardTitle>
  <VertCardContent>Explore ideas.</VertCardContent>
</VertCard>

<ChevronCard step="01">
  <ChevronCardHeading>Discovery</ChevronCardHeading>
  <ChevronCardContent>Explore ideas.</ChevronCardContent>
</ChevronCard>

<HexTriad :animation="false">
  <HexTriadCallout>
    <HexTriadBadge>01</HexTriadBadge>
    <HexTriadHeading>Discovery</HexTriadHeading>
    <HexTriadContent>Explore ideas.</HexTriadContent>
  </HexTriadCallout>
</HexTriad>

<ArrowTriad layout="1-left" :animation="false">
  <ArrowTriadCallout title="Discovery" description="Explore ideas." />
</ArrowTriad>

<QuadHub title="Plan" :animation="false">
  <QuadHubCallout icon="user">
    <QuadHubHeading>Discovery</QuadHubHeading>
    <QuadHubContent>Explore ideas.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>

<ArcCompare :count="3" :animation="false">
  <ArcCompareLeft title="Before" />
  <ArcCompareRight title="After" />
</ArcCompare>

<ArcArrowProcess :count="2" :animation="false">
  <ArcArrowProcessCallout title="Discover" description="Explore ideas." />
  <ArcArrowProcessCallout title="Deliver" description="Share the result." />
</ArcArrowProcess>
```

For `HexTriad`, `ArrowTriad`, and `ArcArrowProcess`, a supplied default slot replaces
generated fallback callouts. `QuadHub` renders only explicitly supplied callouts.
Examples with one callout intentionally supply only one, even if the root graphic
has more segments.

## Using this baseline during migration

1. Inventory component tags, layout frontmatter, props, named/default slots, direct
   imports, and `.alpha-*` CSS overrides in each consuming project.
2. For each refactor change, record the old name/path/API from this snapshot,
   replacement API, changed defaults or behavior, and a before/after slide example
   in a separate migration guide. Mark removals and intentional behavior fixes explicitly.
3. Compare affected slides against this commit with the same theme and content.
   Check initial/advanced click states, animation disabled, diagram counts/layouts,
   custom colors/classes, text wrapping, pagination, and export rendering.
4. Run the preview decks for the themes used by consumers and build the consuming
   presentations before upgrading them. Do not infer rendering equivalence from
   unchanged prop names alone.

## Migration notes

### QuadHub → RectOrbitTetrad

All `QuadHub*` components are renamed to `RectOrbitTetrad*`. The API (props, slots,
behavior) is unchanged; this is a name-only migration. Search-and-replace in slide
markup, imports, and CSS selectors.

| Before (baseline) | After |
| --- | --- |
| `QuadHub` | `RectOrbitTetrad` |
| `QuadHubCallout` | `RectOrbitTetradCallout` |
| `QuadHubCenter` | `RectOrbitTetradCenter` |
| `QuadHubContent` | `RectOrbitTetradContent` |
| `QuadHubHeading` | `RectOrbitTetradHeading` |
| `QuadHubIcon` | `RectOrbitTetradIcon` |

Supporting modules and types follow the same rename:

| Before (baseline) | After |
| --- | --- |
| `utils/quadHub/` | `utils/rectOrbitTetrad/` |
| `resolveQuadHubItems` | `resolveRectOrbitTetradItems` |
| `createQuadHubGeometry` | `createRectOrbitTetradGeometry` |
| `IQuadHubItem` | `IRectOrbitTetradItem` |
| `IQuadHubRegistration` | `IRectOrbitTetradRegistration` |
| `IResolvedQuadHubItem` | `IResolvedRectOrbitTetradItem` |
| `QUAD_HUB_ROOT_KEY` | `RECT_ORBIT_TETRAD_ROOT_KEY` |
| `TQuadHubIcon` | `TRectOrbitTetradIcon` |

CSS class prefix: `.alpha-quad-hub` → `.alpha-rect-orbit-tetrad`.

#### Before

```vue
<QuadHub title="Plan" :animation="false">
  <QuadHubCallout icon="user">
    <QuadHubHeading>Discovery</QuadHubHeading>
    <QuadHubContent>Explore ideas.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>
```

#### After

```vue
<RectOrbitTetrad title="Plan" :animation="false">
  <RectOrbitTetradCallout icon="user">
    <RectOrbitTetradHeading>Discovery</RectOrbitTetradHeading>
    <RectOrbitTetradContent>Explore ideas.</RectOrbitTetradContent>
  </RectOrbitTetradCallout>
</RectOrbitTetrad>
```

### ArcCompare → ArcComparison

All `ArcCompare*` components are renamed to `ArcComparison*`. The component category folder is also renamed from `compare/` to `comparisons/`. The API (props, slots, behavior) is unchanged; this is a name-only migration. Search-and-replace in slide markup, imports, and CSS selectors.

| Before (baseline) | After |
| --- | --- |
| `ArcCompare` | `ArcComparison` |
| `ArcCompareBadge` | `ArcComparisonBadge` |
| `ArcCompareCallout` | `ArcComparisonCallout` |
| `ArcCompareContent` | `ArcComparisonContent` |
| `ArcCompareContents` | `ArcComparisonContents` |
| `ArcCompareHeading` | `ArcComparisonHeading` |
| `ArcCompareLeft` | `ArcComparisonLeft` |
| `ArcCompareRight` | `ArcComparisonRight` |
| `ArcCompareTitle` | `ArcComparisonTitle` |

Supporting directory and utility exports follow the same rename:

| Before (baseline) | After |
| --- | --- |
| `components/compare/arc-compare/` | `components/comparisons/arc-comparison/` |
| `utils/arcCompare/` | `utils/arcComparison/` |
| `createArcCompareGeometry` | `createArcComparisonGeometry` |
| `resolveArcCompareItems` | `resolveArcComparisonItems` |
| `resolveArcCompareSideItems` | `resolveArcComparisonSideItems` |
| `IArcCompareItem` | `IArcComparisonItem` |
| `IResolvedArcCompareItem` | `IResolvedArcComparisonItem` |
| `IArcCompareGeometry` | `IArcComparisonGeometry` |
| `IArcCompareSideGeometry` | `IArcComparisonSideGeometry` |
| `IArcComparePoint` | `IArcComparisonPoint` |
| `ARC_COMPARE_ROOT_KEY` | `ARC_COMPARISON_ROOT_KEY` |
| `ARC_COMPARE_SIDE_KEY` | `ARC_COMPARISON_SIDE_KEY` |

CSS class prefix: `.alpha-arc-compare` → `.alpha-arc-comparison`.

#### Before

```vue
<ArcCompare :count="3">
  <ArcCompareLeft color="#ea580c">
    <ArcCompareTitle>Traditional<br />Monolith</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Coupled State</ArcCompareHeading>
        <ArcCompareContent>Bottleneck</ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareLeft>
  <ArcCompareRight color="#0284c7">
    <ArcCompareTitle>Microservices</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Decoupled</ArcCompareHeading>
        <ArcCompareContent>Autonomous</ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareRight>
</ArcCompare>
```

#### After

```vue
<ArcComparison :count="3">
  <ArcComparisonLeft color="#ea580c">
    <ArcComparisonTitle>Traditional<br />Monolith</ArcComparisonTitle>
    <ArcComparisonContents>
      <ArcComparisonCallout>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Coupled State</ArcComparisonHeading>
        <ArcComparisonContent>Bottleneck</ArcComparisonContent>
      </ArcComparisonCallout>
    </ArcComparisonContents>
  </ArcComparisonLeft>
  <ArcComparisonRight color="#0284c7">
    <ArcComparisonTitle>Microservices</ArcComparisonTitle>
    <ArcComparisonContents>
      <ArcComparisonCallout>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Decoupled</ArcComparisonHeading>
        <ArcComparisonContent>Autonomous</ArcComparisonContent>
      </ArcComparisonCallout>
    </ArcComparisonContents>
  </ArcComparisonRight>
</ArcComparison>
```

### ComparisonTable → TableComparison

`ComparisonTable*` components are renamed to `TableComparison*` to standardize naming across the comparisons group (`<Descriptor>Comparison`). The component category folder is also renamed from `compare/` to `comparisons/`. The API (props, slots, behavior) is unchanged; this is a name-only migration. Search-and-replace in slide markup, imports, and CSS selectors.

| Before (baseline) | After |
| --- | --- |
| `ComparisonTable` | `TableComparison` |
| `ComparisonTableCell` | `TableComparisonCell` |
| `ComparisonTableCol` | `TableComparisonCol` |
| `ComparisonTableCols` | `TableComparisonCols` |
| `ComparisonTableRow` | `TableComparisonRow` |
| `ComparisonTableRows` | `TableComparisonRows` |

Supporting directory and utility exports follow the same rename:

| Before (baseline) | After |
| --- | --- |
| `components/compare/comparison-table/` | `components/comparisons/table-comparison/` |
| `utils/comparisonTable/` | `utils/tableComparison/` |
| `COMPARISON_TABLE_KEY` | `TABLE_COMPARISON_KEY` |
| `COMPARISON_TABLE_COLS_KEY` | `TABLE_COMPARISON_COLS_KEY` |
| `IComparisonTableContext` | `ITableComparisonContext` |
| `IComparisonTableColsContext` | `ITableComparisonColsContext` |

CSS class prefix: `.alpha-comparison-table` → `.alpha-table-comparison`.

#### Before

```vue
<ComparisonTable>
  <ComparisonTableCols>
    <ComparisonTableCol color="#3b82f6">TypeScript</ComparisonTableCol>
  </ComparisonTableCols>
  <ComparisonTableRows>
    <ComparisonTableRow title="Type Safety">
      <ComparisonTableCell>Strict tsconfig</ComparisonTableCell>
    </ComparisonTableRow>
  </ComparisonTableRows>
</ComparisonTable>
```

#### After

```vue
<TableComparison>
  <TableComparisonCols>
    <TableComparisonCol color="#3b82f6">TypeScript</TableComparisonCol>
  </TableComparisonCols>
  <TableComparisonRows>
    <ComparisonTableRow title="Type Safety">
      <TableComparisonCell>Strict tsconfig</TableComparisonCell>
    </ComparisonTableRow>
  </TableComparisonRows>
</TableComparison>
```
