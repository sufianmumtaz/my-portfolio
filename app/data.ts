export type Accent = "primary" | "secondary" | "tertiary";

export type IconName =
  | "home" | "user" | "hub" | "folder" | "mail" | "clock" | "arrowDown" | "arrowRight" | "external"
  | "route" | "shield" | "brain" | "rocket" | "tree" | "layers" | "stats" | "bot" | "timeline"
  | "graduation" | "code" | "server" | "database" | "cloud" | "linkedin" | "phone" | "file"
  | "chevronDown" | "chevronUp" | "check" | "spinner" | "send" | "sparkles";

export type HeadlineSegment = { text: string; highlight?: boolean };

export const profile = {
  name: "Sufian Mumtaz",
  initials: "SM",
  role: "Senior Full Stack Engineer",
  portrait: { src: "/profile.png", alt: "Portrait of Sufian Mumtaz" },
  clock: { cityCode: "LHR", timeZone: "Asia/Karachi" },
  email: "safyanmumtaz@gmail.com",
  phone: "+92 306 4570107",
  phoneHref: "tel:+923064570107",
  linkedin: "https://www.linkedin.com/in/sufian-mumtaz-585353221",
  resume: "/Sufian_Mumtaz_Resume.pdf",
};

export const nav: { id: string; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "user" },
  { id: "services", label: "Services", icon: "hub" },
  { id: "work", label: "Work", icon: "folder" },
  { id: "contact", label: "Contact", icon: "mail" },
];

export const sidebar = {
  spotlight: {
    eyebrow: "Project Spotlight",
    title: "LawBridge & AI Inspections",
    cta: { label: "View Case Study", href: "#work" },
  },
  socials: [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "Resume", href: profile.resume },
  ],
};

export const hero = {
  availability: "Available for Work",
  headline: [
    { text: "Building" },
    { text: "AI-Powered", highlight: true },
    { text: "Products & Scalable SaaS." },
  ] as HeadlineSegment[],
  subheadline:
    "Senior Full Stack Engineer with 4+ years of experience. I build AI-powered products, multi-tenant SaaS platforms and enterprise workflow apps across React/Next.js, Node.js, Python and the cloud.",
  actions: [
    { label: "Start a Project", href: "#contact", variant: "primary" as const },
    { label: "View My Work", href: "#work", variant: "secondary" as const },
  ],
  scrollBadge: { text: "LET'S COLLABORATE • ", repeat: 2, href: "#about", spinSeconds: 14 },
  metrics: [
    { value: "5+", label: "Platforms Shipped", accent: "primary" },
    { value: "40+", label: "Technologies", accent: "secondary" },
    { value: "Senior", label: "Full Stack Engineer", accent: "tertiary" },
    { value: "4+", label: "Years Experience", accent: "primary-container", icon: "clock" as IconName },
  ],
  marquee: {
    label: "Companies & products",
    separator: "✦",
    speedSeconds: 28,
    items: ["AB{ARK}", "Solutions Loft", "Saldiri SMC", "LawBridge", "TAPMS", "Aramco CMS", "Polypo"],
  },
};

export const about = {
  headline: [
    { text: "Product-minded." },
    { text: "Security-first.", highlight: true },
    { text: "Fluent in full-stack and AI." },
  ] as HeadlineSegment[],
  body:
    "I work across the whole stack, from React/Next.js interfaces to Django, FastAPI and NestJS backends, PostgreSQL and the cloud. My focus is AI/LLM orchestration, RAG, multi-tenant architecture and secure API design, so that AI features ship as reliable, production-grade systems.",
  anchorStats: [
    { label: "Experience", value: "4+ Years" },
    { label: "Focus", value: "AI & SaaS" },
  ],
  diagram: {
    center: "SM.",
    spinSeconds: 20,
    nodes: [
      { id: "ai", label: "AI / LLM Systems", accent: "tertiary" as Accent },
      { id: "fullstack", label: "Full-Stack Dev", accent: "primary" as Accent },
      { id: "saas", label: "SaaS Architecture", accent: "secondary" as Accent },
    ],
  },
  principles: {
    label: "Work Principles",
    items: [
      {
        icon: "route" as IconName,
        accent: "primary" as Accent,
        title: "Own it end to end",
        body: "From the database schema to the deploy pipeline, I build features as complete systems, not isolated tickets, and stay accountable once they reach production.",
      },
      {
        icon: "shield" as IconName,
        accent: "secondary" as Accent,
        title: "Security is a feature",
        body: "RBAC, object-level isolation, tenant scoping and server-side handling of prompts and provider keys are designed in from day one, not bolted on later.",
      },
      {
        icon: "brain" as IconName,
        accent: "tertiary" as Accent,
        title: "AI with structure",
        body: "LLMs are most useful inside well-defined pipelines: grounded retrieval, calibrated context, structured outputs and persisted state you can audit and trust.",
      },
    ],
  },
};

