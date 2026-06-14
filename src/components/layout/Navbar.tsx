// ─────────────────────────────────────────────────────────────
// Navbar component — v4
// Clean, working implementation
// - Scroll progress bar at top
// - Section number + label nav links with animated underline
// - Live CET time with amber diamond
// - Availability pulse dot
// - Mobile: solid full-screen overlay menu
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconX, IconMenu2 } from "@tabler/icons-react"
import type { SectionId } from "@/types"

const NAV_LINKS: { label: string; id: SectionId; num: string }[] = [
  { label: "about",      id: "about",      num: "02" },
  { label: "projects",   id: "projects",   num: "03" },
  { label: "experience", id: "experience", num: "04" },
  { label: "contact",    id: "contact",    num: "06" },
]

interface NavbarProps {
  activeSection: SectionId
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [localTime, setLocalTime] = useState("")
  const [scrolled,  setScrolled]  = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [menuOpen,  setMenuOpen]  = useState(false)

  // Live CET time
  useEffect(() => {
    const update = () => {
      setLocalTime(
        new Intl.DateTimeFormat("de-DE", {
          hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin",
        }).format(new Date()) + " CET"
      )
    }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  // Scroll progress + shadow
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setScrollPct(Math.min(pct, 100))
      setScrolled(el.scrollTop > 20)
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Close menu on desktop resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const scrollTo = (id: SectionId) => {
    if (menuOpen) {
      setMenuOpen(false)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 350)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-border-strong overflow-hidden">
          <div
            className="h-full bg-amber transition-all duration-150 ease-out"
            style={{ width: `${scrollPct}%` }}
          />
        </div>

        {/* Bar */}
        <div
          className={[
            "relative flex items-center justify-between px-5 sm:px-8 h-[52px]",
            "border-b border-border transition-all duration-300",
            scrolled ? "bg-[#070707ee]" : "bg-bg-primary",
          ].join(" ")}
          style={{ backdropFilter: scrolled ? "blur(12px)" : "none" }}
        >

          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-0.5 cursor-pointer flex-shrink-0"
            aria-label="Back to top"
          >
            <span className="font-mono text-text-tertiary text-sm transition-colors duration-200 group-hover:text-amber">[</span>
            <span className="font-mono text-amber text-sm font-medium tracking-[0.1em]">
              ET
              <span
                className="inline-block w-px h-3 bg-amber mx-px align-middle"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            </span>
            <span className="font-mono text-text-tertiary text-sm transition-colors duration-200 group-hover:text-amber">]</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, id, num }, i) => {
              const isActive = activeSection === id
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="group relative flex items-center cursor-pointer"
                >
                  {/* Dot separator */}
                  {i > 0 && (
                    <span className="font-mono text-text-ghost text-[8px] mx-4 select-none pointer-events-none">
                      ·
                    </span>
                  )}

                  {/* Link */}
                  <span className="relative flex flex-col items-center py-1">
                    {/* Number */}
                    <span
                      className="font-mono text-[8px] tracking-[0.18em] mb-0.5 transition-colors duration-200"
                      style={{ color: isActive ? "#EF9F27" : "#35322a" }}
                    >
                      {num}
                    </span>

                    {/* Label */}
                    <span
                      className="font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-200"
                      style={{
                        color: isActive ? "#EF9F27"
                             : undefined,
                      }}
                    >
                      {label}
                    </span>

                    {/* Active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px"
                        style={{ background: "#EF9F27" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Hover underline */}
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-text-tertiary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                      style={{ background: "#35322a" }}
                    />
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <span className="font-mono text-[10px] text-text-tertiary flex items-center gap-1.5">
              <span style={{ color: "#EF9F27", fontSize: "8px" }}>◆</span>
              {localTime}
            </span>
            <div className="w-px h-4 bg-border-strong" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"
                  style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
                />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="font-mono text-[10px] text-text-secondary tracking-[0.08em]">
                open to work
              </span>
            </div>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-3">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"
                style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-8 h-8 flex items-center justify-center border border-border rounded-sm text-text-secondary hover:text-amber hover:border-amber-dim transition-colors duration-150"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <IconX size={15} /> : <IconMenu2 size={15} />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── Mobile overlay menu ─────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            // SOLID background — not transparent
            style={{
              position: "fixed",
              top: "52px",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 40,
              backgroundColor: "#070707",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Links */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 2rem",
                gap: "0",
              }}
            >
              {NAV_LINKS.map(({ label, id, num }, i) => {
                const isActive = activeSection === id
                return (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{
                      delay: i * 0.07,
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    onClick={() => scrollTo(id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem 0",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid #1c1a15",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "10px",
                          color: "#35322a",
                          letterSpacing: "0.16em",
                          width: "24px",
                        }}
                      >
                        {num}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "28px",
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          color: isActive ? "#EF9F27" : "#f0ece3",
                          transition: "color 0.2s",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    {isActive && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#EF9F27",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Bottom strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 2rem",
                borderTop: "1px solid #1c1a15",
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "10px",
                  color: "#35322a",
                }}
              >
                {localTime}
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "10px",
                  color: "#6e6a60",
                }}
              >
                Fürth, DE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
