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
layout: table-of-contents
maxDepth: 1
hideInToc: true
---

# Table Of Contents

Lists every level-one heading in the deck. Set `maxDepth` to include deeper headings.

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

# HexTriad

3-part interlocking hexagon diagram for comparing key pillars, concepts, or steps.

<div class="mt-4 flex items-center justify-center rounded-xl bg-slate-900/40 p-4">
  <HexTriad>
    <HexTriadCallout>
      <HexTriadBadge>01</HexTriadBadge>
      <HexTriadHeading>Performance</HexTriadHeading>
      <HexTriadContent>Fast builds, instant feedback, and zero-overhead runtime.</HexTriadContent>
    </HexTriadCallout>
    <HexTriadCallout>
      <HexTriadBadge>02</HexTriadBadge>
      <HexTriadHeading>Reliability</HexTriadHeading>
      <HexTriadContent>Strict type safety paired with deterministic test suites.</HexTriadContent>
    </HexTriadCallout>
    <HexTriadCallout>
      <HexTriadBadge>03</HexTriadBadge>
      <HexTriadHeading>Scalability</HexTriadHeading>
      <HexTriadContent>Seamless growth across packages, tools, and workflows.</HexTriadContent>
    </HexTriadCallout>
  </HexTriad>
</div>

<div class="mt-4 text-sm">
  <code>items?: IHexTriadItem[]</code> · <code>title?: string</code> · <code>subtitle?: string</code>
</div>

```vue
<HexTriad>
  <HexTriadCallout>
    <HexTriadBadge>01</HexTriadBadge>
    <HexTriadHeading>Performance</HexTriadHeading>
    <HexTriadContent>Fast builds, instant feedback, and zero-overhead runtime.</HexTriadContent>
  </HexTriadCallout>
  <HexTriadCallout>
    <HexTriadBadge>02</HexTriadBadge>
    <HexTriadHeading>Reliability</HexTriadHeading>
    <HexTriadContent>Strict type safety paired with deterministic test suites.</HexTriadContent>
  </HexTriadCallout>
  <HexTriadCallout>
    <HexTriadBadge>03</HexTriadBadge>
    <HexTriadHeading>Scalability</HexTriadHeading>
    <HexTriadContent>Seamless growth across packages, tools, and workflows.</HexTriadContent>
  </HexTriadCallout>
</HexTriad>
```

---

# HorizCard

Card component with step ribbon badge, chamfered corner with organic accent blob, and optional icon.

<div class="mt-8 flex items-center justify-center gap-8">
  <HorizCard
    step="01"
    title="Lorem Ipsum"
    description="Lorem ipsum dolor sit amet, nibh est. A magna maecenas, quam magna nec quis, lorem nunc. Suspendisse viverra sodales mauris, cras pharetra proin egestas."
    icon="default"
  />
  <HorizCard
    step="02"
    title="Clean Layout"
    description="When an icon is omitted, the card body automatically adapts to provide a balanced, spacious text layout."
    color="#2563eb"
  />
</div>

---

# VertCard

Vertical card component with step ribbon badge, top-right diagonal stripes, organic bottom-left accent blob, and optional icon.

<div class="mt-4 flex items-center justify-center gap-8 scale-85">
  <VertCard
    step="01"
    icon="default"
    variant="outside"
  >
    <VertCardTitle>Outside Badge</VertCardTitle>
    <VertCardContent>
      Default 'outside' variant showing the ribbon step badge anchored to the outer left border.
    </VertCardContent>
  </VertCard>
  <VertCard
    variant="none"
    color="#e76832"
    text-color="var(--alpha-academic-primary)"
    :dots="false"
  >
    <VertCardTitle>Sự cố có thể lan rộng</VertCardTitle>
    <VertCardContent>
      Một lỗ hổng trong CSDL có thể dẫn đến việc dữ liệu của hàng loạt người dùng bị rò rỉ hoặc truy cập trái phép cùng lúc.
    </VertCardContent>
  </VertCard>
  <VertCard
    step="03"
    color="#2563eb"
  >
    <VertCardTitle>Clean Layout</VertCardTitle>
    <VertCardContent>
      When an icon is omitted, the vertical card body automatically adapts to provide a balanced, spacious text layout.
    </VertCardContent>
  </VertCard>
</div>

---

# QuadHub

4-part circular hub infographic with concentric quadrant blocks, optional icons, and symmetrical callouts.

