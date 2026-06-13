import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { personal, languages, skillCategories, stackIcons } from "@/data/portfolio"
import { containerVariants, itemVariants } from "@/utils/motion"
// @ts-ignore
import "./About.css"

interface SkillBarProps {
  name: string
  level: number
  animate: boolean
  delay: number
}

function SkillBar({ name, level, animate, delay }: SkillBarProps) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-[10px] text-text-secondary tracking-wide">{name}</span>
        <span className="font-mono text-[9px] text-text-tertiary">{level}</span>
      </div>
      <div className="h-px bg-border-strong w-full overflow-hidden">
        <div
          className="skill-bar-fill"
          style={{
            ["--target-width" as string]: `${level}%`,
            transitionDelay: animate ? `${delay}s` : "0s",
            width: animate ? `${level}%` : "0%",
          }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" ref={sectionRef} className="border-b border-border">
      {/* Section header */}
      <div className="flex items-center justify-between px-8 lg:px-12 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-text-ghost tracking-widest">// 02</span>
          <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">about</span>
        </div>
        <span className="font-mono text-[9px] text-text-ghost tracking-widest hidden sm:block">
          background · skills · stack
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3"
      >
        {/* COLUMN 1 — Bio + Languages */}
        <motion.div variants={itemVariants} className="px-8 lg:px-10 py-10 border-r border-border">
          <div className="section-heading-line">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">background</h2>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            {personal.aboutBio.map((paragraph: string, i: number) => (
              <p key={i} className="text-text-secondary text-sm leading-relaxed">{paragraph}</p>
            ))}
          </div>
          <div className="flex items-start gap-2 p-3 border border-amber-dim rounded-sm bg-amber-glow mb-8">
            <span className="font-mono text-amber text-[9px] mt-0.5">▸</span>
            <p className="font-mono text-[10px] text-amber leading-relaxed">{personal.workAuth} — eligible to work in Germany and the EU</p>
          </div>
          <div className="section-heading-line">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">languages</h2>
          </div>
          <div className="flex flex-col gap-3">
            {languages.map(({ name, level, label }: { name: string; level: string; label: string }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-dim" />
                  <span className="font-sans text-sm text-text-primary">{name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-text-tertiary">{label}</span>
                  <span className="lang-level">{level}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* COLUMN 2 — Skill bars */}
        <motion.div variants={itemVariants} ref={skillsRef} className="px-8 lg:px-10 py-10 border-r border-border">
          <div className="section-heading-line">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">skills</h2>
          </div>
          <div className="flex flex-col gap-6">
            {skillCategories.map(({ category, skills }: { category: string; skills: { name: string; level: number }[] }, catIdx: number) => (
              <div key={category}>
                <p className="font-mono text-[9px] tracking-[0.18em] text-amber uppercase mb-3">{category}</p>
                {skills.map(({ name, level }: { name: string; level: number }, skillIdx: number) => (
                  <SkillBar
                    key={name}
                    name={name}
                    level={level}
                    animate={skillsInView}
                    delay={catIdx * 0.1 + skillIdx * 0.08}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* COLUMN 3 — Stack icons */}
        <motion.div variants={itemVariants} className="px-8 lg:px-10 py-10">
          <div className="section-heading-line">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">tech stack</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {stackIcons.map(({ name, icon, url }: { name: string; icon: string; url: string }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="stack-icon-wrap" aria-label={name}>
                <div className="w-10 h-10 flex items-center justify-center border border-border-strong rounded-md bg-bg-tertiary hover:border-amber-dark hover:bg-bg-elevated transition-all duration-200 hover:scale-110">
                  <i className={`${icon} colored`} style={{ fontSize: "20px" }} />
                </div>
                <span className="tooltip">{name}</span>
              </a>
            ))}
          </div>
          <div className="border-t border-border my-8" />
          <div className="section-heading-line">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">currently</h2>
          </div>
          <div className="flex flex-col gap-2">
            {[
              "B.Sc. Computer Science — Hof University",
              "Thesis: AI + spatial hypertext frameworks",
              "Exploring advanced LLM agent architectures",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="font-mono text-amber text-[10px] mt-0.5 flex-shrink-0">▸</span>
                <span className="font-mono text-[10px] text-text-secondary leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}