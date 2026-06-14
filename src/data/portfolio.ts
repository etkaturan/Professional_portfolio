// ─────────────────────────────────────────────────────────────
// All portfolio content lives here as structured TypeScript
// Edit this file to update any content on the site —
// no component files need to be touched for content changes
// ─────────────────────────────────────────────────────────────

import type {
  Project,
  Experience,
  Education,
  SkillCategory,
  StackIcon,
  Language,
  SocialLink,
  Stat,
} from "../types"

// ── Personal info ─────────────────────────────────────────────
export const personal = {
  firstName:    "Mekhmetetka",
  lastName:     "Turan",
  title:        "Full-Stack Developer & AI Engineer",
  email:        "etkatur11@gmail.com",
  phone:        "+49 162 7686845",
  location:     "Fürth, Germany",
  locationCode: "DE",
  coordinates:  "49.48°N · 10.98°E",
  timezone:     "Europe/Berlin",
  available:    true,
  workAuth:     "EU Blue Card on job offer",
  github:       "https://github.com/etkaturan",
  linkedin:     "https://linkedin.com/in/etka-turan",
  cvUrl:        "/cv/Mekhmetetka_Turan_CV.pdf",

  // Typewriter role lines — cycles through these in the hero
  roles: [
    "Full-Stack Developer",
    "AI Systems Engineer",
    "React · TypeScript · Python",
    "Research Software Engineer",
  ],

  // Short bio shown in hero left panel
  bio: "Building AI-powered research tools, language learning platforms & production web applications. Sole architect from scaffold to v1.0 across 10+ versioned releases.",

  // Longer bio shown in About section
  aboutBio: [
    "Junior Full-Stack Developer focused on React, TypeScript, and Python — with practical experience building web applications, desktop software, and AI-powered systems through university research, a student assistantship, and freelance client projects.",
    "Based in Fürth, Germany, currently completing a B.Sc. in Computer Science at Hof University of Applied Sciences. Eligible for EU Blue Card upon job offer.",
    "Interested in full-stack engineering, backend development, and AI-integrated software. I build things end-to-end — from system architecture to deployment — and take ownership of the full lifecycle.",
  ],
}

// ── Stats (hero strip) ────────────────────────────────────────
export const stats: Stat[] = [
  { value: "5+",  label: "Projects"   },
  { value: "1", label: "Yrs exp"    },
  { value: "5",  label: "Languages"  },
  { value: "B.Sc", label: "Graduated" },
]

// ── Social links ──────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: "GitHub",   url: "https://github.com/etkaturan",            icon: "IconBrandGithub"   },
  { label: "LinkedIn", url: "https://linkedin.com/in/etka-turan",      icon: "IconBrandLinkedin" },
  { label: "Email",    url: "mailto:etkatur11@gmail.com",              icon: "IconMail"          },
]

// ── Projects ──────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id:           "awen",
    name:         "Awen",
    tagline:      "AI-Powered German Language Learning Platform",
    description:  "Full-stack desktop and web application for B2 German exam preparation. Combines AI conversation, TTS audio playback, listening comprehension exercises, and vocabulary flashcards. AI evaluation via Groq API returns structured fluency, accuracy, and vocabulary scores with response times under 2 seconds.",
    year:         "2024",
    stack:        ["React", "TypeScript", "FastAPI", "Tauri", "LLaMA 3", "SQLite", "Edge TTS"],
    stackHighlight: ["React", "TypeScript", "FastAPI", "Tauri"],
    githubUrl:    "https://github.com/etkaturan/Awen",
    featured:     true,
  },
  {
    id:           "ai-spatial-hypertext",
    name:         "AI Spatial Hypertext",
    tagline:      "Knowledge Graph Research Tool",
    description:  "Web application enabling AI-assisted exploration and population of spatial hypertext knowledge graphs. NLP pipeline for Named Entity Recognition and Relation Extraction automatically structures unstructured text into Neo4j graph nodes and relationships. LangChain-powered chat interface allows researchers to query the graph without writing Cypher.",
    year:         "2024",
    stack:        ["Flask", "Python", "Neo4j", "LangChain", "NER", "Relation Extraction"],
    stackHighlight: ["Flask", "Neo4j", "LangChain"],
    githubUrl:    "https://github.com/etkaturan/ai-supported-spatial-hypertext-",
    featured:     true,
  },
  {
    id:           "face-auth",
    name:         "Face Authentication App",
    tagline:      "Computer Vision Authentication System",
    description:  "Desktop authentication app using computer vision. Registers multiple users, captures live snapshots, and grants access when face similarity exceeds a configurable threshold. Multi-user ranking displays recognized faces in descending confidence order.",
    year:         "2023",
    stack:        ["Python", "OpenCV", "React", "Face Recognition"],
    stackHighlight: ["Python", "OpenCV", "React"],
    githubUrl:    "https://github.com/etkaturan/Face-Authentication-App",
    featured:     false,
  },
]

