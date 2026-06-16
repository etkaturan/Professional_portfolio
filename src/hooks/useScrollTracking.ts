// ─────────────────────────────────────────────────────────────
// useScrollTracking hook
// Tracks which sections the user scrolled into view
// Fires a single Umami event per section per page load
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react"
import { useAnalytics } from "@/hooks/useAnalytics"

const SECTIONS = ["about", "projects", "experience", "education", "contact"]

export function useScrollTracking() {
  const { trackEvent } = useAnalytics()
  // Track which sections already fired to avoid duplicate events
  const fired = useRef<Set<string>>(new Set())

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !fired.current.has(id)) {
            fired.current.add(id)
            trackEvent("section-viewed", { section: id })
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])
}
