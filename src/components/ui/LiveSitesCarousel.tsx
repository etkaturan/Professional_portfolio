// ─────────────────────────────────────────────────────────────
// LiveSitesCarousel — v2
// Fully adaptive: uses useWindowSize hook to detect actual
// viewport width and show 1 (mobile) or 2 (desktop) cards
// Cards always fill 100% of available space exactly
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconWorldWww,
} from "@tabler/icons-react"
import { liveSites } from "@/data/portfolio"
import { useAnalytics } from "@/hooks/useAnalytics"

// ── Hook: real-time window width ──────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  )

  useEffect(() => {
    const fn = () => setWidth(window.innerWidth)
    window.addEventListener("resize", fn)
    fn() // run once on mount
    return () => window.removeEventListener("resize", fn)
  }, [])

  return width
}

// ── Browser preview card ──────────────────────────────────────
function BrowserPreview({
  url, title, description, stack,
}: {
  url: string; title: string; description: string; stack: string[]
}) {
  const [loaded, setLoaded] = useState(false)
  const { trackEvent } = useAnalytics()

  return (
    <div
      className="flex flex-col border border-border-strong rounded-lg overflow-hidden bg-bg-secondary hover:border-amber-dark transition-all duration-300"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-bg-tertiary border-b border-border-strong flex-shrink-0">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex items-center gap-1.5 bg-bg-primary border border-border rounded-sm px-2 py-1 min-w-0">
          <IconWorldWww size={9} color="#35322a" style={{ flexShrink: 0 }} />
          <span className="font-mono text-[8px] sm:text-[9px] text-text-tertiary truncate">
            {url}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("live-site-open", { site: title })}
          className="flex-shrink-0 text-text-secondary hover:text-amber transition-colors duration-150 p-0.5"
        >
          <IconExternalLink size={11} />
        </a>
      </div>

      {/* iframe preview — height scales with viewport */}
      <div className="relative w-full flex-1" style={{ minHeight: "450px", maxHeight: "500px", height: "clamp(400px, 40vw, 500px)" }}>
        {/* Amber corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber z-10 pointer-events-none" />

        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-bg-secondary z-10">
            <IconWorldWww size={18} color="#35322a" />
            <div className="w-16 h-px bg-border overflow-hidden rounded">
              <div className="pdf-loading-fill" />
            </div>
            <span className="font-mono text-[8px] text-text-ghost">loading...</span>
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

      {/* Info bar */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-border flex-shrink-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-sans text-xs sm:text-sm font-semibold text-text-primary leading-snug">
            {title}
          </h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("live-site-open", { site: title })}
            className="flex-shrink-0 flex items-center gap-1 font-mono text-[8px] sm:text-[9px] text-amber hover:text-amber-light border border-amber-dim hover:border-amber px-2 py-1 rounded-sm transition-colors duration-150 whitespace-nowrap"
          >
            <IconExternalLink size={10} />Open
          </a>
        </div>
        <p className="text-text-secondary text-[10px] sm:text-xs leading-relaxed mb-1.5 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1">
          {stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[7px] sm:text-[8px] px-1.5 py-0.5 border border-border text-text-secondary rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Carousel ──────────────────────────────────────────────────
export default function LiveSitesCarousel() {
  const windowWidth               = useWindowWidth()
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection]   = useState(1)

  // Dynamically decide how many cards to show
  // based on actual window width at render time
  const visibleCount = windowWidth < 640 ? 1 : 2

  // Reset to start when visible count changes
  // (e.g. rotating phone, resizing browser)
  useEffect(() => {
    setStartIndex(0)
  }, [visibleCount])

  const canPrev = startIndex > 0
  const canNext = startIndex + visibleCount < liveSites.length

  const prev = useCallback(() => {
    if (!canPrev) return
    setDirection(-1)
    setStartIndex((i) => i - 1)
  }, [canPrev])

  const next = useCallback(() => {
    if (!canNext) return
    setDirection(1)
    setStartIndex((i) => i + 1)
  }, [canNext])

  const visibleSites = liveSites.slice(startIndex, startIndex + visibleCount)

  const slideVariants = {
    enter:  (dir: number) => ({
      opacity: 0,
      x:       dir > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      x:       0,
    },
    exit:   (dir: number) => ({
      opacity: 0,
      x:       dir > 0 ? -40 : 40,
    }),
  }

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-5 sm:py-8">

      {/* Carousel viewport — overflow hidden, cards fill 100% */}
      <div className="overflow-hidden w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${startIndex}-${visibleCount}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            // Grid: 1 col on mobile, 2 cols on desktop
            // Cards fill exactly 100% of the container
            style={{
              display:             "grid",
              gridTemplateColumns: visibleCount === 1 ? "1fr" : "1fr 1fr",
              gap:                 windowWidth < 640 ? "12px" : "20px",
              width:               "100%",
            }}
          >
            {visibleSites.map((site) => (
              <BrowserPreview
                key={site.id}
                url={site.url}
                title={site.title}
                description={site.description}
                stack={site.stack}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">

        {/* Dot indicators — clickable */}
        <div className="flex items-center gap-2">
          {liveSites.map((_, i) => {
            const isVisible = i >= startIndex && i < startIndex + visibleCount
            return (
              <button
                key={i}
                onClick={() => {
                  const newStart = Math.min(
                    Math.max(0, i),
                    liveSites.length - visibleCount
                  )
                  setDirection(newStart > startIndex ? 1 : -1)
                  setStartIndex(newStart)
                }}
                aria-label={`Go to site ${i + 1}`}
                style={{
                  width:        isVisible ? "16px" : "6px",
                  height:       "6px",
                  borderRadius: "3px",
                  background:   isVisible ? "#EF9F27" : "#35322a",
                  border:       "none",
                  cursor:       "pointer",
                  padding:      0,
                  transition:   "all 0.2s ease",
                }}
              />
            )
          })}
        </div>

        {/* Counter + arrow buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-[9px] text-text-ghost hidden sm:block">
            {startIndex + 1}–{Math.min(startIndex + visibleCount, liveSites.length)} of {liveSites.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous"
              style={{
                width:       "28px",
                height:      "28px",
                display:     "flex",
                alignItems:  "center",
                justifyContent: "center",
                border:      `1px solid ${canPrev ? "#252118" : "#1c1a15"}`,
                borderRadius: "4px",
                background:  "transparent",
                color:       canPrev ? "#6e6a60" : "#35322a",
                cursor:      canPrev ? "pointer" : "not-allowed",
                transition:  "all 0.15s ease",
              }}
            >
              <IconChevronLeft size={13} />
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next"
              style={{
                width:          "28px",
                height:         "28px",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                border:         `1px solid ${canNext ? "#EF9F27" : "#1c1a15"}`,
                borderRadius:   "4px",
                background:     canNext ? "rgba(239,159,39,0.07)" : "transparent",
                color:          canNext ? "#EF9F27" : "#35322a",
                cursor:         canNext ? "pointer" : "not-allowed",
                transition:     "all 0.15s ease",
              }}
            >
              <IconChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
