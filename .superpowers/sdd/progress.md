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
- Task 1.2: complete (commit b6f3c35, WhatsAppButton). Props: {nome?, refProduto?, variant 'primary'|'outline', ringOffset?, children?}. NOTA: prop é `refProduto` (não `ref`, reservado no React) → ProductCard (3.3) deve usar refProduto.
- Task 1.3: complete (commit 5e56b8d + fixes 646e442, review clean). Home: hero/manifesto/SecaoColecoes/ProvaSocial/CTA. metadata+OG pt_BR.
  - Header CTA contraste corrigido inline (commit pós-1.3): bg-ouro text-onix.
- DECISÃO AA (CONFIRMADA pelo cliente 2026-06-30): pedra (#9A8F7A) sobre marfim ≈ 2.7:1 FALHA AA. Regra LOCKED: eyebrow/texto auxiliar em fundo CLARO (marfim) usa text-onix/70; pedra/champanhe só em fundo escuro (onix). Aplicar em TODAS as páginas.
- DEPLOY Fase 1 OK: https://romao-joias-ihwepgt5s-gg-uadalup.vercel.app (projeto Vercel: gg-uadalup/romao-joias). Auth: gabrielguadalup1. Deploys via `npx vercel deploy --yes`.
- ~~TODO antes da Fase 3: setar env NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no projeto Vercel.~~ FEITO (2026-06-30): ambas setadas em Production+Preview+Development via `npx vercel env add` (valor do .env.local). Confirmado com `vercel env ls`.
- LOGO (Fase 1, pendência fechada): cliente forneceu public/logo-perfil-claro.png (símbolo s/ marfim) e public/logo-perfil.png (símbolo s/ ônix), 1080² com fundo radial embutido + anel (raio 280) + muito respiro.
  - scripts/processar-logo.ps1 (System.Drawing): recorta quadrado central 760² + fade radial no alfa (opaco até r300, some em r375) → public/logo-clara.png e public/logo-escura.png (sem box/seam, sem distorção). Favicon: recorte sólido 512² → app/icon.png (favicon.ico default removido). DECISÃO cliente: recortar p/ quadrado justo (vs. máscara CSS / usar como está).
  - Integração next/image alt "Romão Joias — desde 1962": Header (logo-clara h-11, link home), Hero e Footer (logo-escura). Build OK, rota /icon.png gerada.
  - NOTA p/ revisão do cliente: medalhão escuro no hero/footer fica com leve brilho (anel ~#1E1711, +claro que ônix) que dissolve — checar se agrada.
- DEPLOY preview logo: https://romao-joias-hn2clge1i-gg-uadalup.vercel.app (auth Vercel gabrielguadalup1).
- FASE 1 (Home) APROVADA e FECHADA pelo cliente (2026-06-30): logo commitada (6e51e5b), brilho do medalhão escuro aprovado (manter fade como está). Push NÃO feito (fica local por ora).

## FASE 2 — /historia (em andamento)
- Task 2.1: complete — app/historia/page.tsx. 6 seções alternando claro/escuro: Hero, Origem (1962/Marco Zero), Família/3 gerações, Valores (3 blocos), Linha do tempo (eixo dourado vertical via <ol> + nós), CTA final (WhatsAppButton + Agendar visita). metadata "Nossa história" + OG pt_BR. Eyebrow AA: text-onix/70 em fundo claro, text-champanhe em escuro. Build OK (rota /historia estática), tsc limpo.
  - NOTA DE PROCESSO: Writes/Edits grandes apareceram corrompidos no PREVIEW do diff do cliente (e Get-Content PS5.1 mostra mojibake por ler UTF-8 como ANSI), mas o DISCO sempre esteve íntegro. Workaround validado: edições pequenas (uma seção por vez) + provar com `(Select-String "return null").Count` e `npx tsc --noEmit` após cada passo. className longos via constantes + cn() (evitar template literals).
  - PENDENTE Task 2.2: teste Playwright tests/historia.spec.ts (render H1, "1962", timeline, axe).
- Task 2.1 commitada: f0f3ef4. DEPLOY preview Fase 2: https://romao-joias-g8rhd3vp6-gg-uadalup.vercel.app (auth Vercel gabrielguadalup1). Push ainda NÃO feito (local).
- Task 2.2: complete — tests/historia.spec.ts (6 testes: H1, "1962", linha do tempo (ol li >=4), WhatsApp wa.me, Agendar visita →/contato, axe sem violações graves). 12/12 passam (mobile+desktop).
- FASE 2 (/historia) APROVADA visualmente pelo cliente (2026-06-30) e testada.
