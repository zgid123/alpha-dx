# @alphacifer/slidev-addon-theme

Shared Slidev components and layouts for Alpha presentations.

For the pre-refactor inventory of all components, props, slots, layouts, and
migration-sensitive behavior, see [Component baseline](./COMPONENTS_BASELINE.md).

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

## Gear triad

- Components: `GearTriad`, `GearTriadCallout`, `GearTriadHeading`, `GearTriadDescription`, `GearTriadContents`, `GearTriadContent`, `GearTriadIcon`, `GearTriadCenter`

```vue
<GearTriad>
  <GearTriadCallout>
    <GearTriadHeading>Option 1</GearTriadHeading>
    <GearTriadDescription>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.
    </GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Option 2</GearTriadHeading>
    <GearTriadDescription>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.
    </GearTriadDescription>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Option 3</GearTriadHeading>
    <GearTriadDescription>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.
    </GearTriadDescription>
  </GearTriadCallout>
</GearTriad>
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

## Arc comparison

- Components: `ArcComparison`, `ArcComparisonLeft`, `ArcComparisonRight`, `ArcComparisonTitle`, `ArcComparisonContents`, `ArcComparisonOrbit`, `ArcComparisonBadge`, `ArcComparisonHeading`, `ArcComparisonContent`

```vue
<!-- Self-contained mockup default (3 points) -->

<!-- 4 points mode -->
<ArcComparison>
  <ArcComparisonLeft color="#ea580c">
    <ArcComparisonTitle>Traditional<br />Monolith</ArcComparisonTitle>
    <ArcComparisonContents>
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
    </ArcComparisonContents>
  </ArcComparisonLeft>

  <ArcComparisonRight color="#0284c7">
    <ArcComparisonTitle>Distributed<br />Microservices</ArcComparisonTitle>
    <ArcComparisonContents>
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
    </ArcComparisonContents>
  </ArcComparisonRight>
</ArcComparison>
```

## Table comparison

- Components: `TableComparison`, `TableComparisonCols`, `TableComparisonCol`, `TableComparisonRows`, `TableComparisonRow`, `TableComparisonCell`

```vue
<!-- Self-contained mockup default (5 columns x 6 rows) -->
<TableComparison />

<!-- Custom compound comparison structure -->
<TableComparison>
  <TableComparisonCols>
    <TableComparisonCol color="#ff0000">
      Column 1
    </TableComparisonCol>
    <TableComparisonCol color="#00ff00">
      Column 2
    </TableComparisonCol>
    <TableComparisonCol color="#0000ff">
      Column 3
    </TableComparisonCol>
  </TableComparisonCols>
  <TableComparisonRows>
    <TableComparisonRow title="Row 1">
      <TableComparisonCell>Row 1, Cell 1</TableComparisonCell>
      <TableComparisonCell>Row 1, Cell 2</TableComparisonCell>
      <TableComparisonCell>Row 1, Cell 3</TableComparisonCell>
    </TableComparisonRow>
    <TableComparisonRow title="Row 2">
      <TableComparisonCell>Row 2, Cell 1</TableComparisonCell>
      <TableComparisonCell>Row 2, Cell 2</TableComparisonCell>
      <TableComparisonCell>Row 2, Cell 3</TableComparisonCell>
    </TableComparisonRow>
  </TableComparisonRows>
</TableComparison>
```

## Circular pyramid

- Components: `CircularPyramid`, `CircularPyramidStack`, `CircularPyramidStackTitle`, `CircularPyramidStackContent`

```vue
<CircularPyramid>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>01 Strategy</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Define clear technical north stars, design systems, and cross-team alignment.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>02 Architecture</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Establish domain boundaries, type safety contracts, and scalable infrastructure.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>03 Implementation</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Build high-performance components with smooth motion and responsive layout.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackTitle>04 Verification</CircularPyramidStackTitle>
    <CircularPyramidStackContent>
      Validate behavior with rigorous unit suites, formatting, and live slide builds.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
</CircularPyramid>

<!-- Self-contained mockup with 6 layers and custom theme color -->
<CircularPyramid
  :count="6"
  :active-index="0"
  color="#6366f1"
/>
```

## Square pyramid

- Components: `SquarePyramid`, `SquarePyramidStack`, `SquarePyramidStackTitle`, `SquarePyramidStackContent`

```vue
<SquarePyramid>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>01 Strategy</SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      Define clear technical north stars, design systems, and cross-team alignment.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>02 Architecture</SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      Establish domain boundaries, type safety contracts, and scalable infrastructure.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>03 Implementation</SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      Build high-performance components with smooth motion and responsive layout.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackTitle>04 Verification</SquarePyramidStackTitle>
    <SquarePyramidStackContent>
      Validate behavior with rigorous unit suites, formatting, and live slide builds.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
</SquarePyramid>

<!-- Self-contained mockup with 5 slabs and custom theme color -->
<SquarePyramid
  :count="5"
  :active-index="0"
  color="#6366f1"
/>
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
