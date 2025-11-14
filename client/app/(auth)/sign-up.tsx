import { useState } from "react"
import { useRouter } from "expo-router"
import { Platform, Alert } from "react-native"
import { XStack, YStack, Text, Input, Button, ScrollView, Separator } from "tamagui"
import { authClient } from "@/lib/auth-client"
import { useAuth } from "@/lib/auth-provider"

export default function SignUpScreen() {
  const router = useRouter()
  const { refetch } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long")
      return
    }

    setLoading(true)
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      })

      if (result.error) {
        Alert.alert("Error", result.error.message || "Failed to sign up")
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
              Create Account
            </Text>
            <Text
              fontSize="$5"
              color="gray">
              Join us and start your learning journey
            </Text>
          </YStack>

          {/* Form */}
          <YStack
            gap="$4"
            mb="$4">
            {/* Name Input */}
            <YStack gap="$2">
              <Text
                fontSize="$3"
                fontWeight="600"
                color="$black1">
                Full Name
              </Text>
              <Input
                size="$4"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoComplete="name"
                borderWidth={1}
                borderColor="gray"
                focusStyle={{
                  borderColor: "$blue8",
                  borderWidth: 2,
                }}
              />
            </YStack>

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
                placeholder="Enter your email"
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
                color="$black1">
                Password
              </Text>
              <Input
                size="$4"
                placeholder="Create a password (min 8 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password-new"
                borderWidth={1}
                borderColor="gray"
                focusStyle={{
                  borderColor: "$blue8",
                  borderWidth: 2,
                }}
              />
            </YStack>

            {/* Confirm Password Input */}
            <YStack gap="$2">
              <Text
                fontSize="$3"
                fontWeight="600"
                color="$black1">
                Confirm Password
              </Text>
              <Input
                size="$4"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password-new"
                borderWidth={1}
                borderColor="gray"
                focusStyle={{
                  borderColor: "$blue8",
                  borderWidth: 2,
                }}
              />
            </YStack>

            {/* Terms and Conditions */}
            <Text
              fontSize="$2"
              color="gray"
              lineHeight="$1"
              mt="$2">
              By signing up, you agree to our{" "}
              <Text
                color="$blue10"
                fontWeight="600"
                pressStyle={{ opacity: 0.7 }}>
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                color="$blue10"
                fontWeight="600"
                pressStyle={{ opacity: 0.7 }}>
                Privacy Policy
              </Text>
            </Text>

            {/* Sign Up Button */}
            <Button
              size="$5"
              theme="blue"
              onPress={handleSignUp}
              disabled={loading}
              mt="$3"
              pressStyle={{ opacity: 0.8 }}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            {/* Divider */}
            <XStack
              items="center"
              gap="$3"
              my="$4">
              <Separator flex={1} />
              <Text
                fontSize="$2"
                color="gray"
                fontWeight="500">
                OR
              </Text>
              <Separator flex={1} />
            </XStack>

            {/* Social Sign Up */}
            <YStack gap="$3">
              <Button
                size="$4"
                variant="outlined"
                borderColor="gray"
                background="$background"
                onPress={() => Alert.alert("Info", "Google sign-up coming soon!")}
                pressStyle={{
                  opacity: 0.9,
                }}>
                🔍 Continue with Google
              </Button>

              <Button
                size="$4"
                variant="outlined"
                borderColor="gray"
                background="$background"
                onPress={() => Alert.alert("Info", "Apple sign-up coming soon!")}
                pressStyle={{
                  opacity: 0.9,
                }}>
                🍎 Continue with Apple
              </Button>
            </YStack>
          </YStack>

          {/* Sign In Link */}
          <XStack
            justify="center"
            gap="$2"
            mt="$4">
            <Text
              fontSize="$3"
              color="gray">
              Already have an account?
            </Text>
            <Text
              fontSize="$3"
              color="$blue10"
              fontWeight="700"
              onPress={() => router.push("/(auth)/sign-in")}
              pressStyle={{ opacity: 0.7 }}
              cursor="pointer">
              Sign In
            </Text>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
