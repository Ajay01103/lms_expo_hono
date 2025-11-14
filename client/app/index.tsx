import { Redirect } from "expo-router"
import { useAuth } from "@/lib/auth-provider"
import { View, ActivityIndicator, StyleSheet } from "react-native"

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth()

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

  return <Redirect href={isAuthenticated ? "/(protected)/home" : "/(auth)/sign-in"} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
})
