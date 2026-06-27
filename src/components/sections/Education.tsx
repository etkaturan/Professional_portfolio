// ─────────────────────────────────────────────────────────────
// Education section — with analytics tracking
// ─────────────────────────────────────────────────────────────

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { IconSchool, IconFileTypePdf, IconEye, IconDownload, IconAward, IconMapPin, IconCalendar } from "@tabler/icons-react"
import { education } from "@/data/portfolio"
import type { Education as EducationType } from "@/types"
import PDFModal from "@/components/ui/PDFModal"
import { useAnalytics } from "@/hooks/useAnalytics"
import { containerVariants, itemVariants } from "@/utils/motion"
// @ts-ignore: allow importing side-effect CSS without declaration
import "./Education.css"

const documents = [
  {
    id:          "degree",
    title:       "Degree Certificate",
    subtitle:    "B.Sc. Computer Science — Hof University",
    file:        "/documents/degree-certificate.pdf",
    description: "Official degree certificate issued by Hof University of Applied Sciences, Germany.",
    badge:       null as string | null,
  },
  {
    id:          "transcript",
    title:       "Academic Transcript",
    subtitle:    "Full grade record — Hof University",
    file:        "/documents/de_transcript.pdf",
    description: "Complete academic transcript including all module grades from Hof University.",
    badge:       null as string | null,
  },
  {
    id:          "thesis",
    title:       "Bachelor Thesis",
    subtitle:    "Grade: 2.3 · Hof University · 2026",
    file:        "/documents/thesis.pdf",
    description: "Hybrid AI framework combining Generative AI with spatial hypertext to support human-AI collaborative knowledge building.",
    badge:       "2.3" as string | null,
  },
]

type DocType = typeof documents[0]

export default function Education() {
  const [activeDoc, setActiveDoc] = useState<DocType | null>(null)
  const { trackEvent } = useAnalytics()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="education" className="border-b border-border">
      <div className="flex items-center justify-between px-8 lg:px-12 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-text-ghost tracking-widest">// 05</span>
          <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">education</span>
        </div>
        <span className="font-mono text-[9px] text-text-ghost tracking-widest hidden sm:block">degrees · thesis · documents</span>
      </div>

      <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>

        {/* Degree cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border-b border-border">
          {education.map((edu: EducationType) => {
            const isHof = edu.id === "hof"
            return (
              <motion.div key={edu.id} variants={itemVariants} className="bg-bg-primary px-8 lg:px-12 py-10 relative">
                {isHof && <div className="edu-grad-glow" aria-hidden="true" />}

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md border border-border-strong bg-bg-tertiary flex items-center justify-center flex-shrink-0">
                      <IconSchool size={16} color="#EF9F27" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-semibold text-text-primary leading-snug">{edu.degree}</h3>
                      <p className="font-mono text-[11px] text-amber mt-0.5">{edu.institution}</p>
                    </div>
                  </div>
                  {isHof && (
                    <span className="edu-grad-badge flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 border border-amber-dim text-amber bg-amber-glow rounded-sm flex-shrink-0">
                      <IconAward size={10} />graduated
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mb-5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-tertiary">
                    <IconCalendar size={10} />{edu.period}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-tertiary">
                    <IconMapPin size={10} />{edu.location}
                  </div>
                  {edu.grade && (
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-tertiary">
                      <span className="text-amber">◆</span>
                      Grade: {edu.grade}
                      {edu.gradeNote && <span className="text-text-ghost ml-1">({edu.gradeNote})</span>}
                    </div>
                  )}
                </div>

                {edu.thesis && (
                  <div className="p-4 border border-border-strong rounded-md bg-bg-secondary mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] tracking-[0.16em] text-text-tertiary uppercase">thesis</span>
                      {edu.thesisGrade && (
                        <span className="font-mono text-[9px] text-amber border border-amber-dim px-2 py-0.5 rounded-sm bg-amber-glow">
                          grade: {edu.thesisGrade}
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed">{edu.thesis}</p>
                  </div>
                )}

                {edu.note && (
                  <p className="font-mono text-[10px] text-text-tertiary leading-relaxed border-l-2 border-border pl-3">{edu.note}</p>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Documents vault */}
        <div className="px-8 lg:px-12 py-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[9px] text-text-ghost tracking-widest">//</span>
            <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">documents</span>
            <span className="font-mono text-[9px] text-text-ghost">— view or download official records</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden border border-border">
            {documents.map((doc: DocType) => (
              <motion.div key={doc.id} variants={itemVariants} className="edu-doc-card bg-bg-primary p-6 flex flex-col justify-between hover:bg-bg-secondary transition-colors duration-200">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-md border border-border-strong bg-bg-tertiary flex items-center justify-center">
                      <IconFileTypePdf size={18} color="#EF9F27" />
                    </div>
                    {doc.badge && (
                      <span className="font-mono text-[9px] text-amber border border-amber-dim px-2 py-0.5 rounded-sm bg-amber-glow">{doc.badge}</span>
                    )}
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-text-primary mb-1">{doc.title}</h4>
                  <p className="font-mono text-[10px] text-text-tertiary mb-3">{doc.subtitle}</p>
                  <p className="text-text-secondary text-xs leading-relaxed">{doc.description}</p>
                </div>
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => {
                      setActiveDoc(doc)
                      trackEvent("document-view", { document: doc.id })
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[10px] text-text-secondary hover:text-amber border border-border-strong hover:border-amber-dim transition-colors duration-150 px-3 py-2 rounded-sm"
                  >
                    <IconEye size={12} />View
                  </button>
                  <a
                    href={doc.file}
                    download
                    onClick={() => trackEvent("document-download", { document: doc.id })}
                    className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[10px] text-amber border border-amber-dim hover:bg-amber-glow transition-colors duration-150 px-3 py-2 rounded-sm"
                  >
                    <IconDownload size={12} />Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-text-ghost mt-4 tracking-wide">
            ▸ documents are official records issued by Hof University of Applied Sciences, Germany
          </p>
        </div>
      </motion.div>

      {activeDoc && (
        <PDFModal src={activeDoc.file} title={activeDoc.title} onClose={() => setActiveDoc(null)} />
      )}
    </section>
  )
}
