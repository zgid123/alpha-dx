# Quote

Displays a styled quotation with optional author attribution and academic typography.

## Presentation Preview

<QuoteDemo theme="academic" />

---

## Usage Examples

### Standard Quote with Author

```vue
<Quote
  text="Reusable slides should feel native to every deck."
  author="Alpha"
/>
```

### Custom Title Class

```vue
<Quote
  text="Speed and rigor are complementary, not contradictory."
  author="Alpha"
  title-class="!text-3xl"
/>
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

## Props Reference

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `text` | `string` | — | **Yes** | The quote text to display in quotation marks. |
| `author` | `string` | `undefined` | No | Optional author attribution rendered beneath the quote. |
| `titleClass` | `string` | `undefined` | No | Additional UnoCSS or utility classes applied to the heading element. |
