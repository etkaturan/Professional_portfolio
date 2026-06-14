// ─────────────────────────────────────────────────────────────
// useGitHubContributions hook
// Fetches the last 52 weeks of contribution data from
// GitHub GraphQL API using a personal access token
// Returns a flat array of { date, count, level } objects
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react"

export interface ContributionDay {
  date:  string
  count: number
  level: 0 | 1 | 2 | 3 | 4 // 0 = none, 4 = highest
}

interface UseGitHubContributionsResult {
  data:    ContributionDay[][]  // weeks array, each week has 7 days
  loading: boolean
  error:   string | null
  total:   number
}

export function useGitHubContributions(
  username: string
): UseGitHubContributionsResult {
  const [data,    setData]    = useState<ContributionDay[][]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [total,   setTotal]   = useState(0)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // import.meta.env typing can vary; cast via unknown to avoid incompatible type errors
        const token = (import.meta.env as unknown as { VITE_GITHUB_TOKEN?: string }).VITE_GITHUB_TOKEN

        if (!token) throw new Error("Missing GitHub token (VITE_GITHUB_TOKEN)")

        const query = `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type":  "application/json",
            "Authorization": `bearer ${token}`,
          },
          body: JSON.stringify({ query, variables: { username } }),
        })

        if (!res.ok) throw new Error("GitHub API request failed")

        const json = await res.json()

        if (json.errors) throw new Error(json.errors[0].message)

        const calendar =
          json.data.user.contributionsCollection.contributionCalendar

        // Map GitHub contribution levels to 0-4 scale
        const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
          NONE:           0,
          FIRST_QUARTILE: 1,
          SECOND_QUARTILE: 2,
          THIRD_QUARTILE: 3,
          FOURTH_QUARTILE: 4,
        }

        const weeks: ContributionDay[][] = calendar.weeks.map(
          (week: {
            contributionDays: {
              date: string
              contributionCount: number
              contributionLevel: string
            }[]
          }) =>
            week.contributionDays.map((day) => ({
              date:  day.date,
              count: day.contributionCount,
              level: levelMap[day.contributionLevel] ?? 0,
            }))
        )

        setData(weeks)
        setTotal(calendar.totalContributions)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setLoading(false)
      }
    }

    fetchContributions()
  }, [username])

  return { data, loading, error, total }
}