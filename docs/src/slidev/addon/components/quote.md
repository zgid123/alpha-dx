# Quote

Displays a styled quotation with optional author attribution and customizable typography classes.

## Presentation Preview

<QuoteDemo />

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

---

## Props Reference

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `text` | `string` | — | **Yes** | The quote text to display in quotation marks. |
| `author` | `string` | `undefined` | No | Optional author attribution rendered beneath the quote. |
| `titleClass` | `string` | `undefined` | No | Additional UnoCSS or utility classes applied to the heading element. |
