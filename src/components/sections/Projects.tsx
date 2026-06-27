// ─────────────────────────────────────────────────────────────
// Projects section — v2
// Three subsections:
// 1. Featured flip cards (top 2 featured projects)
// 2. Horizontal scrollable project showcase (all projects)
// 3. Live site browser previews (iframe embeds)
// 4. GitHub activity graph
// ─────────────────────────────────────────────────────────────

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  IconBrandGithub,
  IconExternalLink,
  IconRotate,
  IconRotateClockwise,
  IconChevronLeft,
  IconChevronRight,
  IconWorldWww,
  IconCode,
} from "@tabler/icons-react"
import { projects, liveSites } from "@/data/portfolio"
import type { Project } from "@/types"
import { useAnalytics } from "@/hooks/useAnalytics"
import { containerVariants, cardVariants, itemVariants } from "@/utils/motion"
import GitHubGraph from "@/components/ui/GitHubGraph"
// @ts-ignore: CSS import handled by bundler
import "./Projects.css"

// ── Flip card ─────────────────────────────────────────────────
interface FlipCardProps {
  project: Project
  index:   number
}

function FlipCard({ project, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const { trackEvent } = useAnalytics()

  return (
    <motion.div
      variants={cardVariants}
      className={`flip-card w-full h-full min-h-[320px] ${flipped ? "flipped" : ""}`}
      onClick={() => {
        const nowFlipped = !flipped
        setFlipped(nowFlipped)
        if (nowFlipped) trackEvent("project-flip", { project: project.name })
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f) }}
    >
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front p-8 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-6">
            <span
              className="font-mono text-[9px] tracking-widest"
              style={{
                background: "linear-gradient(135deg, #35322a 0%, #EF9F27 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.featured && (
              <span className="featured-badge font-mono text-[8px] tracking-[0.14em] uppercase px-2 py-0.5 border border-amber-dim text-amber bg-amber-glow rounded-sm">
                featured
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-sans text-2xl font-bold text-text-primary leading-tight mb-3">{project.name}</h3>
            <p className="font-mono text-[11px] text-amber tracking-wide mb-4 leading-relaxed">{project.tagline}</p>
            <p className="text-text-secondary text-sm leading-relaxed">{project.description.slice(0, 120)}...</p>
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.stackHighlight.slice(0, 4).map((tech: string) => (
                <span key={tech} className="font-mono text-[9px] px-2 py-0.5 border border-amber-dim text-amber bg-amber-glow rounded-sm">{tech}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-text-ghost">{project.year}</span>
              <div className="flip-hint flex items-center gap-1.5 font-mono text-[9px] text-text-tertiary">
                <IconRotate size={11} />flip for stack
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[9px] text-amber tracking-[0.18em] uppercase">tech stack</span>
            <div className="flip-hint flex items-center gap-1 font-mono text-[9px] text-text-tertiary">
              <IconRotateClockwise size={10} />flip back
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.stack.map((tech: string) => {
              const isHighlighted = project.stackHighlight.includes(tech)
              return (
                <span key={tech} className={["font-mono text-[10px] px-2.5 py-1 rounded-sm border", isHighlighted ? "border-amber-dim text-amber bg-amber-glow" : "border-border-strong text-text-secondary"].join(" ")}>
                  {tech}
                </span>
              )
            })}
          </div>
          <p className="text-text-secondary text-sm leading-relaxed flex-1">{project.description}</p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation()
                trackEvent("project-github-click", { project: project.name })
              }}
              className="flex items-center gap-2 font-mono text-[10px] text-text-secondary hover:text-amber transition-colors duration-150 border border-border-strong hover:border-amber-dim px-4 py-2 rounded-sm"
            >
              <IconBrandGithub size={13} />GitHub
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation()
                  trackEvent("project-live-click", { project: project.name })
                }}
                className="flex items-center gap-2 font-mono text-[10px] text-amber hover:text-amber-light transition-colors duration-150 border border-amber-dim hover:border-amber px-4 py-2 rounded-sm"
              >
                <IconExternalLink size={13} />Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Horizontal scroll card ─────────────────────────────────────
interface ScrollCardProps {
  project: Project
  index:   number
}

function ScrollCard({ project, index }: ScrollCardProps) {
  const { trackEvent } = useAnalytics()

  return (
    <div
      className="flex-shrink-0 w-[280px] bg-bg-secondary border border-border-strong rounded-md p-5 flex flex-col justify-between hover:border-amber-dark transition-all duration-200 hover:-translate-y-1 group"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Top */}
      <div>
        <div className="flex items-start justify-between mb-3">
          <span
            className="font-mono text-[9px] tracking-widest"
            style={{
              background: "linear-gradient(135deg, #35322a 0%, #EF9F27 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            {project.liveUrl && (
              <span className="font-mono text-[8px] px-1.5 py-0.5 border border-green-900 text-green-400 rounded-sm">
                live
              </span>
            )}
            <span className="font-mono text-[8px] text-text-ghost">{project.year}</span>
          </div>
        </div>

        <h3 className="font-sans text-sm font-bold text-text-primary mb-1 group-hover:text-amber transition-colors duration-200">
          {project.name}
        </h3>
        <p className="font-mono text-[9px] text-amber mb-3 leading-relaxed">{project.tagline}</p>
        <p className="text-text-secondary text-xs leading-relaxed mb-4">
          {project.description.slice(0, 90)}...
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1">
          {project.stackHighlight.slice(0, 3).map((tech: string) => (
            <span key={tech} className="font-mono text-[8px] px-1.5 py-0.5 border border-amber-dim text-amber rounded-sm">
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="font-mono text-[8px] px-1.5 py-0.5 border border-border text-text-ghost rounded-sm">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom links */}
      <div className="flex gap-2 mt-5 pt-4 border-t border-border">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("scroll-card-github", { project: project.name })}
          className="flex items-center gap-1.5 font-mono text-[9px] text-text-secondary hover:text-amber transition-colors duration-150"
        >
          <IconBrandGithub size={12} />
          <span>GitHub</span>
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("scroll-card-live", { project: project.name })}
            className="flex items-center gap-1.5 font-mono text-[9px] text-amber hover:text-amber-light transition-colors duration-150 ml-auto"
          >
            <IconExternalLink size={12} />
            <span>Live</span>
          </a>
        )}
        {!project.liveUrl && (
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-text-ghost ml-auto">
            <IconCode size={12} />
            <span>No live demo</span>
          </span>
        )}
      </div>
    </div>
  )
}

