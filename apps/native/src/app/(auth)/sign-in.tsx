import { SignInForm } from "@/modules/auth/components/sign-in-form"
import { View } from "react-native"

const SignIn = () => {
  return (
    <View className="flex-1 bg-muted-foreground items-center justify-center p-4">
      <View className="w-full max-w-md">
        <SignInForm />
      </View>
    </View>
  )
}

export default SignIn
