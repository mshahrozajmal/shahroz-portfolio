// Single source of content. All copy here follows the LinkedIn source of truth
// and the humanize rules (no em dashes, no "&" in prose, no tilde before numbers,
// no banned words, first person, concrete claims).

const BASE = import.meta.env.BASE_URL

export const img = (name) => `${BASE}${name}`

export const profile = {
  name: 'Muhammad Shahroz Ajmal',
  role: 'Quality Assurance Engineer',
  location: 'Lahore, Pakistan',
  email: 'mshahrozajmal6@gmail.com',
  phone: '0317 472 3360',
  phoneHref: '+923174723360',
  linkedin: 'https://www.linkedin.com/in/mshahroz',
  linkedinLabel: 'linkedin.com/in/mshahroz',
  // Pipes are allowed here only: this is the headline format, not a paragraph.
  headline:
    'Quality Assurance Engineer | 500+ Defects Caught Across 5 Shipped Products | Manual, Exploratory & API Testing (Postman) | Requirement Traceability | Growing into Automation',
  positioning: 'Different products. Different approach.',
  intro:
    'I break software before your users do. I am a QA engineer with three years in manual, exploratory, and API testing. I catch defects early, write bug reports developers can act on, and validate AI and LLM features across Agile teams.',
}

export const nav = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
]

// Hero terminal log. Matches the v3 signature element exactly (no symbols).
export const terminalLines = [
  { text: '$ run qa-report.log', kind: 'cmd' },
  { text: 'defects_found: 500+', kind: 'out' },
  { text: 'products_tested: 5', kind: 'out' },
  { text: 'coverage: +40%', kind: 'out' },
  { text: 'post_release_defects: -30%', kind: 'out' },
  { text: 'status: PASSED', kind: 'pass' },
]

export const heroStats = [
  { value: 3, suffix: '', label: 'Years in QA' },
  { value: 5, suffix: '', label: 'Products shipped' },
  { value: 500, suffix: '+', label: 'Defects documented' },
  { value: 10, suffix: '+', label: 'Projects delivered' },
]

export const marquee = [
  'Manual Testing', 'Exploratory', 'API Testing (Postman)', 'RTM Traceability',
  'Bug Life Cycle', 'Regression', 'Agile / Scrum', 'AI / LLM Testing',
  'Jira', 'Zephyr', 'GitHub Issues',
]

export const about = {
  heading: 'Quality is not a stage at the end. It is how I work from the first sprint.',
  paras: [
    'I am a Quality Assurance Engineer based in Lahore with three years of hands-on testing. My day to day is test planning, scenario and test-case design, black-box and functional testing, defect reporting, and mapping test cases back to requirements in Agile and Scrum teams.',
    'Across 10+ projects I have handled four to five concurrent international client accounts and documented 500+ defects. I move fast when I need to. I tested a full product in about two weeks and cleared four products in a month and a half. Every product I tested shipped to production.',
    'I also come from UI/UX and requirement engineering, with MERN basics. I test products the way their makers design and build them.',
  ],
  chips: ['Lahore, Pakistan', 'Manual and AI/LLM Testing', 'Four to five client accounts', 'COMSATS, Lahore'],
  badge: { title: 'In the QA seat', sub: 'dashboards, bug reports, RTM' },
}

export const skillGroups = [
  {
    title: 'Testing Types',
    items: ['Manual', 'Exploratory', 'Functional', 'Regression', 'Smoke', 'Sanity', 'Black Box', 'Grey Box', 'Static', 'Dynamic'],
  },
  {
    title: 'Test Design and Planning',
    items: ['Test Strategy', 'Test Scenarios', 'Test Cases', 'RTM Traceability', 'Test Coverage', 'Boundary Value Analysis', 'Equivalence Partitioning'],
  },
  {
    title: 'Defect Management',
    items: ['Bug Reporting', 'Bug Life Cycle', 'Defect Tracking', 'Severity and Priority', 'Monthly Reports'],
  },
  {
    title: 'AI and LLM Testing',
    items: ['Prompt Testing', 'Chatbot Testing', 'Model Validation', 'Accuracy Checks', 'Hallucination Detection'],
  },
  {
    title: 'Tools',
    items: ['Postman', 'Jira', 'Zephyr', 'Trello', 'GitHub Issues', 'Figma', 'Framer'],
  },
  {
    title: 'Process and Methodology',
    items: ['SDLC', 'STLC', 'Agile', 'Scrum', 'Daily Stand-ups', 'Sprint Planning', 'Change Control', 'Cross-team Collaboration'],
  },
  {
    title: 'Additional Knowledge',
    items: ['Requirement Engineering', 'SRS Documentation', 'Functional and Non-Functional Requirements', 'UI/UX Design', 'MERN (basic)'],
  },
]

