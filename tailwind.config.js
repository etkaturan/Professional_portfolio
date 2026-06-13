/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for class names
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {

      // ── Color tokens ───────────────────────────────────────────────
      colors: {
        // Base backgrounds — darkest to lightest surface
        bg: {
          primary:   "#070707",   // page background
          secondary: "#0d0d0b",   // panel / right side
          tertiary:  "#131310",   // card background
          elevated:  "#191714",   // hovered card / elevated surface
        },

        // Amber accent ramp — the single brand color
        amber: {
          DEFAULT: "#EF9F27",     // primary accent
          light:   "#FAC775",     // light variant — hover highlights
          dark:    "#BA7517",     // dark variant — borders on hover
          dim:     "#3d2608",     // very dark — subtle fills
          glow:    "rgba(239,159,39,0.07)", // near-invisible glow fill
        },

        // Text ramp
        text: {
          primary:   "#f0ece3",   // headings, important labels
          secondary: "#6e6a60",   // body, descriptions
          tertiary:  "#35322a",   // muted labels, index markers
          ghost:     "#201e18",   // barely visible — grid numbers
        },

        // Border ramp
        border: {
          DEFAULT: "#1c1a15",     // default dividers
          strong:  "#252118",     // card borders, nav pill borders
        },
      },

      // ── Typography ─────────────────────────────────────────────────
      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        mono:  ["JetBrains Mono", "Fira Code", "monospace"],
      },

      // ── Font sizes ─────────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],   // 10px — tags, labels
        "xs":  ["0.75rem",  { lineHeight: "1rem" }],   // 12px — chips, meta
        "sm":  ["0.875rem", { lineHeight: "1.5rem" }], // 14px — body
      },

      // ── Spacing extras ─────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },

      // ── Border radius ──────────────────────────────────────────────
      borderRadius: {
        "sm": "3px",    // chips, tags, small elements
        "md": "5px",    // cards, panels
        "lg": "8px",    // photo frame, large cards
      },

      // ── Animations ─────────────────────────────────────────────────
      keyframes: {
        // Grid lines fade in from center outward on load
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Scan line drifts down the photo frame
        "scan": {
          "0%":   { top: "0%" },
          "100%": { top: "100%" },
        },
        // Stat numbers count up — controlled via JS, this is the reveal
        "count-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Pulse ring on availability dot
        "ping-slow": {
          "0%, 100%": { transform: "scale(1)",   opacity: "0.4" },
          "50%":      { transform: "scale(1.6)", opacity: "0" },
        },
        // Cursor ring scale on hover targets
        "cursor-expand": {
          "0%":   { transform: "scale(1)" },
          "100%": { transform: "scale(1.5)" },
        },
        // Typewriter caret blink
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },

      animation: {
        "fade-in":      "fade-in 0.6s ease forwards",
        "scan":         "scan 3s linear infinite",
        "count-up":     "count-up 0.5s ease forwards",
        "ping-slow":    "ping-slow 2s ease-in-out infinite",
        "blink":        "blink 1s step-end infinite",
      },
    },
  },

  plugins: [],
}