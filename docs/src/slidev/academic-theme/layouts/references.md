# References Layout (`references`)

The `references` layout renders academic citations and bibliographic references in a clean multi-column format within the **Academic Theme**.

## Purpose

Provides a clean, structured layout for bibliographic citations and literature references in lectures, conference talks, and thesis defenses.

**When to use**: On concluding or appendix slides where you need to list papers, books, DOI links, and academic sources.

## Presentation Preview

<LayoutDemo layout="references" theme="academic" />

---

## Usage

### Frontmatter References (Recommended)

Define the `references` list in frontmatter. The layout automatically formats author/year attribution and clickable titles:

```md
---
layout: references
hideInToc: true
columns: 2
references:
  - authors: Alneyadi et al.
    year: 2016
    title: A survey on data leakage prevention systems
    url: https://doi.org/10.1016/j.jnca.2016.01.008
  - authors: Liu et al.
    year: 2015
    title: Privacy-Preserving Scanning of Big Content for Sensitive Data Exposure with MapReduce
    url: https://vtechworks.lib.vt.edu/items/2652b4c0-305d-4b03-b463-e16d1cd8ad4e
---

# References
```

### Slidev Configuration

To use the References layout in an Academic presentation, enable the addon in your frontmatter:

```yaml
---
theme: '@alphacifer/slidev-academic-theme'
addons:
  - '@alphacifer/slidev-addon-theme'
---
```

---

## Frontmatter Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `references` | `IReferenceItem[]` | `[]` | List of references with `authors`, `year`, `title`, and optional `url`. |
| `columns` | `number \| string` | `2` | Number of columns (`1`, `2`, or `3`). |
| `background` | `string` | `''` | Optional background image or CSS gradient. |

---

## `IReferenceItem` Schema

| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `authors` | `string` | **Yes** | Author list (e.g. `'Alneyadi et al.'`). |
| `year` | `number \| string` | **Yes** | Publication year (e.g. `2016` or `'2016'`). |
| `title` | `string` | **Yes** | Title of the publication or resource. |
| `url` | `string` | No | Optional URL / DOI link. When omitted, renders as plain text. |
