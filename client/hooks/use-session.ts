import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

export interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  user: User
  session: {
    id: string
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string
    userAgent?: string
  }
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchSession = async () => {
    try {
      const { data, error } = await authClient.getSession()
      if (data && !error) {
        setSession(data as Session)
      } else {
        setSession(null)
      }
    } catch (error) {
      console.error("Failed to fetch session:", error)
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSession()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchSession()
  }

  return {
    session,
    user: session?.user ?? null,
    isLoading,
    isAuthenticated: !!session,
    refetch,
  }
}
