import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
assert.match(html, /<html[^>]+lang="tr"/i, "Page language must be Turkish");
assert.match(html, /<meta[^>]+name="viewport"/i);
assert.match(html, /<a[^>]+class="skip"[^>]+href="#main"/i, "Skip navigation missing");
assert.match(html, /<main\s+id="main"/i, "Semantic main landmark missing");
assert.equal((html.match(/<h1\b/gi) || []).length, 1, "Expected one main heading");
assert.match(html, /aria-live="polite"/i, "Result status must be announced politely");
assert.match(html, /aria-live="assertive"/i, "Error status must be announced");
assert.match(html, /:focus-visible/i, "Visible keyboard focus selectors missing");
assert.match(html, /@media\s*\(max-width:560px\)/i, "Small mobile breakpoint missing");
assert.match(html, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i, "OS motion preference missing");
for (const id of ["largeBtn", "contrastBtn", "motionBtn", "speakBtn"]) {
  assert.match(html, new RegExp('<button[^>]*id="' + id + '"[^>]*aria-pressed="false"'), id + " missing state");
}
const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
assert.ok(buttons.length >= 12, "Expected main interactive controls");
for (const match of buttons) {
  const label = match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  assert.ok(label || /\baria-label=|\btitle=/i.test(match[1]), "Unlabelled button found");
}
for (const a of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
  if (/target="_blank"/i.test(a[1])) {
    assert.match(a[1], /rel="[^"]*noopener[^"]*noreferrer[^"]*"/i, "New tab link lacks opener protections");
  }
}
console.log("PASS: Turkish semantics, skip link, focus, live regions, labelled controls, safe external links, reduced motion and responsive CSS markers");
console.log("NOTE: This is a static smoke; it does not certify WCAG conformance or assistive-technology behavior");
