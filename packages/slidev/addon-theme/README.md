# @alphacifer/slidev-addon-theme

Shared Slidev components and layouts for Alpha presentations.

For Alpha's light-only academic styling, combine this addon with
`@alphacifer/slidev-academic-theme`.

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

## Shared color tokens

The addon installs `@alphacifer/slidev-core-theme` automatically for shared
CSS custom properties, typography defaults, and semantic UnoCSS utilities. The
tokens live in a low-priority cascade layer, so theme and deck values override
them. Set a palette in your deck's `style.css`:

```css
:root {
  --alpha-primary: #f8fafc;
  --alpha-foreground-primary: #0f172a;
  --alpha-foreground-accent: #0284c7;
  --alpha-stroke-primary: #cbd5e1;
}
```

Use `bg-primary`, `text-foreground-primary`, `text-foreground-accent`,
`border-stroke-primary`, `fill-primary`, and `stroke-stroke-primary` in slide
markup. The utilities have light palette fallbacks if a theme does not define
the variables. The Academic Theme sets its own values for the same tokens.

Components expose short, namespaced variables such as `--alpha-arc-arrow-process-heading`
and `--alpha-horizontal-card-accent`. Each compound component has one `style.css` beside
its Vue files. For example, `components/process/arc-arrow-process/style.css`
defines the colors for the process, arrow, icon, and heading parts together.
Standalone components use a file such as `QnA.style.css`.

The package's `style.css` imports all component palettes. Import it when using
components outside Slidev:

```ts
import '@alphacifer/slidev-addon-theme/style.css';
```

Shared colors are aliased inside the component palette, and component variables
can be overridden globally or on a specific instance:

```css
:root {
  --alpha-arc-orbit-guide-stroke: var(--alpha-stroke-primary);
  --alpha-arc-comparison-guide-stroke: #94a3b8;
  --alpha-horizontal-card-accent: #ea583a;
}

.custom-card {
  --alpha-horizontal-card-accent: #2563eb;
  --alpha-horizontal-card-icon-bg: #dbeafe;
}

.custom-pyramid {
  --alpha-square-pyramid-accent: #7c3aed;
  --alpha-square-pyramid-stack-1-color: #a78bfa;
}
```

Component color props still take precedence over CSS variable defaults.
Variables with an `initial` default use the component's runtime fallback—for
example, an icon background derived from its color prop. Indexed palette
overrides such as `--alpha-square-pyramid-stack-1-color` and
`--alpha-table-comparison-col-1-background` also keep their item-specific fallbacks.

## Core

- Components: `Date`, `MetaList`, `QnA`, `Quote`, `ReflectedTitle`, `Speaker`
- Layouts: `arc-toc`, `bg-center`, `references`

## Shifting heading

- Component: `TransitionHeading`
- Layout: `shifting-intro`
- Utilities: `mergeUno`, `createUnoClassMerger`

## Thanks

- Components: `SquareThanks`, `ThanksOutlineSquare`, `ThanksSquare`
- Layout: `thanks`

## Hexagon triad

- Components: `HexagonTriad`, `HexagonTriadCallout`, `HexagonTriadBadge`, `HexagonTriadHeading`, `HexagonTriadContent`

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

## Gear triad

- Components: `GearTriad`, `GearTriadCallout`, `GearTriadHeading`, `GearTriadContent`, `GearTriadDetails`, `GearTriadDetailsHeading`, `GearTriadDetailsContent`, `GearTriadDetail`, `GearTriadIcon`, `GearTriadCenter`

```vue
<GearTriad>
  <GearTriadCallout>
    <GearTriadHeading>Option 1</GearTriadHeading>
    <GearTriadContent>
      Formulate testable research questions and theoretical models.
    </GearTriadContent>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Option 2</GearTriadHeading>
    <GearTriadContent>
      Execute controlled investigations with automated measurement pipelines.
    </GearTriadContent>
  </GearTriadCallout>
  <GearTriadCallout>
    <GearTriadHeading>Option 3</GearTriadHeading>
    <GearTriadContent>
      Subject findings to reproducible peer review and empirical analysis.
    </GearTriadContent>
  </GearTriadCallout>
</GearTriad>
```

## Horizontal card

- Components: `HorizontalCard`, `HorizontalCardBadge`, `HorizontalCardContent`, `HorizontalCardIcon`

```vue
<HorizontalCard
  step="01"
  title="Discovery"
>
  <HorizontalCardContent>Explore ideas and define requirements.</HorizontalCardContent>
</HorizontalCard>

<!-- With custom icon and color -->
<HorizontalCard
  step="02"
  title="Discovery"
  color="#2563eb"
>
  <template #icon>
    <div class="i-carbon-search text-4xl" />
  </template>
  <HorizontalCardContent>Explore ideas and prototype user experiences.</HorizontalCardContent>
</HorizontalCard>
```

## Arc comparison

- Components: `ArcComparison`, `ArcComparisonLeft`, `ArcComparisonRight`, `ArcComparisonOrbit`, `ArcComparisonBadge`, `ArcComparisonHeading`, `ArcComparisonContent`

```vue
<!-- 4 points mode -->
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
```

## Table comparison

- Components: `TableComparison`, `TableComparisonColumns`, `TableComparisonColumn`, `TableComparisonRows`, `TableComparisonRow`, `TableComparisonCell`

```vue
<!-- Custom compound comparison structure -->
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
```

## Circular pyramid

- Components: `CircularPyramid`, `CircularPyramidStack`, `CircularPyramidStackHeading`, `CircularPyramidStackContent`

```vue
<CircularPyramid>
  <CircularPyramidStack>
    <CircularPyramidStackHeading>01 Strategy</CircularPyramidStackHeading>
    <CircularPyramidStackContent>
      Define clear technical north stars, design systems, and cross-team alignment.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackHeading>02 Architecture</CircularPyramidStackHeading>
    <CircularPyramidStackContent>
      Establish domain boundaries, type safety contracts, and scalable infrastructure.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackHeading>03 Implementation</CircularPyramidStackHeading>
    <CircularPyramidStackContent>
      Build high-performance components with smooth motion and responsive layout.
    </CircularPyramidStackContent>
  </CircularPyramidStack>
  <CircularPyramidStack>
    <CircularPyramidStackHeading>04 Verification</CircularPyramidStackHeading>
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

- Components: `SquarePyramid`, `SquarePyramidStack`, `SquarePyramidStackHeading`, `SquarePyramidStackContent`

```vue
<SquarePyramid>
  <SquarePyramidStack>
    <SquarePyramidStackHeading>01 Strategy</SquarePyramidStackHeading>
    <SquarePyramidStackContent>
      Define clear technical north stars, design systems, and cross-team alignment.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackHeading>02 Architecture</SquarePyramidStackHeading>
    <SquarePyramidStackContent>
      Establish domain boundaries, type safety contracts, and scalable infrastructure.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackHeading>03 Implementation</SquarePyramidStackHeading>
    <SquarePyramidStackContent>
      Build high-performance components with smooth motion and responsive layout.
    </SquarePyramidStackContent>
  </SquarePyramidStack>
  <SquarePyramidStack>
    <SquarePyramidStackHeading>04 Verification</SquarePyramidStackHeading>
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
