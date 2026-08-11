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

## FASE 3 — /colecao (vitrine Supabase, em andamento)
- Task 3.1: complete (commit 5caea53) — components/marca/ProductPlaceholder.tsx (aspect-4/5 marfim, monograma R ouro + Equador atrás, rótulo [FOTO AQUI], role=img). tsc limpo.
- Task 3.2: complete (TDD). dotenv -D; playwright.config.ts carrega .env.local. lib/supabase/server.ts (getSupabaseServer, anon key, persistSession:false) + lib/produtos.ts (getProdutos(cat?) filtra ativo=true, order categoria/ref, erro→[]). tests/produtos.spec.ts: 4/4 passam (ativos + filtro Alianças). Dados: 3 Alianças/3 Joias/3 Relógios ativos. Colunas Produto: ativo/categoria/descricao/id/imagem/nome/preco/ref.
  - NOTA Windows: Playwright emite ruído "Assertion failed UV_HANDLE_CLOSING" (libuv no teardown) mas testes passam normalmente.
- Task 3.3: complete (commit 3b81ec5) — components/marca/ProductCard.tsx. <article> (não shadcn Card, p/ controle da marca) com ProductPlaceholder + filete de hover, REF (Eyebrow onix/70), nome font-display, preço Intl BRL onix, descrição line-clamp-2, WhatsAppButton(nome, refProduto, w-full, ringOffset marfim). tsc limpo.
- Task 3.4: complete — app/colecao/page.tsx. Server Component async, revalidate=3600. `searchParams` é Promise (Next 16) → await. Valida cat contra CATEGORIAS senão "todas". Filtro acessível sem JS (Links pills /colecao?cat=, aria-current). Grid 1→2→3→4 cols. Estado vazio com WhatsAppButton. metadata+OG. Build OK: rota /colecao é ƒ dinâmica (lê searchParams). tsc limpo.
  - Task 3.5: complete — tests/colecao.spec.ts (6 testes: H1+vitrine com cards; card traz REF/preço BRL/WhatsApp; link WhatsApp do card → wa.me/5596000000000 com "ref" + target _blank; filtro Alianças navega + aria-current=page + cards>0; "Todas" volta p/ /colecao + aria-current; axe sem violações graves). Método incremental c/ tsc entre passos. 12/12 (mobile+desktop). Suíte completa 42/42.
- FASE 3 (/colecao) FECHADA pelo cliente (2026-07-03).

## FASE 4 — /colecao/aliancas (landing campanha)
- Task 4.1: complete (commit 77ac771) — app/colecao/aliancas/page.tsx. 5 seções: Hero (onix, H1 "O sim que dura para sempre." + WhatsAppButton outline + Agendar visita), Argumentos (marfim, 4 diferenciais: ouro 18k/gravação inclusa/ajuste/atendimento família), Grade (marfim, getProdutos('Alianças')→ProductCard + estado-vazio), FAQ (marfim, Accordion base-nova, 4 perguntas reais com value único), CTA final (onix). metadata/OG de campanha, revalidate=3600. Build OK (rota ○ estática ISR 1h), tsc limpo.
  - PROCESSO: método incremental OBRIGATÓRIO neste projeto — arquivo inicial ≤30 linhas (imports+metadata+return null), depois UMA seção por edição, tsc após cada passo. Writes grandes corrompem no preview do diff do cliente. Constantes de copy no topo + cn(). Botão escuro "Agendar visita" reusa idioma da Home (border-champanhe/70, ring-offset-onix).
  - Accordion (components/ui/accordion.tsx) é base-nova sobre @base-ui/react (Root/Item/Trigger/Content); sem "use client" no wrapper pois os primitivos base-ui já carregam. Trigger vira role=button.