export const growingInto = {
  note: 'Automation is where I am headed next. I am learning these on my own time, so I list them as in progress, not as skills I claim yet.',
  items: ['Selenium', 'Cypress', 'Playwright', 'Appium', 'JMeter', 'JUnit'],
}

export const metrics = [
  { value: 30, suffix: '%', label: 'Fewer post-release defects', note: 'Clearer, properly formatted bug reports cut post-release defects by about 30%.' },
  { value: 40, suffix: '%', label: 'More test coverage', note: 'Module and feature-wise test cases raised coverage by about 40%.' },
  { value: 35, suffix: '%', label: 'Faster defect detection', note: 'Tighter regression cycles surfaced defects about 35% sooner.' },
  { value: 25, suffix: '%', label: 'Better AI/LLM reliability', note: 'Prompt and output-accuracy checks improved AI response reliability by about 25%.' },
]

export const experience = [
  {
    role: 'Quality Assurance Engineer',
    company: 'LeapSoft',
    period: 'May 2024 to Present',
    place: 'Lahore, On-site',
    active: true,
    bullets: [
      'I run QA for four to five international client products at once, using black-box, functional, regression, and user-flow testing to keep releases on schedule.',
      'Documented 400+ defects across four products with clear, reproducible bug reports, cutting post-release defects by about 30%.',
      'Test AI and LLM features by checking model responses, prompt handling, and output accuracy, improving response reliability by about 25%.',
      'Wrote module and feature-wise test cases and scenarios, raising test coverage by about 40%.',
      'Report daily on Trello, log issues on GitHub, and send enhancement recommendations that improved usability by about 20%.',
      'Produce monthly bug and enhancement reports and keep test cases mapped to requirements for change control.',
    ],
  },
  {
    role: 'Quality Assurance Engineer',
    company: 'Code19',
    period: 'Jul 2023 to Apr 2024',
    place: 'Lahore, On-site',
    active: false,
    bullets: [
      'Wrote test plans, strategies, scenarios, and detailed test cases for multiple product releases.',
      'Ran manual functional, regression, smoke, and sanity testing across release cycles, improving defect detection by about 35%.',
      'Documented 100+ defects and applied static and dynamic testing, with test cases traced to product documentation.',
      'Joined daily scrums and sprint planning with developers and the wider team.',
    ],
  },
  {
    role: 'UI/UX Designer, Freelance',
    company: 'Lafacil Solutions',
    period: 'Jul 2023 to Jul 2024',
    place: 'Remote',
    active: false,
    bullets: [
      'Designed web and mobile interfaces in Figma and Framer for client products.',
      'This is where I learned to read a product the way its designers and builders do, which sharpens how I test.',
    ],
  },
  {
    role: 'Requirement Engineer, Internship',
    company: 'Roche',
    period: 'Oct 2021 to Jan 2022',
    place: 'Bulgaria, Hybrid',
    active: false,
    bullets: [
      'Gathered and documented functional and non-functional requirements and wrote SRS documentation.',
      'First real exposure to how clear requirements make a product testable.',
    ],
  },
]

