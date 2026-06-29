# ROMÃO JOIAS — Site institucional + vitrine — Design / Spec

**Data:** 2026-06-29
**Status:** Aprovado (brainstorming) — pronto para planejamento

## Visão geral

Site institucional + vitrine da **ROMÃO JOIAS**, joalheria de Macapá–AP fundada em
**1962** (60+ anos, negócio de família). **Não é e-commerce**: a conversão acontece por
**WhatsApp** e por **"agendar visita"**. Conceito-mãe da marca: *"onde o mundo se divide
ao meio (Marco Zero / linha do Equador), começam as histórias que duram para sempre."*

Todas as decisões visuais seguem a skill **`identidade-romao`** (as regras da marca vencem
qualquer impulso de "ficar moderno"). Estética editorial de joalheria via skill
**`frontend-design`**; componentes via **shadcn/ui**.

## Stack & arquitetura

- **Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.** Deploy: **Vercel**.
- **Backend: Supabase** (projeto `iaubefkinygfnuukfkmu`, já provisionado; tabelas
  `produtos` e `leads` já existem com RLS ligado). **Não criar auth nem painel admin.**
- Renderização majoritariamente **Server Components**.
  - `/colecao` e `/colecao/aliancas` leem `produtos` no servidor com **ISR**
    (`revalidate = 3600`), usando a **publishable/anon key** (sem segredos no cliente;
    RLS restringe a `ativo = true`).
  - `/contato` usa **Server Action** para inserir em `leads` (RLS permite insert anônimo).
- Bibliotecas: `@supabase/ssr`, `@supabase/supabase-js`, `zod`, `react-hook-form`.

### Estrutura de pastas (resumo)

```
app/
  layout.tsx                 # fontes, header, footer, metadata base, lang=pt-BR
  page.tsx                   # Home
  historia/page.tsx
  colecao/page.tsx           # vitrine + filtro por categoria (?cat=)
  colecao/aliancas/page.tsx  # landing de campanha (conversão)
  contato/page.tsx
  actions/criar-lead.ts      # Server Action de leads
  sitemap.ts  robots.ts
components/
  ui/                        # primitivos shadcn (button, card, accordion, dialog,
                             #   sheet, navigation-menu, form, input, tabs, label)
  marca/                     # Equador, Eyebrow, ProductCard, ProductPlaceholder,
                             #   WhatsAppButton, Header, Footer
lib/
  supabase/server.ts         # client server-side (leitura)
  whatsapp.ts                # buildWhatsAppUrl({ nome, ref })
  database.types.ts          # tipos gerados via MCP
.env.example                 # commitado (sem valores)
```

## Design system (da skill identidade-romao)

**Tokens Tailwind (`tailwind.config.ts`)** — valores exatos:
`ouro #A87A2C`, `champanhe #D9BE86`, `onix #1A1410`, `marfim #F4ECDB`, `pedra #9A8F7A`.

**Tipografia** (`next/font/google`, sem trocar):
- `font-display` → **Bodoni Moda** (400/500): nome da marca, títulos, números, preços.
- `font-body` → **Jost** (300/400/500): textos, UI, legendas, e a palavra "JOIAS".

**Elementos de marca (componentes):**
- `<Equador/>` — filete dourado horizontal 1px
  (`linear-gradient(90deg, transparent, #A87A2C 18%, #A87A2C 82%, transparent)`),
  com respiro generoso. Usado para separar/cruzar seções.
- **Eyebrow** — caixa-alta, Jost, `tracking-[0.28em]`, cor `pedra`/`champanhe`.
- **"JOIAS"** — Jost, caixa-alta, `tracking-[0.42em]`.
- `<ProductPlaceholder/>` — bloco `marfim`/`onix` com filete Equador + monograma **R**
  + rótulo `[FOTO AQUI]` (tratamento elegante com selo da marca).

**Regras de cor/contraste:**
- Ouro só como detalhe precioso (acentos, CTAs, ícones, filetes). **Nunca** ouro como
  texto corrido sobre `marfim`.
- Texto sobre claro = `onix`; sobre escuro (`onix`) = `marfim`/`champanhe`.
- Alternar seções claras (`marfim`) e escuras (`onix`) para dar ritmo; rodapé escuro.
- Contraste **AA** em todo texto.

**Piso de qualidade (toda página):**
- Responsivo **375px → 4K** (breakpoints de QA: 375, 768, 1440, 2560).
- Estados `hover` / `focus` / `focus-visible` (anel `ouro`) em todo interativo.
- Acessibilidade **AA**; landmarks/headings corretos; foco visível.
- `@media (prefers-reduced-motion)` desliga animações.
- **SEO por página**: title, meta description, Open Graph, `locale pt_BR`.
- Copy real em **pt-BR** (sem Lorem ipsum), tom sofisticado e acolhedor.

**Estética (frontend-design):** editorial/joalheria — muito respiro, Didone grande,
fotografia em destaque, hairlines douradas, ref. das peças como elemento gráfico.
Evitar o "card genérico de IA", sombras pesadas e gradientes chamativos.

## Páginas

### `/` — Home institucional
1. **Hero "Marco Zero"** (`onix`): ROMÃO + "JOIAS" espaçado; frase-âncora *"Onde o mundo
   se divide ao meio, começam as histórias que duram para sempre."*; eyebrow
   "Macapá · Amapá · desde 1962"; CTA primário WhatsApp + secundário "Agendar visita"
   (→ /contato); filete Equador.
2. **Manifesto** (`marfim`): "Tradição de família em ouro." + texto curto sobre 60+ anos.
3. **3 Coleções**: cards Alianças / Joias / Relógios (Alianças → /colecao/aliancas;
   demais → /colecao?cat=).
