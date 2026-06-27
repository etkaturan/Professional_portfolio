// ─────────────────────────────────────────────────────────────
// Projects section — v4
// Live sites block:
// - Default: horizontal scroll, all sites in equal-width cards
// - Expanded: grid layout (2 or 3 cols desktop, 1 col mobile)
// - Show more / Show less toggle
// - Full width, balanced alignment
// ─────────────────────────────────────────────────────────────

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react"
import { projects, liveSites } from "@/data/portfolio"
import type { Project } from "@/types"
import { useAnalytics } from "@/hooks/useAnalytics"
import { containerVariants, cardVariants, itemVariants } from "@/utils/motion"
import GitHubGraph from "@/components/ui/GitHubGraph"
// @ts-ignore: CSS import handled by bundler
import "./Projects.css"

// ── Flip card ─────────────────────────────────────────────────
function FlipCard({ project, index }: { project: Project; index: number }) {
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
        <div className="flip-card-front p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-6">
            <span className="font-mono text-[9px] tracking-widest" style={{ background: "linear-gradient(135deg, #35322a 0%, #EF9F27 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.featured && (
              <span className="featured-badge font-mono text-[8px] tracking-[0.14em] uppercase px-2 py-0.5 border border-amber-dim text-amber bg-amber-glow rounded-sm">featured</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-text-primary leading-tight mb-3">{project.name}</h3>
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

        <div className="flip-card-back p-6 sm:p-8 flex flex-col justify-between">
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
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.stopPropagation(); trackEvent("project-github-click", { project: project.name }) }} className="flex items-center gap-2 font-mono text-[10px] text-text-secondary hover:text-amber transition-colors duration-150 border border-border-strong hover:border-amber-dim px-4 py-2 rounded-sm">
              <IconBrandGithub size={13} />GitHub
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.stopPropagation(); trackEvent("project-live-click", { project: project.name }) }} className="flex items-center gap-2 font-mono text-[10px] text-amber hover:text-amber-light transition-colors duration-150 border border-amber-dim hover:border-amber px-4 py-2 rounded-sm">
                <IconExternalLink size={13} />Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Horizontal scroll project card ────────────────────────────
function ScrollCard({ project, index }: { project: Project; index: number }) {
  const { trackEvent } = useAnalytics()
  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[280px] bg-bg-secondary border border-border-strong rounded-md p-5 flex flex-col justify-between hover:border-amber-dark transition-all duration-200 hover:-translate-y-1 group" style={{ scrollSnapAlign: "start" }}>
      <div>
        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-[9px] tracking-widest" style={{ background: "linear-gradient(135deg, #35322a 0%, #EF9F27 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            {project.liveUrl && <span className="font-mono text-[8px] px-1.5 py-0.5 border border-green-900 text-green-400 rounded-sm">live</span>}
            <span className="font-mono text-[8px] text-text-ghost">{project.year}</span>
          </div>
        </div>
        <h3 className="font-sans text-sm font-bold text-text-primary mb-1 group-hover:text-amber transition-colors duration-200">{project.name}</h3>
        <p className="font-mono text-[9px] text-amber mb-3 leading-relaxed">{project.tagline}</p>
        <p className="text-text-secondary text-xs leading-relaxed mb-4">{project.description.slice(0, 90)}...</p>
        <div className="flex flex-wrap gap-1">
          {project.stackHighlight.slice(0, 3).map((tech: string) => (
            <span key={tech} className="font-mono text-[8px] px-1.5 py-0.5 border border-amber-dim text-amber rounded-sm">{tech}</span>
          ))}
          {project.stack.length > 3 && <span className="font-mono text-[8px] px-1.5 py-0.5 border border-border text-text-ghost rounded-sm">+{project.stack.length - 3}</span>}
        </div>
      </div>
      <div className="flex gap-2 mt-5 pt-4 border-t border-border">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("scroll-card-github", { project: project.name })} className="flex items-center gap-1.5 font-mono text-[9px] text-text-secondary hover:text-amber transition-colors duration-150">
          <IconBrandGithub size={12} />GitHub
        </a>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("scroll-card-live", { project: project.name })} className="flex items-center gap-1.5 font-mono text-[9px] text-amber hover:text-amber-light transition-colors duration-150 ml-auto">
            <IconExternalLink size={12} />Live
          </a>
        ) : (
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-text-ghost ml-auto">
            <IconCode size={12} />No live demo
          </span>
        )}
      </div>
    </div>
  )
}