export const services = {
  eyebrow: "Expertise",
  headline: [{ text: "How I can help" }, { text: "your product ship.", highlight: true }] as HeadlineSegment[],
  body: "Bridging complex technical requirements and intuitive user experiences, from the model and the API to the interface and the infrastructure.",
  emblem: { icon: "rocket" as IconName, spinSeconds: 20 },
  items: [
    {
      icon: "tree" as IconName,
      title: "AI & LLM Engineering",
      body: "Production AI features built on Anthropic Claude, OpenAI and Gemini, with grounded context, structured scoring and multimodal pipelines.",
      bullets: ["RAG & Vector Search", "Context Orchestration", "Structured AI Scoring", "Whisper & Media AI"],
    },
    {
      icon: "layers" as IconName,
      title: "Full-Stack Development",
      body: "Responsive, maintainable web applications with React/Next.js on the front and Node.js or Python services behind them.",
      bullets: ["React & Next.js", "Node.js / NestJS", "Django REST & FastAPI", "Responsive UI"],
    },
    {
      icon: "stats" as IconName,
      title: "SaaS Architecture",
      body: "Multi-tenant platforms with clear domain boundaries, secure access control, real-time workflows and reliable background processing.",
      bullets: ["Multi-Tenancy", "RBAC & Data Isolation", "Queues & Background Jobs", "Real-time with Socket.IO"],
    },
    {
      icon: "bot" as IconName,
      badge: true,
      title: "Cloud & DevOps",
      body: "Repeatable, cloud-native delivery on AWS and GCP, from containerised services to infrastructure as code and CI/CD.",
      bullets: ["AWS & GCP", "Docker", "Terraform", "CI/CD Pipelines"],
      tags: ["React", "Next.js", "Django", "FastAPI", "NestJS", "PostgreSQL", "Claude", "Weaviate"],
    },
  ],
};

export const process = {
  eyebrow: "How I Work",
  title: "From idea to production, without surprises.",
  steps: [
    {
      icon: "route" as IconName,
      title: "Discover",
      body: "Clarify goals, users and constraints. I map the domain, data and risks before any code is written.",
    },
    {
      icon: "layers" as IconName,
      title: "Architect",
      body: "Design the data model, APIs, auth boundaries and AI pipeline so the system scales cleanly.",
    },
    {
      icon: "code" as IconName,
      title: "Build",
      body: "Ship in small, reviewable increments with typed APIs, tests where they matter and regular demos.",
    },
    {
      icon: "rocket" as IconName,
      title: "Launch & Support",
      body: "Containerised, repeatable deploys with CI/CD, monitoring and hand-off docs, plus support after launch.",
    },
  ],
};

