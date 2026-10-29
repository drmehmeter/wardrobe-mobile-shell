import assert from 'node:assert/strict';
import test from 'node:test';
import { canNavigate, SITE_URL } from '../src/domain/navigation';

test('current Wardrobe endpoint and existing authentication origins remain allowed', () => {
  assert.equal(SITE_URL, 'https://fasherd.dr-mehmeter.chatgpt.site/');
  for (const url of [SITE_URL, `${SITE_URL}wardrobe`, 'https://auth.openai.com/login', 'https://chatgpt.com/']) {
    assert.equal(canNavigate(url), true);
  }
});

test('the obsolete endpoint and unrelated or unsafe URLs stay blocked', () => {
  for (const url of ['https://mehmet-zegna-atelier.dr-mehmeter.chatgpt.site/', 'https://example.com', 'http://fasherd.dr-mehmeter.chatgpt.site/', 'https://fasherd.dr-mehmeter.chatgpt.site.evil.test/', 'https://user:password@fasherd.dr-mehmeter.chatgpt.site/', 'javascript:alert(1)', 'invalid']) {
    assert.equal(canNavigate(url), false);
  }
});
