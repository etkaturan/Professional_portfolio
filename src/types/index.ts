// ─────────────────────────────────────────────────────────────
// Global TypeScript types for the entire portfolio
// Every data shape used across components is defined here
// ─────────────────────────────────────────────────────────────

// ── Project card ─────────────────────────────────────────────
export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  year: string
  stack: string[]          // tech chips — highlighted ones first
  stackHighlight: string[] // which stack items get amber highlight
  githubUrl: string
  liveUrl?: string         // optional — not all projects are deployed
  featured: boolean        // featured projects appear in hero panel
}

// ── Work experience entry ─────────────────────────────────────
export interface Experience {
  id: string
  role: string
  company: string
  type: string             // e.g. "Research Assistant", "Freelance"
  period: string           // e.g. "Oct 2024 – Jan 2025"
  location: string
  bullets: string[]        // impact bullet points
  stack: string[]          // technologies used in this role
}

// ── Education entry ───────────────────────────────────────────
export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  grade?: string           // optional — not all entries have grades
  gradeNote?: string       // e.g. "(German scale, 1.0 = best)"
  thesis?: string          // optional thesis description
  thesisGrade?: string
  note?: string            // e.g. transfer note
}

// ── Skill category ────────────────────────────────────────────
export interface SkillCategory {
  category: string         // e.g. "Frontend", "AI / ML"
  skills: Skill[]
}

export interface Skill {
  name: string
  level: number            // 0–100 — used for animated bar width
  icon?: string            // devicon class name e.g. "devicon-react-original"
}

// ── Stack icon (tech wall) ────────────────────────────────────
export interface StackIcon {
  name: string
  icon: string             // devicon class name
  url: string              // link to official docs/site
}

// ── Language ──────────────────────────────────────────────────
export interface Language {
  name: string
  level: string            // e.g. "C2", "B1"
  label: string            // e.g. "Native", "Professional"
}

// ── Social link ───────────────────────────────────────────────
export interface SocialLink {
  label: string
  url: string
  icon: string             // tabler icon name e.g. "IconBrandGithub"
}

// ── Stat (hero strip) ─────────────────────────────────────────
export interface Stat {
  value: string
  label: string
}

// ── Section ID — used for scroll tracking + nav highlighting ──
export type SectionId =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "education"
  | "contact"