/* ==========================================================================
   JPR.RAW — central configuration. Edit this file to change content.
   Images: run `python tools/optimize.py`, then add/reorder entries below.
   ========================================================================== */
window.JPR_CONFIG = {
  brand: "JPR.RAW",
  imageBase: "assets/images/portfolio/", // folder holding <file>-480|960|1600.webp
  widths: [480, 960, 1600],

  // Category order in the filter bar. Categories with no photos are hidden.
  categories: ["Portraits", "Family", "Street", "Nature", "Details"],

  about: {
    placeholder: false,
    heading: "JPR.RAW — More Than a Photograph",
    paragraphs: [
      "At JPR.RAW, I believe every image has a story worth telling.",
      "My work focuses on capturing genuine moments, meaningful details, and the atmosphere that makes every experience unique. Through photography and short-form video, I aim to create visual content that feels natural, intentional, and timeless.",
      "From portraits and couples to lifestyle, special occasions, and creative projects, my approach combines attention to detail, thoughtful composition, and a cinematic visual style.",
      "As an emerging photographer and content creator, I bring a fresh perspective, a commitment to continuous improvement, and a personal approach to every project. I take the time to understand each client’s vision, communicate clearly, and work toward delivering images and videos they can feel proud to share.",
      "Whether you want to preserve a meaningful moment or create engaging content for your brand, JPR.RAW is here to help you tell your story through visuals."
    ],
    closing: "Your moments. Your vision. Your story — captured with intention."
  },

  /* Packages, add-ons and booking policies. All text is editable here.
     badge: optional label ("Most popular"); featured: true = most prominent card.
     Booking policies are proposed terms: review them before publishing. */
  plans: {
    heading: "Choose your session.",
    intro: "Transparent pricing in US dollars. Message me to book your date or ask any question.",
    groups: [
      {
        title: "Photography",
        items: [
          { name: "Essential", price: "$125", duration: "30-minute session",
            description: "A simple, personalized photography experience designed to capture your personality and the moments that matter most.",
            includes: ["8 professionally edited photographs", "One person or one couple", "One location", "Basic posing guidance", "High-resolution digital delivery"],
            ideal: "Portraits, profile photos, and personal social media content." },
          { name: "Signature", price: "$195", duration: "60-minute session", badge: "Most popular", featured: true,
            description: "More time, more variety, and a more personalized experience. Designed to capture authentic moments through a refined, cinematic visual style.",
            includes: ["20 professionally edited photographs", "Up to two outfits", "One location", "Posing guidance and creative direction", "Signature color grading", "Private digital gallery"],
            ideal: "Couples, lifestyle sessions, portraits, birthdays, and personal branding." },
          { name: "Signature Plus", price: "$295", duration: "90-minute session",
            description: "A complete photography experience for those who want more variety, creative flexibility, and a carefully curated collection of images.",
            includes: ["35 professionally edited photographs", "Up to three outfits", "Up to two nearby locations within the booked session time", "Additional creative direction and pose variations", "Color grading and basic retouching", "Private digital gallery"],
            ideal: "Special occasions, extended portraits, couples, and personal branding." }
        ]
      },
      {
        title: "Photo + Video Content",
        note: "These packages cover short-form content creation for social media, not full-scale commercial film production.",
        items: [
          { name: "Social Starter", price: "$225", duration: "1-hour content session",
            description: "Photography and short-form video in one convenient package, helping you capture your personality, your brand, or your special moments in a natural and engaging way.",
            includes: ["10 professionally edited photographs", "2 edited vertical videos, approximately 15–30 seconds each", "Short candid clips suitable for Instagram Stories", "Social-media-ready vertical framing", "Digital delivery"],
            ideal: "Creators, small businesses, lifestyle content, and small celebrations." },
          { name: "Social Signature", price: "$395", duration: "2-hour content session", badge: "Recommended", featured: true,
            description: "A more complete visual content experience combining photography and short-form video to tell your story with consistency, creativity, and a cinematic touch.",
            includes: ["20 professionally edited photographs", "4 edited vertical videos, approximately 15–45 seconds each", "Candid clips for Stories", "Behind-the-scenes moments and details", "Basic content planning before the session", "Organized digital delivery"],
            ideal: "Entrepreneurs, local businesses, creators, small events, and brand content." }
        ]
      }
    ],
    cta: "Book this package",
    addons: {
      title: "Additional Services",
      note: "Optional extras. Additional services must be agreed upon before the booking.",
      items: [
        { label: "Additional edited photograph", price: "$10" },
        { label: "Additional vertical video, up to 30 seconds", price: "$40" },
        { label: "Additional 30 minutes of photography", price: "$50" },
        { label: "Additional 30 minutes of combined photo and video coverage", price: "$75" },
        { label: "Express delivery, when available", price: "From $40" },
        { label: "Travel outside the included service area", price: "Custom quote" }
      ]
    },
    policies: {
      title: "Booking Information",
      items: [
        "A 30% deposit reserves your date.",
        "The remaining balance is due by the session or event date.",
        "Photography delivery target: 7–10 business days.",
        "Video delivery target: 10–14 business days.",
        "RAW files and unedited footage are not included unless agreed upon.",
        "Travel costs are disclosed before booking.",
        "Cancellation and rescheduling terms are shared clearly before you book.",
        "Portfolio use respects client permission and applicable privacy requirements."
      ]
    }
  },

  // Only items with a value are shown. Instagram handle: no "@".
  contact: {
    location: "New Jersey, USA",
    instagram: "jpr.raw",
    phone: "2016061309", // call + text (US number, digits only)
    email: "",     // e.g. "you@example.com"
    whatsapp: "",  // digits only with country code, e.g. "15551234567"
    other: []      // e.g. [{ label: "Behance", url: "https://..." }]
  },

  /* One entry per photograph, shown in this order.
     file     : base name (no size suffix, no extension) of the derivative files
     w, h     : pixel size of the original (printed by tools/optimize.py)
     category : must match one of the names above
     featured : optional, reserved for future highlighting
     caption  : optional short line under the image in the viewer            */
  photos: [
    { file: "dsc0099",  w: 2576, h: 1449, category: "Family",    title: "Held in the Light",    alt: "A father lifts his baby toward the setting sun, flare glowing through the trees beside a green corner house.", caption: "Golden hour, late spring.", featured: true },
    { file: "dsc01490", w: 1449, h: 2576, category: "Portraits", title: "Sunflowers at Dusk",   alt: "A young woman in black looks to the side at dusk, a red flower in her hair and an armful of sunflowers." },
    { file: "dsc05145", w: 1934, h: 2576, category: "Portraits", title: "Quiet Regard",         alt: "Portrait of a woman with long dark hair and cat-eye glasses, head tilted, looking into the camera in soft window light." },
    { file: "dsc01380", w: 1934, h: 2576, category: "Family",    title: "First Light",          alt: "A baby in a grey sleeper holds a window curtain and glances away, lit by bright window light." },
    { file: "dsc00851", w: 2576, h: 1450, category: "Street",    title: "Breaking Through",     alt: "Rays of light break through heavy clouds above a silhouetted city street and trees." },
    { file: "dsc0097",  w: 1449, h: 2576, category: "Street",    title: "Sun Through the Leaves", alt: "The sun flares through a canopy of trees beside a round green house tower." },
    { file: "img6727",  w: 1932, h: 2576, category: "Portraits", title: "Sky on Fire",          alt: "A woman shields her eyes, holding sunflowers beneath a vivid pink sunset sky over a field." },
    { file: "dsc00407", w: 1449, h: 2576, category: "Family",    title: "Little Cowboy",        alt: "A baby in a leather hat and cream shirt sits in an armchair, looking curiously past a blurred cake in the foreground." },
    { file: "dsc01466", w: 1449, h: 2576, category: "Nature",    title: "Facing the Sun",       alt: "A single sunflower in sharp focus in front of a field of sunflowers under a blue sky." },
    { file: "dsc00866", w: 2576, h: 1449, category: "Street",    title: "Rush Hour Sun",        alt: "Low sun above slow evening traffic and streetlights on a city avenue." },
    { file: "dsc01241", w: 1449, h: 2576, category: "Family",    title: "In Monochrome",        alt: "Black and white portrait of a baby in a crib, one hand at his chin, looking off-frame." },
    { file: "dsc0098",  w: 2576, h: 2576, category: "Family",    title: "Weightless",           alt: "A father kisses the cheek of his baby, held up against a sun-filled tree canopy." },
    { file: "dsc00863", w: 1449, h: 2576, category: "Street",    title: "Hydrant No. 16",       alt: "A yellow fire hydrant with a green cap seen through a car window, framed by the side mirror." },
    { file: "dsc00859", w: 2576, h: 1449, category: "Street",    title: "Red Light",            alt: "Backlit city street at sunset, a dark sedan stopped at a red traffic light." },
    { file: "img6752",  w: 1932, h: 2576, category: "Portraits", title: "Behind the Lens",      alt: "A photographer seen from behind raises a camera toward a pink and orange sunset over a field." },
    { file: "dsc01585", w: 1449, h: 2576, category: "Details",   title: "Ten Months",           alt: "A hand holds a blue and green birthday cake with paper decorations, set against a blurred room." },
    { file: "dsc00977", w: 2576, h: 1934, category: "Details",   title: "Molten",               alt: "A chocolate lava cake with sauce and a scoop of ice cream, warm bokeh lights behind." }
  ]
};
