/* global __dirname */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const { expo } = require(path.join(root, 'app.json'));
const packageJson = require(path.join(root, 'package.json'));

if (packageJson.version !== expo.version) {
  throw new Error('package.json and app.json versions must match before building.');
}

// This is a build-start timestamp, never a claimed TestFlight/App Store release.
// Generate once per build; the app never substitutes the device's current clock.
fs.writeFileSync(path.join(root, 'build-metadata.json'), JSON.stringify({
  version: expo.version,
  buildStartedAt: new Date().toISOString(),
}, null, 2) + '\n');
console.log(`Stamped build metadata for source v${expo.version}. Distribution is not verified.`);
