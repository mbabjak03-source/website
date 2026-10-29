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
      { quote: "I cant summarize this one" },

        "I almost did not buy this car, but let me explain",
      { specs: [
        { label: "CAR", value: "MG , MGB GT , 1970 " },
        { label: "ENGINE", value: " 1800cc B-series - well not anymore" },
        { label: "TIME", value: "8 months" },
      ] },


      { image: "assets/img/MGTUV.jpg", caption: "The second after I got the car trough inspection", wide: true },


      {
        text: [
          "I saw this car pop up on Kleinanzeigen one day for a good price. At the time I was just in teh process of fixing my Dad's Datsun 280zx, so I did not want to get another project",
          "Until my Dad told me, 'Just go get it' ",

          "I sent a message, and the seller told me he already sold it - oh well",

          "Couple days later I get a call from the same seller telling me the previous buyer did not have the money for it",

          "Couple of hours later, I am in the middle of Frankfurt, shaking hands with the seller - apparently some well known movie director, small world",

        ]
      },

      {
        text: [
          "This is the one single image I took when buying it",
          "It's much worse than it looks",
        ],
        image: "assets/img/MGBBUY.jpg",
        caption: "MGB sees daylight for the first time in 5 years of sitting in a garage",
      },


      {
        text: [
          "I'm a Hypocrite. I advise people to never buy cars that have not been used for a while and here I am in Frankfurt buying this MGB GT which stood for more than 5 years in a garage",

          "The car was first registered in Panama (!), then Florida and finally imported into Germany. There it was shoved into a garage and forgotten",

          "At first glance - paint was great, ends about here",
          "There was a mouse nest in the rear right, I will never forget the smell. Also the time that I learned that mouse urine corrodes metal much faster than rainwater",
          "There was no battery at hand, so I was not able to check anything. Rust-wise it looked great (for an MG, other than some fiberglassed stuff up the wheelwell)",
          "I had no idea if the engine even made compression",
           "So naturally I bought the car in cash",

        ]
      },






      { text: "I organized a towing company to tow the car out of Frankfurt (yes I paid full price and left onyl with a signed piece of paper)", image: "assets/img/MGBARRIVE.jpg", caption: "Arrival of the MGB at home - caked in roadsalt", side: "left" },



              { text: "First thin on the list: Get rid of the mouse nest.To this day I fail to comprehend how such tiny animal can cause a smell so bad", image: "assets/img/MOUSE.jpg", caption: "No Eviction notice, straight into the garbage", side: "right" },


    {
      text: [
        "",

      ]
    },




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