// ── Work experience ───────────────────────────────────────────
export const experience: Experience[] = [
  {
    id:       "student-assistant",
    role:     "Student Research Assistant",
    company:  "Hof University of Applied Sciences",
    type:     "Visual Analytics Lab",
    period:   "Oct 2024 – Jan 2025",
    location: "Germany",
    bullets: [
      "Extended the AI Spatial Hypertext application post-internship — added new NLP entity types, improved Neo4j graph traversal queries, and integrated additional LangChain chains",
      "Collaborated directly with research supervisors, translating academic research requirements into working software on a tight semester schedule",
    ],
    stack: ["Python", "Neo4j", "LangChain", "Flask"],
  },
  {
    id:       "internship",
    role:     "Internship — Visual Analytics",
    company:  "Hof University of Applied Sciences",
    type:     "Research Internship",
    period:   "Mar 2024 – Jun 2024",
    location: "Germany",
    bullets: [
      "Designed and built an NLP-powered chatbot system integrating NER, Relation Extraction, and knowledge storage in Neo4j — sole developer, delivered working research prototype within a 3-month internship",
      "System was adopted by the Visual Analytics research group and formed the foundation for the subsequent student assistantship role",
    ],
    stack: ["Python", "Neo4j", "LangChain", "NLP", "Flask"],
  },
  {
    id:       "freelance",
    role:     "Freelance Web Developer",
    company:  "Remote",
    type:     "Freelance",
    period:   "Dec 2022 – Apr 2023",
    location: "Remote",
    bullets: [
      "Delivered multiple production e-commerce websites for clients using Flask, React, Docker, and AWS — handled full project lifecycle from requirements to deployment",
    ],
    stack: ["React", "Flask", "Docker", "AWS"],
  },
  {
    id:       "volunteer",
    role:     "Programming Teacher",
    company:  "Volunteer",
    type:     "Community",
    period:   "Apr 2025 – Jul 2025",
    location: "Nuremberg, Germany",
    bullets: [
      "Taught programming fundamentals to refugees in Nuremberg — adapted technical concepts for learners with no prior coding experience",
    ],
    stack: [],
  },
]

// ── Education ─────────────────────────────────────────────────
export const education: Education[] = [
  {
    id:          "hof",
    degree:      "B.Sc. Computer Science",
    institution: "Hof University of Applied Sciences",
    location:    "Germany",
    period:      "2023 – 2026",
    grade:       "2.4",
    gradeNote:   "German scale — 1.0 is best",
    thesis:      "Hybrid AI framework combining Generative AI with spatial hypertext to support human-AI collaborative knowledge building",
    thesisGrade: "2.3",
    note: "Dual-degree programme DE + KZ · Graduated March 2026 · Taught in English",
  },
  {
    id:          "sdu",
    degree:      "B.Sc. Computer Science",
    institution: "SDU University",
    location:    "Almaty, Kazakhstan",
    period:      "2020 – 2023",
    note:        "Transferred to Hof University (Germany) in 2023 · Taught in English",
  },
]

// ── Skills ────────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React",       level: 90 },
      { name: "TypeScript",  level: 88 },
      { name: "Vite",        level: 82 },
      { name: "Tailwind CSS",level: 85 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Python",      level: 88 },
      { name: "FastAPI",     level: 82 },
      { name: "Flask",       level: 80 },
      { name: "Node.js",     level: 72 },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "LangChain",   level: 78 },
      { name: "LLaMA 3",     level: 75 },
      { name: "OpenCV",      level: 70 },
      { name: "Whisper",     level: 65 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL",  level: 75 },
      { name: "Neo4j",       level: 80 },
      { name: "SQLite",      level: 82 },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker",      level: 72 },
      { name: "AWS",         level: 65 },
      { name: "GitHub Actions", level: 70 },
      { name: "Linux",       level: 75 },
    ],
  },
]

// ── Tech stack icons (the icon wall) ─────────────────────────
export const stackIcons: StackIcon[] = [
  { name: "TypeScript", icon: "devicon-typescript-plain",    url: "https://www.typescriptlang.org" },
  { name: "React",      icon: "devicon-react-original",      url: "https://react.dev" },
  { name: "Python",     icon: "devicon-python-plain",        url: "https://www.python.org" },
  { name: "FastAPI",    icon: "devicon-fastapi-plain",       url: "https://fastapi.tiangolo.com" },
  { name: "Flask",      icon: "devicon-flask-original",      url: "https://flask.palletsprojects.com" },
  { name: "Neo4j",      icon: "devicon-neo4j-plain",         url: "https://neo4j.com" },
  { name: "Docker",     icon: "devicon-docker-plain",        url: "https://docker.com" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain",    url: "https://postgresql.org" },
  { name: "SQLite",     icon: "devicon-sqlite-plain",        url: "https://sqlite.org" },
  { name: "Git",        icon: "devicon-git-plain",           url: "https://git-scm.com" },
  { name: "Linux",      icon: "devicon-linux-plain",         url: "https://kernel.org" },
  { name: "AWS",        icon: "devicon-amazonwebservices-plain", url: "https://aws.amazon.com" },
  { name: "Vite",       icon: "devicon-vitejs-plain",        url: "https://vitejs.dev" },
  { name: "Tailwind",   icon: "devicon-tailwindcss-plain",   url: "https://tailwindcss.com" },
]

// ── Languages ─────────────────────────────────────────────────
export const languages: Language[] = [
  { name: "English",  level: "C2", label: "Fluent"        },
  { name: "German",   level: "B1", label: "Intermediate"  },
  { name: "Turkish",  level: "C2", label: "Native"        },
  { name: "Kazakh",   level: "B2", label: "Upper-Inter."  },
  { name: "Russian",  level: "B1", label: "Intermediate"  },
]