---
title: 'Markdown file example'
description: Example of what markdown files should look like, including formatting, images, code, and latex
date: '2025-02-15'
categories:
  - sveltekit
published: false
---

Please follow the formatting guidelines for markdown files. This is meant to be an example of what markdown files should look like, including formatting, images, code, and latex.

We might have a link to an image like ![Example link to image](/uploads/optimized/united-airlines.webp).

We might have links inside of text like [Routes Maps Builder](https://github.com/kburchfiel/route_maps_builder/). We might have text in _italics_ or **bold**. We might have inline code like `print("Hello, world!")`. We might have a block of code like

```python
print("Hello, world!")
```

or in multiple languages

```typescript
const example = 'Hello, world!';
```

We might have an inline equation like $E = mc^2$. Surround inline LaTeX with dollar signs. Use backticks only when displaying the LaTeX source as code.

**IMPORTANT: Please use backticks to escape dollar signs in text. For example, if we want to write 100 million dollars, we should write `$`100 million.**

We might have a block of latex like

```latex
\int_0^\infty \frac{x^3}{e^x} \, dx = \frac{\pi^4}{15}
```

**Important: Any latex code blocks should be formated as a code block with the language `latex`, since our markdown parser will not parse latex otherwise.**

We might have a nested list like

- Item 1
  - Subitem 1
  - Subitem 2
- Item 2
- Item 3

We might have a sections with headers like

# Header 1

## Header 2
