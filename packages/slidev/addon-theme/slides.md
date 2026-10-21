---
theme: seriph
title: Alpha Slidev Addon Preview
addons:
  - ./addon-theme
transition: slide-left
hideInToc: true
---

# ReflectedTitle

Creates a large heading with a soft reflected copy below it.

<div class="mt-10 rounded-xl bg-slate-900/70 p-10 text-center">
  <ReflectedTitle title="Alpha's Slidev Addon" />
</div>

<div class="mt-8 text-sm">
  <code>title: string</code> — the heading and reflected text.
</div>

```vue
<ReflectedTitle title="Alpha's Slidev Addon" />
```

---
layout: arc-toc
maxDepth: 1
maxItems: 1
hideInToc: true
---

# Arc TOC — 1 Section

---
layout: arc-toc
maxDepth: 1
maxItems: 2
hideInToc: true
---

# Arc TOC — 2 Sections

---
layout: arc-toc
maxDepth: 1
maxItems: 3
hideInToc: true
---

# Arc TOC — 3 Sections

---
layout: arc-toc
maxDepth: 1
maxItems: 4
hideInToc: true
---

# Arc TOC — 4 Sections

---
layout: arc-toc
maxDepth: 1
maxItems: 5
hideInToc: true
---

# Arc TOC — 5 Sections

---
layout: arc-toc
maxDepth: 1
maxItems: 6
hideInToc: true
---

# Arc TOC — 6 Sections

---
layout: arc-toc
maxDepth: 1
maxItems: 7
hideInToc: true
---

# Arc TOC — 7 Sections

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
    title-class="text-3xl!"
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
    <code>idle?: boolean</code> — place the heading at the standard title position.
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

# SquareThanks

Composes the complete “Thank you” artwork and optionally animates its elements.

<div class="relative mt-6 h-72 overflow-hidden rounded-xl bg-slate-900/70">
  <SquareThanks :animation="false" />
</div>

<div class="mt-5 text-sm">
  <code>animation?: boolean</code> — enables the entrance sequence; defaults to <code>true</code>.
</div>

```vue
<SquareThanks :animation="false" />
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
import { mergeUno } from './utils/merge-uno'

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
import { createUnoClassMerger } from './utils/merge-uno'

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

# HexagonTriad

3-part interlocking hexagon diagram for comparing key pillars, concepts, or steps.

<div class="mt-4 flex items-center justify-center rounded-xl bg-slate-900/40 p-4">
  <HexagonTriad>
    <HexagonTriadCallout>
      <HexagonTriadBadge>01</HexagonTriadBadge>
      <HexagonTriadHeading>Performance</HexagonTriadHeading>
      <HexagonTriadContent>Fast builds, instant feedback, and zero-overhead runtime.</HexagonTriadContent>
    </HexagonTriadCallout>
    <HexagonTriadCallout>
      <HexagonTriadBadge>02</HexagonTriadBadge>
      <HexagonTriadHeading>Reliability</HexagonTriadHeading>
      <HexagonTriadContent>Strict type safety paired with deterministic test suites.</HexagonTriadContent>
    </HexagonTriadCallout>
    <HexagonTriadCallout>
      <HexagonTriadBadge>03</HexagonTriadBadge>
      <HexagonTriadHeading>Scalability</HexagonTriadHeading>
      <HexagonTriadContent>Seamless growth across packages, tools, and workflows.</HexagonTriadContent>
    </HexagonTriadCallout>
  </HexagonTriad>
</div>

<div class="mt-4 text-sm">
  <code>animation?: boolean</code> · <code>startDelay?: number</code> · <code>active?: boolean</code>
</div>

```vue
<HexagonTriad>
  <HexagonTriadCallout>
    <HexagonTriadBadge>01</HexagonTriadBadge>
    <HexagonTriadHeading>Performance</HexagonTriadHeading>
    <HexagonTriadContent>Fast builds, instant feedback, and zero-overhead runtime.</HexagonTriadContent>
  </HexagonTriadCallout>
  <HexagonTriadCallout>
    <HexagonTriadBadge>02</HexagonTriadBadge>
    <HexagonTriadHeading>Reliability</HexagonTriadHeading>
    <HexagonTriadContent>Strict type safety paired with deterministic test suites.</HexagonTriadContent>
  </HexagonTriadCallout>
  <HexagonTriadCallout>
    <HexagonTriadBadge>03</HexagonTriadBadge>
    <HexagonTriadHeading>Scalability</HexagonTriadHeading>
    <HexagonTriadContent>Seamless growth across packages, tools, and workflows.</HexagonTriadContent>
  </HexagonTriadCallout>
