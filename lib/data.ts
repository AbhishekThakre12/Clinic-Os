// ClinicOS — central clinic configuration.
// In a multi-clinic future, this file becomes a per-tenant record fetched by slug.

export const clinic = {
  slug: "vimalai-orthodontic-multispeciality",
  name: "Vimalai Orthodontic & Multispeciality Dental Clinic",
  shortName: "Vimalai Dental",
  tagline: "Transforming Smiles with Advanced Dental Care",
  doctor: {
    name: "Dr. Gananjay Patil",
    qualification: "BDS, MDS – Orthodontics & Dentofacial Orthopaedics",
    experience: "16+ Years",
    bio: "Dr. Gananjay Patil is an experienced orthodontist with over 16 years of expertise in advanced dental treatments including braces, smile design, implants, root canal therapy, pediatric dentistry and cosmetic dentistry. He focuses on painless, ethical and patient-centered dental care using modern technology.",
    memberships: [
      "Indian Dental Association (IDA)",
      "Indian Orthodontic Society (IOS)",
      "Pune Dental Association"
    ],
    timeline: [
      { year: "2008", label: "BDS, completed with distinction" },
      { year: "2011", label: "MDS in Orthodontics & Dentofacial Orthopaedics" },
      { year: "2012–2018", label: "Senior Orthodontist, multispeciality hospitals across Pune" },
      { year: "2018", label: "Founded Vimalai Orthodontic & Multispeciality Dental Clinic" },
      { year: "Present", label: "16+ years, 1000+ smiles transformed" }
    ]
  },
  location: {
    area: "Pimple Saudagar",
    city: "Pune",
    state: "Maharashtra",
    mapsUrl: "https://maps.app.goo.gl/ZzfdG9YCpjGbA18s9",
    mapsEmbedQuery: "Vimalai Orthodontic and Multispeciality Dental Clinic, Pimple Saudagar, Pune"
  },
  phone: "9511237099",
  phoneDisplay: "+91 95112 37099",
  hours: {
    days: "Monday – Saturday",
    morning: "09:30 AM – 01:00 PM",
    evening: "05:30 PM – 10:00 PM"
  },
  stats: [
    { value: "16+", label: "Years Experience" },
    { value: "1000+", label: "Happy Patients" },
    { value: "12+", label: "Treatments Offered" },
    { value: "4.9★", label: "Patient Rating" }
  ]
};

export const whyChooseUs = [
  {
    icon: "GraduationCap",
    title: "Experienced Doctor",
    desc: "16+ years of specialised orthodontic and multispeciality expertise you can rely on."
  },
  {
    icon: "Microscope",
    title: "Modern Technology",
    desc: "Digital diagnostics and contemporary equipment for precise, predictable outcomes."
  },
  {
    icon: "HeartHandshake",
    title: "Pain-Free Treatment",
    desc: "Gentle, ethical techniques designed to keep every visit comfortable and anxiety-free."
  },
  {
    icon: "ShieldCheck",
    title: "Strict Sterilisation",
    desc: "Hospital-grade sterilisation protocols followed for every instrument, every patient."
  },
  {
    icon: "Users",
    title: "Personalised Care",
    desc: "Treatment plans built around your smile goals, timeline and comfort — never one-size-fits-all."
  },
  {
    icon: "CalendarClock",
    title: "Flexible Appointments",
    desc: "Morning and evening slots, six days a week, to fit around your schedule."
  }
];

export const treatments = [
  { icon: "Smile", name: "Braces", desc: "Metal, ceramic and self-ligating braces for precise bite correction." },
  { icon: "Sparkles", name: "Invisible Aligners", desc: "Clear, removable aligners for a discreet straightening journey." },
  { icon: "Wand2", name: "Smile Designing", desc: "Bespoke smile makeovers combining art, proportion and dental science." },
  { icon: "Bolt", name: "Dental Implants", desc: "Permanent, natural-looking tooth replacement with lasting stability." },
  { icon: "Activity", name: "Root Canal Therapy", desc: "Painless, single-sitting root canal treatment using rotary technology." },
  { icon: "Layers", name: "Crowns & Bridges", desc: "Durable, tooth-coloured restorations that blend seamlessly." },
  { icon: "Grid3x3", name: "Dentures", desc: "Comfortable complete and partial dentures custom-fitted to you." },
  { icon: "Sun", name: "Teeth Whitening", desc: "Safe, in-clinic whitening for a brighter smile in one sitting." },
  { icon: "Baby", name: "Kids Dentistry", desc: "Gentle, friendly paediatric dental care that builds confidence early." },
  { icon: "Droplets", name: "Cleaning & Scaling", desc: "Professional cleaning to remove plaque, tartar and surface stains." },
  { icon: "Hammer", name: "Tooth Extraction", desc: "Safe, precise extractions including surgical and wisdom tooth removal." },
  { icon: "Siren", name: "Emergency Dentistry", desc: "Prompt, reliable care for dental emergencies and sudden pain." }
];

export const beforeAfterCases = [
  {
    category: "Braces",
    treatment: "Metal Braces — Crowding Correction",
    duration: "18 months",
    desc: "Severe lower crowding aligned to a balanced, confident smile."
  },
  {
    category: "Smile Design",
    treatment: "Full Smile Makeover",
    duration: "3 sittings",
    desc: "Veneers and contouring used to redesign smile symmetry and shade."
  },
  {
    category: "Implants",
    treatment: "Single Tooth Implant",
    duration: "3 months",
    desc: "Missing molar replaced with a permanent, natural-feeling implant."
  },
  {
    category: "Whitening",
    treatment: "Professional Whitening",
    duration: "1 sitting",
    desc: "Stained enamel restored to a bright, even, natural-looking shade."
  },
  {
    category: "Root Canal",
    treatment: "Root Canal + Crown",
    duration: "2 sittings",
    desc: "Infected tooth saved and restored with a tooth-coloured crown."
  },
  {
    category: "Braces",
    treatment: "Invisible Aligners — Spacing",
    duration: "10 months",
    desc: "Front tooth spacing closed discreetly with clear aligner therapy."
  }
];

