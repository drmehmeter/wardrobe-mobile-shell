# Wardrobe mobile shell

Minimal Expo iOS WebView shell for the existing owner-private wardrobe website. It contains no inventory, private photos, credentials or backend code.

This is an iPhone authentication proof. Embedded sign-in, native device behavior, signing and TestFlight distribution are not yet verified. It permits only the Site and observed OpenAI authentication origins. Other providers and popups fail closed. The browser fallback does not transfer its session into the app.

The current source version is **0.1.1**. The shell opens the current Wardrobe site at `https://fasherd.dr-mehmeter.chatgpt.site/`. This repository update is not an App Store/TestFlight release or an update to an installed app.

The fixed upper-left native header shows the installed binary's version/build number and its recorded build-start time in **Europe/Istanbul (TSİ)**. It sits inside the safe area above the toolbar and WebView, including loading/error screens, and allows text to wrap. Expo Go and development sessions show a source preview label instead of the host app's version. Missing or mismatched build metadata is explicitly shown as unavailable; the app never uses the current device time as a release date.

The header is labelled **Mobil** and is rendered once in the native shell. No badge is injected into the website. The independently deployed website may show its own web version inside the WebView; the separate native row prevents overlap and does not misrepresent the web version as the binary version.

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run export:ios
```

`export:ios` stamps metadata and exports a JavaScript/assets bundle; it does not build, sign or distribute an iOS binary. The EAS post-install hook separately stamps each native build. See [the release and GitHub sync checklist](docs/RELEASING.md) for every future version or publication.
