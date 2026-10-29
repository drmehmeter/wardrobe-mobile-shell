# Release and GitHub sync checklist

For every new source version, native build or publication, update this same GitHub repository: `drmehmeter/wardrobe-mobile-shell`. Keep its existing public visibility and authentication restrictions. A GitHub commit, a successful bundle export, a signed binary, and a distributed/installed binary are separate milestones.

## Before building

1. Read current `main`, local changes and instructions; preserve newer work. Do not force-push.
2. Set the source version consistently in `app.json`, `package.json`, and the root records in `package-lock.json`. Update the current source version in README.
3. Check that the intended Wardrobe URL is current. Do not broaden authentication origins or change website access as part of version maintenance.
4. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, then `npm run export:ios`. Inspect the diff for public-safe source only.
5. Commit and sync the source to GitHub, then read back the remote commit SHA. Record the source version and checks in the handoff/release record.

## Build timestamp and native version

- `scripts/stamp-build.cjs` records the actual UTC build-start time once. `npm run export:ios` and the EAS `eas-build-post-install` hook invoke it. For a different local native build path, run `npm run stamp:build` immediately before that build. Do not reuse metadata from an older build.
- `app.config.js` embeds the generated metadata in the build's Expo config. Version mismatch stops config resolution. `build-metadata.json` is ignored by Git and excluded from the EAS upload so local metadata cannot silently become a later build's timestamp.
- The header reads the installed version/build number through `expo-application`. The recorded time is formatted with the explicit `Europe/Istanbul` time zone. It says **Derleme**, because build-start time is not App Store/TestFlight publication time.
- Development/Expo Go shows **Mobil önizleme** and **Dağıtılmış sürüm değil**. Unknown metadata shows **Derleme tarihi kayıtlı değil**. Never use the device clock, file modification time, Git commit time, export time or a planned release date as proof of distribution.
- This shell does not configure OTA updates. If they are added later, separately track native binary version/build metadata and JavaScript update version/time; do not attach a newer update's timestamp to an older binary.

## After an authorized distribution

1. Verify the actual TestFlight/App Store/build-service result and its version, build number, source commit and distribution timestamp. Do not infer success from a GitHub push or bundle export.
2. Test the installed build on a notched iPhone and iPad: top-left placement, safe areas, large text, scrolling, loading/errors, retry/back navigation and the existing sign-in flow. Confirm the native **Mobil** header appears once above the WebView and remains separate from the website's own version label.
3. Record the confirmed build/distribution evidence and source commit in release notes, then sync the updated notes to this repository and verify the remote SHA again. Do not include private account links, user data or credentials.
4. Report the source version and distributed/installed version separately. If distribution cannot be verified, say **source updated; installed app not updated/verified**, and name the remaining step.

## Public repository boundary

Publish only reviewed source, dependency lockfiles, tests and documentation. Never commit environment files, credentials, signing material, cookies/tokens, runtime/generated files, private photos, wardrobe catalog/ownership data, patient data, or build artifacts. Do not change repository visibility, access, credentials or payment settings during this checklist.
