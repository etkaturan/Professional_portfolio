// ─────────────────────────────────────────────────────────────
// Active section tracker hook
// Uses IntersectionObserver to detect which section is
// currently in the viewport — drives navbar highlight state
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react"
import type { SectionId } from "@/types"

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("hero")

  useEffect(() => {
    // All section IDs we want to track
    const sectionIds: SectionId[] = [
      "hero",
      "about",
      "projects",
      "experience",
      "education",
      "contact",
    ]

    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          // When section is at least 40% visible, mark it active
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          // Trigger when 40% of the section is visible
          threshold: 0.4,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    // Cleanup all observers on unmount
    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return activeSection
}