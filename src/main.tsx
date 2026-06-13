// ─────────────────────────────────────────────────────────────
// Application entry point
// Mounts React, imports global styles, sets up StrictMode
// ─────────────────────────────────────────────────────────────

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
// @ts-ignore: allow importing global CSS in the application entry point
import "./index.css"
import App from "@/App"

// Mount the React application to the #root div in index.html
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)