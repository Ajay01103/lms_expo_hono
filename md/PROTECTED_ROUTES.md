# Protected Routes with Better Auth & Expo Router

This implementation provides a complete authentication guard system using Better Auth and Expo Router's navigation capabilities.

## 🏗️ Architecture

### Files Created:

1. **`hooks/use-session.ts`** - Custom hook for session management
2. **`lib/auth-provider.tsx`** - Global auth context provider
3. **`components/protected-route.tsx`** - Route guard component

### Files Modified:

1. **`app/_layout.tsx`** - Wrapped with AuthProvider and ProtectedRoute
2. **`app/index.tsx`** - Smart redirect based on auth state
3. **`app/home.tsx`** - Uses auth context for user data
4. **`app/(auth)/sign-in.tsx`** - Refetches session after login

## 🔐 How It Works

### 1. Session Management (`use-session.ts`)

The `useSession` hook:

- Fetches the current session from Better Auth
- Returns `{ session, user, isLoading, isAuthenticated, refetch }`
- Can be manually refetched when auth state changes

```typescript
const { session, user, isLoading, isAuthenticated, refetch } = useSession()
```

### 2. Auth Context (`auth-provider.tsx`)

The `AuthProvider` wraps the entire app and provides global auth state:

- Makes auth state available to all components via `useAuth()` hook
- Prevents prop drilling
- Single source of truth for authentication

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

### 3. Route Protection (`protected-route.tsx`)

The `ProtectedRoute` component:

- Uses `useSegments()` to detect current route
- Automatically redirects based on auth state:
  - **Not authenticated + trying to access protected routes** → Redirect to `/sign-in`
  - **Authenticated + trying to access auth routes** → Redirect to `/home`
- Shows loading spinner while checking authentication

```tsx
<ProtectedRoute>
  <Stack>{/* Your routes */}</Stack>
</ProtectedRoute>
```

## 🚀 Usage

### Check if user is authenticated:

```typescript
import { useAuth } from "@/lib/auth-provider"

function MyComponent() {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) return <Spinner />
  if (!isAuthenticated) return <SignIn />

  return <div>Hello {user.name}</div>
}
```

### Access user data:

```typescript
const { user } = useAuth()

console.log(user.email)
console.log(user.name)
console.log(user.id)
```

### Refetch session after auth changes:

```typescript
const { refetch } = useAuth()

// After sign in
await authClient.signIn.email({ email, password })
refetch() // Update global auth state

// After sign out
await authClient.signOut()
refetch() // Clear global auth state
```

## 📁 Route Structure

```
app/
├── _layout.tsx          # Root layout with AuthProvider & ProtectedRoute
├── index.tsx            # Smart redirect (auth check)
├── home.tsx             # Protected route (requires auth)
└── (auth)/
    ├── sign-in.tsx      # Public route (redirects if authenticated)
    └── sign-up.tsx      # Public route (redirects if authenticated)
```

## 🔄 Flow Diagram

### User Not Authenticated:

```
Open app → Check auth → Not authenticated → Redirect to /sign-in
```

### User Authenticated:

```
Open app → Check auth → Authenticated → Redirect to /home
```

### User tries to access auth pages while logged in:

```
Navigate to /sign-in → Check auth → Authenticated → Redirect to /home
```

### User tries to access protected pages while logged out:

```
Navigate to /home → Check auth → Not authenticated → Redirect to /sign-in
```

## ⚡ Performance

- Session is fetched once on app load
- Auth state is cached in React context
- Manual refetch only when needed (sign in/out)
- No unnecessary re-renders

## 🎯 Best Practices

1. **Always call `refetch()` after auth state changes:**

   ```typescript
   await authClient.signIn.email(...)
   refetch()
   ```

2. **Use `useAuth()` instead of calling `authClient.getSession()` directly:**

   ```typescript
   // ❌ Don't do this
   const { data } = await authClient.getSession()

   // ✅ Do this
   const { user } = useAuth()
   ```

3. **Check `isLoading` before rendering:**

   ```typescript
   const { isLoading, isAuthenticated } = useAuth()

   if (isLoading) return <Spinner />
   ```

## 🛠️ Customization

### Add role-based access:

```typescript
// protected-route.tsx
const { user, isAuthenticated } = useAuth()

if (isAuthenticated && user.role !== "admin") {
  router.replace("/unauthorized")
}
```

### Add route-specific guards:

```typescript
// app/admin/_layout.tsx
export default function AdminLayout() {
  const { user } = useAuth()

  if (user?.role !== "admin") {
    return <Redirect href="/home" />
  }

  return <Slot />
}
```

## 🐛 Troubleshooting

### Routes not redirecting:

- Make sure `AuthProvider` wraps your entire app
- Check that `ProtectedRoute` is inside `AuthProvider`
- Call `refetch()` after auth state changes

### User data not available:

- Use `useAuth()` hook instead of direct API calls
- Check `isLoading` before accessing `user`

### Infinite redirects:

- Ensure `index.tsx` redirects based on `isAuthenticated`
- Check that protected routes are not in `(auth)` group
