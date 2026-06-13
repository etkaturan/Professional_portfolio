// ─────────────────────────────────────────────────────────────
// PDFModal component
// Floating modal with embedded PDF viewer
//
// States:
// - normal    — centered overlay, 860×680
// - fullscreen — 100vw × 100vh
// - minimized  — floating bar at bottom-right corner
//
// Controls:
// - Minimize  — collapses to floating bar, click to restore
// - Fullscreen — expands to fill viewport
// - Open tab  — opens PDF in new browser tab
// - Close     — dismisses modal entirely
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
// @ts-ignore: CSS import without type declarations
import "./PDFModal.css"

// ── Types ─────────────────────────────────────────────────────
type ModalState = "normal" | "fullscreen" | "minimized"

interface PDFModalProps {
  // Path to the PDF — e.g. "/documents/thesis.pdf"
  src: string
  // Display title shown in the modal bar
  title: string
  // Called when the user closes the modal
  onClose: () => void
}

// ── Component ─────────────────────────────────────────────────
export default function PDFModal({ src, title, onClose }: PDFModalProps) {
  const [state, setState]     = useState<ModalState>("normal")
  const [loading, setLoading] = useState(true)

  // Close on Escape key
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

  // Prevent body scroll when modal is open and not minimized
  useEffect(() => {
    if (state !== "minimized") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [state])

  const toggleFullscreen = () => {
    setState((s) => s === "fullscreen" ? "normal" : "fullscreen")
  }

  const toggleMinimize = () => {
    setState((s) => s === "minimized" ? "normal" : "minimized")
  }

  return (
    <>
      {/* ── Backdrop — hidden when minimized ─────────────── */}
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

      {/* ── Modal ────────────────────────────────────────── */}
      <div className={`pdf-modal ${state}`}>

        {/* ── Title bar ──────────────────────────────────── */}
        <div
          className="pdf-modal-bar"
          onClick={state === "minimized" ? toggleMinimize : undefined}
        >
          {/* Left — icon + title */}
          <div className="flex items-center gap-2">
            <IconFileTypePdf size={14} color="#EF9F27" />
            <span className="font-mono text-[10px] text-text-secondary tracking-wide truncate max-w-[200px]">
              {title}
            </span>
          </div>

          {/* Right — controls */}
          <div className="flex items-center gap-1.5">

            {/* Restore button — only shown when minimized */}
            {state === "minimized" && (
              <button
                className="pdf-ctrl-btn"
                onClick={toggleMinimize}
                aria-label="Restore"
                title="Restore"
              >
                <IconChevronUp size={13} />
              </button>
            )}

            {/* Open in new tab */}
            {state !== "minimized" && (
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-ctrl-btn"
                aria-label="Open in new tab"
                title="Open in new tab"
                onClick={(e) => e.stopPropagation()}
              >
                <IconExternalLink size={13} />
              </a>
            )}

            {/* Minimize */}
            {state !== "minimized" && (
              <button
                className="pdf-ctrl-btn"
                onClick={toggleMinimize}
                aria-label="Minimize"
                title="Minimize"
              >
                <IconMinimize size={13} />
              </button>
            )}

            {/* Fullscreen toggle */}
            {state !== "minimized" && (
              <button
                className="pdf-ctrl-btn"
                onClick={toggleFullscreen}
                aria-label={state === "fullscreen" ? "Exit fullscreen" : "Fullscreen"}
                title={state === "fullscreen" ? "Exit fullscreen" : "Fullscreen"}
              >
                {state === "fullscreen"
                  ? <IconMinimize size={13} />
                  : <IconMaximize size={13} />
                }
              </button>
            )}

            {/* Close */}
            <button
              className="pdf-ctrl-btn"
              onClick={onClose}
              aria-label="Close"
              title="Close"
            >
              <IconX size={13} />
            </button>

          </div>
        </div>

        {/* ── PDF body ───────────────────────────────────── */}
        <div className="pdf-modal-body">

          {/* Loading indicator — hidden once iframe loads */}
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

          {/* Embedded PDF iframe */}
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
