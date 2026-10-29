// ─────────────────────────────────────────────────────────────
//  PROJECTS
//  Every project is one { ... } block. Copy one, paste it at the top
//  of the list, change the values. That's how you "post" a project.
//
//  id        unique, lowercase, no spaces. Becomes the link:
//            project.html?id=your-id
//  category  must be one of CATEGORIES below
//  cover     image in assets/img/ (or "" for an empty frame)
//  body      the write-up: a list of blocks, shown top to bottom.
//            Mix them however you like (see "example-car-build"):
//
//    "Some text."                                   a paragraph
//    { heading: "The engine" }                       a section heading
//    { image: "assets/img/a.jpg", caption: "…" }     one image
//    { image: "…", caption: "…", wide: true }        one full-width image
//    { images: ["a.jpg", "b.jpg"], captions: ["…", "…"] }
//                                                    2 or 3 images side by side
//    { text: "…", image: "…", caption: "…" }         text with image on the right
//    { text: "…", image: "…", side: "left" }         …or image on the left
//    { quote: "…" }                                  a big pull-quote
//    { specs: [{ label: "ENGINE", value: "1275cc" }] }
//                                                    a spec table
//
//            "text" can also be a list of paragraphs: ["…", "…"].
//            Captions are optional; images are numbered FIG. 01, 02…
//            Paragraphs may use simple HTML: <strong>bold</strong>, <a href="…">link</a>
//  images    optional gallery of extra images at the very end
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
    id: "MGB",
    title: "1970 MGB GT full restauration",
    category: "cars",
    year: "2026",
    status: "DONE",
    summary: "I can't summarize this rebuild - have a look",
    cover: "",
    body: [

      { heading: "This is a wild one" },
      { quote: "Easy tune up leads to full restoration" },

        "I almost did not buy this car, but let me explain",
      { specs: [
        { label: "CAR", value: "MG , MGB GT , 1970 " },
        { label: "ENGINE", value: " 1800cc B-series - well not anymore" },
        { label: "TIME", value: "8 months" },
      ] },


      { image: "assets/img/MGTUV.jpg", caption: "The second after I got the car trough inspection", wide: true },


      {
        text: [
          "Text next to an image. Good for explaining one specific part or step.",
          "It can be several paragraphs long.",
        ]
      },

      {
        text: [
          "Text next to an image. Good for explaining one specific part or step.",
          "It can be several paragraphs long.",
        ],
        image: "",
        caption: "Image on the right",
      },
      { text: "Same thing, image flipped to the left.", image: "", caption: "Image on the left", side: "left" },

      { heading: "Result" },
      { images: ["", ""], captions: ["Before", "After"] },
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
