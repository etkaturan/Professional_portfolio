// ─────────────────────────────────────────────────────────────
// Navbar component
// Fixed top navigation with:
// - Logo (monospace bracket style)
// - Pill-grouped nav links with active section highlight
// - Live local time (CET)
// - Availability status dot
// - Smooth scroll on link click
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { SectionId } from "@/types"

// ── Props ─────────────────────────────────────────────────────
interface NavbarProps {
  activeSection: SectionId
}

// ── Nav link config ───────────────────────────────────────────
const NAV_LINKS: { label: string; id: SectionId }[] = [
  { label: "about",      id: "about"      },
  { label: "projects",   id: "projects"   },
  { label: "experience", id: "experience" },
  { label: "contact",    id: "contact"    },
]

export default function Navbar({ activeSection }: NavbarProps) {

  // ── Local time state ────────────────────────────────────────
  const [localTime, setLocalTime] = useState("")

  useEffect(() => {
    // Format time in CET/CEST (Berlin timezone)
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("de-DE", {
        hour:     "2-digit",
        minute:   "2-digit",
        timeZone: "Europe/Berlin",
      }).format(new Date())
      setLocalTime(`${formatted} CET`)
    }

    updateTime()
    // Update every 30 seconds
    const interval = setInterval(updateTime, 30_000)
    return () => clearInterval(interval)
  }, [])

  // ── Scroll to section ───────────────────────────────────────
  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // ── Navbar scroll shadow ────────────────────────────────────
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      // Fade + slide down on mount
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={[
        // Base styles
        "fixed top-0 left-0 right-0 z-50",
        "flex items-center justify-between",
        "px-6 h-[52px]",
        "border-b border-border",
        "bg-bg-primary",
        // Subtle shadow once scrolled
        scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.4)]" : "",
      ].join(" ")}
    >

      {/* ── Logo ─────────────────────────────────────────── */}
      <button
        onClick={() => scrollTo("hero")}
        className="flex items-center gap-0.5 cursor-pointer group"
        aria-label="Scroll to top"
      >
        <span className="font-mono text-text-tertiary text-sm group-hover:text-amber transition-colors duration-200">
          [
        </span>
        <span className="font-mono text-amber text-sm tracking-wider font-medium">
          ET_
        </span>
        <span className="font-mono text-text-tertiary text-sm group-hover:text-amber transition-colors duration-200">
          ]
        </span>
      </button>

      {/* ── Nav pill group ────────────────────────────────── */}
      <nav
        className="flex gap-px bg-border border border-border rounded-[5px] overflow-hidden"
        aria-label="Main navigation"
      >
        {NAV_LINKS.map(({ label, id }) => {
          const isActive = activeSection === id

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-current={isActive ? "page" : undefined}
              className={[
                // Base pill styles
                "relative px-4 py-1.5",
                "font-mono text-[10px] tracking-[0.14em] uppercase",
                "transition-colors duration-150",
                "cursor-pointer",
                // Active vs default state
                isActive
                  ? "bg-amber-dim text-amber-light"
                  : "bg-bg-secondary text-text-secondary hover:text-amber hover:bg-amber-glow",
              ].join(" ")}
            >
              {label}

              {/* Amber underline on active item */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-amber"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </nav>

      {/* ── Right side: time + availability ──────────────── */}
      <div className="flex items-center gap-4">

        {/* Local time badge */}
        <span className="font-mono text-[10px] text-text-tertiary tracking-[0.06em] border border-border px-2.5 py-1 rounded-sm hidden sm:block">
          {localTime}
        </span>

        {/* Availability dot + label */}
        <div className="flex items-center gap-2">
          {/* Pulsing green dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="font-mono text-[10px] text-text-secondary tracking-[0.08em] hidden sm:block">
            available
          </span>
        </div>

      </div>
    </motion.header>
  )
}