// ── Browser preview card ───────────────────────────────────────
function BrowserPreview({ url, title, description, stack }: { url: string; title: string; description: string; stack: string[] }) {
  const [loaded, setLoaded] = useState(false)
  const { trackEvent } = useAnalytics()

  return (
    <div className="flex flex-col border border-border-strong rounded-lg overflow-hidden bg-bg-secondary hover:border-amber-dark transition-all duration-300 w-full">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-bg-tertiary border-b border-border-strong flex-shrink-0">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex items-center gap-2 bg-bg-primary border border-border rounded-sm px-3 py-1 min-w-0">
          <IconWorldWww size={10} color="#35322a" style={{ flexShrink: 0 }} />
          <span className="font-mono text-[9px] text-text-tertiary truncate">{url}</span>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("live-site-open", { site: title })} className="flex-shrink-0 text-text-secondary hover:text-amber transition-colors duration-150 p-1">
          <IconExternalLink size={12} />
        </a>
      </div>

      {/* Preview iframe */}
      <div className="relative w-full" style={{ height: "500px" }}>
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber z-10 pointer-events-none" />

        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-secondary z-10">
            <IconWorldWww size={20} color="#35322a" />
            <div className="w-20 h-px bg-border overflow-hidden rounded">
              <div className="pdf-loading-fill" />
            </div>
            <span className="font-mono text-[9px] text-text-ghost">loading preview...</span>
          </div>
        )}

        <iframe
          src={url}
          title={title}
          style={{
            position:        "absolute",
            top:             0,
            left:            0,
            width:           "133.33%",
            height:          "133.33%",
            border:          "none",
            transform:       "scale(0.75)",
            transformOrigin: "top left",
            pointerEvents:   "none",
            opacity:         loaded ? 1 : 0,
            transition:      "opacity 0.4s ease",
          }}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* Info */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-sans text-sm font-semibold text-text-primary">{title}</h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("live-site-open", { site: title })}
            className="flex-shrink-0 flex items-center gap-1.5 font-mono text-[9px] text-amber hover:text-amber-light border border-amber-dim hover:border-amber px-2.5 py-1.5 rounded-sm transition-colors duration-150 whitespace-nowrap"
          >
            <IconExternalLink size={11} />Open
          </a>
        </div>
        <p className="text-text-secondary text-xs leading-relaxed mb-2">{description}</p>
        <div className="flex flex-wrap gap-1">
          {stack.map((tech) => (
            <span key={tech} className="font-mono text-[8px] px-1.5 py-0.5 border border-border text-text-secondary rounded-sm">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
export default function Projects() {
  const projectsScrollRef = useRef<HTMLDivElement>(null)
  const liveSitesScrollRef = useRef<HTMLDivElement>(null)

  const { ref, inView }                       = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: liveRef, inView: liveInView }  = useInView({ threshold: 0.05, triggerOnce: true })

  // 0 = collapsed (horizontal scroll)
  // 1+ = expanded (grid, +3 per level)
  const [expandLevel, setExpandLevel] = useState(0)

  const featuredProjects = projects.filter((p: Project) => p.featured)
  const ITEMS_PER_LEVEL  = 3
  const visibleCount     = expandLevel === 0 ? liveSites.length : Math.min(ITEMS_PER_LEVEL * (expandLevel + 1), liveSites.length)
  const visibleSites     = liveSites.slice(0, visibleCount)
  const hasMore          = visibleCount < liveSites.length
  const canCollapse      = expandLevel > 0

  const scrollProjects = (dir: "left" | "right") => {
    projectsScrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" })
  }

  const scrollLiveSites = (dir: "left" | "right") => {
    liveSitesScrollRef.current?.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" })
  }

  return (
    <section id="projects" className="border-b border-border">

      {/* Section header */}
      <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-text-ghost tracking-widest">// 03</span>
          <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">projects</span>
        </div>
        <span className="font-mono text-[9px] text-text-ghost tracking-widest hidden sm:block">
          {projects.length} projects · {liveSites.length} live sites
        </span>
      </div>

      {/* ── 1. Featured flip cards ─────────────────────────── */}
      <div className="border-b border-border">
        <div className="flex items-center gap-3 px-6 sm:px-8 lg:px-12 py-3 border-b border-border">
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
            <div key={project.id} className="bg-bg-primary p-6 sm:p-8 min-h-[300px] sm:min-h-[340px]">
              <FlipCard project={project} index={index} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── 2. All projects horizontal scroll ──────────────── */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-text-ghost">—</span>
            <span className="font-mono text-[9px] text-text-secondary tracking-[0.16em] uppercase">all projects</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollProjects("left")} className="w-7 h-7 flex items-center justify-center border border-border rounded-sm text-text-secondary hover:text-amber hover:border-amber-dim transition-colors duration-150">
              <IconChevronLeft size={13} />
            </button>
            <button onClick={() => scrollProjects("right")} className="w-7 h-7 flex items-center justify-center border border-border rounded-sm text-text-secondary hover:text-amber hover:border-amber-dim transition-colors duration-150">
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
        <div
          ref={projectsScrollRef}
          className="flex gap-4 px-6 sm:px-8 lg:px-12 py-6 overflow-x-auto"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project: Project, index: number) => (
            <ScrollCard key={project.id} project={project} index={index} />
          ))}
          {/* Right padding sentinel */}
          <div className="flex-shrink-0 w-4 sm:w-8 lg:w-12" />
        </div>
      </div>

      {/* ── 3. Live sites ──────────────────────────────────── */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-text-ghost">—</span>
            <span className="font-mono text-[9px] text-text-secondary tracking-[0.16em] uppercase">live sites</span>
            <span className="font-mono text-[9px] text-text-ghost hidden sm:block">
              {expandLevel === 0 ? "· swipe or use arrows" : `· ${visibleCount} of ${liveSites.length} shown`}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Scroll arrows — only in collapsed mode */}
            {expandLevel === 0 && (
              <>
                <button onClick={() => scrollLiveSites("left")} className="w-7 h-7 flex items-center justify-center border border-border rounded-sm text-text-secondary hover:text-amber hover:border-amber-dim transition-colors duration-150">
                  <IconChevronLeft size={13} />
                </button>
                <button onClick={() => scrollLiveSites("right")} className="w-7 h-7 flex items-center justify-center border border-border rounded-sm text-text-secondary hover:text-amber hover:border-amber-dim transition-colors duration-150">
                  <IconChevronRight size={13} />
                </button>
              </>
            )}

            {/* Show less */}
            {canCollapse && (
              <button
                onClick={() => setExpandLevel((l) => Math.max(0, l - 1))}
                className="flex items-center gap-1.5 font-mono text-[9px] text-text-secondary hover:text-amber border border-border hover:border-amber-dim px-3 py-1.5 rounded-sm transition-colors duration-150"
              >
                <IconChevronUp size={11} />
                <span className="hidden sm:inline">Show less</span>
              </button>
            )}

            {/* Show more */}
            {hasMore && (
              <button
                onClick={() => setExpandLevel((l) => l + 1)}
                className="flex items-center gap-1.5 font-mono text-[9px] text-amber border border-amber-dim hover:bg-amber-glow px-3 py-1.5 rounded-sm transition-colors duration-150"
              >
                <IconChevronDown size={11} />
                <span className="hidden sm:inline">Show more</span>
              </button>
            )}

            {/* Expand button — always visible in collapsed mode */}
            {expandLevel === 0 && (
              <button
                onClick={() => setExpandLevel(1)}
                className="flex items-center gap-1.5 font-mono text-[9px] text-amber border border-amber-dim hover:bg-amber-glow px-3 py-1.5 rounded-sm transition-colors duration-150"
              >
                <IconChevronDown size={11} />
                <span className="hidden sm:inline">Expand</span>
              </button>
            )}
          </div>
        </div>

        {/* Collapsed: horizontal scroll — cards fill width evenly */}
        {expandLevel === 0 && (
          <div
            ref={liveSitesScrollRef}
            className="flex gap-4 py-6 sm:py-8 overflow-x-auto"
            style={{
              scrollSnapType:          "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth:          "none",
              msOverflowStyle:         "none",
              gap:                     "clamp(32px, 3vw, 64px)",
              paddingLeft:             "clamp(1.5rem, 4vw, 3rem)",
              paddingRight:            "clamp(1.5rem, 4vw, 1rem)",
              marginLeft:              "clamp(1.5rem, 8vw, 2rem)",
            }}
          >
            {liveSites.map((site) => (
              <div
                key={site.id}
                // On mobile: 85vw wide so one card is visible with peek
                // On desktop: calc so 3 cards fill the row with gaps
                className="flex-shrink-0"
                style={{
                  scrollSnapAlign: "start",
                  width: "clamp(370px, min(82vw, calc(46% - -68px)), 960px)",
                }}
              >
                <BrowserPreview
                  url={site.url}
                  title={site.title}
                  description={site.description}
                  stack={site.stack}
                />
              </div>
            ))}
            {/* Right padding sentinel */}
            <div className="flex-shrink-0 w-4 sm:w-8 lg:w-12" />
          </div>
        )}

        {/* Expanded: responsive grid */}
        {expandLevel > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={expandLevel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              ref={liveRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-6 sm:px-8 lg:px-12 py-6 sm:py-8"
            >
              {visibleSites.map((site) => (
                <motion.div key={site.id} variants={itemVariants} initial="hidden" animate={liveInView ? "visible" : "hidden"}>
                  <BrowserPreview
                    url={site.url}
                    title={site.title}
                    description={site.description}
                    stack={site.stack}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ── 4. GitHub activity ──────────────────────────────── */}
      <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-text-ghost tracking-widest">//</span>
            <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">github activity</span>
          </div>
          <a href="https://github.com/etkaturan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-[10px] text-text-secondary hover:text-amber transition-colors duration-150">
            <IconBrandGithub size={13} />
            <span className="hidden sm:inline">github.com/etkaturan</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </div>
        <div className="w-full overflow-x-auto">
          <GitHubGraph username="etkaturan" />
        </div>
      </div>

    </section>
  )
}
