# Claude Code guide — Wardrobe mobile shell

## Scope and working rules

Read [README.md](README.md) first. This is a small iOS authentication proof, not the Wardrobe backend or a finished native application. Use a feature branch and a draft pull request; do not merge, deploy, publish, change repository visibility, or grant integrations without separate authorization. This guide does not install Claude Code or authorize a new GitHub App/OAuth connection.

The repository is public. Never add inventory, personal photos, cookies, tokens, signing certificates, credentials, `.env*`, native provisioning files, database exports, or captured authenticated screens. Keep the existing `.gitignore` and `.easignore` protections.

## Architecture and edit points

- `src/app/_layout.tsx`: Expo Router stack, safe-area provider and status bar.
- `src/app/index.tsx`: WebView, loading/error UI, back/retry controls and external-browser fallback.
- `src/domain/navigation.ts`: existing `SITE_URL`, HTTPS/origin allowlist and navigation decision. Do not widen this list or change the destination as a setup workaround.
- `app.json`: iOS-only Expo app configuration; `assets/`: icons and splash images.
- `eas.json`: a store-distribution production profile, not evidence of a configured or signed release.

The lockfile uses Expo 57, React Native 0.86.3 and React 19.2.3. No backend, inventory database, native `ios/` project or `android/` project is committed. The app opens the separately hosted owner-private Site; editing this repository does not edit or copy that Site.

## Install and run

Use npm with `package-lock.json`. No root Node version is pinned. The locked React Native package declares Node `^20.19.4 || ^22.13.0 || ^24.3.0 || >=25.0.0`; choose a compatible version and record the exact Node/npm versions used. Do not upgrade dependencies merely to run the proof.

```sh
npm ci
npm run typecheck
npm run lint
npm run start
```

`npm run ios` invokes `expo start --ios` and needs a suitable iOS simulator/device environment; a cloud shell alone cannot verify native iPhone behavior. `android` and `web` scripts exist, but `app.json` declares only iOS and the WebView/auth flow is not a validated Android/web product.

Do not log into the owner's private website or capture authenticated content as an automatic smoke test. Use an explicitly authorized test session for any interactive authentication test.

## Tests and build

```sh
npm test
npm run export:ios
```

**Known test gap:** `npm test` expands to `node --import tsx --test tests/*.test.ts`, but no `tests/` directory or matching test files are committed in the inspected tree. It must not be described as a passing regression suite. Restore or add synthetic navigation tests in a separately scoped code change before relying on it.

`export:ios` creates a JavaScript/assets export in `dist/` with one worker. It is not an IPA, device test, signed App Store build, submission, or TestFlight distribution. No general `build` or deploy script is defined.

For changes to navigation/UI, explicitly test allowed and blocked origins, credential-bearing/non-HTTPS URLs, popups, back/retry, canceled login, repeated refresh, errors and WebView termination on the intended device. Preserve fail-closed navigation and disabled cookie sharing. The external browser fallback does not transfer its session back into the WebView.

## Runtime configuration versus connected tools

The URL and allowed origins are source constants, not credentials. A GitHub or ChatGPT connector grant does not provide a runtime login session, Apple signing identity, Expo account or access to the private Site. Do not extract session cookies or bridge them into the app.

Before any separately authorized release, the owner must confirm the destination app identity, Expo/EAS project, Apple Developer account, bundle identifier, signing/provisioning and App Store Connect/TestFlight target. `app.json` currently has no `ios.bundleIdentifier` or EAS `projectId`. Do not invent them or run store submission simply because a production profile exists.

## Verification record

Guide prepared by reading the remote source, manifest, lockfile, config and history on 2026-10-28, based on commit `890b9f316df2f27b56f0074ab033d3b0782db0cd`. This documentation change did **not** run dependency installation, typecheck, lint, tests, export, native login, signing or deployment. Embedded sign-in and distribution remain unverified, as stated in the README.
