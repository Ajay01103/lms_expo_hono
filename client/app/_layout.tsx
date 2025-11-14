import { useFonts } from "expo-font"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Slot, SplashScreen } from "expo-router"
import { useColorScheme } from "react-native"
import { TamaguiProvider } from "tamagui"

import { tamaguiConfig } from "../tamagui.config"
import { useEffect } from "react"
import { AuthProvider } from "@/lib/auth-provider"

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [loaded, error] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}
