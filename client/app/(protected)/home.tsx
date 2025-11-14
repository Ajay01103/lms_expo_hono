import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "tamagui"
import { useRouter } from "expo-router"
import { useAuth } from "@/lib/auth-provider"

const Home = () => {
  const router = useRouter()
  const { user, refetch } = useAuth()

  const handleSignOut = async () => {
    await authClient.signOut()
    refetch() // Refetch session to update auth state
    router.replace("/(auth)/sign-in")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Your Dashboard</Text>
        {user && <Text style={styles.userName}>Hello, {user.name}!</Text>}
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.buttonContainer}>
          <Button
            size="$4"
            theme="red"
            onPress={handleSignOut}>
            Sign Out
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000",
  },
  userName: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 16,
    width: 200,
  },
})
