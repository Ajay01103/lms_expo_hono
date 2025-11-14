import { useState } from "react"
import { useRouter } from "expo-router"
import { Platform, Alert } from "react-native"
import { XStack, YStack, Text, Input, Button, ScrollView, Separator } from "tamagui"
import { authClient } from "@/lib/auth-client"
import { useAuth } from "@/lib/auth-provider"

export default function SignInScreen() {
  const router = useRouter()
  const { refetch } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      })

      if (result.error) {
        Alert.alert("Error", result.error.message || "Failed to sign in")
      } else {
        refetch() // Refetch session to update auth state
        router.replace("/(protected)/home")
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack
      flex={1}
      background="$background"
      {...(Platform.OS === "ios" && { paddingTop: "$8" })}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <YStack
          flex={1}
          justify="center"
          p="$6"
          maxW={500}
          width="100%"
          self="center"
          gap="$4">
          {/* Header */}
          <YStack
            gap="$2"
            mb="$6">
            <Text
              fontSize="$10"
              fontWeight="800"
              color="$color">
              Welcome Back
            </Text>
            <Text
              fontSize="$5"
              color="gray">
              Sign in to continue your learning journey
            </Text>
          </YStack>

          {/* Form */}
          <YStack
            gap="$4"
            mb="$4">
            {/* Email Input */}
            <YStack gap="$2">
              <Text
                fontSize="$3"
                fontWeight="600"
                color="$black1">
                Email Address
              </Text>
              <Input
                size="$4"
                placeholder="your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                borderWidth={1}
                borderColor="gray"
                focusStyle={{
                  borderColor: "$blue8",
                  borderWidth: 2,
                }}
              />
            </YStack>

            {/* Password Input */}
            <YStack gap="$2">
              <Text
                fontSize="$3"
                fontWeight="600"
                color="$black2">
                Password
              </Text>
              <Input
                size="$4"
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                borderWidth={1}
                borderColor="gray"
                focusStyle={{
                  borderColor: "$blue8",
                  borderWidth: 2,
                }}
              />
            </YStack>

            {/* Forgot Password */}
            <XStack
              justify="flex-end"
              mt="$2">
              <Text
                fontSize="$3"
                color="$blue10"
                fontWeight="600"
                pressStyle={{ opacity: 0.7 }}
                cursor="pointer">
                Forgot Password?
              </Text>
            </XStack>

            {/* Sign In Button */}
            <Button
              size="$5"
              theme="blue"
              onPress={handleSignIn}
              disabled={loading}
              mt="$3"
              pressStyle={{ opacity: 0.8 }}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            {/* Divider */}
            <XStack
              self="center"
              gap="$3"
              my="$5">
              <Separator flex={1} />
              <Text
                fontSize="$2"
                color="gray"
                fontWeight="500">
                OR
              </Text>
              <Separator flex={1} />
            </XStack>

            {/* Social Sign In */}
            <YStack gap="$3">
              <Button
                size="$4"
                variant="outlined"
                borderColor="gray"
                background="$background"
                onPress={() => Alert.alert("Info", "Google sign-in coming soon!")}
                pressStyle={{
                  background: "$gray2",
                  opacity: 0.9,
                }}>
                🔍 Continue with Google
              </Button>

              <Button
                size="$4"
                variant="outlined"
                borderColor="gray"
                background="$background"
                onPress={() => Alert.alert("Info", "Apple sign-in coming soon!")}
                pressStyle={{
                  background: "$gray2",
                  opacity: 0.9,
                }}>
                🍎 Continue with Apple
              </Button>
            </YStack>
          </YStack>

          {/* Sign Up Link */}
          <XStack
            justify="center"
            gap="$2"
            mt="$6">
            <Text
              fontSize="$3"
              color="gray">
              Don't have an account?
            </Text>
            <Text
              fontSize="$3"
              color="$blue10"
              fontWeight="700"
              onPress={() => router.push("/(auth)/sign-up")}
              pressStyle={{ opacity: 0.7 }}
              cursor="pointer">
              Sign Up
            </Text>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
