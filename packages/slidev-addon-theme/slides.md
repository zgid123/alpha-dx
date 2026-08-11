---
theme: seriph
title: Alpha Slidev Addon Preview
addons:
  - ./slidev-addon-theme
transition: slide-left
---

# ReflectedTitle

Creates a large heading with a soft reflected copy below it.

<div class="mt-10 rounded-xl bg-slate-900/70 p-10 text-center">
  <ReflectedTitle title="Alpha Slidev Addon" />
</div>

<div class="mt-8 text-sm">
  <code>title: string</code> — the heading and reflected text.
</div>

```vue
<ReflectedTitle title="Alpha Slidev Addon" />
```

---
layout: table-of-contents
maxDepth: 1
---

# table-of-contents

Lists every level-one heading in the deck. Set `maxDepth` to include deeper headings.

---

# Date

Formats a date as `dd/MM/yyyy`, defaulting to the current date.

<div class="mt-10 flex min-h-28 items-center justify-center rounded-xl bg-cyan-500/10">
  <Date date="2026-08-12" />
</div>

<div class="mt-8 text-sm">
  <code>date?: string</code> — any value accepted by the JavaScript <code>Date</code> constructor.
</div>

```vue
<Date date="2026-08-12" />
```

---

# QnA

Animates a closing prompt from “Any questions?” to “Thank you”.

<div class="mt-8 flex min-h-44 items-center justify-center rounded-xl bg-violet-500/10">
  <QnA :start-delay="0" />
</div>

<div class="mt-6 text-sm">
  <code>startDelay?: number</code> — delay in milliseconds; defaults to <code>11500</code>.
</div>

```vue
<QnA :start-delay="0" />
```

---

# Quote

Displays a quotation with optional attribution and customizable title classes.

<div class="mt-8 rounded-xl bg-amber-500/10 p-8">
  <Quote
    text="Reusable slides should feel native to every deck."
    author="Alpha"
    title-class="!text-3xl"
  />
</div>

<div class="mt-5 text-sm">
  <code>text: string</code> · <code>author?: string</code> · <code>titleClass?: string</code>
</div>

```vue
<Quote text="Reusable slides should feel native." author="Alpha" />
```

---

# Speaker

Anchors speaker or team attribution and a formatted date at the bottom of a slide.

<div class="mt-10 rounded-xl bg-blue-500/10 p-8 text-center">
  The speaker metadata is rendered below.
</div>

<Speaker :team="['Alpha', 'Beta']" date="2026-08-12" />

<div class="mt-8 text-sm">
  <code>author?: string</code> · <code>team?: string[]</code> · <code>date: string</code>
</div>

```vue
<Speaker author="Alpha" date="2026-08-12" />
```

---
clicks: 1
---

<TransitionHeading :center="$clicks === 0">
  <h1>TransitionHeading</h1>
</TransitionHeading>

<div
  class="mt-24 transition-opacity duration-500"
  :class="$clicks === 0 ? 'opacity-0' : 'opacity-100'"
>
  <p>Moves a slotted heading between centered and standard title positions.</p>

  <div class="mt-8 rounded-xl bg-emerald-500/10 p-6 text-sm">
    <code>center?: boolean</code> — start centered.<br>
    <code>idle?: boolean</code> — disable the transition.
  </div>
</div>

```vue
<TransitionHeading :center="$clicks === 0">
  <h1>A shifting title</h1>
</TransitionHeading>
```

---

# ThanksSquare

A filled decorative square. Position, dimensions, and color come from UnoCSS classes.

<div class="relative mt-8 h-52 overflow-hidden rounded-xl bg-slate-900/70">
  <ThanksSquare class="left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-cyan-400" />
</div>

<div class="mt-5 text-sm">No props. Pass styling through the component’s <code>class</code> attribute.</div>

```vue
<ThanksSquare class="left-20 top-20 h-28 w-28 bg-cyan-400" />
```

---

# ThanksOutlineSquare

An outlined decorative square designed for the animated closing composition.

<div class="relative mt-8 h-52 overflow-hidden rounded-xl bg-slate-900/70">
  <ThanksOutlineSquare class="left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 border-cyan-300" />
</div>

<div class="mt-5 text-sm">No props. Pass sizing, position, and border color through <code>class</code>.</div>

```vue
<ThanksOutlineSquare class="right-20 top-20 h-28 w-28 border-cyan-300" />
```

---

# ThanksContent

Composes the complete “Thank you” artwork and optionally animates its elements.

<div class="relative mt-6 h-72 overflow-hidden rounded-xl bg-slate-900/70">
  <ThanksContent :animation="false" />
</div>

<div class="mt-5 text-sm">
  <code>animation?: boolean</code> — enables the entrance sequence; defaults to <code>true</code>.
</div>

```vue
<ThanksContent :animation="false" />
```

---
layout: bg-center
background: linear-gradient(135deg, #111827 0%, #172554 55%, #164e63 100%)
---

# bg-center

Centers the default slot over a full-slide background.

```md
---
layout: bg-center
background: /images/cover.jpg
---
```

---
layout: shifting-intro
---

# shifting-intro

The first heading begins in the center. Advance once to shift it upward and reveal the content.

<div class="mt-10 grid grid-cols-2 gap-6">
  <div class="rounded-xl bg-cyan-500/10 p-6">Centered opening state</div>
  <div class="rounded-xl bg-blue-500/10 p-6">Revealed content state</div>
</div>

---

<script setup lang="ts">
import { mergeUno } from './utils/mergeUno'

const mergedUno = mergeUno('top-20 text-red-500', 'top-10 text-cyan-400')
</script>

# mergeUno

Merges class inputs and keeps the last utility in each UnoCSS conflict group.

<div class="mt-10 rounded-xl bg-cyan-500/10 p-8">
  <div class="text-sm opacity-70">Result</div>
  <code class="mt-3 block text-xl">{{ mergedUno }}</code>
</div>

```ts
mergeUno('top-20 text-red-500', 'top-10 text-cyan-400')
// => 'top-10 text-cyan-400'
```

---

<script setup lang="ts">
import { createUnoClassMerger } from './utils/mergeUno'

const mergeThemeClasses = createUnoClassMerger({
  resolveConflictKeys({ utility }) {
    if (utility.startsWith('slide-accent-')) {
      return ['slide-accent']
    }

    return undefined
  },
})

const customMergedUno = mergeThemeClasses('slide-accent-blue', 'slide-accent-cyan')
</script>

# createUnoClassMerger

Extends the built-in conflict rules with project-specific UnoCSS utilities.

<div class="mt-8 rounded-xl bg-violet-500/10 p-7">
  <div class="text-sm opacity-70">Custom result</div>
  <code class="mt-3 block text-xl">{{ customMergedUno }}</code>
</div>

```ts
const mergeThemeClasses = createUnoClassMerger({
  resolveConflictKeys: ({ utility }) =>
    utility.startsWith('slide-accent-') ? ['slide-accent'] : undefined,
})
```

---
layout: thanks
---

<!-- The thanks layout renders the animated ThanksContent composition. -->
