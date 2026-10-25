// ─────────────────────────────────────────────────────────────
//  PROJECTS
//  Every project is one { ... } block. Copy one, paste it at the top
//  of the list, change the values. That's how you "post" a project.
//
//  id        unique, lowercase, no spaces. Becomes the link:
//            project.html?id=your-id
//  category  must be one of CATEGORIES below
//  cover     image in assets/img/ (or "" for an empty frame)
//  body      the write-up, one string per paragraph. You can use
//            simple HTML inside, e.g. <strong>bold</strong> or <a href="…">link</a>
//  images    optional extra images shown under the write-up
//  links     optional buttons (repo, video, article…)
//
//  Everything below is PLACEHOLDER content.
// ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "cars", label: "CARS" },
  { id: "design", label: "DESIGN" },
];

const PROJECTS = [
  {
    id: "example-car-build",
    title: "Example Car Build",
    category: "cars",
    year: "2026",
    status: "IN PROGRESS",
    summary: "A short one or two sentence description shown on the projects list.",
    cover: "",
    body: [
      "Start with what the project is and why you started it.",
      "Then the interesting part: problems you hit, how you solved them, what you'd do differently.",
      "Finish with where it stands now.",
    ],
    images: [],
    links: [],
  },
  {
    id: "example-suspension",
    title: "Suspension Rework",
    category: "cars",
    year: "2025",
    status: "DONE",
    summary: "Placeholder project to show how multiple entries in a category look.",
    cover: "",
    body: ["Write-up goes here."],
    images: [],
    links: [],
  },
  {
    id: "example-design",
    title: "Example Design Piece",
    category: "design",
    year: "2025",
    status: "DONE",
    summary: "A design project: product, CAD, graphic, whatever fits.",
    cover: "",
    body: ["Write-up goes here."],
    images: [],
    links: [{ label: "VIEW FILES", href: "https://example.com" }],
  },
];
