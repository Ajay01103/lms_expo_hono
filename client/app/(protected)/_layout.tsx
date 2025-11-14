import { useEffect } from "react"
import { Stack, useRouter, useSegments } from "expo-router"
import { useAuth } from "@/lib/auth-provider"
import { View, ActivityIndicator, StyleSheet } from "react-native"

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (isLoading) return

    // Check if we're in the protected group
    const inProtectedGroup = segments[0] === "(protected)"

    if (!isAuthenticated && inProtectedGroup) {
      // Redirect to sign-in if not authenticated
      router.replace("/(auth)/sign-in")
    }
  }, [isAuthenticated, isLoading, segments, router])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#007AFF"
        />
      </View>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
    </Stack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
})
