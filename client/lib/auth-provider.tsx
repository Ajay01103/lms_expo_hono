import React, { createContext, useContext, ReactNode } from "react"
import { useSession, Session, User } from "@/hooks/use-session"

interface AuthContextType {
  session: Session | null
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const sessionData = useSession()

  return <AuthContext.Provider value={sessionData}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