<div class="mt-4 flex items-center justify-center">
  <QuadHub>
    <QuadHubCallout>
      <QuadHubHeading>Add Text Here</QuadHubHeading>
      <QuadHubContent>Lorem ipsum dolor sit amet consectetuer est adipis elit. Maecenas porttitor congue massa.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout>
      <QuadHubHeading>Add Text Here</QuadHubHeading>
      <QuadHubContent>Lorem ipsum dolor sit amet consectetuer est adipis elit. Maecenas porttitor congue massa.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout>
      <QuadHubHeading>Add Text Here</QuadHubHeading>
      <QuadHubContent>Lorem ipsum dolor sit amet consectetuer est adipis elit. Maecenas porttitor congue massa.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout>
      <QuadHubHeading>Add Text Here</QuadHubHeading>
      <QuadHubContent>Lorem ipsum dolor sit amet consectetuer est adipis elit. Maecenas porttitor congue massa.</QuadHubContent>
    </QuadHubCallout>
  </QuadHub>
</div>

<div class="mt-2 text-sm">
  <code>title?: string</code> · <code>subtitle?: string</code> · <code>height?: number | string</code> · <code>animation?: boolean</code>
</div>

```vue
<QuadHub title="4 Parts" subtitle="Infographics">
  <QuadHubCallout>
    <QuadHubHeading>Add Text Here</QuadHubHeading>
    <QuadHubContent>Lorem ipsum dolor sit amet consectetuer est adipis elit. Maecenas porttitor congue massa.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout>
    <QuadHubHeading>Add Text Here</QuadHubHeading>
    <QuadHubContent>Lorem ipsum dolor sit amet consectetuer est adipis elit. Maecenas porttitor congue massa.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout>
    <QuadHubHeading>Add Text Here</QuadHubHeading>
    <QuadHubContent>Lorem ipsum dolor sit amet consectetuer est adipis elit. Maecenas porttitor congue massa.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout>
    <QuadHubHeading>Add Text Here</QuadHubHeading>
    <QuadHubContent>Lorem ipsum dolor sit amet consectetuer est adipis elit. Maecenas porttitor congue massa.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>
```

---

# QuadHub — Optional Icons & Custom Slots

Icons inside each quadrant square are optional. Pass `:icon="false"` to `<QuadHubCallout>` to omit them.

<div class="mt-4 flex items-center justify-center">
  <QuadHub
    title="Clean"
    subtitle="Without Icons"
  >
    <QuadHubCallout :icon="false">
      <QuadHubHeading>Strategy</QuadHubHeading>
      <QuadHubContent>Clear roadmap and measurable quarterly milestones.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout :icon="false">
      <QuadHubHeading>Execution</QuadHubHeading>
      <QuadHubContent>Fast feedback loops and automated deployment pipelines.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout :icon="false">
      <QuadHubHeading>Security</QuadHubHeading>
      <QuadHubContent>End-to-end encryption and continuous posture checks.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout :icon="false">
      <QuadHubHeading>Scale</QuadHubHeading>
      <QuadHubContent>Distributed edge caching with zero-downtime rollouts.</QuadHubContent>
    </QuadHubCallout>
  </QuadHub>
</div>

```vue
<QuadHub
  title="Clean"
  subtitle="Without Icons"
>
  <QuadHubCallout :icon="false">
    <QuadHubHeading>Strategy</QuadHubHeading>
    <QuadHubContent>Clear roadmap and measurable quarterly milestones.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout :icon="false">
    <QuadHubHeading>Execution</QuadHubHeading>
    <QuadHubContent>Fast feedback loops and automated deployment pipelines.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout :icon="false">
    <QuadHubHeading>Security</QuadHubHeading>
    <QuadHubContent>End-to-end encryption and continuous posture checks.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout :icon="false">
    <QuadHubHeading>Scale</QuadHubHeading>
    <QuadHubContent>Distributed edge caching with zero-downtime rollouts.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>
```

---

# QuadHub — Composition & Icons

Configure custom colors and UnoCSS icons directly on `<QuadHubCallout color="..." icon="...">`.

