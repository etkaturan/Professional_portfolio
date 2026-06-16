// ─────────────────────────────────────────────────────────────
// PDFModal component — v2
// Mobile-first redesign:
// - Mobile: full screen with prominent close button at top
// - Desktop: centered overlay 860x680
// - Minimize: floating bar bottom right (desktop only)
// - Fullscreen: 100vw x 100vh
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  IconX,
  IconMaximize,
  IconMinimize,
  IconExternalLink,
  IconFileTypePdf,
  IconChevronUp,
} from "@tabler/icons-react"
// @ts-ignore: allow importing CSS side-effect in projects without CSS module typings
import "./PDFModal.css"

type ModalState = "normal" | "fullscreen" | "minimized"

interface PDFModalProps {
  src:     string
  title:   string
  onClose: () => void
}

export default function PDFModal({ src, title, onClose }: PDFModalProps) {
  const [state,   setState]   = useState<ModalState>("normal")
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (state === "minimized") setState("normal")
        else onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [state, onClose])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  const toggleFullscreen = () => {
    setState((s) => s === "fullscreen" ? "normal" : "fullscreen")
  }

  const toggleMinimize = () => {
    setState((s) => s === "minimized" ? "normal" : "minimized")
  }

  // ── Mobile layout — always full screen ───────────────────
  if (isMobile) {
    return (
      <>
        {/* Full screen backdrop */}
        <div
          style={{
            position:        "fixed",
            inset:           0,
            zIndex:          9999,
            backgroundColor: "#070707",
            display:         "flex",
            flexDirection:   "column",
          }}
        >
          {/* Mobile title bar */}
          <div
            style={{
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "space-between",
              padding:         "0 16px",
              height:          "52px",
              borderBottom:    "1px solid #1c1a15",
              backgroundColor: "#0a0a08",
              flexShrink:      0,
              zIndex:          10000,
            }}
          >
            {/* Left — icon + title */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
              <IconFileTypePdf size={16} color="#EF9F27" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily:   "JetBrains Mono, monospace",
                  fontSize:     "11px",
                  color:        "#6e6a60",
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace:   "nowrap",
                }}
              >
                {title}
              </span>
            </div>

            {/* Right — open in tab + close */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  width:           "36px",
                  height:          "36px",
                  border:          "1px solid #252118",
                  borderRadius:    "4px",
                  color:           "#6e6a60",
                  textDecoration:  "none",
                }}
              >
                <IconExternalLink size={15} />
              </a>

              {/* CLOSE — big and obvious on mobile */}
              <button
                onClick={onClose}
                style={{
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  width:           "36px",
                  height:          "36px",
                  border:          "1px solid #EF9F27",
                  borderRadius:    "4px",
                  backgroundColor: "rgba(239,159,39,0.1)",
                  color:           "#EF9F27",
                  cursor:          "pointer",
                }}
                aria-label="Close"
              >
                <IconX size={16} />
              </button>
            </div>
          </div>

          {/* PDF iframe — fills remaining space */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {loading && (
              <div
                style={{
                  position:       "absolute",
                  inset:          0,
                  display:        "flex",
                  flexDirection:  "column",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            "12px",
                  backgroundColor: "#070707",
                }}
              >
                <span
                  style={{
                    fontFamily:    "JetBrains Mono, monospace",
                    fontSize:      "10px",
                    color:         "#35322a",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  loading document
                </span>
                <div style={{ width: "100px", height: "1px", background: "#1c1a15", borderRadius: "1px", overflow: "hidden" }}>
                  <div className="pdf-loading-fill" />
                </div>
              </div>
            )}
            <iframe
              src={`${src}#toolbar=0&navpanes=0&view=FitH`}
              title={title}
              style={{
                width:   "100%",
                height:  "100%",
                border:  "none",
                opacity: loading ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
              onLoad={() => setLoading(false)}
            />
          </div>

          {/* Mobile bottom bar — open in browser fallback */}
          <div
            style={{
              padding:         "12px 16px",
              borderTop:       "1px solid #1c1a15",
              backgroundColor: "#0a0a08",
              flexShrink:      0,
            }}
          >
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                gap:             "8px",
                padding:         "10px",
                border:          "1px solid #252118",
                borderRadius:    "4px",
                fontFamily:      "JetBrains Mono, monospace",
                fontSize:        "10px",
                color:           "#6e6a60",
                textDecoration:  "none",
                letterSpacing:   "0.1em",
                textTransform:   "uppercase",
              }}
            >
              <IconExternalLink size={12} />
              open in browser for best experience
            </a>
          </div>
        </div>
      </>
    )
  }

  // ── Desktop layout ────────────────────────────────────────
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {state !== "minimized" && (
          <motion.div
            className="pdf-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <div className={`pdf-modal ${state}`}>

        {/* Title bar */}
        <div
          className="pdf-modal-bar"
          onClick={state === "minimized" ? toggleMinimize : undefined}
        >
          <div className="flex items-center gap-2">
            <IconFileTypePdf size={14} color="#EF9F27" />
            <span className="font-mono text-[10px] text-text-secondary tracking-wide truncate max-w-[300px]">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {state === "minimized" && (
              <button className="pdf-ctrl-btn" onClick={toggleMinimize} aria-label="Restore">
                <IconChevronUp size={13} />
              </button>
            )}

            {state !== "minimized" && (
              <>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-ctrl-btn"
                  aria-label="Open in new tab"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconExternalLink size={13} />
                </a>

                <button
                  className="pdf-ctrl-btn"
                  onClick={toggleMinimize}
                  aria-label="Minimize"
                >
                  <IconMinimize size={13} />
                </button>

                <button
                  className="pdf-ctrl-btn"
                  onClick={toggleFullscreen}
                  aria-label={state === "fullscreen" ? "Exit fullscreen" : "Fullscreen"}
                >
                  {state === "fullscreen"
                    ? <IconMinimize size={13} />
                    : <IconMaximize size={13} />
                  }
                </button>
              </>
            )}

            <button
              className="pdf-ctrl-btn"
              onClick={onClose}
              aria-label="Close"
              style={{ borderColor: "#3d2608", color: "#EF9F27" }}
            >
              <IconX size={13} />
            </button>
          </div>
        </div>

        {/* PDF body */}
        <div className="pdf-modal-body">
          {loading && (
            <div className="pdf-loading">
              <span className="font-mono text-[10px] text-text-tertiary tracking-widest uppercase">
                loading document
              </span>
              <div className="pdf-loading-bar">
                <div className="pdf-loading-fill" />
              </div>
            </div>
          )}
          <iframe
            src={`${src}#toolbar=1&navpanes=0`}
            title={title}
            onLoad={() => setLoading(false)}
            style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s ease" }}
          />
        </div>
      </div>
    </>
  )
}
