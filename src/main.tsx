// ─────────────────────────────────────────────────────────────
// Application entry point
// Mounts React, imports global styles, sets up StrictMode
// ─────────────────────────────────────────────────────────────

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { inject } from "@vercel/analytics"
// @ts-ignore: allow importing global CSS in the application entry point
import "./index.css"
import App from "@/App"

// Initialize Vercel Web Analytics
inject()

// Mount the React application to the #root div in index.html
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)