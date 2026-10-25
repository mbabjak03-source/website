// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — your name, tagline, nav and contact links.
//  Edit the values, keep the quotes and commas.
// ─────────────────────────────────────────────────────────────

const SITE = {
  name: "MATEJ BABJAK",
  shortName: "M.BABJAK", // shown in the top-left logo
  tagline: "Engineering student building cars, objects and ideas.",

  // Pages in the top navigation. Add a page here once its .html file exists.
  nav: [
    { label: "ABOUT", href: "about.html" },
    { label: "PROJECTS", href: "projects.html" },
  ],

  // Colour themes, picked with the swatches in the header.
  // The first one is the default. Colours here only draw the swatch;
  // the real theme lives in assets/css/style.css under [data-theme="id"].
  themes: [
    { id: "signal", label: "SIGNAL", swatch: ["#0a0a0a", "#d4ff1a"] },
    { id: "pitlane", label: "PIT LANE", swatch: ["#ece6d6", "#e2483f"] },
    { id: "poster", label: "POSTER", swatch: ["#ece3cf", "#2f8f8a"] },
    { id: "amber", label: "AMBER", swatch: ["#0c0f10", "#ff7a1a"] },
    { id: "orbit", label: "ORBIT", swatch: ["#dce8ec", "#e0322b"] },
  ],

  // Shown in the footer and on the About page. Delete any you don't want.
  links: [
    { label: "EMAIL", href: "mailto:you@example.com" },
    { label: "GITHUB", href: "https://github.com/" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/" },
  ],
};
