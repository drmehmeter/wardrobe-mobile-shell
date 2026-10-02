export const SITE_URL = 'https://mehmet-zegna-atelier.dr-mehmeter.chatgpt.site/';
const ALLOWED_ORIGINS = new Set([new URL(SITE_URL).origin, 'https://auth.openai.com', 'https://chatgpt.com']);

/** Navigation stays within the observed Site / OpenAI login flow. Never inspect cookies or tokens. */
export function canNavigate(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && ALLOWED_ORIGINS.has(url.origin);
  } catch { return false; }
}
