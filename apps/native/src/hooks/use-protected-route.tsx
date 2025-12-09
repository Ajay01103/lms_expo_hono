import { useEffect } from "react"
import { useSegments, useRouter } from "expo-router"
import { authClient } from "@/lib/auth-client"

/**
 * Redirect to the sign-in page if the user is not authenticated.
 * Redirect to the protected area if the user is authenticated and on an auth page.
 */
export function useProtectedRoute() {
  const { data: session, isPending } = authClient.useSession()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (isPending) return

    const inAuthGroup = segments[0] === "(auth)"
    const inProtectedGroup = segments[0] === "(protected)"

    if (!session && inProtectedGroup) {
      // Redirect to sign-in if user is not authenticated and trying to access protected routes
      router.replace("/(auth)/sign-in")
    } else if (session && inAuthGroup) {
      // Redirect to protected area if user is authenticated and on auth pages
      router.replace("/(protected)")
    }
  }, [session, segments, isPending, router])

  return { session, isPending }
}
