import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Script } from "node:vm";

// Static, offline smoke only; not a screen-reader certification.
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
assert.match(html, /<html[^>]+lang=["']tr["']/i);
assert.match(html, /<meta[^>]+name=["']viewport["']/i);
assert.match(html, /<a[^>]+href=["']#main["']/i);
assert.match(html, /<main[^>]+id=["']main["']/i);
assert.match(html, /:focus-visible/);
assert.match(html, /@media\s*\(prefers-reduced-motion\s*:\s*reduce\)/i);
assert.match(html, /aria-live=["']polite["']/);
assert.match(html, /aria-live=["']assertive["']/);
assert.match(html, /role=["']note["']/);
assert.match(html, /bu araç bir kamu kurumu değildir/i);

const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
const choices = buttons.filter(m => /\bdata-life=/.test(m[1]));
const barriers = buttons.filter(m => /\bdata-barrier=/.test(m[1]));
assert.equal(choices.length, 5, "five original hackathon life paths");
assert.equal(barriers.length, 4, "four interaction barriers");
for (const [, attrs, body] of buttons) {
  const accessibleName = /\baria-label=["'][^"']+["']/.test(attrs) ||
    body.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().length > 0;
  assert.ok(accessibleName, "button with no accessible text: " + attrs);
}
for (const [, attrs] of [...choices, ...barriers]) {
  assert.match(attrs, /aria-pressed=["'](?:true|false)["']/);
}
for (const id of ["largeBtn", "contrastBtn", "motionBtn", "speakBtn", "run", "reset", "printCard"]) {
  assert.ok(new RegExp('id=["\x27]' + id + '["\x27]').test(html), "missing accessible control " + id);
}
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
assert.ok(scripts.length > 0, "inline behavior missing");
for (const source of scripts) new Script(source, { filename: "rightsbridge-inline-script" });
assert.ok(!/<script[^>]+src=["']https?:/i.test(html), "external script dependency");
console.log("G11 PASS: offline accessibility semantics, controls, reduced motion and inline JS syntax");
