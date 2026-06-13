// ─────────────────────────────────────────────────────────────
// Contact section component
// Layout:
// LEFT  — contact form (name, email, message, send button)
// RIGHT — social links, email copy, location, availability
// ─────────────────────────────────────────────────────────────

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconSend,
  IconCopy,
  IconCheck,
  IconLoader2,
} from "@tabler/icons-react"
import { personal, socialLinks } from "@/data/portfolio"
import { containerVariants, itemVariants } from "@/utils/motion"
// @ts-ignore: Allow side-effect CSS import without declaration file
import "./Contact.css"

// ── Form state types ──────────────────────────────────────────
interface FormData {
  name:    string
  email:   string
  subject: string
  message: string
}

interface FormErrors {
  name?:    string
  email?:   string
  message?: string
}

type FormStatus = "idle" | "sending" | "success" | "error"

// ── Social link icon map ──────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  IconBrandGithub:   <IconBrandGithub  size={18} />,
  IconBrandLinkedin: <IconBrandLinkedin size={18} />,
  IconMail:          <IconMail         size={18} />,
}

// ── Main component ────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name:    "",
    email:   "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>("idle")
  const [copied, setCopied] = useState(false)

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  // ── Field change handler ──────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // ── Validation ────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim())
      newErrors.name = "Name is required"
    if (!form.email.trim())
      newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address"
    if (!form.message.trim())
      newErrors.message = "Message is required"
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ── Submit handler ────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus("sending")
    try {
      // TODO: wire EmailJS in polish pass
      // import emailjs from '@emailjs/browser'
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ... }, PUBLIC_KEY)
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  // ── Copy email ────────────────────────────────────────────
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement("textarea")
      el.value = personal.email
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="contact">

      {/* Section header */}
      <div className="flex items-center justify-between px-8 lg:px-12 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-text-ghost tracking-widest">// 06</span>
          <span className="font-mono text-[9px] text-amber tracking-[0.2em] uppercase">contact</span>
        </div>
        <span className="font-mono text-[9px] text-text-ghost tracking-widest hidden sm:block">get in touch</span>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-px bg-border"
      >

        {/* LEFT — Form */}
        <motion.div variants={itemVariants} className="bg-bg-primary px-8 lg:px-12 py-10">
          <div className="max-w-lg">
            <p className="font-mono text-[9px] tracking-[0.2em] text-text-tertiary uppercase mb-2">send a message</p>
            <h2 className="font-sans text-2xl font-bold text-text-primary mb-2">
              Let's work <span className="text-amber">together</span>
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              Whether you have a project in mind, a role to discuss, or just want to connect — I read every message and reply within 24 hours.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-4">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.14em] text-text-tertiary uppercase block mb-1.5">name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="contact-input" autoComplete="name" />
                    {errors.name && <p className="font-mono text-[9px] text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.14em] text-text-tertiary uppercase block mb-1.5">email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="contact-input" autoComplete="email" />
                    {errors.email && <p className="font-mono text-[9px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono text-[9px] tracking-[0.14em] text-text-tertiary uppercase block mb-1.5">
                    subject <span className="text-text-ghost">(optional)</span>
                  </label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className="contact-input" />
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[9px] tracking-[0.14em] text-text-tertiary uppercase block mb-1.5">message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project, role, or idea..." className="contact-input" rows={5} />
                  {errors.message && <p className="font-mono text-[9px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                {/* Status */}
                {status === "success" && (
                  <div className="form-status success">✓ Message sent — I'll reply within 24 hours.</div>
                )}
                {status === "error" && (
                  <div className="form-status error">✕ Something went wrong. Please email me directly.</div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="contact-submit flex items-center justify-center gap-2 w-full py-3 bg-amber text-bg-primary font-sans font-bold text-[11px] tracking-[0.14em] uppercase rounded-sm hover:bg-amber-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <><IconLoader2 size={14} className="animate-spin" />Sending...</>
                  ) : (
                    <><IconSend size={14} />Send message</>
                  )}
                </button>

              </div>
            </form>
          </div>
        </motion.div>

        {/* RIGHT — Links + info */}
        <motion.div variants={itemVariants} className="bg-bg-secondary px-8 py-10 flex flex-col gap-8">

          {/* Email copy */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-text-tertiary uppercase mb-3">email</p>
            <div className="flex items-center justify-between p-4 border border-border-strong rounded-md bg-bg-primary">
              <span className="font-mono text-[11px] text-text-primary">{personal.email}</span>
              <button onClick={handleCopy} className="flex items-center gap-1.5 font-mono text-[9px] ml-3 flex-shrink-0 transition-colors duration-150" aria-label="Copy email">
                {copied ? (
                  <span className="flex items-center gap-1 text-green-400"><IconCheck size={13} />copied</span>
                ) : (
                  <span className="flex items-center gap-1 text-text-tertiary hover:text-amber"><IconCopy size={13} />copy</span>
                )}
              </button>
            </div>
          </div>

          {/* Social links */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-text-tertiary uppercase mb-3">elsewhere</p>
            <div className="flex flex-col gap-2">
              {socialLinks.map(({ label, url, icon }: { label: string; url: string; icon: string }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                  <span className="text-amber flex-shrink-0">{iconMap[icon]}</span>
                  <div className="flex flex-col">
                    <span className="font-sans text-sm text-text-primary font-medium">{label}</span>
                    <span className="font-mono text-[10px] text-text-tertiary">{url.replace("https://", "").replace("mailto:", "")}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-text-tertiary uppercase mb-3">location</p>
            <div className="flex items-center gap-2 mb-2">
              <IconMapPin size={13} color="#EF9F27" />
              <span className="font-mono text-[11px] text-text-secondary">{personal.location}</span>
            </div>
            <p className="font-mono text-[10px] text-text-tertiary leading-relaxed">{personal.coordinates}</p>
          </div>

          {/* Availability */}
          <div className="mt-auto p-4 border border-amber-dim rounded-sm bg-amber-glow">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="font-mono text-[10px] text-amber tracking-[0.12em] uppercase">open to opportunities</span>
            </div>
            <p className="font-mono text-[10px] text-text-secondary leading-relaxed">
              {personal.workAuth}.<br />
              Interested in full-stack, backend, and AI-integrated roles.
            </p>
          </div>

        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-between px-8 lg:px-12 py-4 border-t border-border bg-bg-secondary">
        <span className="font-mono text-[9px] text-text-ghost">© 2026 Mekhmetetka Turan</span>
        <span className="font-mono text-[9px] text-text-ghost">Built with React · TypeScript · Vite</span>
      </div>

    </section>
  )
}
