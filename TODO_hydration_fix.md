# Hydration Error Fix Plan

## Problem
Hydration mismatch occurs because `useSiteConfig` hook uses client-side translation (`useTranslation()`) while server renders with different language.

## Steps to Fix:
1. [ ] Update `useSiteConfig` hook to accept language parameter
2. [ ] Create server-side compatible version of site config
3. [ ] Update Navbar component to handle language consistency
4. [ ] Test the fix

## Root Cause:
- Server renders with default language (English: "Home")
- Client detects different language (Uzbek: "Bosh sahifa") from localStorage/browser
- Mismatch causes hydration error

## Files to Modify:
- config/site.tsx
- src/components/layout/Navbar.tsx
- src/i18n/config.ts (if needed for language detection consistency)