// ── Browser window preview ─────────────────────────────────────
interface BrowserPreviewProps {
  url:         string
  title:       string
  description: string
  stack:       string[]
}

function BrowserPreview({ url, title, description, stack }: BrowserPreviewProps) {
  const [loaded, setLoaded] = useState(false)
  const { trackEvent } = useAnalytics()

  return (
    <div className="flex flex-col border border-border-strong rounded-lg overflow-hidden bg-bg-secondary hover:border-amber-dark transition-all duration-300 group">

      {/* Browser chrome bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-bg-tertiary border-b border-border-strong flex-shrink-0">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center gap-2 bg-bg-primary border border-border rounded-sm px-3 py-1">
          <IconWorldWww size={10} color="#35322a" />
          <span className="font-mono text-[9px] text-text-tertiary truncate">{url}</span>
        </div>

        {/* Open link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("live-site-open", { site: title })}
          className="flex-shrink-0 flex items-center gap-1 font-mono text-[9px] text-text-secondary hover:text-amber transition-colors duration-150"
        >
          <IconExternalLink size={12} />
        </a>
      </div>

      {/* Amber corner brackets — like the photo frame */}
      <div className="relative" style={{ height: "320px" }}>
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber z-10 pointer-events-none" />

        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-secondary z-10">
            <IconWorldWww size={24} color="#35322a" />
            <div className="w-24 h-px bg-border overflow-hidden">
              <div className="pdf-loading-fill" />
            </div>
            <span className="font-mono text-[9px] text-text-ghost">loading preview...</span>
          </div>
        )}

        {/* iframe */}
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-none"
          style={{
            transform:       "scale(0.75)",
            transformOrigin: "top left",
            width:           "133.33%",
            height:          "133.33%",
            pointerEvents:   "none",
            opacity:         loaded ? 1 : 0,
            transition:      "opacity 0.4s ease",
          }}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* Info bar */}
      <div className="px-5 py-4 border-t border-border flex items-start justify-between gap-4">
        <div>
          <h3 className="font-sans text-sm font-semibold text-text-primary mb-1">{title}</h3>
          <p className="text-text-secondary text-xs leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {stack.map((tech) => (
              <span key={tech} className="font-mono text-[8px] px-1.5 py-0.5 border border-border text-text-secondary rounded-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("live-site-open", { site: title })}
          className="flex-shrink-0 flex items-center gap-1.5 font-mono text-[9px] text-amber hover:text-amber-light border border-amber-dim hover:border-amber px-3 py-2 rounded-sm transition-colors duration-150 whitespace-nowrap"
        >
          <IconExternalLink size={11} />
          Open site
        </a>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: liveRef, inView: liveInView } = useInView({ threshold: 0.1, triggerOnce: true })

  const featuredProjects = projects.filter((p: Project) => p.featured)

  // Horizontal scroll controls
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left:     dir === "left" ? -320 : 320,
      behavior: "smooth",
    })
  }

  return (
    <section id="projects" className="border-b border-border">

      {/* ── Section header ──────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 lg:px-12 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-text-ghost tracking-widest">// 03</span>
          <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">projects</span>
        </div>
        <span className="font-mono text-[9px] text-text-ghost tracking-widest hidden sm:block">
          {projects.length} projects · {liveSites.length} live sites
        </span>
      </div>

      {/* ── 1. Featured flip cards ───────────────────────────── */}
      <div className="border-b border-border">
        <div className="flex items-center gap-3 px-8 lg:px-12 py-3 border-b border-border">
          <span className="font-mono text-[9px] text-text-ghost">—</span>
          <span className="font-mono text-[9px] text-text-secondary tracking-[0.16em] uppercase">featured</span>
        </div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border"
        >
          {featuredProjects.map((project: Project, index: number) => (
            <div key={project.id} className="bg-bg-primary p-8 min-h-[340px]">
              <FlipCard project={project} index={index} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── 2. Horizontal scroll showcase ───────────────────── */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-8 lg:px-12 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-text-ghost">—</span>
            <span className="font-mono text-[9px] text-text-secondary tracking-[0.16em] uppercase">all projects</span>
          </div>
          {/* Scroll controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-7 h-7 flex items-center justify-center border border-border rounded-sm text-text-secondary hover:text-amber hover:border-amber-dim transition-colors duration-150"
              aria-label="Scroll left"
            >
              <IconChevronLeft size={13} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-7 h-7 flex items-center justify-center border border-border rounded-sm text-text-secondary hover:text-amber hover:border-amber-dim transition-colors duration-150"
              aria-label="Scroll right"
            >
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 px-8 lg:px-12 py-6 overflow-x-auto"
          style={{
            scrollSnapType:            "x mandatory",
            WebkitOverflowScrolling:   "touch",
            scrollbarWidth:            "none",
            msOverflowStyle:           "none",
          }}
        >
          {projects.map((project: Project, index: number) => (
            <ScrollCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* ── 3. Live site previews ────────────────────────────── */}
      <div className="border-b border-border">
        <div className="flex items-center gap-3 px-8 lg:px-12 py-3 border-b border-border">
          <span className="font-mono text-[9px] text-text-ghost">—</span>
          <span className="font-mono text-[9px] text-text-secondary tracking-[0.16em] uppercase">live sites</span>
          <span className="font-mono text-[9px] text-text-ghost">· click to open</span>
        </div>

        <motion.div
          ref={liveRef}
          variants={containerVariants}
          initial="hidden"
          animate={liveInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border"
        >
          {liveSites.map((site) => (
            <motion.div key={site.id} variants={itemVariants} className="bg-bg-primary p-6 lg:p-8">
              <BrowserPreview
                url={site.url}
                title={site.title}
                description={site.description}
                stack={site.stack}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── 4. GitHub activity ───────────────────────────────── */}
      <div className="px-8 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-text-ghost tracking-widest">//</span>
            <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">github activity</span>
          </div>
          <a
            href="https://github.com/etkaturan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[10px] text-text-secondary hover:text-amber transition-colors duration-150"
          >
            <IconBrandGithub size={13} />github.com/etkaturan
          </a>
        </div>
        <div className="w-full overflow-x-auto">
          <GitHubGraph username="etkaturan" />
        </div>
      </div>

    </section>
  )
}