<div class="mt-4 flex items-center justify-center">
  <QuadHub title="4 mối đe dọa DBMS">
    <QuadHubCallout color="#f29e4b" icon="i-lucide-terminal-square">
      <QuadHubHeading>SQL Injection · C/I</QuadHubHeading>
      <QuadHubContent>Input độc hại thay đổi câu SQL, dẫn đến đọc hoặc sửa dữ liệu trái phép.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout color="#a4cb81" icon="i-lucide-user-round-search">
      <QuadHubHeading>Insider Threat · C</QuadHubHeading>
      <QuadHubContent>Người nội bộ lạm dụng quyền hợp lệ để xem dữ liệu ngoài nhu cầu công việc.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout color="#62b6a8" icon="i-lucide-key-round">
      <QuadHubHeading>Privilege Abuse · C/I</QuadHubHeading>
      <QuadHubContent>Quyền được cấp rộng hơn nhiệm vụ, làm tăng thiệt hại khi xảy ra sai sót hoặc chiếm đoạt.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout color="#e9717a" icon="i-lucide-file-lock-2">
      <QuadHubHeading>Ransomware · I/A</QuadHubHeading>
      <QuadHubContent>Dữ liệu bị mã hóa hoặc phá hoại, khiến dịch vụ không thể tiếp tục hoạt động.</QuadHubContent>
    </QuadHubCallout>
  </QuadHub>
</div>

```vue
<QuadHub title="4 mối đe dọa DBMS">
  <QuadHubCallout color="#f29e4b" icon="i-lucide-terminal-square">
    <QuadHubHeading>SQL Injection · C/I</QuadHubHeading>
    <QuadHubContent>Input độc hại thay đổi câu SQL, dẫn đến đọc hoặc sửa dữ liệu trái phép.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#a4cb81" icon="i-lucide-user-round-search">
    <QuadHubHeading>Insider Threat · C</QuadHubHeading>
    <QuadHubContent>Người nội bộ lạm dụng quyền hợp lệ để xem dữ liệu ngoài nhu cầu công việc.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#62b6a8" icon="i-lucide-key-round">
    <QuadHubHeading>Privilege Abuse · C/I</QuadHubHeading>
    <QuadHubContent>Quyền được cấp rộng hơn nhiệm vụ, làm tăng thiệt hại khi xảy ra sai sót hoặc chiếm đoạt.</QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#e9717a" icon="i-lucide-file-lock-2">
    <QuadHubHeading>Ransomware · I/A</QuadHubHeading>
    <QuadHubContent>Dữ liệu bị mã hóa hoặc phá hoại, khiến dịch vụ không thể tiếp tục hoạt động.</QuadHubContent>
  </QuadHubCallout>
</QuadHub>
```

---

# ChevronCard

Horizontal process step card with an indented chevron badge on the left and rounded body on the right.

<div class="mt-8 flex flex-col items-center justify-center gap-4">
  <ChevronCard step="01">
    <ChevronCardHeading>Placeholder Text</ChevronCardHeading>
    <ChevronCardContent>
      This is a sample text. You simply add your own text and description here. This text is fully editable.
    </ChevronCardContent>
  </ChevronCard>
</div>

```vue
<ChevronCard step="01" color="#f59e0b">
  <ChevronCardHeading>Placeholder Text</ChevronCardHeading>
  <ChevronCardContent>
    This is a sample text. You simply add your own text and description here. This text is fully editable.
  </ChevronCardContent>
</ChevronCard>
```

---

# ChevronCard — Process Flow

Stack multiple cards to build sequential process steps with custom colors and slots.

<div class="mt-4 grid grid-cols-2 gap-4">
  <ChevronCard step="01" color="#f59e0b">
    <ChevronCardHeading>Discovery & Research</ChevronCardHeading>
    <ChevronCardContent>
      Analyze requirements, user journeys, and core architectural assumptions.
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard step="02" color="#10b981">
    <ChevronCardHeading>Design & Prototype</ChevronCardHeading>
    <ChevronCardContent>
      Build high-fidelity wireframes, interactive UI widgets, and API contracts.
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard step="03" color="#06b6d4">
    <ChevronCardHeading>Build & Verification</ChevronCardHeading>
    <ChevronCardContent>
      Implement type-safe components with automated testing and lint enforcement.
    </ChevronCardContent>
  </ChevronCard>
  <ChevronCard step="04" color="#f43f5e">
    <ChevronCardHeading>Deploy & Scale</ChevronCardHeading>
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
    <ArrowTriadHeading>Title Text Here</ArrowTriadHeading>
    <ArrowTriadContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Title Text Here</ArrowTriadHeading>
    <ArrowTriadContent>
      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo cupidatat non proident, sunt
    </ArrowTriadContent>
  </ArrowTriadCallout>
  <ArrowTriadCallout>
    <ArrowTriadHeading>Title Text Here</ArrowTriadHeading>
    <ArrowTriadContent>
      Magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    </ArrowTriadContent>
  </ArrowTriadCallout>
