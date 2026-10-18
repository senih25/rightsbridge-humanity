import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Script } from "node:vm";

// Offline static regression gate only: it cannot certify full WCAG compliance.
// Neither user-entered data nor external endpoints are accessed.
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
assert.match(html, /<html\s+lang="tr"/i, "Document language");
assert.match(html, /<meta\s+name="viewport"\s+content="width=device-width,initial-scale=1"/, "Mobile viewport");
assert.match(html, /<a\s+class="skip"\s+href="#main">İçeriğe geç/, "Skip link");
assert.match(html, /<main\s+id="main">/, "Skip target");
assert.match(html, /\.skip:focus\{/, "Keyboard focus should reveal skip link");
assert.match(html, /:focus-visible/, "Visible keyboard focus styling");
assert.equal((html.match(/<h1\b/gi) || []).length, 1, "Exactly one primary heading");
assert.match(html, /id="result"\s+aria-live="polite"/, "Screen-reader result announcements");
assert.match(html, /aria-pressed/, "Pressed state semantics for accessibility controls");
assert.match(html, /@media\s*\(max-width:560px\)/, "Small-screen style breakpoint");
assert.match(html, /@media\s*\(max-width:900px\)/, "Tablet style breakpoint");
assert.match(html, /window\.print\(\)/, "Print-friendly path card");
assert.match(html, /speechSynthesis/, "Optional browser speech support");
const ids = [...html.matchAll(/<[a-z][^>]*\sid="([^"]+)"/gi)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "Duplicate HTML IDs break label/landmark targets");
const script = html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];
assert.ok(script, "Required inline application script");
new Script(script); // compile only, never evaluate network, storage, or application effects
console.log("PASS: Turkish landmark, skip, focus, live region, keyboard state, unique IDs, mobile rules and JS parse");
console.log("NOTE: Actual keyboard, screen reader, visual contrast and mobile WCAG tests still require human/browser acceptance.");
