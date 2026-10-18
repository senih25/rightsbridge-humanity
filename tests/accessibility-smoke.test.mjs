import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const hasId = (id) => ids.includes(id);

test('Turkish language, mobile viewport and single main landmark', () => {
  assert.match(html, /<html\s+lang="tr">/i);
  assert.match(html, /<meta\s+name="viewport"[^>]*width=device-width/i);
  assert.equal((html.match(/<main\b/g) ?? []).length, 1);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});

test('skip navigation targets existing landmark; IDs are unique', () => {
  assert.match(html, /<a\s+class="skip"\s+href="#main">İçeriğe geç<\/a>/);
  assert.ok(hasId('main'));
  assert.equal(new Set(ids).size, ids.length, 'duplicate IDs prevent deterministic assistive navigation');
  for (const [, target] of html.matchAll(/\baria-labelledby="([^"]+)"/g)) {
    for (const id of target.split(/\s+/)) assert.ok(hasId(id), `broken aria-labelledby: ${id}`);
  }
});

test('all selection controls expose their pressed state and result is gated', () => {
  const lives = [...html.matchAll(/<button\b[^>]*\bdata-life="[^"]+"[^>]*>/g)];
  const barriers = [...html.matchAll(/<button\b[^>]*\bdata-barrier="[^"]+"[^>]*>/g)];
  assert.equal(lives.length, 5);
  assert.equal(barriers.length, 4);
  for (const control of [...lives, ...barriers]) assert.match(control[0], /aria-pressed="false"/);
  assert.match(html, /<button\s+class="primary"\s+id="run"\s+disabled>/);
  assert.match(html, /id="result"\s+aria-live="polite"/);
  assert.match(html, /id="announcer"\s+aria-live="assertive"/);
});

test('keyboard focus feedback and accessible result announcement remain wired', () => {
  assert.match(html, /\.skip:focus\{/);
  assert.match(html, /:focus-visible/);
  assert.match(html, /result\.focus\(\{preventScroll:true\}\)/);
  assert.match(html, /document\.getElementById\('announcer'\)\.textContent=/);
  assert.match(html, /id="largeBtn"[^>]+aria-pressed="false"/);
  assert.match(html, /id="contrastBtn"[^>]+aria-pressed="false"/);
  assert.match(html, /id="motionBtn"[^>]+aria-pressed="false"/);
});

test('mobile breakpoints and privacy-first local execution contracts', () => {
  assert.match(html, /@media\(max-width:900px\)/);
  assert.match(html, /@media\(max-width:560px\)/);
  assert.doesNotMatch(html, /\bfetch\s*\(|XMLHttpRequest|navigator\.sendBeacon/i);
  assert.match(html, /Bu araç bir kamu kurumu değildir/);
  assert.match(html, /rel="noopener noreferrer"/);
});