- Task 4.2: complete — tests/aliancas.spec.ts (5 testes: H1 campanha; grade só alianças (count == getProdutos('Alianças')); FAQ expande no clique (resposta hidden→visible); CTA "Falar sobre alianças" → wa.me + target _blank; axe sem violações graves). 10/10 (mobile+desktop). Suíte completa 52/52.
- Task 4.3: complete — DEPLOY preview Fase 4: https://romao-joias-ccda0dfan-gg-uadalup.vercel.app/colecao/aliancas (auth gabrielguadalup1). Verificado no HTML: 3 cards de aliança + todas as seções. Push ainda NÃO feito (local). Aguardando aprovação visual do cliente.
- DEPLOY preview Fase 3 (antecipado, a pedido do cliente p/ ver vitrine): https://romao-joias-kgi215ke2-gg-uadalup.vercel.app/colecao (auth gabrielguadalup1). Env Supabase já setada em Preview → /colecao lê produtos live. Push ainda NÃO feito (local). Task 3.6 (deploy) coberta por este.
- BUG "vitrine vazia no preview" — RESOLVIDO (2026-07-03). Causa raiz NÃO era o formato da key nem a versão do supabase-js (2.108.2 suporta sb_publishable_; provado pelos testes locais que leem live). Causa: as envs `NEXT_PUBLIC_SUPABASE_URL`/`_ANON_KEY` na Vercel (Preview+Production) estavam sem o valor correto. Como `NEXT_PUBLIC_*` é inlined em BUILD-TIME pelo Next (inclusive server-side), o build inlinava vazio → `createClient` lança → `getProdutos` cai no catch → `[]`.
  - DIAGNÓSTICO (não adivinhar): via Supabase MCP confirmei RLS on + policy `produtos_leitura_publica` (SELECT, roles anon+authenticated, `ativo=true`) + `set local role anon` retorna os 9. Logo DB/RLS/key OK. Sobrava a env da Vercel.
  - GOTCHA: `vercel env pull` devolve VAZIO para vars marcadas `Type: Sensitive` (write-only) mesmo com valor certo — não confie no pull p/ inferir "vazio". O `vercel env add` marcou as novas como Sensitive automaticamente. Ainda assim ficam disponíveis em build/runtime.
  - FIX: `vercel env rm`+`add` (valor via stdin, sem expor) nas 3 envs + `vercel deploy` (build fresco obrigatório p/ re-inlinar). Verificado no HTML do preview: 9 `<article>` = 9 produtos.
  - DEPLOY preview com fix: https://romao-joias-7s6kvnp36-gg-uadalup.vercel.app/colecao — vitrine com os 9 produtos. Production: env corrigida mas deploy de prod NÃO feito (fica p/ quando promover).

## FASE 5 — /contato (formulário → leads) — COMPLETA
- BLOQUEADOR RESOLVIDO (2026-08-10): projeto Supabase estava PAUSADO (status INACTIVE, free tier pausa por inatividade desde 03/07) → todo acesso ao DB falhava. Restaurado via MCP `restore_project` → ACTIVE_HEALTHY. **Se o site ficar semanas sem tráfego, isso volta a acontecer.**
- Task 5.1: complete (commit 7c19ced) — lib/schemas.ts (leadSchema + LeadInput). Honeypot `website: z.string().max(0).optional()` (simplificação do plano: o `.or(z.literal(''))` era redundante). 3/3 testes.
- Task 5.2: complete (commit a329d3f) — app/actions/criar-lead.ts. DESVIO DO PLANO: honeypot checado ANTES do parse (no plano era depois, onde seria código morto — o schema já rejeita `website` preenchido). Bot recebe sucesso falso e nada é gravado.
- Task 5.3: complete (commit 35b21b9) — components/marca/FormularioContato.tsx. useActionState + `pending`. DECISÃO: inputs nativos estilizados com tokens da marca (não shadcn Input) — mesma razão do ProductCard: os primitivos base-nova usam a paleta shadcn (border-input/ring-ring), que destoa do marfim. Erros por campo com aria-describedby + aria-invalid; sucesso substitui o form (role=status).
- Task 5.4: complete (commit 3d03707) — app/contato/page.tsx. Hero ônix + Equador + 2 colunas (dados da loja / formulário). Rota ○ estática.
- Task 5.5: complete (commit 09a8416) — tests/contato.spec.ts. 2 correções vindas dos testes: (a) `text-onix/50` sobre marfim = 3.32:1, FALHA AA → trocado por `text-onix/70` (regra AA LOCKED do projeto); (b) `getByText('Endereço')` batia em 3 elementos → `{ exact: true }`.
  - GOTCHA honeypot em teste: `fill()` não alcança input `display:none`. Usar `locator.evaluate(el => el.value = ...)` — funciona porque o form é nativo (action=), não controlado.