</ArrowTriad>

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
    <ArcArrowProcessHeading>Heading Here</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Heading Here</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Sed do eiusmod tempor incididunt ut labore et lorem ipsum dolor sit amet, consectetur adipiscing elit,.
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Heading Here</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Tempor incididunt ut laborelorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod et .
    </ArcArrowProcessContent>
  </ArcArrowProcessCallout>
  <ArcArrowProcessCallout>
    <ArcArrowProcessHeading>Heading Here</ArcArrowProcessHeading>
    <ArcArrowProcessContent>
      Eiusmod tempor incididunt ut labore lorem ipsum dolor sit amet, cons ect etur adipiscing elit, sed .
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

# ArcCompare

Opposing curved comparison diagram with edge project hubs, numbered arc nodes, and central versus divider.

<ArcCompare />

---

# ArcCompare (Compound Structure)

Customizable opposing comparison using `ArcCompareLeft`, `ArcCompareRight`, `ArcCompareTitle`, and `ArcCompareContents`.

<ArcCompare>
  <ArcCompareLeft color="#ea580c">
    <ArcCompareTitle>Traditional<br />Monolith</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Coupled State</ArcCompareHeading>
        <ArcCompareContent>
          Shared database schemas create cross-team deployment bottlenecks.
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>02</ArcCompareBadge>
        <ArcCompareHeading>Vertical Scale</ArcCompareHeading>
        <ArcCompareContent>
          Requires upgrading single instances with exponential cost increases.
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>03</ArcCompareBadge>
        <ArcCompareHeading>Single Failure</ArcCompareHeading>
        <ArcCompareContent>
          Unchecked memory leaks or crashes can bring down the entire system.
        </ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareLeft>

  <ArcCompareRight color="#0284c7">
    <ArcCompareTitle>Distributed<br />Microservices</ArcCompareTitle>
    <ArcCompareContents>
      <ArcCompareCallout>
        <ArcCompareBadge>01</ArcCompareBadge>
        <ArcCompareHeading>Bounded Context</ArcCompareHeading>
        <ArcCompareContent>
          Autonomous services communicate over defined asynchronous events.
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>02</ArcCompareBadge>
        <ArcCompareHeading>Elastic Scale</ArcCompareHeading>
        <ArcCompareContent>
          Horizontal autoscaling responds dynamically to spike traffic demand.
        </ArcCompareContent>
      </ArcCompareCallout>
      <ArcCompareCallout>
        <ArcCompareBadge>03</ArcCompareBadge>
        <ArcCompareHeading>Isolated Faults</ArcCompareHeading>
        <ArcCompareContent>
          Failures remain localized without cascading across service domains.
        </ArcCompareContent>
      </ArcCompareCallout>
    </ArcCompareContents>
  </ArcCompareRight>
</ArcCompare>

---

# ArcCompare (4 Points)

Parametric 4-criteria layout using `:count="4"`.

<ArcCompare :count="4" />

---

# ComparisonTable (Mockup Default)

Multi-column comparison matrix with distinct column themes and row labels.

<ComparisonTable />

---

# ComparisonTable (Compound Structure)

Customizable multi-criteria comparison matrix using `ComparisonTableCols`, `ComparisonTableCol`, `ComparisonTableRows`, `ComparisonTableRow`, and `ComparisonTableCell`.

<ComparisonTable>
  <ComparisonTableCols>
    <ComparisonTableCol color="#ff0000">
      Column 1
    </ComparisonTableCol>
    <ComparisonTableCol color="#00ff00">
      Column 2
    </ComparisonTableCol>
    <ComparisonTableCol color="#0000ff">
      Column 3
    </ComparisonTableCol>
  </ComparisonTableCols>
  <ComparisonTableRows>
    <ComparisonTableRow title="Row 1">
      <ComparisonTableCell>Row 1, Cell 1</ComparisonTableCell>
      <ComparisonTableCell>Row 1, Cell 2</ComparisonTableCell>
      <ComparisonTableCell>Row 1, Cell 3</ComparisonTableCell>
    </ComparisonTableRow>
    <ComparisonTableRow title="Row 2">
      <ComparisonTableCell>Row 2, Cell 1</ComparisonTableCell>
      <ComparisonTableCell>Row 2, Cell 2</ComparisonTableCell>
      <ComparisonTableCell>Row 2, Cell 3</ComparisonTableCell>
    </ComparisonTableRow>
  </ComparisonTableRows>
</ComparisonTable>

---
layout: thanks
---

<!-- The thanks layout renders the animated ThanksContent composition. -->
