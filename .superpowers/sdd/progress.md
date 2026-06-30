# Progresso — Site ROMÃO JOIAS (subagent-driven)

Plano: docs/superpowers/plans/2026-06-29-romao-joias-site.md
Branch: feat/site-romao-joias

## Environment facts (afetam tasks seguintes)
- **Next.js 16.2.9** (Turbopack). `searchParams` e `params` são **Promises** → usar `await searchParams` em Server Components (afeta Task 3.4 /colecao).
- **Tailwind v4**: SEM `tailwind.config.ts`. Tokens vão em `app/globals.css` via `@theme` (não JS config). (afeta Task 0.4)
- **shadcn style `base-nova`** sobre `@base-ui/react` (não `@radix-ui`). `form.tsx` foi feito à mão (funcional). Componentes em `components/ui/`.
- React 19 → `useActionState`/`useFormStatus` válidos (Task 5.3).
- Publishable key (pública por design) já em `.env.local`: `sb_publishable_Nw2o2-tZlsq_vCzBGXFI_A_MqX3D-93`.

## Ledger
(uma linha por task concluída: `Task N: complete (commits base7..head7, review clean)`)
- Task 0.1: complete (commit ae5e811, scaffold; verificado: deps+12 componentes+build OK)
- Task 0.2: complete (.env.local + .env.example, key via MCP)
- Task 0.3: complete (commit d34da47, lib/database.types.ts + aliases, typecheck OK)
- Task 0.4: complete (commit 643c0a7, tokens @theme + fonts + equador; build OK)
- Task 0.5: complete (commit 49d0abd, Equador + Eyebrow; build OK)
  - nota: Geist mantido p/ shadcn --font-sans; --font-bodoni/--font-jost no <html>; lang=pt-BR OK
- Task 0.6: complete (commits 3fcc95e + fix 892b13c, review clean após fix)
  - Header (client, usePathname, Sheet mobile), Footer (onix, 3 cols), layout wired.
  - Compartilhado: lib/nav.ts (navLinks) + lib/constants.ts (WHATSAPP_NUMERO/WHATSAPP_URL).
  - Sheet (base-nova) usa controlled open/onOpenChange. Ativo = borda ouro + text-onix (AA).
- Task 1.1: complete (commit 1941c69, lib/whatsapp buildWhatsAppUrl, 2 testes passam)
  - playwright.config.ts criado (webServer build+start, projects mobile 375 / desktop 1440). script npm "test".
  - buildWhatsAppUrl({nome,ref}) usa WHATSAPP_NUMERO de lib/constants.
