import type { NavLink, Project, SkillGroup, TimelineEntry, SocialLink } from '../types/portfolio';

/* ============================================================================
   CY3ER-CAT PORTFOLIO DATA — single source of truth.
   Every project fact below was verified against the public GitHub
   repositories of https://github.com/CY3ER-CAT on 2026-10-10.
   Items marked REPLACE are placeholders you must edit before deploying.
   ========================================================================== */

export const profile = {
  name: 'Naveenprasanth M',
  handle: 'CY3ER-CAT',
  role: 'Software & Web Developer · Cybersecurity',
  heroHeading: 'Building intelligent experiences beyond the screen.',
  heroSub:
    'I build AI-powered applications, interactive websites and creative digital experiences that turn ideas into useful products.',
  techLine: 'AI · React · TypeScript · 3D Web',
  about: `I'm Naveenprasanth M, a B.E. Computer Science (Cyber Security) student at Rathinam Technical Campus, Coimbatore, working where software, web and security meet. I build practical AI-powered tools — like an offline crop-health app that runs a neural network in the browser — alongside modern web applications and expressive 3D experiences, with an eye for real constraints and interfaces that carry a personality.`,
  email: 'naveenprasanthm55@gmail.com',
  location: 'Dharmapuri, Tamil Nadu',
};

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/CY3ER-CAT' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/naveenprasanth-m-3613a5386' },
];

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'AGRI-DETECT', href: '/projects/agri-detect', route: '/projects/agri-detect' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const projects: Project[] = [
  {
    id: 'agri-detect',
    title: 'AGRI-DETECT',
    tagline: 'Offline, on-device crop-health AI for farmers',
    problem:
      'Farmers need to identify crop problems in the field, where connectivity is unreliable and expert advice is out of reach.',
    summary:
      'A progressive web app that runs a MobileNetV2 neural network entirely inside the browser — no server, no API key, no signal needed. Guides a 6-photo crown scan, returns a combined risk result with a 48-hour early-warning objective, and covers 317 problems with step-by-step treatments in 8 Indian languages, backed by an offline multilingual chatbot with voice replies.',
    contribution: 'Sole developer — dataset preparation, model training, and the full offline-first web app.',
    technologies: ['JavaScript', 'TensorFlow.js', 'MobileNetV2', 'PWA / Service Worker', 'CSS', 'i18n'],
    repoUrl: 'https://github.com/CY3ER-CAT/AGRI-DETECT',
    metrics: [
      { value: '8', label: 'Indian languages' },
      { value: '30', label: 'Crops covered' },
      { value: '317', label: 'Problems + treatments' },
      { value: '4.4 MB', label: 'On-device model' },
    ],
    featured: true,
    caseStudyRoute: '/projects/agri-detect',
    visual: 'agri',
    photo: '/projects/agri-detect.jpg',
    year: '2026',
  },
  {
    id: 'yuvaa-dir-magic',
    title: 'yuvaa-dir-magic',
    tagline: 'TypeScript deployment shell for a business site',
    problem:
      'A licensed building-surveyor business needed a modern, maintainable web presence that could evolve beyond static pages.',
    summary:
      'A TanStack Start + TypeScript + Tailwind application that hosts and serves the Yuvaa Engineers website, giving a static business site a typed, component-driven foundation with Vite tooling and Radix UI primitives.',
    contribution: 'Built and deployed the TypeScript application shell.',
    technologies: ['TypeScript', 'TanStack Start', 'React', 'Tailwind CSS', 'Vite', 'Vercel'],
    repoUrl: 'https://github.com/CY3ER-CAT/yuvaa-dir-magic',
    liveUrl: 'https://yuvaa-dir-magic.vercel.app',
    visual: 'yuvaadir',
    photo: '/projects/yuvaadir.jpg',
    year: '2026',
  },
  {
    id: 'gift-flower-garden',
    title: 'gift-flower-garden',
    tagline: 'An interactive blooming-garden gift experience',
    problem: 'A birthday card for someone special should feel like a small world, not a PDF.',
    summary:
      'A cinematic single-page gift: a 4-digit secret lock, a Venice-style gate that sweeps open into a full-screen blooming garden, falling petals, confetti wishes and a music track with a graceful file-picker fallback. Deployed live as a personalized gift.',
    contribution: 'Design, animation choreography and deployment.',
    technologies: ['HTML', 'CSS animations', 'JavaScript', 'Bootstrap 5', 'Vercel'],
    repoUrl: 'https://github.com/CY3ER-CAT/gift-flower-garden',
    liveUrl: 'https://gift-flower-garden.vercel.app',
    visual: 'flower',
    photo: '/projects/flower.jpg',
    year: '2026',
  },
  {
    id: 'dhanusha',
    title: 'DHANUSHA',
    tagline: 'The secret-garden gift, reimagined for Dhanusha',
    problem: 'The same gift concept, personalized for a different person, needed its own deployment.',
    summary:
      'A sibling of gift-flower-garden with its own secret lock, garden choreography and music — demonstrating how a small interactive concept can be turned into a reusable, re-personalizable template.',
    contribution: 'Adapted and personalized the experience; deployed separately.',
    technologies: ['HTML', 'CSS animations', 'JavaScript', 'Bootstrap 5', 'Vercel'],
    repoUrl: 'https://github.com/CY3ER-CAT/DHANUSHA',
    liveUrl: 'https://dhanusha-two.vercel.app',
    visual: 'flower',
    photo: '/projects/flower2.jpg',
    year: '2026',
  },
  {
    id: 'yuvaa-3',
    title: 'YUVAA-3',
    tagline: 'Business website for Yuvaa Engineers',
    problem:
      'A licensed building surveyor & CSC operator in Dharmapuri, Tamil Nadu needed a clear, trustworthy web presence with service pages and enquiry forms.',
    summary:
      'A fast multi-page static website — home, services, gallery, team, survey and CSC application forms with a contact form — built with semantic HTML, custom CSS and vanilla JavaScript.',
    contribution: 'Designed and built the complete site; deployed to production.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    repoUrl: 'https://github.com/CY3ER-CAT/YUVAA-3',
    liveUrl: 'https://yuvaa-3.vercel.app',
    visual: 'yuvaa3',
    photo: '/projects/yuvaa3.jpg',
    year: '2026',
  },
  {
    id: 'axiom-chain',
    title: 'AXIOM-CHAIN',
    tagline: 'Educational TUI for Tor + proxychains on Kali Linux',
    problem: 'Understanding how Tor circuits and proxy chaining work is easier with a live, inspectable demo.',
    summary:
      'A Bash-built terminal home screen that wires Tor and proxychains4 into an interactive session — connect on open, watch live status, and tear everything down on close. Published strictly as an educational networking tool with a thorough disclaimer.',
    contribution: 'Shell architecture and the interactive status UI.',
    technologies: ['Bash', 'Tor', 'proxychains', 'Linux'],
    repoUrl: 'https://github.com/CY3ER-CAT/AXIOM-CHAIN',
    visual: 'axiom',
    photo: '/projects/axiom.png',
    year: '2026',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    blurb: 'Interfaces shipped to production across business and gift sites.',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Bootstrap 5'],
  },
  {
    category: 'AI Integration',
    blurb: 'Proven on AGRI-DETECT — models and chat running on-device.',
    skills: ['TensorFlow.js', 'MobileNetV2 transfer learning', 'Offline chatbot engine', 'Speech synthesis (TTS)'],
  },
  {
    category: '3D & Motion',
    blurb: 'The experience you are looking at right now.',
    skills: ['Three.js', 'React Three Fiber', 'GSAP + ScrollTrigger', 'CSS keyframe choreography'],
  },
  {
    category: 'Product Craft',
    blurb: 'Constraints-first building for real users.',
    skills: ['Offline-first PWA', 'Localization (8 languages)', 'Responsive UI', 'Accessibility basics'],
  },
  {
    category: 'Tools & Delivery',
    blurb: 'From repo to live URL.',
    skills: ['Git', 'GitHub', 'Vite', 'Vercel'],
  },
  {
    category: 'Cybersecurity',
    blurb: 'Trained in ethical hacking, forensics and web/API security (preparing for CEH).',
    skills: [
      'Penetration Testing',
      'Web & API Security',
      'Vulnerability Research',
      'Ethical Hacking',
      'Digital Forensics',
      'Incident Response',
      'Burp Suite',
      'Nmap',
      'Wireshark',
      'Metasploit',
      'SQLmap',
      'Kali Linux',
      'Postman',
    ],
  },
  {
    category: 'Programming',
    blurb: 'Core languages behind the tooling and coursework.',
    skills: ['Python', 'Java', 'C'],
  },
];