export const work = {
  eyebrow: "Scroll to explore",
  headline: [{ text: "Selected" }, { text: "Works &", highlight: true }, { text: "Experience" }] as HeadlineSegment[],
  body: "A curated selection of platforms I've built, shipped and scaled, from AI-powered products to multi-tenant SaaS and enterprise systems.",
  projects: [
    {
      id: "lawbridge",
      pipeline: ["Student Input", "RAG · Weaviate", "Calibration Refs", "Student Memory", "Claude Scoring"],
      index: "01",
      category: "AI Assessment Platform",
      accent: "primary" as Accent,
      title: "LawBridge",
      body: "AI-powered legal skills assessment platform. Engineered a four-layer AI context architecture (system prompt, RAG retrieval, calibration references and per-student memory) with server-side orchestration of Claude for structured scoring and feedback.",
      tags: ["Next.js", "Django REST", "PostgreSQL", "Claude", "Weaviate", "Stripe"],
    },
    {
      id: "inspections",
      pipeline: ["Video · Photo · Audio", "FFmpeg", "Whisper", "Gemini / OpenAI", "Bilingual PDF"],
      index: "02",
      category: "AI PropTech",
      accent: "secondary" as Accent,
      title: "AI Inspection Platform",
      body: "Multi-tenant move-in / move-out inspection platform that turns property video, photo and audio into AI-assisted findings and bilingual PDF reports, using FFmpeg, Whisper and multimodal Gemini/OpenAI analysis.",
      tags: ["React", "FastAPI", "Whisper", "Gemini", "GCP", "Terraform"],
    },
    {
      id: "tapms",
      pipeline: ["Tenant Context", "RBAC", "Domain Modules", "Redis Queues", "Socket.IO Live"],
      index: "03",
      category: "Multi-Tenant SaaS",
      accent: "tertiary" as Accent,
      title: "TAPMS",
      body: "Enterprise property and hotel management platform spanning reservations, housekeeping, maintenance, inventory, compliance and reporting, with tenant isolation, RBAC and real-time updates over Socket.IO and Redis.",
      tags: ["React", "NestJS", "Redis", "Socket.IO", "RBAC"],
    },
    {
      id: "aramco",
      pipeline: ["JWT + SMS 2FA", "CMS Workflows", "MongoDB Pipelines", "Leaderboards", "Dashboards"],
      index: "04",
      category: "Enterprise Platform",
      accent: "primary" as Accent,
      title: "Aramco CMS",
      body: "CMS and employee onboarding platform for web and mobile, with JWT auth, SMS 2FA, department management, analytics dashboards and MongoDB aggregation pipelines for scoring and leaderboards.",
      tags: ["Next.js", "NestJS", "MongoDB", "JWT", "Recharts"],
    },
    {
      id: "polypo",
      pipeline: ["User Images", "Next.js Portal", "Flask Services", "AI Models", "Avatar & Try-On"],
      index: "05",
      category: "AI Avatar Platform",
      accent: "secondary" as Accent,
      title: "Polypo",
      body: "Microservices-based digital avatar and virtual try-on platform. Built Next.js experiences and Flask integrations that process user images and attributes for AI-generated avatars and brand portals.",
      tags: ["Next.js", "Flask", "Python", "AI Models"],
    },
  ],
  cta: { label: "Download Full Resume", href: profile.resume },
  trackRecord: {
    title: "Track Record",
    body: "A chronological journey through full-stack development, SaaS architecture and AI engineering.",
    roles: [
      {
        title: "Senior Full Stack Engineer",
        company: "ABARK Solutions",
        period: "09/2025 - Present",
        accent: "primary",
        body: "Engineer end-to-end production features across React/Next.js, Django/DRF and FastAPI, PostgreSQL and cloud infrastructure. Built the LawBridge assessment architecture around Claude, RAG/Weaviate and student memory, and harden auth boundaries with role/capability permissions and object-level isolation.",
        tags: ["Next.js", "Django", "FastAPI", "Claude", "AWS", "GCP"],
      },
      {
        title: "Full Stack Engineer",
        company: "Solutions Loft Pvt",
        period: "10/2023 - 08/2025",
        accent: "secondary",
        body: "Owned end-to-end delivery across React/Next.js and Node.js/Express/NestJS. Designed REST APIs, RBAC and business workflows, implemented Redis queues and Socket.IO real-time features, and delivered multi-tenant capabilities with strict tenant isolation.",
        tags: ["NestJS", "MongoDB", "MySQL", "Redis", "Docker"],
      },
      {
        title: "Full Stack Developer",
        company: "Saldiri SMC Pvt",
        period: "09/2022 - 09/2023",
        accent: "tertiary",
        body: "Developed full-stack applications with React, Node.js, Express and MongoDB from Figma designs to production, including Getting Board features such as Formik/Yup validation, Quill.js email templates, Redux state and search/filter workflows.",
        tags: ["React", "Redux", "Express", "MongoDB"],
      },
    ],
  },
  credentials: {
    eyebrow: "Credentials",
    title: "Education & Toolbox",
    items: [
      { icon: "graduation" as IconName, accent: "primary" as Accent, title: "BS Information Technology", subtitle: "University of Gujrat", issuer: "2018 - 2022" },
      { icon: "code" as IconName, accent: "secondary" as Accent, title: "Frontend", subtitle: "React, Next.js, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS, Material UI, Radix UI, React Flow, Recharts, React Hook Form, Zod", issuer: "14 tools" },
      { icon: "server" as IconName, accent: "tertiary" as Accent, title: "Backend", subtitle: "Node.js, NestJS, Express.js, Python, Django, DRF, FastAPI, Flask, REST APIs, gRPC, WebSockets, Socket.IO", issuer: "12 tools" },
      { icon: "database" as IconName, accent: "primary" as Accent, title: "Databases", subtitle: "PostgreSQL, MongoDB, MySQL, MariaDB, Redis, Django ORM, SQLAlchemy, Mongoose, Sequelize, Lucid ORM", issuer: "10 tools" },
      { icon: "brain" as IconName, accent: "secondary" as Accent, title: "AI / LLM", subtitle: "Anthropic Claude, OpenAI, Gemini, Whisper, RAG, Weaviate, Vector Search", issuer: "7 tools" },
      { icon: "cloud" as IconName, accent: "tertiary" as Accent, title: "Cloud & DevOps", subtitle: "AWS, GCP, Docker, Terraform, CI/CD, Cloud Tasks", issuer: "6 tools" },
    ],
  },
};

