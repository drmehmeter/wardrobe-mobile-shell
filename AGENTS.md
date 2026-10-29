# Repository instructions

- For every new version or publication, follow `docs/RELEASING.md`, sync this same GitHub repository, and verify the resulting remote commit. Preserve newer work; do not force-push.
- Keep the current mobile version and recorded build/update time fixed at the upper-left inside the native safe area. Display times in Europe/Istanbul. Do not infer a release date from the current clock.
- Distinguish source version, exported bundle, native binary and actual distribution. Never claim an installed-app/TestFlight/App Store update from a source commit alone.
- Keep the native version header outside the WebView and labelled Mobil. Do not duplicate it in injected page content or confuse the web site's independent version with the native binary.
- Preserve existing public repository visibility and authentication/access restrictions. Commit only public-safe source; no secrets, signing material, runtime data, private catalog/ownership information, photos or patient data.
