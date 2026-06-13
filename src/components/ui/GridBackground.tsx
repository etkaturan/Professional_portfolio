// ─────────────────────────────────────────────────────────────
// GridBackground component
// Renders the technical grid SVG that fills the hero right panel
// Includes:
// - Fine grid lines (dark)
// - Amber crosshair at center
// - Two concentric amber rings (very subtle)
// - Coordinate label at GPS position of Fürth, Germany
// - Corner index markers
// ─────────────────────────────────────────────────────────────

interface GridBackgroundProps {
  className?: string
}

export default function GridBackground({ className = "" }: GridBackgroundProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* ── Fine grid lines — horizontal ───────────────────── */}
      {Array.from({ length: 13 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={i * 40}
          x2="400"
          y2={i * 40}
          stroke="#1c1a15"
          strokeWidth="0.5"
        />
      ))}

      {/* ── Fine grid lines — vertical ─────────────────────── */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={i * 40}
          y1="0"
          x2={i * 40}
          y2="500"
          stroke="#1c1a15"
          strokeWidth="0.5"
        />
      ))}

      {/* ── Amber accent lines — center crosshair ──────────── */}
      <line x1="160" y1="200" x2="240" y2="200" stroke="#EF9F27" strokeWidth="0.8" opacity="0.25" />
      <line x1="200" y1="160" x2="200" y2="240" stroke="#EF9F27" strokeWidth="0.8" opacity="0.25" />

      {/* ── Concentric rings — very subtle ─────────────────── */}
      <circle cx="200" cy="200" r="70"  fill="none" stroke="#EF9F27" strokeWidth="0.5" opacity="0.10" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#EF9F27" strokeWidth="0.5" opacity="0.05" />

      {/* ── Corner dots at crosshair intersections ──────────── */}
      <circle cx="160" cy="160" r="1.5" fill="#EF9F27" opacity="0.3" />
      <circle cx="240" cy="160" r="1.5" fill="#EF9F27" opacity="0.3" />
      <circle cx="160" cy="240" r="1.5" fill="#EF9F27" opacity="0.3" />
      <circle cx="240" cy="240" r="1.5" fill="#EF9F27" opacity="0.3" />

      {/* ── Center focal point ──────────────────────────────── */}
      <circle cx="200" cy="200" r="3" fill="#EF9F27" opacity="0.6" />

      {/* ── GPS coordinates — Fürth, Germany ───────────────── */}
      <text
        x="210"
        y="194"
        fontSize="7"
        fill="#EF9F27"
        opacity="0.35"
        fontFamily="JetBrains Mono, monospace"
      >
        49.48°N
      </text>
      <text
        x="210"
        y="204"
        fontSize="7"
        fill="#EF9F27"
        opacity="0.35"
        fontFamily="JetBrains Mono, monospace"
      >
        10.98°E
      </text>

      {/* ── Corner index markers ────────────────────────────── */}
      <text x="8"   y="14"  fontSize="8" fill="#201e18" fontFamily="JetBrains Mono, monospace">00</text>
      <text x="372" y="14"  fontSize="8" fill="#201e18" fontFamily="JetBrains Mono, monospace">01</text>
      <text x="8"   y="494" fontSize="8" fill="#201e18" fontFamily="JetBrains Mono, monospace">10</text>
      <text x="372" y="494" fontSize="8" fill="#201e18" fontFamily="JetBrains Mono, monospace">11</text>
    </svg>
  )
}