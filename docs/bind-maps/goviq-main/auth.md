# auth

Auto-derived module: everything under `src/app/auth/` plus `src/components/auth/`.

**App directory:** `src/app/auth/` (4 `.tsx` files) + **components directory:** `src/components/auth/` (1 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["auth/reset-password/page.tsx :: ResetPasswordContent"] -->|useMutation| n1["useMutation api.governance.userProvisioning.resetPassword"]
  n1 -->|reads/writes| n2[("gov_passwordResetTokens")]
  n1 -.->|triggers| n3["auth.rateLimits.clearRateLimit"]
  n4["auth/signin/page.tsx :: SignInContent"] -->|useMutation| n5["useMutation api.governance.userProvisioning.createPasswordResetToken"]
  n5 -->|reads/writes| n6[("sp_authCredentials")]
  n5 -->|reads/writes| n2[("gov_passwordResetTokens")]
  n5 -.->|triggers| n7["auth.passwordResetRateLimits.checkAndRecordRequest"]
  n5 -.->|triggers| n8["email.dispatchPasswordResetEmail.dispatchPasswordResetEmail"]
  n9["auth/verify-email/page.tsx :: VerifyEmailContent"] -->|useMutation| n10["useMutation api.auth.emailVerification.verifyEmailWithToken"]
  n10 -->|reads/writes| n11[("gov_emailVerificationTokens")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `governance.userProvisioning.resetPassword` | mutation | `gov_passwordResetTokens` | `auth.rateLimits.clearRateLimit` |
| `governance.userProvisioning.createPasswordResetToken` | mutation | `sp_authCredentials`, `gov_passwordResetTokens` | `auth.passwordResetRateLimits.checkAndRecordRequest`, `email.dispatchPasswordResetEmail.dispatchPasswordResetEmail` |
| `auth.emailVerification.verifyEmailWithToken` | mutation | `gov_emailVerificationTokens` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `auth/reset-password/page.tsx` | ResetPasswordContent | useMutation | `api.governance.userProvisioning.resetPassword` |
| `auth/signin/page.tsx` | SignInContent | useMutation | `api.governance.userProvisioning.createPasswordResetToken` |
| `auth/verify-email/page.tsx` | VerifyEmailContent | useMutation | `api.auth.emailVerification.verifyEmailWithToken` |
