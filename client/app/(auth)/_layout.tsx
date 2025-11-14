import { useEffect } from "react"
import { Stack, useRouter, useSegments } from "expo-router"
import { useAuth } from "@/lib/auth-provider"

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (isLoading) return

    // Check if we're in the auth group
    const inAuthGroup = segments[0] === "(auth)"

    if (isAuthenticated && inAuthGroup) {
      // Redirect to home if authenticated
      router.replace("/(protected)/home")
    }
  }, [isAuthenticated, isLoading, segments, router])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  )
}
