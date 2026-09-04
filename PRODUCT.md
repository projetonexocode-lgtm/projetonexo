# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are property owners deciding to hire work — homeowners and commercial clients (shops, offices) equally. Neither is a side audience.

Typical situation: a WC, kitchen, apartment, house, shop, or office needs remodel, construction, or rehabilitation, and the visitor wants a single accountable partner rather than assembling trades themselves.

A distinct audience uses **Nexo Services** for urgent home repairs and technical maintenance. That audience is real and in-product, but it is not the same job as hiring a works/project partner.

## Product Purpose

This repository is the institutional web presence for **Projeto Nexo** (works and projects) and **Nexo Services** (repairs and specialised home services).

Projeto Nexo exists so a property owner can start a conversation about remodel, construction, or rehabilitation with one interlocutor, a readable plan, and execution followed through to handover.

Nexo Services exists so someone with a breakdown (plumbing, electrics, drains, and related trades) can request on-site diagnosis and repair without mixing that job into a full works brief.

Success for both surfaces is a qualified contact (WhatsApp, phone, or form) that matches the right brand and service — not self-serve booking or e-commerce.

## Positioning

The company both coordinates and executes. The claim a neighbouring contractor could not truthfully copy is **method and accountability**, not who holds the tools: one interlocutor, a readable works plan, specialists by trade, and follow-through to delivery.

The two brands must stay separate:

- **Projeto Nexo** — remodel, construction, rehabilitation, decoration/architecture, site supervision, engineering.
- **Nexo Services** — repairs, maintenance, and specialised technical services at home.

Do not mix the offers. Reparações on projetonexo.pt is a hand-off to Nexo Services, not a Projeto Nexo service card that sells the same job.

## Operating Context

- Language and market of the live product: European Portuguese (`pt-PT`), Portugal.
- Base: Lisboa and Área Metropolitana. Current site copy also offers attendance nationwide when the project justifies travel; this was not re-confirmed as immutable in init.
- Conversion today: WhatsApp (`+351 934 900 070`), landline (`+351 214 062 942`), and a contact form (Resend when configured; otherwise the request opens WhatsApp).
- One Next.js app, two public hosts: `projetonexo.pt` (institutional works site) and `nexoservices.pt` (rewrites `/` to `/reparacoes`).
- Blog and Studio via Sanity at `/studio`.
- `/reparacoes` is the Nexo Services surface; `/reparações` 308-redirects to it.

## Capabilities and Constraints

Confirmed in product:

- Works catalogue: WC, kitchen, apartment, house, shop, office, supervision, engineering, custom furniture, decoration, architecture, interiors consulting, property rehabilitation.
- Nexo Services catalogue: plumbing, electrics, drains, water heaters/boilers, blinds, garage doors, glass, locksmith, AC, frames, doors/windows, damp detection, roofs.
- Guarantee copy currently published for Projeto Nexo: 2, 3, 5, or 7 years depending on the intervention; 6 months on installation when the client supplies materials. For Nexo Services: 6 months, 1 year, or 2 years by service type; 6 months on installation when the client supplies materials. Not re-confirmed as immutable in init.
- Founder has been running Projeto Nexo for more than 3 years; partner trades include people with 5, 15, and 20+ years by speciality.

Open / must not be invented:

- Official count or average of jobs completed (placeholder on both brands).
- Internal inconsistency: a differential card titled “+5 Anos de Experiência” vs founder tenure “mais de 3 anos” — which number is the public claim is undecided.
- Nexo Services operational details still marked placeholder: exact hours, weekend/holiday cover, typical arrival time, whether the on-site quote is always free, and the exact identified-technician procedure.
- Nexo Services reviews currently in code are illustrative stand-ins, not customer evidence.

## Brand Commitments

- Names: **Projeto Nexo** (legal line: Gestão de Obras e Projetos) and **Nexo Services** (legal line: Reparações e Serviços Especializados).
- The two brands remain separate offers. Cross-links are allowed; blended messaging is not.
- Shipping voice on Projeto Nexo: restrained, anti-hype — “sem números inflacionados e sem promessas que a obra não possa sustentar.” Not expanded into a visual identity here.

## Evidence on Hand

Real / in-repo:

- One marked real gallery project: `public/galeria/wc-base-de-duche.jpg` (bathtub to shower tray).
- Nexo Services trade photos under `public/nexo-services/` (plumbing, electrics, blinds, AC, frames, doors, damp) and copies under `public/images/services/`.

Must not be treated as proof, and future work must not fabricate replacements:

- Hero, coverage, and most gallery images are labelled stock/temporary (Unsplash).
- Nexo Services review quotes are labelled illustrative.
- Job-count metrics are placeholders awaiting an official number.
- No independent press, case studies, or licensed customer testimonials are in the repo.

## Product Principles

1. Two brands, two jobs — works and urgent repair never share an offer, a promise, or a proof claim.
2. Homeowners and commercial clients are both core; copy and structure must take both seriously.
3. Method and accountability are the product: one interlocutor, a readable plan, execution to handover — not a generic “we do everything” contractor pitch.
4. Do not inflate. Numbers, photos, and testimonials that are not on hand stay absent or explicitly marked until the client supplies them.
)
