# Panels

A tactile Hugo theme for personal sites, journals, projects, and image collections. Docked panels, machined edges, local fonts, and light/dark material finishes. No JavaScript framework, CMS service, Go modules, or Node build is required.

This is an initial development version. The example site is a living component specimen, not a claim of complete Blowfish feature parity.

## Requirements

- Hugo **0.168.0** is the pinned and tested build version; the standard edition is sufficient.
- Git for installation and content versioning.

## Try the example

Clone this repository into a directory named `panels-theme`, then run from its root:

```sh
hugo server --source exampleSite --themesDir ../..
```

Open the local URL Hugo prints. `/components/` demonstrates the authoring components, nesting, and keyboard behavior. The example contains generic content and original SVG illustration fixtures.

## Install

From a Hugo site's root:

```sh
git submodule add https://github.com/Vibeshibe/panels-theme.git themes/panels-theme
```

Set `theme = 'panels-theme'`. Use the example site's configuration as a reference. Keep the submodule pinned to a reviewed commit. A clone of a consuming site needs `git submodule update --init --recursive`.

## Content model

```text
content/
  _index.md                       # homepage introduction
  posts/<slug>/index.md            # journal entries + local images
  projects/<slug>/index.md         # projects
  gallery/<album>/index.md         # albums + local images
data/panels.yaml                   # profile, banner, labels and links
```

Your site's `data/panels.yaml` overrides the theme defaults. Personal artwork, biographies, links, and posts belong in the consuming site. No shibabox identity or commissioned artwork is bundled with this theme.

The `profile` block edits the sidebar card (`label`, `eyebrow`, `title`, `handle`, `bio`, `status`, `accent`), banner `logo`, and `brand` wordmark beneath the logo (defaults to the site title). The `intro.label` field edits the first panel's small section label; `intro.title` edits its heading. Homepage paragraphs come from `content/_index.md`.

### Console and quick links

The appearance controls, flat main-menu links, and raised project/journal navigation keys live in the rail beneath the banner. Lamps, the knob and ventilation grilles are decorative hardware. The site identity sits below the logo; the LCD below it uses `console.label` and `console.ticker`.

The message scrolls with JavaScript and has a pause/resume button. Hover or keyboard focus pauses it temporarily. Reduced-motion preferences and browsers without JavaScript receive the complete static message; the rail can grow to fit it. The message is exposed once to screen readers.

Provide `profile.quickLinks` to turn the profile card into a links panel; omit it or use an empty list to keep the biography card. For example:

```yaml
profile:
  brand: your.site
  label: QUICK LINKS
  title: Elsewhere, together.
  bio: A few familiar places.
  quickLinks:
    - name: Community
      url: https://example.org
      description: Come say hello
console:
  label: LOCAL FREQUENCY
  ticker: STAY CURIOUS. MAKE SOMETHING. TAKE THE SCENIC ROUTE.
```

External links use a new tab with `noopener noreferrer`. Main-menu destinations render as flat rail links; nested dropdown menus are not rendered.

Example configuration:

```yaml
profile:
  title: Your space
  logo: images/your-logo.png
  label: ABOUT THIS SPACE
  bio: A little home for the things you make.
  handle: INDEPENDENT & CURIOUS
  status: ALWAYS A WORK IN PROGRESS
  accent: true
hero:
  title: A shared frequency.
  image: images/banner-light.png
  darkImage: images/banner-dark.png
  alt: A description of the banner artwork.
```

The paths above refer to Hugo assets or, where appropriate, page resources. Keep a light and dark banner of the same dimensions for a stable layout. Set `profile.accent: false` to use the neutral profile material instead of the orange plate.

For illustration-led banners, set `hero.presentation: artwork`. This keeps the image's colors, moves the caption to the lower right, and uses a bottom gradient for readable text. Optional `imagePosition`/`darkImagePosition` and `mobileImagePosition`/`darkMobileImagePosition` values use CSS object-position syntax such as `50% 35%`. `darkAlt` supplies a separate description when the dark image depicts a different scene; it defaults to `alt`.