export const testimonials = [
  {
    initials: "R.K.",
    treatment: "Braces Treatment",
    rating: 5,
    review: "Eighteen months of treatment felt easy thanks to Dr. Patil's clear explanations at every step. My bite and confidence have both improved enormously."
  },
  {
    initials: "S.M.",
    treatment: "Dental Implant",
    rating: 5,
    review: "I was nervous about an implant, but the procedure was calm, precise and genuinely painless. It feels like my own tooth again."
  },
  {
    initials: "A.P.",
    treatment: "Smile Designing",
    rating: 5,
    review: "The clinic understood exactly what I wanted before I could fully explain it. The result looks completely natural, not 'done'."
  },
  {
    initials: "N.D.",
    treatment: "Kids Dentistry",
    rating: 5,
    review: "My daughter actually looks forward to her dental visits now. Patient, gentle and wonderful with children."
  },
  {
    initials: "V.J.",
    treatment: "Root Canal",
    rating: 5,
    review: "Finished in a single sitting with barely any discomfort. I wish I'd come here years earlier instead of avoiding the dentist."
  },
  {
    initials: "K.S.",
    treatment: "Invisible Aligners",
    rating: 5,
    review: "Professional from the first consultation to the final review appointment. The clinic itself feels calm and genuinely premium."
  }
];

export const galleryCategories = ["Clinic", "Reception", "Equipment", "Doctor", "Treatment Room"] as const;

export const galleryImages = [
  { category: "Clinic", alt: "Clinic exterior signage" },
  { category: "Reception", alt: "Clinic reception lounge" },
  { category: "Equipment", alt: "Modern dental chair and equipment" },
  { category: "Doctor", alt: "Dr. Gananjay Patil at the clinic" },
  { category: "Treatment Room", alt: "Sterile treatment room" },
  { category: "Clinic", alt: "Waiting area interiors" },
  { category: "Equipment", alt: "Digital diagnostic equipment" },
  { category: "Reception", alt: "Front desk and welcome area" },
  { category: "Treatment Room", alt: "Orthodontic treatment chair" }
];

export const faqs = [
  { q: "Do you offer a free first consultation?", a: "Yes, your first consultation includes a clinical examination and treatment discussion with Dr. Patil at no extra cost." },
  { q: "Are your treatments painful?", a: "We use modern, gentle techniques and effective anaesthesia protocols designed to keep every procedure as comfortable as possible." },
  { q: "How long does braces treatment usually take?", a: "Most braces treatments take between 12 and 24 months, depending on the complexity of the case, reviewed at each visit." },
  { q: "Do you offer invisible aligners?", a: "Yes, we offer clear, removable aligner therapy as a discreet alternative to traditional braces." },
  { q: "Is root canal treatment completed in one sitting?", a: "Many root canal cases are completed in a single sitting using rotary technology, though some cases need two visits." },
  { q: "Do you treat children?", a: "Yes, we provide gentle paediatric dental care designed to make children comfortable and confident at the dentist." },
  { q: "What sterilisation standards do you follow?", a: "We follow hospital-grade sterilisation protocols for all instruments, with single-use disposables wherever applicable." },
  { q: "Do you provide dental implants?", a: "Yes, we offer single and multiple tooth implants planned with detailed diagnostic imaging." },
  { q: "How much does teeth whitening cost?", a: "Whitening pricing depends on the technique and your current shade; this is discussed transparently during consultation." },
  { q: "Do you accept walk-in patients?", a: "We recommend booking an appointment to minimise your wait, but walk-ins are accommodated wherever possible." },
  { q: "What are your clinic timings?", a: "We are open Monday to Saturday, 09:30 AM–01:00 PM and 05:30 PM–10:00 PM." },
  { q: "Is parking available at the clinic?", a: "Yes, convenient parking is available near the clinic in Pimple Saudagar." },
  { q: "Do you treat dental emergencies?", a: "Yes, we accommodate emergency cases such as sudden pain, swelling or trauma during clinic hours." },
  { q: "How often should I get a dental cleaning?", a: "We recommend a professional cleaning and check-up every six months for most patients." },
  { q: "Do you offer EMI or payment plans for major treatments?", a: "Flexible payment options can be discussed for larger treatments like implants, braces and full smile makeovers." },
  { q: "Can I see before-and-after results of past patients?", a: "Yes, our Before & After gallery showcases real results across braces, implants, whitening and smile design cases." },
  { q: "What should I bring for my first visit?", a: "Please bring any previous dental records or X-rays you have, along with a valid ID." },
  { q: "Do you treat gum disease?", a: "Yes, we diagnose and treat gum disease through scaling, root planing and ongoing periodontal care." },
  { q: "How experienced is Dr. Patil in orthodontics?", a: "Dr. Patil holds an MDS in Orthodontics & Dentofacial Orthopaedics with over 16 years of clinical experience." },
  { q: "How do I book an appointment?", a: "You can book directly through our online appointment form or call the clinic to schedule a convenient slot." }
];
