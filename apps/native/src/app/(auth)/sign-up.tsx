import { SignUpForm } from "@/modules/auth/components/sign-up-form"
import { View } from "react-native"

const SignUp = () => {
  return (
    <View className="flex-1 bg-muted-foreground items-center justify-center p-4">
      <View className="w-full max-w-md">
        <SignUpForm />
      </View>
    </View>
  )
}

export default SignUp
