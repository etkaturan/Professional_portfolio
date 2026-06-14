import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { IconBrandGithub, IconExternalLink, IconRotate, IconRotateClockwise } from "@tabler/icons-react"
import { projects } from "@/data/portfolio"
import type { Project } from "@/types"
import { containerVariants, cardVariants } from "@/utils/motion"
// @ts-ignore: CSS import declarations are handled by the bundler
import "./Projects.css"
import GitHubGraph from "@/components/ui/GitHubGraph"


interface FlipCardProps {
  project: Project
  index: number
}

function FlipCard({ project, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      className={`flip-card w-full h-full min-h-[320px] ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={`${project.name} — click to ${flipped ? "see overview" : "see tech stack"}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f) }}
    >
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front p-8 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-6">
            <span className="font-mono text-[9px] text-text-ghost tracking-widest">
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
                <IconRotate size={11} />flip for full stack
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
          <div className="flex gap-3 mt-6">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 font-mono text-[10px] text-text-secondary hover:text-amber transition-colors duration-150 border border-border-strong hover:border-amber-dim px-4 py-2 rounded-sm">
              <IconBrandGithub size={13} />View on GitHub
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 font-mono text-[10px] text-amber hover:text-amber-light transition-colors duration-150 border border-amber-dim hover:border-amber px-4 py-2 rounded-sm">
                <IconExternalLink size={13} />Live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="projects" className="border-b border-border">
      <div className="flex items-center justify-between px-8 lg:px-12 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-text-ghost tracking-widest">// 03</span>
          <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">projects</span>
        </div>
        <span className="font-mono text-[9px] text-text-ghost tracking-widest hidden sm:block">click cards to flip</span>
      </div>

      <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
        {projects.map((project: Project, index: number) => (
          <div key={project.id} className="bg-bg-primary p-8 min-h-[380px]">
            <FlipCard project={project} index={index} />
          </div>
        ))}
      </motion.div>

{/* ── GitHub activity ────────────────────────────────────── */}
<div className="border-t border-border px-8 lg:px-12 py-10">

  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] text-text-ghost tracking-widest">//</span>
      <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">
        github activity
      </span>
    </div>
    
    <a
      href="https://github.com/etkaturan"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 font-mono text-[10px] text-text-secondary hover:text-amber transition-colors duration-150"
    >
      <IconBrandGithub size={13} />
      github.com/etkaturan
    </a>
  </div>

  {/* Graph — full width container */}
  <div className="w-full overflow-x-auto">
    <div className="min-w-full">
      <GitHubGraph username="etkaturan" />
    </div>
  </div>

</div>
    </section>
  )
}