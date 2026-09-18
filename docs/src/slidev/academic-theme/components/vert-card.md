# Vertical Card

Vertical card component with corner accents, optional ribbon badge, and clean academic margins. Includes `VertCard`, `VertCardBadge`, `VertCardTitle`, `VertCardHeading`, `VertCardContent`, and `VertCardIcon`.

## Presentation Preview

<VertCardDemo theme="academic" />

---

## Usage Examples

### Outside Badge Variant

```vue
<VertCard
  step="01"
  color="#0ea5e9"
  variant="outside"
>
  <VertCardTitle>Primary Finding</VertCardTitle>
  <VertCardContent>
    Statistical analysis demonstrates statistically significant improvements across benchmarks.
  </VertCardContent>
</VertCard>
```

### Clean Variant (No Badge)

```vue
<VertCard
  variant="none"
  color="#0284c7"
  :dots="false"
>
  <VertCardTitle>Clean Layout</VertCardTitle>
  <VertCardContent>
    Spacious academic layout without step indicator badges.
  </VertCardContent>
</VertCard>
```

### Slidev Configuration

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Props Reference (`VertCard`)

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `step` | `string \| number` | `'01'` | No | Step number or text on the badge. |
| `title` | `string` | `undefined` | No | Card heading text (can also use `<VertCardTitle>`). |
| `description` | `string` | `undefined` | No | Card body text (can also use `<VertCardContent>`). |
| `color` | `string` | `'#ea583a'` | No | Primary accent color for badges and decorative stripes. |
| `variant` | `'outside' \| 'inside' \| 'none' \| 'hidden'` | `'outside'` | No | Badge positioning style. `'outside'` positions badge on the outer margin; `'none'` hides the badge. |
| `cardBg` | `string` | `'#ffffff'` | No | Background color for the card container. |
| `hasDivider` | `boolean` | `true` | No | Shows or hides the divider line below the title. |
| `dots` | `boolean` | `true` | No | Shows or hides decorative dots. |
