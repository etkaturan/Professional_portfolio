// ─────────────────────────────────────────────────────────────
// useAnalytics hook
// Wraps Umami's event tracking API
// Only fires in production — silent in local dev
// ─────────────────────────────────────────────────────────────

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, string | number>) => void
    }
  }
}

export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    data?: Record<string, string | number>
  ) => {
    try {
      window.umami?.track(eventName, data)
    } catch {
      // Silently fail — never break UI for analytics
    }
  }

  return { trackEvent }
}