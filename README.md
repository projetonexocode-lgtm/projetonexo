# Projeto Nexo

Landing institucional da Projeto Nexo — Gestão de Obras e Projetos. Next.js (App Router), TypeScript, Tailwind CSS e CMS em Payload.

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
```

Em `.env.local`, definir pelo menos `PAYLOAD_SECRET` (qualquer string longa em local). Depois:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). O admin do CMS fica em [http://localhost:3000/admin](http://localhost:3000/admin). Na primeira visita, criar o utilizador administrador.

Textos do site (Sobre, Serviços, Galeria, Contacto, menu, hero, método, cobertura, FAQ e rodapé) editam-se no Payload. O menu do header segue a ordem definida em **Geral e restantes secções → Menu**.

## Variáveis de ambiente

Copiar `.env.example` para `.env.local`:

- `PAYLOAD_SECRET` — obrigatório. Em produção, usar um segredo forte.
- `POSTGRES_URL` — Postgres na Vercel (Neon / Vercel Postgres). Em local, sem esta variável, usa-se SQLite.
- `BLOB_READ_WRITE_TOKEN` — uploads de media na Vercel Blob (opcional em local).
- `RESEND_API_KEY` + `CONTACT_EMAIL` — envio do formulário por e-mail (sem isto, o pedido abre o WhatsApp)

## Redirect

`/reparacoes` e `/reparações` → `https://nexoservices.vercel.app/` (307)

`/studio` → `/admin` (legado do Sanity)

## Deploy

Vercel, domínio `projetonexo.pt`. Em produção: `PAYLOAD_SECRET`, `POSTGRES_URL` e, para media, `BLOB_READ_WRITE_TOKEN`.
