# Auth Refactor - Better Auth Integration

## Overview
The authentication logic has been refactored to use Better Auth's built-in `useSession` hook instead of a custom implementation. This provides automatic session caching in SecureStore on native platforms and simplifies the auth flow.

## Key Changes

### 1. Removed Custom Hook
- **Deleted**: `client/hooks/use-session.ts`
- **Reason**: Better Auth provides a built-in `useSession` hook with automatic caching

### 2. Updated Auth Provider
- **File**: `client/lib/auth-provider.tsx`
- **Changes**:
  - Now uses `authClient.useSession()` directly
  - Session data is automatically cached in SecureStore on native
  - Removed manual `refetch()` function - Better Auth handles updates automatically
  - Simplified type definitions using Better Auth's inferred types

### 3. Updated Auth Flows
- **Sign In/Sign Up**: Removed manual `refetch()` calls - session updates automatically
- **Sign Out**: Session clears automatically when `authClient.signOut()` is called
- **Route Protection**: Works seamlessly with the automatic session updates

## How It Works

### Session Management
```tsx
// In auth-provider.tsx
const { data: session, isPending } = authClient.useSession()
```

Better Auth's `useSession` hook:
- Automatically fetches session on mount
- Caches session data in SecureStore (native) or localStorage (web)
- Updates automatically when auth state changes
- No need for manual refetch calls

### Route Protection
Routes are protected using the `useAuth` hook in layout files:

**Protected Routes** (`(protected)/_layout.tsx`):
- Redirects to sign-in if not authenticated
- Shows loading spinner while checking session

**Auth Routes** (`(auth)/_layout.tsx`):
- Redirects to home if already authenticated
- Prevents authenticated users from accessing sign-in/sign-up

### Using Session in Components
```tsx
import { useAuth } from "@/lib/auth-provider"

function MyComponent() {
  const { session, user, isLoading, isAuthenticated } = useAuth()
  
  if (isLoading) return <LoadingSpinner />
  if (!isAuthenticated) return <SignInPrompt />
  
  return <Text>Welcome, {user?.name}!</Text>
}
```

## Benefits

1. **Automatic Caching**: Session persists across app restarts on native
2. **Simplified Code**: No manual refetch calls needed
3. **Better Performance**: Reduces loading spinners with cached data
4. **Type Safety**: Uses Better Auth's inferred types
5. **Less Boilerplate**: Removed custom session management code

## Configuration

Session caching is enabled by default. To disable:

```tsx
// In auth-client.ts
export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
  disableCache: true, // Add this to disable caching
  plugins: [
    expoClient({
      scheme: "lms",
      storagePrefix: "lms",
      storage: SecureStore,
    }),
  ],
})
```