</HexagonTriad>
```

---

# HorizontalCard

Card component with step ribbon badge, chamfered corner with organic accent blob, and optional icon.

<div class="mt-8 flex items-center justify-center gap-8">
  <HorizontalCard
    step="01"
    title="Discovery"
    icon="default"
  >
    <HorizontalCardContent>Explore the problem and define user needs.</HorizontalCardContent>
  </HorizontalCard>
  <HorizontalCard
    step="02"
    title="Delivery"
    color="#2563eb"
  >
    <HorizontalCardContent>Ship a focused solution and learn from feedback.</HorizontalCardContent>
  </HorizontalCard>
</div>

---

# VerticalCard

Vertical card component with step ribbon badge, top-right diagonal stripes, organic bottom-left accent blob, and optional icon.

<div class="mt-4 flex items-center justify-center gap-8 scale-85">
  <VerticalCard
    step="01"
    icon="default"
    variant="outside"
  >
    <template #title>Outside Badge</template>
    <VerticalCardContent>
      Default 'outside' variant showing the ribbon step badge anchored to the outer left border.
    </VerticalCardContent>
  </VerticalCard>
  <VerticalCard
    variant="none"
    color="#e76832"
    text-color="var(--alpha-foreground-primary)"
    :dots="false"
  >
    <template #title>Sự cố có thể lan rộng</template>
    <VerticalCardContent>
      Một lỗ hổng trong CSDL có thể dẫn đến việc dữ liệu của hàng loạt người dùng bị rò rỉ hoặc truy cập trái phép cùng lúc.
    </VerticalCardContent>
  </VerticalCard>
  <VerticalCard
    step="03"
    color="#2563eb"
  >
    <template #title>Clean Layout</template>
    <VerticalCardContent>
      When an icon is omitted, the vertical card body automatically adapts to provide a balanced, spacious text layout.
    </VerticalCardContent>
  </VerticalCard>
</div>

---

# RectangleOrbitTetrad

4-part circular hub infographic with concentric quadrant blocks, optional icons, and symmetrical callouts.

<div class="mt-4 flex items-center justify-center">
  <RectangleOrbitTetrad>
    <template #center>
      <RectangleOrbitTetradCenter title="Four Pillars">
        <template #content>System Design</template>
      </RectangleOrbitTetradCenter>
    </template>
    <RectangleOrbitTetradCallout>
      <RectangleOrbitTetradHeading>Strategy</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Set clear goals and a measurable roadmap.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout>
      <RectangleOrbitTetradHeading>Execution</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Build in small steps with fast feedback.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout>
      <RectangleOrbitTetradHeading>Security</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Protect data throughout the system lifecycle.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout>
      <RectangleOrbitTetradHeading>Scale</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Grow capacity as demand and usage increase.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
  </RectangleOrbitTetrad>
</div>

<div class="mt-2 text-sm">
  <code>animation?: boolean</code> · <code>autoScale?: boolean</code>
</div>

```vue
<RectangleOrbitTetrad>
  <template #center>
    <RectangleOrbitTetradCenter title="4 Parts">
      <template #content>Infographics</template>
    </RectangleOrbitTetradCenter>
  </template>

  <RectangleOrbitTetradCallout>
      <RectangleOrbitTetradHeading>Strategy</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Set clear goals and a measurable roadmap.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout>
      <RectangleOrbitTetradHeading>Execution</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Build in small steps with fast feedback.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout>
      <RectangleOrbitTetradHeading>Security</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Protect data throughout the system lifecycle.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout>
      <RectangleOrbitTetradHeading>Scale</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Grow capacity as demand and usage increase.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