Project front matter supports `title`, `description`, `date`, `draft`, `weight`, `category` (`offline` or `digital`), `label`, `cover`, `coverAlt`, and `projectURL`. An optional `sprite` class and site-owned `spriteSheet` can supply pre-rendered project illustrations.

Album front matter supports `cover` and `coverAlt`. Article front matter supports `author`, `tags`, `description`, and `toc`. Hugo handles the publication date and draft state.

## Authoring components

See [the Blowfish shortcode review](docs/BLOWFISH-SHORTCODES.md) for the exact supported subset, useful candidates, and dependencies that require an adapter. Retaining the Blowfish submodule in a consuming site does not activate its shortcodes.

### Callouts

Use Markdown alerts for portable content:

```markdown
> [!NOTE]
> Useful **formatted information**.
```

`NOTE`, `TIP`, `IMPORTANT`, `WARNING`, and `CAUTION` use the same component as the `alert` shortcode:

```text
{{< alert type="tip" title="A useful detail" icon="lightbulb" >}}
Markdown content goes here.
{{< /alert >}}
```

The familiar `alert` name and positional/named `icon` syntax are accepted. Icons are retained as metadata in this foundation; semantic type supplies the visible marker. Arbitrary Blowfish color overrides and its entire icon library are not included. This implementation is independent of Blowfish and Tailwind.

### Figures and galleries

```text
{{< gallery >}}
{{< figure src="one.jpg" alt="Describe the image" caption="First photograph" >}}
{{< figure src="two.jpg" alt="Describe the second image" caption="Second photograph" >}}
{{< /gallery >}}
```

Images resolve from the page bundle, then Hugo assets, then a static URL. Standard Markdown images use the same figure rendering. The lightbox supports previous/next controls, arrow keys, Escape, focus restoration, and ordinary image links without JavaScript. Images retain their source resolution in this initial version; automated responsive raster derivatives are a follow-up.

### Tabs and disclosures

```text
{{< tabs >}}
{{< tab label="First" >}}Markdown content.{{< /tab >}}
{{< tab label="Second" >}}More content.{{< /tab >}}
{{< /tabs >}}

{{< accordion >}}
{{< accordionItem title="A question" >}}The answer.{{< /accordionItem >}}
{{< /accordion >}}
```

Tabs support keyboard navigation. Without JavaScript, all labelled sections remain visible. Disclosures use native `details`/`summary`. The initial accordion does not impose exclusive-open behavior.

## Appearance and assets

The theme follows the system appearance, supports explicit light/dark links using `?theme=dark`, and remembers manual choices locally. Data and article HTML remain static. The browser makes no requests to a font CDN: Manrope, DM Mono and Barlow Condensed are served locally, with their OFL license files in `licenses/fonts/`.

CSS is organized into foundation, panel structure, materials, accent, and content layers. Hugo concatenates, minifies, and fingerprints assets. Site data controls identity and content; component CSS owns the geometry.

## Development and updates

For a site and theme checked out next to each other, run the site with `hugo server --themesDir ..` to use the editable sibling theme. Production builds use the site's pinned submodule.

Commit and publish the theme revision before updating and publishing the consuming site's submodule pointer. Neither a local submodule pointer nor a local sibling checkout uploads a theme commit to GitHub.

## Validation

The workflow builds the generic example with the pinned Hugo binary after checking its release checksum. The component specimen covers render hooks, shortcodes, nested components, figures, tables and code. Local browser checks should cover desktop/mobile, both themes, filters, tabs, gallery focus, theme persistence, and no-JavaScript fallbacks.

## License

Theme code and original example SVG fixtures: MIT. Bundled fonts: their respective SIL Open Font License files. Content and artwork supplied by a consuming site retain their own attribution and license requirements.
