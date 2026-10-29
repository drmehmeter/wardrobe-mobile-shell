/* global __dirname */
const fs = require('node:fs');
const path = require('node:path');

module.exports = ({ config }) => {
  const file = path.join(__dirname, 'build-metadata.json');
  const build = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
  if (build && build.version !== config.version) {
    throw new Error('Build metadata belongs to another version. Run npm run stamp:build.');
  }
  return { ...config, extra: { ...config.extra, shellBuild: build } };
};