</RectangleOrbitTetrad>
```

---

# RectangleOrbitTetrad — Optional Icons & Custom Slots

Icons inside each quadrant square are optional. Pass `:icon="false"` to `<RectangleOrbitTetradCallout>` to omit them.

<div class="mt-4 flex items-center justify-center">
  <RectangleOrbitTetrad
  >
  <template #center>
    <RectangleOrbitTetradCenter title="Clean">
      <template #content>Without Icons</template>
    </RectangleOrbitTetradCenter>
  </template>

    <RectangleOrbitTetradCallout :icon="false">
      <RectangleOrbitTetradHeading>Strategy</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Clear roadmap and measurable quarterly milestones.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout :icon="false">
      <RectangleOrbitTetradHeading>Execution</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Fast feedback loops and automated deployment pipelines.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout :icon="false">
      <RectangleOrbitTetradHeading>Security</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>End-to-end encryption and continuous posture checks.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout :icon="false">
      <RectangleOrbitTetradHeading>Scale</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Distributed edge caching with zero-downtime rollouts.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
  </RectangleOrbitTetrad>
</div>

```vue
<RectangleOrbitTetrad
>
  <template #center>
    <RectangleOrbitTetradCenter title="Clean">
      <template #content>Without Icons</template>
    </RectangleOrbitTetradCenter>
  </template>

  <RectangleOrbitTetradCallout :icon="false">
    <RectangleOrbitTetradHeading>Strategy</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Clear roadmap and measurable quarterly milestones.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout :icon="false">
    <RectangleOrbitTetradHeading>Execution</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Fast feedback loops and automated deployment pipelines.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout :icon="false">
    <RectangleOrbitTetradHeading>Security</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>End-to-end encryption and continuous posture checks.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout :icon="false">
    <RectangleOrbitTetradHeading>Scale</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Distributed edge caching with zero-downtime rollouts.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
</RectangleOrbitTetrad>
```

---

# RectangleOrbitTetrad — Composition & Icons

Configure custom colors and UnoCSS icons directly on `<RectangleOrbitTetradCallout color="..." icon="...">`.

<div class="mt-4 flex items-center justify-center">
  <RectangleOrbitTetrad>
  <template #center>
    <RectangleOrbitTetradCenter title="4 mối đe dọa DBMS">
    </RectangleOrbitTetradCenter>
  </template>

    <RectangleOrbitTetradCallout color="#f29e4b" icon="i-lucide-terminal-square">
      <RectangleOrbitTetradHeading>SQL Injection · C/I</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Input độc hại thay đổi câu SQL, dẫn đến đọc hoặc sửa dữ liệu trái phép.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout color="#a4cb81" icon="i-lucide-user-round-search">
      <RectangleOrbitTetradHeading>Insider Threat · C</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Người nội bộ lạm dụng quyền hợp lệ để xem dữ liệu ngoài nhu cầu công việc.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout color="#62b6a8" icon="i-lucide-key-round">
      <RectangleOrbitTetradHeading>Privilege Abuse · C/I</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Quyền được cấp rộng hơn nhiệm vụ, làm tăng thiệt hại khi xảy ra sai sót hoặc chiếm đoạt.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
    <RectangleOrbitTetradCallout color="#e9717a" icon="i-lucide-file-lock-2">
      <RectangleOrbitTetradHeading>Ransomware · I/A</RectangleOrbitTetradHeading>
      <RectangleOrbitTetradContent>Dữ liệu bị mã hóa hoặc phá hoại, khiến dịch vụ không thể tiếp tục hoạt động.</RectangleOrbitTetradContent>
    </RectangleOrbitTetradCallout>
  </RectangleOrbitTetrad>
</div>

```vue
<RectangleOrbitTetrad>
  <template #center>
    <RectangleOrbitTetradCenter title="4 mối đe dọa DBMS">
    </RectangleOrbitTetradCenter>
  </template>

  <RectangleOrbitTetradCallout color="#f29e4b" icon="i-lucide-terminal-square">
    <RectangleOrbitTetradHeading>SQL Injection · C/I</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Input độc hại thay đổi câu SQL, dẫn đến đọc hoặc sửa dữ liệu trái phép.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout color="#a4cb81" icon="i-lucide-user-round-search">
    <RectangleOrbitTetradHeading>Insider Threat · C</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Người nội bộ lạm dụng quyền hợp lệ để xem dữ liệu ngoài nhu cầu công việc.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout color="#62b6a8" icon="i-lucide-key-round">
    <RectangleOrbitTetradHeading>Privilege Abuse · C/I</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Quyền được cấp rộng hơn nhiệm vụ, làm tăng thiệt hại khi xảy ra sai sót hoặc chiếm đoạt.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
  <RectangleOrbitTetradCallout color="#e9717a" icon="i-lucide-file-lock-2">
    <RectangleOrbitTetradHeading>Ransomware · I/A</RectangleOrbitTetradHeading>
    <RectangleOrbitTetradContent>Dữ liệu bị mã hóa hoặc phá hoại, khiến dịch vụ không thể tiếp tục hoạt động.</RectangleOrbitTetradContent>
  </RectangleOrbitTetradCallout>
