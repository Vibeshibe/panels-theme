+++
title = 'Component showcase'
description = 'A living specimen page for authors, theme developers, and regression checks.'
date = 2026-10-26
toc = true
tags = ['components']
+++

This is the theme's component specimen. Check it in light and dark mode, on a narrow screen, and with a keyboard.

## Markdown callouts

> [!NOTE]
> A note can contain **formatted text**, [links](https://gohugo.io/), and `inline code`.

> [!TIP]
> Keep related images in the page bundle.

> [!IMPORTANT]
> A clear label communicates the meaning as well as the panel color.

> [!WARNING]
> This is an illustrative warning panel.

> [!CAUTION]
> This is an illustrative caution panel.

## Compatible alert syntax

{{< alert icon="lightbulb" type="tip" title="From a familiar shortcode" >}}
This callout uses the `alert` shortcode with **Markdown content**.

- One component implementation.
- Two ways to write it.
{{< /alert >}}

{{< alert "triangle-exclamation" >}}
Positional icon syntax is accepted too.
{{< /alert >}}

## Code and tables

```yaml
title: A small project
category: digital
draft: true
```

| Component | Authoring | Runtime |
| --- | --- | --- |
| Article | Markdown | Static HTML |
| Callout | Markdown or shortcode | Static HTML |
| Gallery | Page images and figure shortcodes | Optional lightbox |

## Tabs and nesting

{{< tabs >}}
{{< tab label="Markdown" >}}
**Markdown** works inside a tab.

{{< alert type="note" title="Nested component" >}}
This alert is nested inside the first tab.
{{< /alert >}}
{{< /tab >}}
{{< tab label="Code" >}}
```sh
hugo --minify
```
{{< /tab >}}
{{< /tabs >}}

## Disclosures

{{< accordion >}}
{{< accordionItem title="What works without JavaScript?" >}}
The article, callouts, links, images, and this native disclosure remain usable. Tabs show all panels as labelled sections.
{{< /accordionItem >}}
{{< /accordion >}}

## Images and gallery

The following diagrams are original generic SVG fixtures, included to test image handling and keyboard navigation.

{{< gallery >}}
{{< figure src="plate.svg" alt="A sage panel with an orange circle and four fasteners" caption="Plate study, one." >}}
{{< figure src="disc.svg" alt="A lilac circle on a warm cream panel" caption="Plate study, two." >}}
{{< /gallery >}}
