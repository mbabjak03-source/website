# Personal website

A plain HTML/CSS/JS site: no framework, no build step, no website builder.
Open `index.html` in a browser and it works.

## How it's put together

```
index.html  about.html  projects.html  project.html   ← page shells, rarely touched
data/
  site.js       ← your name, tagline, nav, contact links
  about.js      ← bio, quick facts, achievements
  projects.js   ← categories + every project
assets/
  css/style.css ← the whole look (colours + font at the top)
  js/main.js    ← reads /data and builds the pages
  img/          ← your photos go here
```

Each `.html` page is nearly empty. It loads the data files and `main.js`, and
`main.js` builds the header, footer and page content. **To change content you
only edit files in `data/`.**

## Everyday tasks

### Add a project
1. Put the images in `assets/img/`, e.g. `assets/img/e30-cover.jpg`.
   Keep them under ~500 KB (export at ~1600px wide, JPG quality 80).
2. Open `data/projects.js`, copy an existing `{ ... },` block and paste it at
   the top of the `PROJECTS` list.
3. Change `id` (unique, lowercase-with-dashes), `title`, `category`, `year`,
   `status`, `summary`, `cover`, `body`, `images`, `links`.
4. Refresh the browser. It shows up on the Projects page, and its own page is
   at `project.html?id=your-id`.

### Add an achievement
Copy a block in `ABOUT.achievements` in `data/about.js`, newest at the top.

### Add a project category (e.g. "Software")
Add `{ id: "software", label: "SOFTWARE" }` to `CATEGORIES` in
`data/projects.js`, then use `category: "software"` on projects.
The filter button appears on its own.

### Themes
There are five colour themes, picked with the little swatches in the header:
SIGNAL (default), PIT LANE, POSTER, AMBER and ORBIT. The choice is
remembered in the visitor's browser. You can also force one with a link,
e.g. `projects.html?theme=amber`.

- **Change a theme's colours/fonts:** edit its `[data-theme="..."]` block at
  the bottom of `assets/css/style.css`. SIGNAL is the `:root` block at the top.
- **Add a theme:** copy one of those blocks, give it a new id, and add a line
  for it to `themes` in `data/site.js` (the first entry there is the default).
- **Remove a theme:** delete its line in `data/site.js`.
- New Google Fonts must also be added to the fonts `<link>` in the four
  `.html` files.

### Add a whole new page
1. Copy `about.html` to e.g. `writing.html` and change `data-page="writing"`.
2. Add `{ label: "WRITING", href: "writing.html" }` to `nav` in `data/site.js`.
3. Add a `writing() { return \`...\`; }` function to the `pages` object in
   `assets/js/main.js` that returns the page's HTML.

## If something breaks
A missing comma or quote in a `data/*.js` file is the usual cause: the page
goes blank under the header. Press **F12 → Console** in the browser and it
will tell you the file and line number.

## Going public (later)
- Remove the `<meta name="robots" content="noindex, nofollow">` line from
  the four `.html` files.
- Free hosting options for a static site like this: **GitHub Pages**,
  **Cloudflare Pages** or **Netlify**. Push this folder to a GitHub repo and
  connect it; every `git push` then updates the live site.
- A custom domain (~€10/year) can be pointed at any of them.