export const contact = {
  eyebrow: "Get in Touch",
  headline: [{ text: "Let's build" }, { text: "extraordinary.", highlight: true }] as HeadlineSegment[],
  body: "Have an AI feature to ship, a SaaS platform to scale or a role to fill? I'm open to new projects, contract work and full-time engineering roles.",
  availability: { label: "Available for new projects", detail: "Lahore, PK" },
  links: [
    { eyebrow: "Email directly", value: profile.email, href: `mailto:${profile.email}`, icon: "mail" as IconName },
    { eyebrow: "Call / WhatsApp", value: profile.phone, href: profile.phoneHref, icon: "phone" as IconName },
  ],
  socials: [
    { label: "LinkedIn", handle: "sufian-mumtaz", href: profile.linkedin, icon: "linkedin" as IconName, accent: "secondary" as Accent, external: true },
    { label: "Resume", handle: "Download PDF", href: profile.resume, icon: "file" as IconName, accent: "tertiary" as Accent, external: false },
  ],
  panel: { status: "System Online", caption: "Lahore, PK" },
  form: {
    fields: {
      name: { label: "Name", placeholder: "Jane Doe" },
      email: { label: "Email", placeholder: "jane@example.com" },
      projectType: { label: "Project Type", placeholder: "Select an area of focus" },
      message: { label: "Transmission Details", placeholder: "Describe the problem we are solving..." },
    },
    projectTypes: [
      { value: "ai", label: "AI / LLM Engineering" },
      { value: "fullstack", label: "Full-Stack Development" },
      { value: "saas", label: "SaaS Architecture" },
      { value: "role", label: "Full-time Role" },
      { value: "other", label: "Other Inquiry" },
    ],
    note: "Delivered straight to my inbox",
    submit: "Initialize Protocol",
    sending: "Transmitting...",
    success: {
      title: "Transmission Received",
      body: "Thanks for reaching out — your message is in my inbox. I'll get back to you shortly.",
      reset: "New Message",
    },
  },
  footer: { note: "Sufian Mumtaz, designed and built in Lahore.", backToTop: "Back to top" },
};
