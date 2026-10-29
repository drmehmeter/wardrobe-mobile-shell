import assert from 'node:assert/strict';
import test from 'node:test';
import { formatBuildDate, getVersionBadge } from '../src/domain/version';

test('build dates use Istanbul time across midnight and in winter', () => {
  assert.equal(formatBuildDate('2026-10-29T22:05:00.000Z'), '30.10.2026 01:05 (TSİ)');
  assert.equal(formatBuildDate('2026-01-05T10:00:00Z'), '05.01.2026 13:00 (TSİ)');
});

test('missing, invalid or ambiguous dates do not invent an update time', () => {
  for (const value of [null, undefined, '', 'invalid', '2026-10-29', '2026-10-29T10:00:00', '2026-99-99T00:00:00Z', '2026-02-30T00:00:00Z']) {
    assert.equal(formatBuildDate(value), null);
  }
});

const input = {
  sourceVersion: '0.1.1', nativeVersion: '0.1.0', nativeBuildVersion: '7', isPreview: false,
  buildMetadata: { version: '0.1.0', buildStartedAt: '2026-10-29T11:00:00.000Z' },
};

test('an installed app shows its actual binary version and build date', () => {
  assert.deepEqual(getVersionBadge(input), {
    title: 'Mobil · v0.1.0 (7)', updated: 'Derleme: 29.10.2026 14:00 (TSİ)',
  });
});

test('a newer source version cannot label an older binary with its date', () => {
  assert.equal(getVersionBadge({ ...input, buildMetadata: { ...input.buildMetadata, version: '0.1.1' } }).updated, 'Derleme tarihi kayıtlı değil');
  assert.equal(getVersionBadge({ ...input, buildMetadata: null }).updated, 'Derleme tarihi kayıtlı değil');
  assert.equal(getVersionBadge({ ...input, nativeVersion: null }).title, 'Mobil · sürüm bilinmiyor (7)');
});

test('Expo Go/development previews never display the host version as a release', () => {
  assert.deepEqual(getVersionBadge({ ...input, nativeVersion: '57.0.0', isPreview: true }), {
    title: 'Mobil önizleme · v0.1.1', updated: 'Dağıtılmış sürüm değil',
  });
});