/*
  Timeline — real education (from the CV) followed by a build log whose dates
  come from the public GitHub history of each repository. Employment entries
  are added only when there is a real role to show; keep `kind` accurate.
*/
export const timeline: TimelineEntry[] = [
  {
    date: '2022 – 2023',
    title: 'SSLC — Sri Ram Matriculation Hr. Sec. School',
    detail: 'Completed secondary school with 85%.',
    kind: 'education',
  },
  {
    date: '2024 – 2025',
    title: 'HSC — Sri Ram Matriculation Hr. Sec. School',
    detail: 'Completed higher secondary with 89%.',
    kind: 'education',
  },
  {
    date: '2025 – present',
    title: 'B.E. CSE (Cyber Security) — Rathinam Technical Campus, Coimbatore',
    detail: 'Cyber Security specialisation. Current CGPA 7.59.',
    kind: 'education',
  },
  {
    date: '2026',
    title: 'Certified Ethical Hacker (CEH) — course',
    detail: 'LinkedIn Learning coursework; EC-Council CEH certification exam currently in progress.',
    kind: 'cert',
  },
  {
    date: '2026',
    title: 'Cyber Incident Response & Digital Forensics — course',
    detail: 'LinkedIn Learning coursework in incident response and digital forensics.',
    kind: 'cert',
  },
  {
    date: 'Jun 2026',
    title: 'yuvaa-dir-magic — typed shell for a business site',
    detail: 'TanStack Start + TypeScript application deployed to Vercel.',
    link: 'https://github.com/CY3ER-CAT/yuvaa-dir-magic',
    kind: 'project',
  },
  {
    date: 'Aug 2026',
    title: 'Secret-garden gift experiences',
    detail: 'gift-flower-garden and DHANUSHA — interactive lock-and-bloom cards, deployed live.',
    link: 'https://github.com/CY3ER-CAT/gift-flower-garden',
    kind: 'project',
  },
  {
    date: 'Sep 2026',
    title: 'YUVAA-3 — business website ships',
    detail: 'Multi-page site for Yuvaa Engineers, live on Vercel.',
    link: 'https://github.com/CY3ER-CAT/YUVAA-3',
    kind: 'project',
  },
  {
    date: 'Sep 2026',
    title: 'AGRI-DETECT — on-device crop AI',
    detail: 'Offline PWA: 8 languages, 30 crops, 317 problems, browser-side neural network.',
    link: 'https://github.com/CY3ER-CAT/AGRI-DETECT',
    kind: 'project',
  },
  {
    date: 'Oct 2026',
    title: 'This portfolio',
    detail: 'React Three Fiber cyber-cat scene, GSAP motion system, AGRI-DETECT case study.',
    kind: 'project',
  },
  {
    date: '2026',
    title: 'Project Demo Day 2K26 — Rathinam Technical Campus',
    detail: 'Presented project work at the campus demo day.',
    kind: 'activity',
  },
  {
    date: '2020',
    title: 'Gymnastics — State Level',
    detail: 'Competed at state level.',
    kind: 'activity',
  },
  {
    date: '2018',
    title: 'Chess — District Level',
    detail: 'Competed at district level.',
    kind: 'activity',
  },
  {
    date: '2016',
    title: 'Spell Bee — State Level',
    detail: 'Competed at state level.',
    kind: 'activity',
  },
];

