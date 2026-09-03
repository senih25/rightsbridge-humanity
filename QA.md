# RightsBridge QA Evidence

Acceptance date: 3 September 2026

Production: https://senih25.github.io/rightsbridge-humanity/

Verified source commit before deployment: `7643705` (`feat: add barrier-aware social-rights MVP`).

## Deployment

- PASS — GitHub Pages configured from `main / (root)`.
- PASS — `pages-build-deployment` workflow completed successfully in 47 seconds.
- PASS — production URL serves the RightsBridge application over HTTPS.

## Functional acceptance

- PASS — 5 social-rights entry paths rendered.
- PASS — 4 access-barrier modes rendered.
- PASS — result action remains disabled until both a life situation and an access barrier are selected.
- PASS — disability + assistive-technology flow generated a result card with 3 first steps, preparation guidance, official-source link, and barrier-adaptation explanation.
- PASS — result receives focus after generation and ARIA live region announces the generated path.
- PASS — large-text, high-contrast, and reduced-motion controls toggle explicit state.
- PASS — browser Speech Synthesis API is available in the tested Chrome session.
- PASS — print / PDF action is wired to the browser print flow.
- PASS — reset clears pathway selections while preserving explicit accessibility preferences.

## Keyboard-only acceptance

Native Chrome keyboard navigation was tested with actual Tab / Enter input:

1. Tab exposed the **İçeriğe geç** skip link.
2. Enter activated the skip link.
3. Tab navigated across semantic life-situation buttons.
4. Enter selected **Engellilikle ilgili destek**.
5. Tab navigated across barrier buttons.
6. Enter selected **Yardımcı teknoloji kullanıyorum**.
7. Tab reached **Yol kartımı göster** only after the required selections enabled it.
8. Enter generated the result.
9. Focus moved to the result region and the live announcement became **Yol kartınız hazırlandı: Engellilikle ilgili desteklere erişim yolu**.

Verdict: PASS.

## Mobile acceptance — 390 × 844

- PASS — document scroll width: 390 px at a 390 px viewport.
- PASS — horizontal overflow: none.
- PASS — result card stayed inside the viewport (approx. 364 px rendered width).
- PASS — toolbar controls rendered at approx. 179 × 44 px each.
- PASS — pathway controls remained vertically readable and touch-friendly.
- PASS — official source link and result focus behavior remained functional.

## Runtime / network

- Console errors: **0**.
- Console warnings: **0**.
- After initial load and local interactions, the network panel contained only the GitHub Pages document request; pathway generation required **no API call**.
- Personal identifiers collected by the application: **0**.
- Account requirement: **none**.
- Document upload: **none**.

## Observed performance

Measured in the tested Chrome session after a production reload:

- TTFB: ~5 ms
- DOMContentLoaded: ~26 ms
- Load event: ~119 ms
- First Contentful Paint: ~144 ms
- CLS: 0.00
- Decoded HTML body: ~21 KB

These are observational test-session measurements, not performance guarantees.

## Safety / content boundary

PASS — production UI explicitly states that RightsBridge:

- is not a public institution,
- does not decide legal entitlement,
- does not request identity number, name, or document upload,
- provides educational navigation only,
- points users to official public sources for current procedures.

## Prior-work / hackathon provenance

PASS — README discloses that `sosyalhakrehberi.com` and `senih25/SocialRightOS-frontend` existed before Code for Humanity. They are treated as domain research / UX learning / public-content reference only. No pre-existing application code was copied into this repository.

## Remaining submission work

- PENDING — maximum 3-minute demo video.
- PENDING — Devpost Project Story / repository / live URL fields.
- PENDING — final rules acceptance and submission by the participant.
