# Quick Start: Protected Routes

## ✅ What Was Implemented

Your Expo app now has **fully protected routes** using Better Auth and Expo Router!

## 🎯 Key Features

1. **Automatic route protection** - Users must be authenticated to access protected routes
2. **Auto-redirect on sign in** - After login, users go directly to `/home`
3. **Auto-redirect on sign out** - After logout, users go to `/sign-in`
4. **Prevent authenticated users from accessing auth pages** - Logged-in users can't access `/sign-in` or `/sign-up`
5. **Global auth state** - Access user data anywhere with `useAuth()` hook
6. **Loading states** - Shows spinner while checking authentication

## 📝 How to Use

### Get user data in any component:

```typescript
import { useAuth } from "@/lib/auth-provider"

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth()

  return <Text>Hello {user?.name}</Text>
}
```

### Sign in (already implemented):

```typescript
const { refetch } = useAuth()

await authClient.signIn.email({ email, password })
refetch() // Important: Update global state
router.replace("/home")
```

### Sign out (already implemented):

```typescript
const { refetch } = useAuth()

await authClient.signOut()
refetch() // Important: Clear global state
router.replace("/(auth)/sign-in")
```

## 🚦 Route Behavior

| Route      | Not Authenticated | Authenticated |
| ---------- | ----------------- | ------------- |
| `/`        | → `/sign-in`      | → `/home`     |
| `/sign-in` | ✅ Allowed        | → `/home`     |
| `/sign-up` | ✅ Allowed        | → `/home`     |
| `/home`    | → `/sign-in`      | ✅ Allowed    |

## 🧪 Test It

1. **Start the app** - Should redirect to `/sign-in`
2. **Sign in** - Should redirect to `/home`
3. **Try to go to `/sign-in` while logged in** - Should redirect to `/home`
4. **Sign out** - Should redirect to `/sign-in`
5. **Try to access `/home` while logged out** - Should redirect to `/sign-in`

## 📦 Files Created

- `hooks/use-session.ts` - Session management hook
- `lib/auth-provider.tsx` - Global auth context
- `components/protected-route.tsx` - Route guard component

## 🔧 Files Modified

- `app/_layout.tsx` - Added AuthProvider & ProtectedRoute
- `app/index.tsx` - Smart redirect based on auth
- `app/home.tsx` - Uses auth context
- `app/(auth)/sign-in.tsx` - Refetches session after login

## 💡 Next Steps

You can now:

- Add more protected routes (they'll automatically be guarded)
- Access user data anywhere with `useAuth()`
- Create role-based access control
- Add profile pages, settings, etc.

## 📚 More Details

See `PROTECTED_ROUTES.md` for complete documentation.