export const agriDetectCaseStudy = {
  stats: [
    { value: '8', label: 'Indian languages — full UI, data, search and voice replies' },
    { value: '30', label: 'Crops — vegetables, fruits, palms, legumes, spices, oilseeds' },
    { value: '317', label: 'Problems — diseases, pests, nutritional disorders' },
    { value: '4.4 MB', label: 'Quantized model — runs fully in the browser' },
  ],
  languages: ['Tamil', 'Hindi', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'English'],
  crops: ['Vegetables', 'Fruits', 'Palms', 'Legumes', 'Spices', 'Oilseeds'],
  model: {
    backbone: 'MobileNetV2 (ImageNet-pretrained)',
    task: 'Binary healthy-vs-diseased leaf classification',
    input: 'RGB 96×96, normalized to [-1, 1]',
    output: 'Single sigmoid → P(healthy) in 0..1',
    framework: 'Keras 3 (TensorFlow 2.19) → TensorFlow.js graph model',
    weights: '4.4 MB after 2-byte quantization',
  },
  training: {
    source: 'PlantVillage — Hemg/new-plant-diseases-dataset (Hugging Face)',
    data: '70,295 labeled leaf images across 38 classes → 16,000 balanced images (8k healthy / 8k diseased)',
    phase1: 'Head-only training on frozen features — Adam 3e-3, 8 epochs, 98.7% validation accuracy',
    phase2: 'Fine-tune top MobileNetV2 blocks + head — Adam 1e-4, 2 epochs, 99.71% validation accuracy',
  },
};
