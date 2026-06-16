// ─────────────────────────────────────────────────────────────
// App root — final version
// Wires together all global hooks and section components
// ─────────────────────────────────────────────────────────────

import { useCursor }          from "@/hooks/useCursor"
import { useActiveSection }   from "@/hooks/useActiveSection"
import { useScrollTracking }  from "@/hooks/useScrollTracking"
import Navbar                 from "@/components/layout/Navbar"
import Hero                   from "@/components/sections/Hero"
import About                  from "@/components/sections/About"
import Projects               from "@/components/sections/Projects"
import Experience             from "@/components/sections/Experience"
import Education              from "@/components/sections/Education"
import Contact                from "@/components/sections/Contact"

export default function App() {
  // Custom amber cursor ring
  useCursor()

  // Track active section for navbar highlight
  const activeSection = useActiveSection()

  // Track which sections user scrolls to (Umami events)
  useScrollTracking()

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar activeSection={activeSection} />
      <main className="pt-[52px]">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
