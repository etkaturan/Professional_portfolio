// ─────────────────────────────────────────────────────────────
// Custom cursor hook
// Tracks mouse position and applies cursor state classes
// to <body> based on what element is being hovered
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react"

export function useCursor() {
  useEffect(() => {
    // Get the two cursor elements injected in index.html
    const ring = document.getElementById("cursor-ring")
    const dot  = document.getElementById("cursor-dot")

    if (!ring || !dot) return

    // ── Track raw mouse position for the dot (instant) ──────
    const onMouseMove = (e: MouseEvent) => {
      // Dot follows cursor instantly — no lag
      dot.style.left = `${e.clientX}px`
      dot.style.top  = `${e.clientY}px`

      // Ring follows with a slight CSS transition (set in index.css)
      ring.style.left = `${e.clientX}px`
      ring.style.top  = `${e.clientY}px`
    }

    // ── Detect what element type is hovered ─────────────────
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Remove all state classes first
      document.body.classList.remove("cursor-hover", "cursor-text")

      if (
        target.tagName === "A"       ||
        target.tagName === "BUTTON"  ||
        target.closest("a")          ||
        target.closest("button")     ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer")
      ) {
        // Hovering a clickable element — ring expands
        document.body.classList.add("cursor-hover")
      } else if (
        target.tagName === "INPUT"    ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "P"        ||
        target.tagName === "SPAN"     ||
        target.tagName === "LI"
      ) {
        // Hovering text content — ring becomes beam
        document.body.classList.add("cursor-text")
      }
    }

    // ── Hide cursor when mouse leaves the window ─────────────
    const onMouseLeave = () => {
      document.body.classList.add("cursor-hidden")
    }

    const onMouseEnter = () => {
      document.body.classList.remove("cursor-hidden")
    }

    // ── Attach all listeners ─────────────────────────────────
    document.addEventListener("mousemove",  onMouseMove)
    document.addEventListener("mouseover",  onMouseOver)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    // ── Cleanup on unmount ───────────────────────────────────
    return () => {
      document.removeEventListener("mousemove",  onMouseMove)
      document.removeEventListener("mouseover",  onMouseOver)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
    }
  }, [])
}