</RectangleOrbitTetrad>
```

---

# ChevronCard

Horizontal process step card with an indented chevron badge on the left and rounded body on the right.

<div class="mt-8 flex flex-col items-center justify-center gap-4">
  <ChevronCard step="01">
    <template #title>Discovery & Research</template>
    <ChevronCardContent>
      Understand user needs, constraints, and the opportunity to improve.
    </ChevronCardContent>
  </ChevronCard>
</div>

```vue
<ChevronCard step="01" color="#f59e0b">
  <template #title>Discovery & Research</template>
  <ChevronCardContent>
    Understand user needs, constraints, and the opportunity to improve.
  </ChevronCardContent>
</ChevronCard>
```

---

# ChevronCard — Process Flow

Stack multiple cards to build sequential process steps with custom colors and slots.

<div class="mt-4 grid grid-cols-2 gap-4">
  <ChevronCard step="01" color="#f59e0b">
    <template #title>Discovery & Research</template>
    <ChevronCardContent>
      Analyze requirements, user journeys, and core architectural assumptions.
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard step="02" color="#10b981">
    <template #title>Design & Prototype</template>
    <ChevronCardContent>
      Build high-fidelity wireframes, interactive UI widgets, and API contracts.
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard step="03" color="#06b6d4">
    <template #title>Build & Verification</template>
    <ChevronCardContent>
      Implement type-safe components with automated testing and lint enforcement.
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard step="04" color="#f43f5e">
    <template #title>Deploy & Scale</template>
    <ChevronCardContent>
      Roll out continuous delivery pipelines with distributed edge monitoring.
    </ChevronCardContent>
  </ChevronCard>
</div>

---

# ArrowTriad

Three-way curved arrow infographic with concentric dashed guide lines and three content blocks.

<ArrowTriad>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Discover</ArrowTriadHeading>
    <ArrowTriadContent>
      Identify the user need and agree on a clear problem statement.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Build</ArrowTriadHeading>
    <ArrowTriadContent>
      Turn the plan into a focused solution and test it with users.
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Learn</ArrowTriadHeading>
    <ArrowTriadContent>
      Review the results and improve the next iteration.
    </ArrowTriadContent>
  </ArrowTriadCallout>
</ArrowTriad>

---

# GearTriad

Three-way mechanical cogwheel diagram with 3D folded petals, central floating hub, and perimeter callouts.

<GearTriad>
  <GearTriadCallout>
    <GearTriadHeading>Option 1</GearTriadHeading>
    <GearTriadContent>
      Define the problem and formulate testable questions.
    </GearTriadContent>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Option 2</GearTriadHeading>
    <GearTriadContent>
      Run controlled experiments and collect reliable measurements.
    </GearTriadContent>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Option 3</GearTriadHeading>
    <GearTriadContent>
      Review the findings and publish reproducible results.
    </GearTriadContent>
  </GearTriadCallout>
</GearTriad>

---

# ArcArrowProcessArrow (Single Arrow)

Standalone chevron arrow component matching the design reference.

<div class="w-full flex items-center justify-center py-12">
  <ArcArrowProcessArrow :width="380" :height="215" color="#6fa3b5" gradient-end="#8cb8c8" />
</div>

---

# ArcArrowProcess (4 Arrows)

U-shaped curved process flow with interlocking chevron arrows and outline callout icons.

<ArcArrowProcess :count="4">
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Discover</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Gather user needs and define the problem.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Plan</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Set a direction, scope, and delivery milestones.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Build</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Implement the solution and verify its behavior.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Deliver</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Ship the result and learn from real usage.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
</ArcArrowProcess>

---

# ArcArrowProcess (3 Arrows)

Symmetrical 3-stage U-curve flow with descending, trough, and ascending interlocking chevron arrows.

<ArcArrowProcess :count="3">
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Discovery & Plan</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Analyze domain architecture and specify component contracts with full type safety.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Implementation</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Construct parametric SVG geometry with exact notch and arrowhead interlocking.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Verification & Ship</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Execute comprehensive Vitest suites, Biome enforcement, and Slidev production build.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
</ArcArrowProcess>

---

# ArcArrowProcess (2 Arrows)

Dynamic arrow count automatically matches the 2 provided text blocks.

<ArcArrowProcess>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Discovery & Strategy</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Analyze system architecture, formulate requirements, and define execution blueprint.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Implementation & Delivery</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Execute precision implementations with strict test verification and ship to production.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
</ArcArrowProcess>

---

# ArcComparison

Opposing curved comparison diagram with edge project hubs, numbered arc nodes, and central versus divider.

<ArcComparison />

---

# ArcComparison (Compound Structure)

Customizable opposing comparison using `ArcComparisonLeft`, `ArcComparisonRight`, and composed `ArcComparisonOrbit` callouts.

<ArcComparison>
  <ArcComparisonLeft color="#ea580c">
    <template #title>Traditional<br />Monolith</template>

      <ArcComparisonOrbit>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Coupled State</ArcComparisonHeading>
        <ArcComparisonContent>
          Shared database schemas create cross-team deployment bottlenecks.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Vertical Scale</ArcComparisonHeading>
        <ArcComparisonContent>
          Requires upgrading single instances with exponential cost increases.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Single Failure</ArcComparisonHeading>
        <ArcComparisonContent>
          Unchecked memory leaks or crashes can bring down the entire system.
        </ArcComparisonContent>
      </ArcComparisonOrbit>

  </ArcComparisonLeft>

  <ArcComparisonRight color="#0284c7">
    <template #title>Distributed<br />Microservices</template>

      <ArcComparisonOrbit>
        <ArcComparisonBadge>01</ArcComparisonBadge>
        <ArcComparisonHeading>Bounded Context</ArcComparisonHeading>
        <ArcComparisonContent>
          Autonomous services communicate over defined asynchronous events.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>02</ArcComparisonBadge>
        <ArcComparisonHeading>Elastic Scale</ArcComparisonHeading>
        <ArcComparisonContent>
          Horizontal autoscaling responds dynamically to spike traffic demand.
        </ArcComparisonContent>
      </ArcComparisonOrbit>
      <ArcComparisonOrbit>
        <ArcComparisonBadge>03</ArcComparisonBadge>
        <ArcComparisonHeading>Isolated Faults</ArcComparisonHeading>
        <ArcComparisonContent>
          Failures remain localized without cascading across service domains.
        </ArcComparisonContent>
      </ArcComparisonOrbit>

  </ArcComparisonRight>
</ArcComparison>

---

# ArcComparison (4 Points)

Parametric 4-criteria layout using `:count="4"`.

<ArcComparison :count="4" />

---

# ArcComparison (Layout Mode)

Scaffold view displaying only central divider line, edge hubs, and versus circle with `as="layout"`.

<ArcComparison as="layout" />

---

# TableComparison (Mockup Default)

Multi-column comparison matrix with distinct column themes and row labels.

<TableComparison />

---

# TableComparison (Compound Structure)

Customizable multi-criteria comparison matrix using `TableComparisonColumns`, `TableComparisonColumn`, `TableComparisonRows`, `TableComparisonRow`, and `TableComparisonCell`.

<TableComparison>
  <TableComparisonColumns>
    <TableComparisonColumn color="#ff0000">
      Column 1
    </TableComparisonColumn>
    <TableComparisonColumn color="#00ff00">
      Column 2
    </TableComparisonColumn>
    <TableComparisonColumn color="#0000ff">
      Column 3
    </TableComparisonColumn>
  </TableComparisonColumns>
  <TableComparisonRows>
    <TableComparisonRow>
      <template #heading>Row 1</template>
      <TableComparisonCell>Row 1, Cell 1</TableComparisonCell>
      <TableComparisonCell>Row 1, Cell 2</TableComparisonCell>
      <TableComparisonCell>Row 1, Cell 3</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow>
      <template #heading>Row 2</template>
      <TableComparisonCell>Row 2, Cell 1</TableComparisonCell>
      <TableComparisonCell>Row 2, Cell 2</TableComparisonCell>
      <TableComparisonCell>Row 2, Cell 3</TableComparisonCell>
    </TableComparisonRow>
  </TableComparisonRows>
</TableComparison>

---

# CircularPyramid (Compound Stacks)

3D circular tiered pyramid with active top layer, frosted glass blurred default layers, title pills, and content cards.

<div class="w-full flex items-center justify-center py-4">
  <CircularPyramid>
    <CircularPyramidStack>
      <CircularPyramidStackHeading>
        01 Strategy
      </CircularPyramidStackHeading>
      <CircularPyramidStackContent>
        Define clear technical north stars, design systems, and cross-team alignment.
      </CircularPyramidStackContent>
    </CircularPyramidStack>
    <CircularPyramidStack>
      <CircularPyramidStackHeading>
        02 Architecture
      </CircularPyramidStackHeading>
      <CircularPyramidStackContent>
        Establish domain boundaries, type safety contracts, and scalable infrastructure.
      </CircularPyramidStackContent>
    </CircularPyramidStack>
    <CircularPyramidStack>
      <CircularPyramidStackHeading>
        03 Implementation
      </CircularPyramidStackHeading>
      <CircularPyramidStackContent>
        Build high-performance components with smooth motion and responsive layout.
      </CircularPyramidStackContent>
    </CircularPyramidStack>
    <CircularPyramidStack>
      <CircularPyramidStackHeading>
        04 Verification
      </CircularPyramidStackHeading>
      <CircularPyramidStackContent>
        Validate behavior with rigorous unit suites, formatting, and live slide builds.
      </CircularPyramidStackContent>
    </CircularPyramidStack>
  </CircularPyramid>
</div>

---

# CircularPyramid (6 Layers & Custom Color)

Supports 1 to 6 circular layers with interactive layer activation and custom theme colors.

<div class="w-full flex items-center justify-center py-4">
  <CircularPyramid :count="6" :active-index="0" color="#6366f1" />
</div>

---

# SquarePyramid (Compound Stacks)

3D isometric square tiered pyramid with translucent glassmorphic slabs, inner highlight plates, title pills, and content cards.

<div class="w-full flex items-center justify-center py-4">
  <SquarePyramid>
    <SquarePyramidStack>
      <SquarePyramidStackHeading>
        01 Strategy
      </SquarePyramidStackHeading>
      <SquarePyramidStackContent>
        Define clear technical north stars, design systems, and cross-team alignment.
      </SquarePyramidStackContent>
    </SquarePyramidStack>
    <SquarePyramidStack>
      <SquarePyramidStackHeading>
        02 Architecture
      </SquarePyramidStackHeading>
      <SquarePyramidStackContent>
        Establish domain boundaries, type safety contracts, and scalable infrastructure.
      </SquarePyramidStackContent>
    </SquarePyramidStack>
    <SquarePyramidStack>
      <SquarePyramidStackHeading>
        03 Implementation
      </SquarePyramidStackHeading>
      <SquarePyramidStackContent>
        Build high-performance components with smooth motion and responsive layout.
      </SquarePyramidStackContent>
    </SquarePyramidStack>
    <SquarePyramidStack>
      <SquarePyramidStackHeading>
        04 Verification
      </SquarePyramidStackHeading>
      <SquarePyramidStackContent>
        Validate behavior with rigorous unit suites, formatting, and live slide builds.
      </SquarePyramidStackContent>
    </SquarePyramidStack>
  </SquarePyramid>
</div>

---

# SquarePyramid (5 Slabs & Custom Palette)

Supports 1 to 6 isometric square slabs with interactive layer activation matching modern layered slab architectures.

<div class="w-full flex items-center justify-center py-4">
  <SquarePyramid :count="5" :active-index="0" />
</div>

---

# ArcDefenseInDepth (Compound Defense-in-Depth)

Concentric semicircular security defense-in-depth shield layers with customizable titles and radial control parts.

<div class="w-full flex items-center justify-center">
  <ArcDefenseInDepth>
    <ArcDefenseInDepthLayer>
      <ArcDefenseInDepthLayerHeading>Physical<br />controls</ArcDefenseInDepthLayerHeading>
      <ArcDefenseInDepthLayerPart>Access to servers</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerPart>Infrastructure</ArcDefenseInDepthLayerPart>
    </ArcDefenseInDepthLayer>
    <ArcDefenseInDepthLayer>
      <ArcDefenseInDepthLayerHeading>Administrative<br />controls</ArcDefenseInDepthLayerHeading>
      <ArcDefenseInDepthLayerPart>Data-sharing<br />policy</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerPart>Approved destinations</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerPart>Staff procedures</ArcDefenseInDepthLayerPart>
    </ArcDefenseInDepthLayer>
    <ArcDefenseInDepthLayer>
      <ArcDefenseInDepthLayerHeading>Technical<br />controls</ArcDefenseInDepthLayerHeading>
      <ArcDefenseInDepthLayerPart :span="22">Authentication</ArcDefenseInDepthLayerPart>
      <ArcDefenseInDepthLayerSector :span="46" rotate="tangent">
        <ArcDefenseInDepthLayerPart position="top">Access control</ArcDefenseInDepthLayerPart>
        <ArcDefenseInDepthLayerPart position="bottom">Encryption</ArcDefenseInDepthLayerPart>
      </ArcDefenseInDepthLayerSector>
      <ArcDefenseInDepthLayerSector>
        <ArcDefenseInDepthLayerPart position="top">DDM</ArcDefenseInDepthLayerPart>
        <ArcDefenseInDepthLayerPart position="bottom">DLP</ArcDefenseInDepthLayerPart>
      </ArcDefenseInDepthLayerSector>
      <ArcDefenseInDepthLayerPart>Audit</ArcDefenseInDepthLayerPart>
    </ArcDefenseInDepthLayer>
  </ArcDefenseInDepth>
</div>

---
layout: thanks
---

<!-- The thanks layout renders the animated SquareThanks composition. -->
