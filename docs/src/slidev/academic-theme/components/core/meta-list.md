# MetaList

Anchors key-value metadata pairs such as course details, supervisor, or project information at the bottom-left of a slide within the **Academic Theme**.

## Purpose

Provides a clean metadata list to display key-value pairs (e.g., subject name, supervisor/instructor, project phase). Anchors to the bottom-left of the slide canvas by default (`bottom-3.75 left-7.5`), matching `<Speaker>` on the bottom-right in position, typography, and line formatting.

**When to use**: On title, cover, or overview slides where you need to display structured label-value pairs such as course title and supervising lecturer on the bottom-left.

## Presentation Preview

<MetaListDemo theme="academic" />

---

## Usage Examples

### Basic Usage (Bottom-Left Anchored)

```vue
<MetaList
  :items="[
    { label: 'Course', value: 'Data Science & Analytics' },
    { label: 'Supervisor', value: 'Prof. Alan Turing' },
  ]"
/>
```

### Paired with Speaker on Academic Cover Slide

```vue
<!-- Course details anchor to bottom-left, Speaker anchors to bottom-right -->
<MetaList
  :items="[
    { label: 'Môn học', value: 'Khoa học phân tích dữ liệu' },
    { label: 'GVHD', value: 'TS. Nguyễn Trần Minh Thư' },
  ]"
/>

<Speaker author="Alpha" date="2026-10-24" />
```

### Custom Separator

```vue
<MetaList
  separator=" - "
  :items="[
    { label: 'Course', value: 'Data Science' },
    { label: 'Instructor', value: 'Dr. Jane Doe' },
  ]"
/>
```

### Slidev Configuration

To use the MetaList component in an Academic presentation, enable the addon in your frontmatter:

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Props Reference

### `MetaList`

- **Rendered Class:** `.alpha-meta-list`
- **Rendered HTML Tag:** `<div>`
- **Role:** Metadata key-value list container anchored at the bottom-left corner of a slide, styled to match `<Speaker>`.

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `items` | `IMetaListItem[]` | `[]` | No | Array of items with `label` and `value`. |
| `separator` | `string` | `': '` | No | Separator string appended between label and value. |

---

## Customization Guidelines

### 1. Typography & Styling

`MetaList` matches the typography and line height of `<Speaker>`, inheriting the slide's default base font size (`1rem` / 16px) and text color with regular font weight for both labels and values. You can easily override the typography or spacing by passing any UnoCSS classes:

```vue
<MetaList
  :items="[
    { label: 'Course', value: 'Data Science & Analytics' },
    { label: 'Supervisor', value: 'Prof. Alan Turing' },
  ]"
  class="gap-1 text-sm opacity-90"
/>
```

### 2. Component CSS Classes & Stylesheet Overrides

#### Rendered DOM Structure

```html
<!-- <MetaList> (Root container) -->
<div class="alpha-meta-list flex absolute bottom-3.75 left-7.5 flex-col text-left">
  <p class="alpha-meta-list__item">
    <span class="alpha-meta-list__label">Course: </span>
    <span class="alpha-meta-list__value">Data Science & Analytics</span>
  </p>
</div>
```

#### Class Reference Table

| Component | Target Element | Rendered Class | Purpose & Description |
| :--- | :--- | :--- | :--- |
| `<MetaList>` | Root container | `.alpha-meta-list` | Container `<div>` anchored at slide bottom-left (`bottom-3.75 left-7.5`). |
| `<MetaList>` | Item paragraph | `.alpha-meta-list__item` | Paragraph element `<p>` for each metadata pair. |
| `<MetaList>` | Label element | `.alpha-meta-list__label` | Span element `<span>` for the metadata label. |
| `<MetaList>` | Value element | `.alpha-meta-list__value` | Span element `<span>` for the metadata value. |
