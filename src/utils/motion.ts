// ─────────────────────────────────────────────────────────────
// Shared Framer Motion variants
// Imported by all section components
// Uses cubic-bezier arrays instead of string easing names
// to satisfy Framer Motion v11 strict TypeScript types
// ─────────────────────────────────────────────────────────────

import type { Variants } from "framer-motion"

// Container — staggers children
export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

// Fade up — hero items (smaller offset)
export const heroItemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

// Fade up — general section items
export const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
}

// Slide in from right — hero right panel
export const slideInRightVariants: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 },
  },
}

// Slide in from left — timeline items
export const slideInLeftVariants: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
}

// Card fade up — projects grid
export const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
}