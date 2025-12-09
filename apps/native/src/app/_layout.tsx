import { PortalHost } from "@rn-primitives/portal"
import { QueryProvider } from "@/providers/query-provider"
import { authClient } from "@/lib/auth-client"
import "../../global.css"

import { Stack } from "expo-router"

export default function Layout() {
  const { data: session } = authClient.useSession()
  const isLoggedIn = !!session

  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
      </Stack>
      <PortalHost />
    </QueryProvider>
  )
}
