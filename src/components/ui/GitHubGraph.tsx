// ─────────────────────────────────────────────────────────────
// GitHubGraph component — v2
// Full-width contribution graph with amber color scale,
// month labels, hover tooltips, legend and total count
// ─────────────────────────────────────────────────────────────

import { useState } from "react"
import { useGitHubContributions } from "@/hooks/useGitHubContributions"
import type { ContributionDay } from "@/hooks/useGitHubContributions"

// ── Amber color ramp ──────────────────────────────────────────
const LEVEL_COLORS: Record<number, string> = {
  0: "#141412",  // empty — matches bg-tertiary
  1: "#3d2608",  // dim
  2: "#7a4f10",  // mid
  3: "#BA7517",  // bright
  4: "#EF9F27",  // full amber
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun",
                 "Jul","Aug","Sep","Oct","Nov","Dec"]

const DAY_LABELS = ["Mon","","Wed","","Fri","",""]

interface GitHubGraphProps {
  username: string
}

export default function GitHubGraph({ username }: GitHubGraphProps) {
  const { data, loading, error, total } = useGitHubContributions(username)
  const [tooltip, setTooltip] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)

  // ── Loading skeleton ────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full">
        <div className="flex gap-[3px]">
          {Array.from({ length: 52 }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[3px] flex-1">
              {Array.from({ length: 7 }).map((_, dayIdx) => (
                <div
                  key={dayIdx}
                  className="w-full aspect-square rounded-sm bg-bg-elevated animate-pulse"
                  style={{ animationDelay: `${(weekIdx + dayIdx) * 10}ms` }}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="font-mono text-[9px] text-text-ghost mt-3">
          loading contributions...
        </p>
      </div>
    )
  }

  // ── Error fallback ──────────────────────────────────────────
  if (error || data.length === 0) {
    return (
      <p className="font-mono text-[9px] text-text-tertiary">
        ▸ contribution data unavailable
      </p>
    )
  }

  // ── Month label positions ─────────────────────────────────
  const monthLabels: { label: string; weekIdx: number }[] = []
  let lastMonth = -1
  data.forEach((week, weekIdx) => {
    if (week[0]) {
      const month = new Date(week[0].date).getMonth()
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], weekIdx })
        lastMonth = month
      }
    }
  })

  return (
    <div className="w-full relative">

      {/* ── Outer grid: day labels + graph ─────────────────── */}
      <div className="flex gap-2 w-full">

        {/* Day labels column */}
        <div className="flex flex-col justify-around pt-5 pb-0 flex-shrink-0">
          {DAY_LABELS.map((label, i) => (
            <span
              key={i}
              className="font-mono text-[8px] text-text-ghost leading-none"
              style={{ height: "11px", display: "flex", alignItems: "center" }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Graph area */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* Month labels row */}
          <div className="flex gap-[3px] mb-1 relative h-4">
            {data.map((_, weekIdx) => {
              const found = monthLabels.find((m) => m.weekIdx === weekIdx)
              return (
                <div key={weekIdx} className="flex-1 relative">
                  {found && (
                    <span className="font-mono text-[8px] text-text-ghost absolute left-0 top-0 whitespace-nowrap">
                      {found.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Contribution boxes */}
          <div className="flex gap-[3px] w-full">
            {data.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3px] flex-1">
                {week.map((day: ContributionDay) => (
                  <div
                    key={day.date}
                    className="w-full rounded-sm cursor-pointer transition-all duration-100 hover:scale-125 hover:z-10 relative"
                    style={{
                      background:   LEVEL_COLORS[day.level],
                      aspectRatio:  "1",
                      border:       day.level > 0 ? "1px solid rgba(239,159,39,0.08)" : "1px solid rgba(255,255,255,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                      setTooltip({
                        text: `${day.count} contribution${day.count !== 1 ? "s" : ""} · ${new Date(day.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      })
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Footer: total + legend ──────────────────────────── */}
      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
        <span className="font-mono text-[10px] text-text-secondary">
          <span className="text-amber font-semibold">{total.toLocaleString()}</span>
          {" "}contributions in the last year
        </span>

        {/* Color legend */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-text-ghost">less</span>
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{
                  background: LEVEL_COLORS[level],
                  border: level > 0 ? "1px solid rgba(239,159,39,0.12)" : "1px solid rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-text-ghost">more</span>
        </div>
      </div>

      {/* ── Tooltip ────────────────────────────────────────── */}
      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 bg-bg-elevated border border-border-strong rounded-sm font-mono text-[9px] text-text-primary pointer-events-none whitespace-nowrap shadow-lg"
          style={{
            left:      tooltip.x,
            top:       tooltip.y - 32,
            transform: "translateX(-50%)",
          }}
        >
          {tooltip.text}
        </div>
      )}

    </div>
  )
}
