# RightsBridge — Barrier-Aware Social Rights Navigator

RightsBridge is a privacy-first, accessibility-focused social-rights navigator built **from scratch during the Code for Humanity 2026 hackathon period**.

> Human goal: help people facing digital, literacy, disability, caregiver, or low-bandwidth barriers understand where to start — without pretending to make an official eligibility decision.

## Why this exists

People looking for social support often face two problems at once: the underlying life situation and the complexity of navigating fragmented public information. RightsBridge turns that first step into a short, calm, low-data workflow.

The product focuses on underserved users including older adults, disabled people, caregivers, low-income households, people with limited digital confidence, and users on slow connections.

## Core experience

1. **Choose a life situation** — care at home, health coverage/income test, older-age support, birth/new child, or disability-related support.
2. **Choose the barrier that matters today** — reading difficulty, limited internet, assistive technology, or helping another person.
3. **Get a plain-language path card** — why the topic may be relevant, what to prepare, and the safest next step.
4. **Use accessibility controls** — large text, high contrast, reduced motion, read-aloud, and print-friendly next steps.
5. **Keep control** — no account, no identity number, no document upload, and no automatic official decision.

## Design principles

- **Barrier-aware, not identity-hungry.** The interface adapts to interaction barriers without collecting unnecessary personal data.
- **Guidance, not adjudication.** Results explain possible pathways and explicitly separate guidance from official decisions.
- **Low-bandwidth by default.** The MVP is dependency-light and designed to work as a small static web application.
- **Accessible interaction.** Keyboard-first controls, semantic HTML, visible focus, large touch targets, and optional speech synthesis.
- **Explainability.** Every recommendation includes a reason and a next-step checklist.

## Hackathon provenance / prior work disclosure

The submission period began **16 July 2026**. This repository was created on **3 September 2026**, during the hackathon period.

A pre-existing project, [sosyalhakrehberi.com](https://sosyalhakrehberi.com/), and its older repositories such as `senih25/SocialRightOS-frontend` existed before the hackathon. They are used only as **domain research, problem discovery, UX learning, and public-content reference**.

**No application code from those pre-existing repositories is copied into this repository.** RightsBridge is a new implementation with a separate codebase, interaction model, accessibility layer, and hackathon commit history.

## Code for Humanity fit

Judging alignment:

- **Impact (30%)** — reduces access friction for people who may struggle with complex public-service information.
- **Innovation (25%)** — adapts the interaction to the user’s current access barrier rather than requiring sensitive profiling.
- **Technical Excellence (20%)** — small, auditable, dependency-light architecture with explicit privacy boundaries.
- **UX & Accessibility (15%)** — readable, keyboard-operable, screen-reader-friendly, high-contrast and read-aloud modes.
- **Scalability & Sustainability (10%)** — the path-card data model can expand to additional rights, languages, and jurisdictions.

## Safety boundary

RightsBridge does not determine legal entitlement, replace a public institution, or submit an application. It provides educational navigation and points users toward the next step.

## Planned MVP acceptance

- [x] 5 social-rights entry paths
- [x] barrier-aware presentation modes
- [x] large-text / high-contrast / reduced-motion controls
- [x] browser read-aloud
- [x] print / save next-step card
- [x] no network request required after initial page load
- [x] mobile 390 px QA with zero horizontal overflow
- [x] keyboard-only flow QA
- [x] public GitHub Pages deployment
- [ ] max 3-minute demo video

## Live demo

- Production: https://senih25.github.io/rightsbridge-humanity/
- QA evidence: [QA.md](./QA.md)

## License

MIT.
