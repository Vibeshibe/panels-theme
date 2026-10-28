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

On desktop, sidebar cards align with the first content panel. On phones, the main content comes before the sidebar cards. A single project fills its row; multiple projects use the responsive card grid.

The `profile` block edits the sidebar card (`label`, `eyebrow`, `title`, `handle`, `bio`, `status`, `accent`), banner `logo`, and `brand` wordmark beneath the logo (defaults to the site title). The `intro.label` field edits the first panel's small section label; `intro.title` edits its heading. Homepage paragraphs come from `content/_index.md`. The gold plaque uses `intro.noteLabel` for its small heading, `intro.note` for the list of main lines, and `intro.noteCaption` for the bottom caption. The heading and caption retain the original text when omitted; the decorative arrow is added by the theme.

### Console and quick links

The appearance controls, optional header keys and flat main-menu links live in the rail beneath the banner. Lamps, the knob and ventilation grilles are decorative hardware. The site identity sits below the logo; the LCD below it uses `console.label` and `console.ticker`.

Appearance is controlled by a single power-style button: illuminated means light mode, unlit means dark mode. Its visible label shows the current appearance, its tooltip describes the next action, and the native toggle button works with keyboard input. The existing saved preference, system appearance and `?theme=` links still apply. The control is hidden when JavaScript is unavailable.

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

### Optional header keys and empty sockets

The header has two to four sockets, configured with `console.socketCount` (default `4`). `console.buttons` defaults to `[]`, leaving every socket empty. Empty sockets are decorative and do not receive keyboard focus.

Buttons are listed **from right to left**: the first entry occupies the rightmost socket, the next fills the socket to its left. Unused positions remain recessed sockets. On narrow screens, banks wrap into two columns; filling starts at the bottom right and continues left, then onto the row above.

On phones, the LCD spans the full rail width, followed by a compact hardware/power row and the socket bank. Its duplicate caption and RX/TX engraving are omitted in that layout. Empty sockets use shallower recesses to save vertical space; active keys retain large tap areas and readable labels.

Each entry uses `name` with either `url` for a direct link or `children` for a dropdown. Dropdown children need `name` and `url`; one level is supported. For example:

```yaml
console:
  socketCount: 4
  buttons:
    - name: Field notes
      url: /posts/
    - name: Projects
      children:
        - name: All projects
          url: /projects/
        - name: Workbench
          url: /projects/workbench/
```

Use `buttons: []` for an all-empty bank, or remove individual entries to free their positions. Builds fail for socket counts outside 2–4, too many buttons, or missing names/destinations, so a key is never silently dropped.

Dropdowns use native disclosures. With JavaScript and Popover API support, their panels open above the page so the chassis cannot clip them. Without that support, they expand inside the rail and the chassis grows. Enter/Space activate the disclosure, arrow keys on its trigger focus the first/last link, Tab follows the links, and Escape closes it and restores focus. Clicking or moving focus outside closes the enhanced menu.

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

The final `readability.css` layer owns the type scale across breakpoints: 16px body and article text, 14px summaries and controls, and a 12px minimum for labels and metadata. Phone layouts wrap or stack content instead of shrinking those sizes. Redundant tiny engravings are hidden where the plate has insufficient room. Maintain this layer last in the CSS bundle so older framing rules cannot reduce reading sizes.

## Development and updates

For a site and theme checked out next to each other, run the site with `hugo server --themesDir ..` to use the editable sibling theme. Production builds use the site's pinned submodule.

Commit and publish the theme revision before updating and publishing the consuming site's submodule pointer. Neither a local submodule pointer nor a local sibling checkout uploads a theme commit to GitHub.

## Validation

The workflow builds the generic example with the pinned Hugo binary after checking its release checksum. The component specimen covers render hooks, shortcodes, nested components, figures, tables and code. Local browser checks should cover desktop/mobile, both themes, filters, tabs, gallery focus, theme persistence, and no-JavaScript fallbacks.

## License

Theme code and original example SVG fixtures: MIT. Bundled fonts: their respective SIL Open Font License files. Content and artwork supplied by a consuming site retain their own attribution and license requirements.
