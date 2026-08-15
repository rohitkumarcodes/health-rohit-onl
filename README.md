# rohit's health

Daily health updates, published as a static [Eleventy](https://www.11ty.dev/) site.

## Add an entry

Create a markdown file in `src/entries/`:

```text
src/entries/YYYY-MM-DD-short-slug.md
```

Example:

```markdown
---
title: slept well, short walk
---

Seven hours of sleep. Walked 20 minutes. Water was good. In bed by 11.
```

- The date in the **filename** is the publish date.
- Entries dated **today or earlier** (Asia/Kolkata) appear on the site.
- Entries dated in the **future** stay unpublished until that day.
- The homepage always shows the latest published entry.
- Older entries appear on `/log/`.

## Local development

```bash
npm install
npm start
```

Open http://localhost:8080/

## Build

```bash
npm run build
```

Output goes to `_site/`. Netlify runs `npm run build` and publishes that folder.
