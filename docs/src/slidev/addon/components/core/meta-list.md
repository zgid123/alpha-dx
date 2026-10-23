# MetaList

Renders semantic key-value metadata pairs such as course details, supervisor, or project information.

## Purpose

Provides a clean, semantic `<dl>` description list to display metadata pairs (e.g., subject name, supervisor/instructor, project phase).

**When to use**: On title, cover, or overview slides where you need to display structured label-value pairs such as course title and supervising lecturer.

## Presentation Preview

<MetaListDemo theme="seriph" />

---

## Usage Examples

### Basic Usage

```vue
<MetaList
  :items="[
    { label: 'Course', value: 'Data Science & Analytics' },
    { label: 'Supervisor', value: 'Prof. Alan Turing' },
  ]"
/>
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

### Custom Slot Usage

```vue
<MetaList>
  <div class="alpha-meta-list__item">
    <dt class="alpha-meta-list__label inline font-medium">Topic: </dt>
    <dd class="alpha-meta-list__value inline">Machine Learning</dd>
  </div>
</MetaList>
```

---

## Props Reference

### `MetaList`

- **Rendered Class:** `.alpha-meta-list`
- **Rendered HTML Tag:** `<dl>`
- **Role:** Semantic metadata key-value list container.

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `items` | `IMetaListItem[]` | `[]` | No | Array of items with `label` and `value`. |
| `separator` | `string` | `': '` | No | Separator string appended between label and value. |

---

## Customization Guidelines

### 1. Typography & Styling

`MetaList` defaults to `text-xl` (20px) and inherits the slide's primary text color. You can easily override the typography by passing any UnoCSS classes:

```vue
<MetaList
  :items="[
    { label: 'Course', value: 'Data Science & Analytics' },
    { label: 'Supervisor', value: 'Prof. Alan Turing' },
  ]"
  class="gap-3 text-lg"
/>
```

### 2. Component CSS Classes & Stylesheet Overrides

#### Rendered DOM Structure

```html
<!-- <MetaList> (Root container) -->
<dl class="alpha-meta-list flex flex-col gap-2 text-left text-xl">
  <div class="alpha-meta-list__item">
    <dt class="alpha-meta-list__label inline font-medium">Course: </dt>
    <dd class="alpha-meta-list__value inline m-0">Data Science & Analytics</dd>
  </div>
</dl>
```

#### Class Reference Table

| Component | Target Element | Rendered Class | Purpose & Description |
| :--- | :--- | :--- | :--- |
| `<MetaList>` | Root container | `.alpha-meta-list` | Container description list `<dl>`. |
| `<MetaList>` | Item wrapper | `.alpha-meta-list__item` | Wrapper `<div>` for each label/value pair. |
| `<MetaList>` | Label element | `.alpha-meta-list__label` | Definition term `<dt>` for the label. |
| `<MetaList>` | Value element | `.alpha-meta-list__value` | Definition description `<dd>` for the value. |

