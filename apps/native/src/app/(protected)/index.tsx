import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { Link, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Text, View, ScrollView } from "react-native"

export default function App() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="items-center justify-center px-8 py-12">
        {/* Heading */}
        <Text className="text-4xl font-extrabold text-red-400 dark:text-white mb-3 tracking-tight">
          🚀 Welcome
        </Text>

        {/* User Session Info */}
        {session?.user && (
          <Card className="w-full mb-6">
            <CardHeader>
              <CardTitle>User Session</CardTitle>
              <CardDescription>Currently logged in user information</CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
              <View className="flex-row">
                <Text className="font-semibold text-gray-700 dark:text-gray-300">
                  Name:{" "}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400">
                  {session.user.name}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="font-semibold text-gray-700 dark:text-gray-300">
                  Email:{" "}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400">
                  {session.user.email}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="font-semibold text-gray-700 dark:text-gray-300">
                  ID:{" "}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400">
                  {session.user.id}
                </Text>
              </View>
              {session.user.image && (
                <View className="flex-row">
                  <Text className="font-semibold text-gray-700 dark:text-gray-300">
                    Image:{" "}
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400">
                    {session.user.image}
                  </Text>
                </View>
              )}
              <View className="flex-row">
                <Text className="font-semibold text-gray-700 dark:text-gray-300">
                  Email Verified:{" "}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400">
                  {session.user.emailVerified ? "Yes" : "No"}
                </Text>
              </View>
            </CardContent>
          </Card>
        )}

        <Button
          variant="destructive"
          className="mb-4"
          onPress={() => authClient.signOut()}>
          <Text>Log out</Text>
        </Button>

        <Link
          href="/(auth)/sign-in"
          asChild>
          <Button variant="secondary">
            <Text>Sign in page</Text>
          </Button>
        </Link>

        {/* Subheading */}
        <Text className="text-xl dark:text-white text-gray-700 mt-8 mb-8 text-center leading-relaxed">
          Build beautiful apps with{" "}
          <Text className="text-blue-500 font-semibold">Expo (Router) + Uniwind 🔥</Text>
        </Text>

        {/* Instruction text */}
        <Text className="text-base text-gray-600 dark:text-white text-center max-w-sm">
          Start customizing your app by editing{" "}
          <Text className="font-semibold text-gray-800 dark:text-white">
            app/index.tsx
          </Text>
        </Text>

        <StatusBar style="dark" />
      </View>
    </ScrollView>
  )
}