export const projects = [
  {
    id: 'jesy',
    name: 'Jesy',
    category: 'Artist Collaboration Platform',
    role: 'QA Engineer, RTM, 99 Bugs',
    featured: true,
    desc:
      'Jesy is a collaboration platform for artists, venues, and brands. It came with documentation, so I tested it with full requirement traceability and mapped every test case to its SRS section. I logged 99 bugs across the dashboard, user and profile management, bulk invites, audit logs, and support tickets. On escrow payments I covered held, released, refunded, disputed, and failed states, plus role-gated release and double-refund prevention.',
    severity: { critical: 20, high: 40, medium: 39 },
    stats: [
      { v: '99', k: 'bugs logged' },
      { v: 'Full', k: 'RTM to SRS' },
      { v: '5', k: 'escrow states' },
    ],
    tags: ['Manual', 'RTM', 'Escrow', 'Regression', 'Bug Life Cycle'],
  },
  {
    id: 'visalay',
    name: 'Visalay',
    category: 'Visa Processing Platform',
    role: 'QA Engineer, Reverse-Engineered, Test Suite',
    featured: false,
    desc:
      'Visalay is our own product, and it shipped without documentation. So I reverse-engineered it: explore, infer, document, then test, and built the full test suite from there. It handles visa processing with autofill and OCR for 10+ countries, AI readiness scoring, payments, and a super-admin visa builder. My test cases followed a 12-field template. One example, TC_LG_12, caught a Google OAuth 505 failure on login.',
    stats: [
      { v: '10+', k: 'countries (OCR)' },
      { v: '12', k: 'field TC template' },
      { v: 'TC_LG_12', k: 'sample case' },
    ],
    tags: ['Exploratory', 'OCR', 'Payments', 'AI Scoring', 'Test Suite'],
  },
  {
    id: 'goodnest',
    name: 'Goodnest',
    category: 'Community Platform, Flutter mobile',
    role: 'QA Engineer, API, Mobile',
    featured: false,
    desc:
      'Goodnest is a community platform built on Flutter for mobile. I tested community creation, admin and moderator roles, and three invite paths: QR, email, and URL. I covered ticket and inbox management and three Stripe membership tiers, and ran API testing on both the platform and the mobile app.',
    stats: [
      { v: '3', k: 'Stripe tiers' },
      { v: '3', k: 'invite paths' },
      { v: 'API', k: 'platform + mobile' },
    ],
    tags: ['Mobile', 'API Testing', 'Stripe', 'Roles'],
  },
  {
    id: 'wxw',
    name: 'WXW Delivery Delight',
    category: 'Food-Truck Delivery App',
    role: 'QA Engineer, GitHub Bug Life Cycle',
    featured: false,
    desc:
      'WXW Delivery Delight is a food-truck delivery app spanning a customer app, a truck admin panel, and a super-admin panel. I ran the full bug life cycle on GitHub with P1, P2, and P3 labels. One bug sticks with me: a developer closed it as resolved, and I reopened it the same day because it still failed for real customers. Resolved on the board is not the same as fixed for the user.',
    stats: [
      { v: '3', k: 'connected apps' },
      { v: 'P1/P2/P3', k: 'GitHub labels' },
      { v: 'Full', k: 'bug life cycle' },
    ],
    tags: ['Regression', 'GitHub', 'Priority Labels', 'Payments'],
  },
  {
    id: 'wrestlemania',
    name: 'Pakistan Wrestlemania',
    category: 'Personal, Full-Stack',
    role: 'Developer, MERN Stack',
    featured: false,
    desc:
      'A personal full-stack project on the MERN stack: MongoDB, Express, React, and Node. Building it from scratch made me a better tester. When you have shipped the bug yourself, you write clearer reports and reason about root causes faster.',
    stats: [
      { v: 'MERN', k: 'full stack' },
      { v: 'Solo', k: 'built end to end' },
    ],
    tags: ['MERN', 'React', 'Node', 'Personal'],
  },
]

export const achievements = [
  'Delivered QA for 10+ projects in a single year while handling four to five client accounts at once.',
  'Cleared four products in about a month and a half, and tested a full product in about two weeks.',
  'Documented 500+ defects across five products. Every one of them shipped to production.',
  'Built Pakistan Wrestlemania, a full-stack MERN app, on my own from the ground up.',
]

export const education = {
  degree: 'BS Software Engineering',
  place: 'COMSATS University Islamabad, Lahore Campus',
  period: 'Sep 2020 to Jan 2024',
}

export const contact = {
  heading: 'Have a product that needs solid QA before it ships?',
  body:
    'I am open to QA Engineer roles and freelance testing work. Send me the product and what worries you about it, and I will tell you how I would test it.',
  locationPill: 'Lahore, PK, open to work',
}
