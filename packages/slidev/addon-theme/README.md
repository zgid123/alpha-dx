# @alphacifer/slidev-addon-theme

Shared Slidev components and layouts for Alpha presentations.

For Alpha's light-only academic styling, combine this addon with
`@alphacifer/slidev-theme-academic`.

## Installation

```bash
pnpm add -D @alphacifer/slidev-addon-theme
```

```yaml
---
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

## Core

- Components: `Date`, `QnA`, `Quote`, `ReflectedTitle`, `Speaker`
- Layouts: `arc-toc`, `bg-center`, `table-of-contents`

## Shifting heading

- Component: `TransitionHeading`
- Layout: `shifting-intro`
- Utilities: `mergeUno`, `createUnoClassMerger`

## Thanks

- Components: `ThanksContent`, `ThanksOutlineSquare`, `ThanksSquare`
- Layout: `thanks`

## Hex triad

- Components: `HexTriad`, `HexTriadCallout`, `HexTriadBadge`, `HexTriadHeading`, `HexTriadContent`

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

## Horiz card

- Components: `HorizCard`, `HorizCardBadge`, `HorizCardHeading`, `HorizCardContent`, `HorizCardIcon`

```vue
<!-- Self-contained props usage with optional icon -->
<HorizCard
  step="01"
  title="Lorem Ipsum"
  description="Lorem ipsum dolor sit amet, nibh est. A magna maecenas, quam magna nec quis."
/>

<!-- With custom icon and color -->
<HorizCard
  step="02"
  title="Discovery"
  description="Explore ideas and prototype user experiences."
  color="#2563eb"
>
  <template #icon>
    <div class="i-carbon-search text-4xl" />
  </template>
</HorizCard>
```

## Arc compare

- Components: `ArcCompare`, `ArcCompareLeft`, `ArcCompareRight`, `ArcCompareTitle`, `ArcCompareContents`, `ArcCompareCallout`, `ArcCompareBadge`, `ArcCompareHeading`, `ArcCompareContent`

```vue
<!-- Self-contained mockup default (3 points) -->

<!-- 4 points mode -->
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
```

## Preview

```bash
pnpm --filter @alphacifer/slidev-addon-theme dev
```

The default preview deck is defined in `slides.md` and loads this package
locally as a Slidev addon with the Seriph theme.

Run the same preview content with the sibling Alpha Academic theme:

```bash
pnpm --filter @alphacifer/slidev-addon-theme dev:academic
```

The academic preview deck is defined in `academic-slides.md`.

The preview deck includes rendered arc TOC examples for every supported item
count from one through seven.

Build the preview without opening a browser:

```bash
pnpm --filter @alphacifer/slidev-addon-theme preview:build
```
