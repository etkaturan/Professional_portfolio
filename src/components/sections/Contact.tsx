
import { useState, type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
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

// @ts-ignore
import "./Contact.css"

// ─────────────────────────────────────────────
// Framer Motion Variants
// ─────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type FormStatus = "idle" | "sending" | "success" | "error"

// ─────────────────────────────────────────────
// Icon Map
// ─────────────────────────────────────────────

const iconMap: Record<string, ReactNode> = {
  IconBrandGithub: <IconBrandGithub size={18} />,
  IconBrandLinkedin: <IconBrandLinkedin size={18} />,
  IconMail: <IconMail size={18} />,
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>("idle")
  const [copied, setCopied] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required"
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setStatus("sending")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setStatus("success")

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch {
      setStatus("error")

      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      const textarea = document.createElement("textarea")

      textarea.value = personal.email

      document.body.appendChild(textarea)

      textarea.select()

      document.execCommand("copy")

      document.body.removeChild(textarea)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <section id="contact">
      {/* Keep the rest of your JSX exactly as it currently is */}
    </section>
  )
}