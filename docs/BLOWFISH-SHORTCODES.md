# Blowfish shortcode review

Reviewed 26 October 2026 against the consuming site's pinned Blowfish revision [`3a9016a`](https://github.com/nunocoracao/blowfish/tree/3a9016a6d93f6d498ab5fc3b0aa7d51869962f25/layouts/shortcodes) (v2.97.0 plus one commit). This is a source audit, not a claim about the latest Blowfish release. Panels implementations were inspected alongside those files.

## Available in Panels now

These names are implemented independently in Panels. Their common authoring patterns work; matching names do not imply every Blowfish option is supported.

| Shortcodes | Working Panels subset | Differences from pinned Blowfish |
| --- | --- | --- |
| `alert` | Markdown body; named/positional icon argument accepted; semantic type/title and Markdown alerts | Icon names are metadata, with a semantic marker displayed. `cardColor`, `iconColor`, `textColor`, and the full icon collection are not implemented. |
| `button` | `href` and Markdown label | Panels does not currently implement Blowfish's `target`/`rel` options. |
| `figure` | `src`, `alt`, `caption`, `nozoom`; bundle/asset/static images and lightbox | No responsive raster derivatives yet. Blowfish's `default`, `href`, `target`, and image `class` options are not implemented; Panels has `figureClass`. |
| `gallery` | Wrap Panels `figure` shortcodes for a grid with lightbox | Uses CSS grid rather than Blowfish's Packery masonry and image-tag rewriting. Use the documented figure-based format. |
| `tabs`, `tab` | `label`, nested Markdown/components, accessible keyboard navigation | No synchronized `group`, selected `default` label, or per-tab icon support yet. All labelled panels remain visible without JavaScript. |

Panels also supplies `accordion`/`accordionItem`, which are **not** shortcodes in this pinned Blowfish revision. They use native disclosures.

## Useful next additions

These are candidates, not newly installed shortcodes. Keep their familiar arguments where useful and render them with Panels components.

| Candidate | Value for this site | Work needed |
| --- | --- | --- |
| `timeline`, `timelineItem` | Project build logs, woodworking progress, homelab changes | A static panel timeline with date/badge/header/subheader and optional icons. Blowfish's markup uses Tailwind and its icon partial; its vendor loader also brings in carousel assets for `timeline`, which a static Panels implementation can avoid. |
| `swatches` | Art palettes and woodworking finishes | Small CSS swatch panels with visible color labels. The pinned shortcode takes three positional colors and displays three color blocks. |
| `lead`, `badge` | Introductory paragraphs, project status labels | Simple semantic wrappers and Panels styles. No new browser library is needed. |
| `article`, `list` | Link related projects/posts from an article; embed filtered recent entries | Reuse Panels card/list partials. Blowfish's versions depend on its article-link partials, summary settings, and styling. |
| `video` | Local workshop clips and creative process footage | Native video element, shared resource resolution, poster/caption/layout styles. Preserve accessible controls and validate useful arguments; the pinned version also handles aspect ratio, fit, playback flags and time fragments. |
| `icon`, `keyword`, `keywordList` | Inline project labels and small status markers | An explicit SVG icon set and licenses, a shared icon partial, and new styles. Do not bring in an entire collection merely to render one marker. |
| `screenshot` | Homelab/software write-ups with high-density captures | A small figure adapter to constrain display size; ordinary Panels figures already cover most needs. |
| `ltr`, `rtl` | Mixed-direction article passages if needed | Small direction wrappers and matching logical-layout styles. These are not currently provided by Panels. |

The strongest additions for the present content are **timeline, swatches, lead/badge, related article cards, and local video**. They fit static Git authoring and the projects/photos focus. No additional shortcodes in this table were enabled as part of this review.

## Optional integrations with more dependencies

| Shortcodes | Dependencies observed in the pinned source | Assessment |
| --- | --- | --- |
| `mermaid` | Mermaid library and initialization loaded by Blowfish's `vendor.html` | Useful for homelab diagrams; add with page-scoped loading when there is content for it. Copying the shortcode alone only emits a `pre` block. |
| `chart` | Chart.js, shared configuration, inline chart initialization | Useful for data articles; not required by current content. |
| `katex` | KaTeX CSS, JS, auto-render, fonts, and Blowfish's renderer | The shortcode file itself is empty; vendor loading supplies the feature. Add only if math content needs it. |
| `carousel` | TW Elements carousel JS/CSS, resource selection and Tailwind classes | The existing grid/lightbox is a useful gallery baseline. A carousel needs its own accessible controls and motion behavior. |
| `github`, `gitlab`, `gitea`, `forgejo`, `codeberg`, `huggingface` | Build-time API requests, UID/icon/data helpers, card styling, and `fetch-repo.js` for browser refreshes; GitHub optionally uses a remote thumbnail | Useful project links, but keep network fetching optional. A local-data repository card can be added first; avoid turning all builds into API clients. |
| `codeimporter`, `mdimporter` | Build-time `resources.GetRemote` and Markdown rendering | Local checked-in snippets give reproducible Git builds. Remote imports can be added deliberately for a specific use case. |
| `gist` | GitHub-hosted browser script | Prefer fenced code or checked-in source for ordinary posts. |
| `youtubeLite` | Lite YouTube Embed custom-element JS/CSS and external video service | Add when an article needs it; shortcode markup alone is insufficient. |
| `typeit` | TypeIt library and inline initialization | Low priority for the site's current design and content. |

## Integration approach and attribution

Keep `theme = 'panels-theme'`. The retained Blowfish submodule is a reference and rollback option; Hugo does not load its shortcodes unless it is selected as a theme. Adding it as a fallback would also expose its assets and partial dependencies and would not make its visual components match Panels automatically.

Use independent adapters to Panels components, or deliberately copy a selected implementation with the required dependencies and attribution. Blowfish is [MIT-licensed](https://github.com/nunocoracao/blowfish/blob/3a9016a6d93f6d498ab5fc3b0aa7d51869962f25/LICENSE); copied substantial code must retain that notice, and bundled third-party libraries/icons retain their own licenses. This audit introduced no copied Blowfish implementation.

Dependency evidence: [shortcode sources](https://github.com/nunocoracao/blowfish/tree/3a9016a6d93f6d498ab5fc3b0aa7d51869962f25/layouts/shortcodes), [vendor loader](https://github.com/nunocoracao/blowfish/blob/3a9016a6d93f6d498ab5fc3b0aa7d51869962f25/layouts/partials/vendor.html), and [head/asset pipeline](https://github.com/nunocoracao/blowfish/blob/3a9016a6d93f6d498ab5fc3b0aa7d51869962f25/layouts/partials/head.html).