4. **Prova social**: depoimentos curtos **[DEPOIMENTO PROVISÓRIO]** + selo
   "60+ anos · 3 gerações".
5. **CTA final WhatsApp** (`onix`).

### `/historia`
Narrativa: origem no Marco Zero (1962), a família/gerações, valores; linha do tempo
(1962 → hoje) usando o filete Equador como eixo. Fecho com CTA visita. Tom acolhedor.

### `/colecao` — vitrine completa (dados Supabase, server-side)
- **Filtro por categoria** (Alianças / Joias / Relógios / Todas) via query param `?cat=`,
  server-rendered (funciona sem JS), com navegação acessível (`Tabs`/links).
- Grid de `<ProductCard>`: `<ProductPlaceholder>`, nome (Bodoni), **ref como elemento
  gráfico**, preço, descrição curta, botão **"Falar no WhatsApp"** que abre `wa.me` com
  mensagem citando **nome + ref**.
- **Estado vazio** tratado; **estado degradado** se a query Supabase falhar
  (mensagem + CTA WhatsApp, sem quebrar a página).

### `/colecao/aliancas` — landing de campanha (conversão)
- Hero próprio *"O sim que dura para sempre."*; argumentos (ouro 18k, gravação inclusa,
  ajuste de tamanho); destaque das alianças (`categoria = 'Alianças'`); **FAQ** (`accordion`
  shadcn); CTA WhatsApp forte + "agendar visita". SEO/OG próprios de campanha.

### `/contato`
- Endereço, horário, mapa/embed **[placeholder]**, WhatsApp.
- **Formulário** → grava em `leads` via **Server Action**:
  - Campos: `nome` (obrigatório), `contato` (obrigatório), `peca_interesse` (opcional),
    `mensagem` (opcional).
  - Validação **zod** no servidor + react-hook-form no cliente.
  - **Honeypot** anti-spam (campo oculto); sem PII em logs.
  - Estados loading/sucesso/erro com `aria-live`. Sucesso: "Recebemos seu contato,
    retornaremos em breve."

**Globais (`layout.tsx`):** Header (nav + `Sheet` mobile) e Footer escuro com Equador.

## Dados, WhatsApp e formulário (técnico)

- **Leitura produtos:** `from('produtos').select().eq('ativo', true).order('categoria')
  .order('ref')`; filtro por `?cat=` no servidor; `revalidate = 3600`. Tipos gerados via
  MCP `generate_typescript_types`.
- **WhatsApp (`lib/whatsapp.ts`):** `buildWhatsAppUrl({ nome, ref })` →
  `https://wa.me/5596000000000?text=...` (número = **placeholder `5596000000000`**).
  Mensagem por peça: *"Olá! Tenho interesse na peça {nome} (ref {ref}) da ROMÃO JOIAS.
  Poderiam me dar mais informações?"* (texto URL-encoded). CTAs gerais: mensagem
  institucional sem ref.
- **Server Action `criar-lead.ts`:** valida com zod, `from('leads').insert({...})`
  (`status` usa default `'novo'`); retorno tipado `{ ok: true } | { ok: false, erros }`.

## Env

`.env.local` (não commitado) e `.env.example` (commitado, sem valores):
- `NEXT_PUBLIC_SUPABASE_URL = https://iaubefkinygfnuukfkmu.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY = <publishable key — buscada via MCP na Fase 0>`

## Testes (skill webapp-testing) — ao fim de cada página

- Render sem erro + conteúdo-chave; navegação header/footer + `Sheet` mobile.
- Responsividade 375 / 768 / 1440 / 2560.
- Smoke a11y (axe): sem violações críticas; foco visível; landmarks/headings.
- `/contato`: submit válido → sucesso; inválido → erros; honeypot bloqueia.
  (Leads de teste marcados, ex. nome "TESTE", ou mock — definido na fase.)
- `/colecao`: filtro muda cards; botão WhatsApp gera `wa.me` com ref correta.
- `prefers-reduced-motion` respeitado.

## SEO

`metadata` por página (title, description, OpenGraph, `locale pt_BR`), `metadataBase`,
OG image **[placeholder]**, `lang="pt-BR"`. `sitemap.ts` + `robots.ts`. JSON-LD
`JewelryStore`/`LocalBusiness` na Home/Contato (endereço, horário **[placeholder]**).

## Plano de fases (incremental — preview Vercel ao fim de cada)

- **Fase 0 — Fundação:** scaffold Next+TS+Tailwind+shadcn; tokens; fontes; `<Equador>`;
  header+footer+layout; env (key via MCP); tipos Supabase. → Preview.
- **Fase 1 — Home** → teste → preview.
- **Fase 2 — /historia** → teste → preview.
- **Fase 3 — /colecao** (Supabase + filtro + WhatsApp) → teste → preview.
- **Fase 4 — /colecao/aliancas** → teste → preview.
- **Fase 5 — /contato** (Server Action leads) → teste → preview.
- **Fase 6 — Polish:** SEO/sitemap/robots/JSON-LD; a11y final; QA responsivo → preview final.

## Placeholders marcados para troca (NÃO esquecer)

- Fotos de produto: `[FOTO AQUI]` (não usar `source.unsplash.com`).
- WhatsApp/telefone: `5596000000000`.
- Depoimentos: `[DEPOIMENTO PROVISÓRIO]`.
- Endereço, horário, OG image: `[placeholder]`.
- **Ano da marca: 1962** (confirmar antes de publicar — manual diverge 1962 vs 1992).

## Fora de escopo (YAGNI)

E-commerce/carrinho/checkout; autenticação; painel admin; upload de imagens;
internacionalização; CMS. Leitura de leads continua no painel do Supabase.
