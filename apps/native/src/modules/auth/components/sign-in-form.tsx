import { SocialConnections } from "@/components/social-connections"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/text"
import { authClient } from "@/lib/auth-client"
import { Link, useRouter } from "expo-router"
import * as React from "react"
import { type TextInput, View, Alert } from "react-native"

export function SignInForm() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const passwordInputRef = React.useRef<TextInput>(null)
  const router = useRouter()

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus()
  }

  async function onSubmit() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      })

      if (error) {
        Alert.alert("Error", error.message || "Failed to sign in")
      } else {
        router.replace("/(protected)")
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Sign in to your app
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                editable={!isLoading}
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}>
                  <Text className="text-xs">Forgot your password?</Text>
                </Button>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="send"
                onSubmitEditing={onSubmit}
                editable={!isLoading}
              />
            </View>
            <Button
              className="w-full"
              onPress={onSubmit}
              disabled={isLoading}>
              <Text>{isLoading ? "Signing in..." : "Continue"}</Text>
            </Button>
          </View>

          <View className="flex-row items-center justify-center gap-1">
            <Text className="text-center text-sm">Don&apos;t have an account?</Text>
            <Link href="/sign-up">
              <Text className="text-sm text-primary underline underline-offset-4">
                Sign up
              </Text>
            </Link>
          </View>

          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  )
}
