# Arc Compare

Opposing curved comparison diagram with edge project hubs, numbered arc nodes, and central versus divider for evaluating architectural trade-offs. Includes `ArcCompare`, `ArcCompareLeft`, `ArcCompareRight`, `ArcCompareTitle`, `ArcCompareContents`, `ArcCompareCallout`, `ArcCompareBadge`, `ArcCompareHeading`, and `ArcCompareContent`.

## Presentation Preview

<ArcCompareDemo />

---

## Usage Examples

### Detailed Compound Comparison

```vue
<ArcCompare :count="3">
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
          Unchecked crashes can bring down the entire system.
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

---

## Props Reference (`ArcCompare`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `count` | `number` | `3` | No | Number of comparison points per side (`3` or `4`). |
| `vsText` | `string` | `'Vs'` | No | Text inside the central divider badge. |
| `vsSize` | `number` | `14` | No | Font size of the central versus badge text. |
| `animation` | `boolean` | `true` | No | Enables the entrance animation. |
| `autoScale` | `boolean` | `true` | No | Automatically scales diagram to fit the slide bounds. |

---

## Child Components

- `ArcCompareLeft`: Left-side container with custom accent color and title.
- `ArcCompareRight`: Right-side container with custom accent color and title.
- `ArcCompareTitle`: Large heading rendered inside the semicircular hub.
- `ArcCompareContents`: List wrapper for comparison callout points.
- `ArcCompareCallout`: Individual numbered criteria row.
