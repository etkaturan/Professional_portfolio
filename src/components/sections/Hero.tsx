import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import {
  IconBrandGithub,
  IconDownload,
  IconArrowRight,
} from "@tabler/icons-react"
import GridBackground from "@/components/ui/GridBackground"
import { personal, stats, projects } from "@/data/portfolio"
import {
  containerVariants,
  heroItemVariants as itemVariants,
  slideInRightVariants,
} from "@/utils/motion"
// @ts-ignore
import "./Hero.css"

export default function Hero() {
  const featuredProjects = projects.filter((p) => p.featured)

  const scrollToProjects = () => {
    const el = document.getElementById("projects")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="min-h-screen pt-[52px] grid grid-cols-1 lg:grid-cols-2 border-b border-border"
    >
      {/* LEFT PANEL */}
      <motion.div
        className="flex flex-col justify-between px-8 lg:px-12 py-12 border-r border-border relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="absolute top-4 right-4 font-mono text-[9px] text-text-ghost tracking-widest">
          // 01
        </span>

        <div>
          {/* Tag row */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
            {[
              { label: "Full-Stack Dev", accent: true },
              { label: "AI Engineer",   accent: false },
              { label: "Fürth, DE",     accent: false },
              { label: "EU Blue Card",  accent: false },
            ].map(({ label, accent }) => (
              <span
                key={label}
                className={[
                  "font-mono text-[9px] tracking-[0.08em] px-2.5 py-1 rounded-sm border",
                  accent
                    ? "border-amber-dim text-amber bg-amber-glow"
                    : "border-border-strong text-text-secondary",
                ].join(" ")}
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* Name block */}
          <motion.div variants={itemVariants} className="mb-2">
            <p className="font-mono text-[11px] tracking-[0.24em] text-text-secondary uppercase mb-1">
              {personal.firstName}
            </p>
            <h1 className="font-sans text-5xl lg:text-6xl font-bold tracking-tight leading-none text-text-primary">
              Tu<span className="text-amber">ran</span>
            </h1>
            <div className="h-px bg-border-strong mt-3 overflow-hidden w-full">
              <div className="name-underline-fill" />
            </div>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mt-4 mb-4"
          >
            <span className="font-mono text-amber text-xs">//</span>
            <span className="font-mono text-text-secondary text-xs tracking-wide">
              <TypeAnimation
                sequence={[
                  "Full-Stack Developer",        1800,
                  "AI Systems Engineer",         1800,
                  "React · TypeScript · Python", 1800,
                  "Research Software Engineer",  1800,
                ]}
                wrapper="span"
                speed={55}
                deletionSpeed={70}
                repeat={Infinity}
                cursor={false}
              />
              <span className="inline-block w-px h-3 bg-amber ml-0.5 animate-blink align-middle" />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-sm leading-relaxed max-w-sm pl-4 border-l-2 border-amber-dim"
          >
            {personal.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={scrollToProjects}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber text-bg-primary font-sans font-bold text-[10px] tracking-[0.14em] uppercase rounded-sm hover:bg-amber-light transition-colors duration-200"
            >
              View projects
              <IconArrowRight size={12} />
            </button>

            <a
              href={personal.cvUrl}
              download
              className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-text-secondary font-mono text-[10px] tracking-[0.14em] uppercase border border-border-strong rounded-sm hover:border-amber hover:text-amber transition-colors duration-200"
            >
              <IconDownload size={12} />
              Download CV
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-text-secondary font-mono text-[10px] tracking-[0.14em] uppercase border border-border-strong rounded-sm hover:border-amber hover:text-amber transition-colors duration-200"
            >
              <IconBrandGithub size={12} />
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div variants={itemVariants} className="flex border-t border-border mt-8">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex-1 flex flex-col items-center py-4 border-r border-border last:border-r-0"
            >
              <span
                className="stat-number font-sans text-xl font-bold text-amber"
                style={{ animationDelay: `${0.6 + i * 0.15}s` }}
              >
                {value}
              </span>
              <span className="font-mono text-[8px] tracking-[0.16em] text-text-ghost uppercase mt-1">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        className="relative bg-bg-secondary hidden lg:flex flex-col overflow-hidden"
        variants={slideInRightVariants}
        initial="hidden"
        animate="visible"
      >
        <GridBackground />

        {/* Photo frame */}
        <div className="relative z-10 flex flex-col items-center pt-10">
          <div className="relative w-[340px] h-[370px]">
            <div className="absolute inset-0 border border-border-strong rounded-lg overflow-hidden bg-bg-tertiary">
              {/* Your photo */}
              <img
                src="public/documents/my_image.jpeg"
                alt="Mekhmetetka Turan"
                className="w-full h-full object-cover object-top"
              />
              <div className="photo-scan-line" />
            </div>
            <div className="photo-corner photo-corner-tl" />
            <div className="photo-corner photo-corner-tr" />
            <div className="photo-corner photo-corner-bl" />
            <div className="photo-corner photo-corner-br" />
          </div>
          <p className="font-mono text-[8px] text-text-ghost tracking-[0.08em] mt-3">
            {personal.coordinates} · {personal.location}
          </p>
        </div>

        {/* Featured project cards */}
        <div className="relative z-10 flex flex-col gap-2 px-5 mt-6 pb-8">
          {featuredProjects.map((project) => (
            <a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-hover block bg-bg-tertiary border border-border-strong rounded-md px-4 py-3 hover:border-amber-dark hover:bg-bg-elevated"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-sans text-xs font-semibold text-text-primary">
                  {project.name}
                </span>
                <span className="font-mono text-[8px] text-text-ghost">
                  {project.year}
                </span>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed mb-2">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.stack.map((tech: string) => {
                  const isHighlighted = project.stackHighlight.includes(tech)
                  return (
                    <span
                      key={tech}
                      className={[
                        "font-mono text-[8px] px-1.5 py-0.5 rounded-sm border",
                        isHighlighted
                          ? "border-amber-dim text-amber"
                          : "border-border text-text-secondary",
                      ].join(" ")}
                    >
                      {tech}
                    </span>
                  )
                })}
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}