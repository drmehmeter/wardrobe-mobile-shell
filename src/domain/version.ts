type BadgeInput = {
  sourceVersion: string;
  nativeVersion: string | null;
  nativeBuildVersion: string | null;
  isPreview: boolean;
  buildMetadata: unknown;
};

export function formatBuildDate(value: unknown): string | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 19) !== value.slice(0, 19)) return null;
  return new Intl.DateTimeFormat('tr-TR', {
    timeZone: 'Europe/Istanbul', day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(date) + ' (TSİ)';
}

export function getVersionBadge(input: BadgeInput) {
  const version = input.isPreview ? input.sourceVersion : input.nativeVersion;
  const title = input.isPreview
    ? `Mobil önizleme · v${version}`
    : `Mobil · ${version ? `v${version}` : 'sürüm bilinmiyor'}${input.nativeBuildVersion ? ` (${input.nativeBuildVersion})` : ''}`;
  const build = input.buildMetadata;
  const buildDate = build && typeof build === 'object' && 'version' in build &&
    'buildStartedAt' in build && build.version === version
    ? formatBuildDate(build.buildStartedAt) : null;

  return {
    title,
    // Development sessions are source previews, even after a local bundle export.
    updated: input.isPreview ? 'Dağıtılmış sürüm değil'
      : buildDate ? `Derleme: ${buildDate}` : 'Derleme tarihi kayıtlı değil',
  };
}
