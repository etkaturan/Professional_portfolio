import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { IconMapPin, IconCalendar, IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { experience } from "@/data/portfolio"
import type { Experience as ExperienceType } from "@/types"
import { containerVariants, slideInLeftVariants as itemVariants } from "@/utils/motion"
// @ts-ignore: CSS side-effect import declaration is handled by bundler
import "./Experience.css"

interface TimelineItemProps {
  entry: ExperienceType
  isLast: boolean
}

function TimelineItem({ entry, isLast }: TimelineItemProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <motion.div
      variants={itemVariants}
      className={`timeline-item ${!isLast ? "border-b border-border pb-8 mb-8" : ""}`}
    >
      <div className="timeline-dot" />
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
        <div>
          <h3 className="font-sans text-base font-semibold text-text-primary leading-snug">{entry.role}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-[11px] text-amber tracking-wide">{entry.company}</span>
            {entry.type && (
              <>
                <span className="text-text-ghost text-[10px]">·</span>
                <span className="font-mono text-[10px] text-text-tertiary">{entry.type}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-1 flex-shrink-0">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-tertiary">
            <IconCalendar size={10} />{entry.period}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-tertiary">
            <IconMapPin size={10} />{entry.location}
          </div>
        </div>
      </div>

      {entry.bullets.length > 0 && (
        <>
          <div className={`bullet-list ${expanded ? "expanded" : "collapsed"}`}>
            <ul className="flex flex-col gap-2 mb-4">
              {entry.bullets.map((bullet: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-amber text-[10px] mt-0.5 flex-shrink-0">▸</span>
                  <span className="text-text-secondary text-sm leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1.5 font-mono text-[9px] text-text-tertiary hover:text-amber transition-colors duration-150 mb-4"
          >
            {expanded ? <><IconChevronUp size={10} /> collapse</> : <><IconChevronDown size={10} /> expand bullets</>}
          </button>
        </>
      )}

      {entry.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.stack.map((tech: string) => (
            <span key={tech} className="exp-stack-chip">{tech}</span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="experience" className="border-b border-border">
      <div className="flex items-center justify-between px-8 lg:px-12 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-text-ghost tracking-widest">// 04</span>
          <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">experience</span>
        </div>
        <span className="font-mono text-[9px] text-text-ghost tracking-widest hidden sm:block">research · freelance · community</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-px bg-border">
        <div className="bg-bg-primary px-8 lg:px-12 py-10">
          <div className="relative pl-4">
            <div className="timeline-line" />
            <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
              {experience.map((entry: ExperienceType, index: number) => (
                <TimelineItem key={entry.id} entry={entry} isLast={index === experience.length - 1} />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="bg-bg-secondary px-8 py-10 flex flex-col gap-8">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-text-tertiary uppercase mb-4">summary</p>
            <div className="flex flex-col gap-4">
              {[
                { value: "2",   label: "University research roles" },
                { value: "1",   label: "Freelance client projects"  },
                { value: "10+", label: "Versioned releases shipped" },
                { value: "2s",  label: "LLM response time achieved" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-4 py-3 border-b border-border last:border-b-0">
                  <span className="font-sans text-2xl font-bold text-amber w-12 flex-shrink-0">{value}</span>
                  <span className="font-mono text-[10px] text-text-secondary leading-relaxed">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-text-tertiary uppercase mb-4">highlights</p>
            <div className="flex flex-col gap-3">
              {[
                "Research adopted by Visual Analytics lab",
                "Sole architect — scaffold to v1.0",
                "Dual-degree programme DE + KZ",
                "EU Blue Card eligible on offer",
                "Volunteer programming teacher",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="font-mono text-amber text-[10px] mt-0.5 flex-shrink-0">▸</span>
                  <span className="font-mono text-[10px] text-text-secondary leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4 border border-amber-dim rounded-sm bg-amber-glow">
      
          <p className="font-mono text-[10px] text-text-secondary leading-relaxed">
            B.Sc. Computer Science<br />
            Hof University · 2023–2026<br />
            <span className="text-amber">Graduated March 2026</span>
          </p>
          </div>
        </div>
      </div>
    </section>
  )
}