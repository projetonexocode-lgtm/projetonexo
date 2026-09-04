# Projeto Nexo

Landing institucional da Projeto Nexo — Gestão de Obras e Projetos. Next.js (App Router), TypeScript, Tailwind CSS e blog em Sanity.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Copiar `.env.example` para `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — blog e Studio em `/studio`
- `RESEND_API_KEY` + `CONTACT_EMAIL` — envio do formulário por e-mail (sem isto, o pedido abre o WhatsApp)

## Redirect

`/reparacoes` e `/reparações` → `https://nexoservices.vercel.app/` (307)

## Deploy

Vercel, domínio `projetonexo.pt`.
# projetonexo