- Task 5.6: **BLOQUEADO** — `npx vercel deploy` retorna "Not authorized" (token do CLI expirou; `vercel whoami` trava esperando login interativo). Precisa de `npx vercel login` rodado pelo usuário. MCP da Vercel está autenticado, mas `deploy_to_vercel` sobe árvore de arquivos e criaria projeto novo — não serve para redeployar `gg-uadalup/romao-joias`.

## AUDITORIA DE SEGURANÇA (2026-08-10, a pedido do cliente)
1. **RLS**: ligado nas 2 tabelas (`leads`, `produtos`), 1 policy cada. `leads` só permite INSERT (anon+authenticated, with_check true) — ninguém lê leads pela anon key. `produtos` só SELECT com `ativo = true`.
2. **Secrets**: `gitleaks git .` → 39 commits, 0 vazamentos. `gitleaks dir .` acusa 7, todos em caminhos gitignored (.env.local + artefatos .next/), incluindo 2 falsos positivos (SHA de commit do next.js lido como sourcegraph-token). Nenhuma referência a service_role key no código (só um comentário no supabase-schema.sql). O bundle client NÃO contém a key do Supabase — o acesso é só server-side.
   - gitleaks 8.30 mudou a CLI: `detect --source .` não existe mais. Usar `gitleaks git .` (histórico) e `gitleaks dir .` (working tree).
3. **Formulário**: validação zod roda no servidor (Server Action) — o client não valida nada sozinho; honeypot ativo; ZERO console.log/logger em criar-lead.ts, supabase/server.ts, schemas.ts e FormularioContato.tsx → nenhuma PII em log.
4. **Rate limit**: lib/rate-limit.ts — janela deslizante em memória, 5 envios/IP/hora, IP de `x-forwarded-for` (1º item) com fallback `x-real-ip`. Aplicado DEPOIS da validação zod (formulário incompleto não gasta cota) e DEPOIS do honeypot. Teto de 5.000 chaves no Map.
   - **LIMITAÇÃO A COMUNICAR**: estado por instância. Em Fluid Compute cada instância tem seu Map → o limite real é por instância, não global. Segura spam casual, não ataque distribuído. Trocar por Upstash/Vercel KV mantendo a assinatura de `checarRateLimit` se precisar de garantia forte.
   - Efeito colateral nos testes: 4 viewports × envio válido esgotavam a cota. Resolvido dando `x-forwarded-for` único por teste (beforeEach em contato.spec.ts).

## FASE 6 — Polish
- Task 6.1: complete (commit d15dab2) — app/sitemap.ts + app/robots.ts. `SITE_URL` em lib/constants.ts (PLACEHOLDER: https://romaojoias.com.br, sobrescrevível por NEXT_PUBLIC_SITE_URL). Rotas ○ /robots.txt e ○ /sitemap.xml no build; verificadas por curl.
- Task 6.2: complete (commit 4b83b91) — components/marca/JsonLd.tsx (@type JewelryStore) na Home e /contato. Dados da loja centralizados em `LOJA` (lib/constants.ts) — fonte única do JSON-LD e da página /contato, para o cliente trocar placeholder em UM lugar. `horario` (exibição) e `horarioSchema` (schema.org) precisam ser trocados JUNTOS.
- Task 6.3: complete (commit 8b81e2d) — playwright.config com 4 projetos: mobile 375 / tablet 768 / desktop 1440 / wide 2560. **Suíte completa: 156/156.** prefers-reduced-motion já coberto em globals.css (linhas 148-154). Contraste AA revisado.
  - Limpeza: 37 leads "TESTE %" removidos do Supabase; 3 leads-semente (Marina/Renan/Beatriz, 29/06) preservados.
- Task 6.4: **BLOQUEADO pelo mesmo motivo da 5.6** (auth do Vercel CLI).

## FLAKINESS CONHECIDA (Windows)
- O build às vezes falha em `next/font/google` com 404 em woff2 do Jost (fonts.gstatic.com). Não é o código: `rm -rf .next && npm run build` resolve. Se reaparecer no CI/Vercel, considerar self-hostar as fontes.
- `next start` sobrevive ao TaskStop; liberar a porta com Stop-Process antes de reiniciar.
