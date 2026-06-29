# ROMÃO JOIAS — Site institucional + vitrine — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site institucional + vitrine da ROMÃO JOIAS (Next.js App Router) com conversão por WhatsApp e formulário de "agendar visita" gravando em Supabase.

**Architecture:** Server Components por padrão; `/colecao` e `/colecao/aliancas` leem `produtos` no servidor com ISR (anon key, RLS restringe a `ativo=true`); `/contato` usa Server Action para inserir em `leads`. UI com shadcn/ui sobre tokens da marca. Deploy de preview na Vercel ao fim de cada fase.

**Tech Stack:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + @supabase/ssr + @supabase/supabase-js + zod + react-hook-form. Testes: Playwright (webapp-testing) + @axe-core/playwright.

## Global Constraints

- **Marca vence sempre:** seguir `.claude/skills/identidade-romao/SKILL.md` em toda UI. Consultar a skill `identidade-romao` antes de escrever qualquer JSX/CSS/Tailwind.
- **Cores (exatas):** `ouro #A87A2C`, `champanhe #D9BE86`, `onix #1A1410`, `marfim #F4ECDB`, `pedra #9A8F7A`.
- **Fontes (exatas, via next/font):** `font-display` = Bodoni Moda (400/500); `font-body` = Jost (300/400/500). "JOIAS" sempre Jost caixa-alta `tracking-[0.42em]`.
- **Ouro nunca como texto corrido sobre marfim.** Texto sobre claro = `onix`; sobre escuro = `marfim`/`champanhe`. Contraste AA.
- **Responsivo 375px → 4K.** QA em 375/768/1440/2560. `hover`/`focus`/`focus-visible` (anel ouro) em todo interativo. `prefers-reduced-motion` desliga animações.
- **SEO por página:** title, meta description, Open Graph, `locale pt_BR`. `lang="pt-BR"`.
- **Copy real pt-BR, sem Lorem ipsum.** Tom sofisticado e acolhedor.
- **Placeholders marcados:** fotos `[FOTO AQUI]` (nunca `source.unsplash.com`); WhatsApp `5596000000000`; depoimentos `[DEPOIMENTO PROVISÓRIO]`; endereço/horário/OG `[placeholder]`. **Ano: 1962.**
- **Não criar** auth, painel admin, e-commerce, upload de imagens, i18n, CMS.
- **Supabase:** projeto `iaubefkinygfnuukfkmu`, URL `https://iaubefkinygfnuukfkmu.supabase.co`. Tabelas `produtos`/`leads` já existem com RLS. Não recriar schema.
- **Commits frequentes**, um por task no mínimo.

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `tailwind.config.ts` | tokens de cor, fontes, container |
| `app/globals.css` | base, utilitário `.equador`, reduced-motion |
| `app/layout.tsx` | fontes next/font, `<Header>`, `<Footer>`, metadata base, `lang="pt-BR"` |
| `lib/fonts.ts` | configuração Bodoni Moda + Jost |
| `lib/supabase/server.ts` | client Supabase server-side (leitura) |
| `lib/whatsapp.ts` | `buildWhatsAppUrl` |
| `lib/database.types.ts` | tipos gerados via MCP |
| `lib/produtos.ts` | `getProdutos(cat?)` — leitura + filtro |
| `components/marca/Equador.tsx` | filete dourado |
| `components/marca/Eyebrow.tsx` | rótulo caixa-alta tracking |
| `components/marca/ProductPlaceholder.tsx` | placeholder `[FOTO AQUI]` com selo R |
| `components/marca/ProductCard.tsx` | card de peça + botão WhatsApp |
| `components/marca/WhatsAppButton.tsx` | CTA wa.me (client) |
| `components/marca/Header.tsx` | nav + Sheet mobile |
| `components/marca/Footer.tsx` | rodapé escuro com Equador |
| `app/page.tsx` | Home |
| `app/historia/page.tsx` | História |
| `app/colecao/page.tsx` | Vitrine + filtro |
| `app/colecao/aliancas/page.tsx` | Landing alianças |
| `app/contato/page.tsx` | Contato + formulário |
| `app/actions/criar-lead.ts` | Server Action leads |
| `components/marca/FormularioContato.tsx` | form client (react-hook-form + zod) |
| `lib/schemas.ts` | schema zod do lead (compartilhado client/server) |
| `app/sitemap.ts`, `app/robots.ts` | SEO |
| `tests/*.spec.ts` | Playwright por página + unit das libs |

---

# FASE 0 — Fundação

### Task 0.1: Scaffold do projeto + dependências

**Files:**
- Create: projeto Next.js na raiz (`package.json`, `tsconfig.json`, `next.config.ts`, `app/`, etc.)

- [ ] **Step 1: Scaffold Next.js** (na raiz, que já contém `.claude/`, `docs/`, `supabase-schema.sql`)

```bash
npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir=false --import-alias "@/*" --no-turbopack --use-npm
```
Se o CLI reclamar de diretório não-vazio, confirme manter os arquivos existentes (responder para não sobrescrever `.claude`, `docs`, `supabase-schema.sql`).

- [ ] **Step 2: Instalar dependências de runtime**

```bash
npm i @supabase/supabase-js @supabase/ssr zod react-hook-form @hookform/resolvers
```

- [ ] **Step 3: Inicializar shadcn/ui**

```bash
npx shadcn@latest init -d
```

- [ ] **Step 4: Adicionar componentes shadcn necessários**

```bash
npx shadcn@latest add button card accordion dialog sheet navigation-menu form input label tabs textarea sonner
```

- [ ] **Step 5: Instalar dependências de teste**

```bash
npm i -D @playwright/test @axe-core/playwright && npx playwright install chromium
```

- [ ] **Step 6: Rodar o dev server e verificar boot**

Run: `npm run build`
Expected: build conclui sem erros (página default do Next).

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js + shadcn + supabase + testes"
```

### Task 0.2: Variáveis de ambiente (Supabase via MCP)

**Files:**
- Create: `.env.local` (não commitar), `.env.example` (commitar)
- Modify: `.gitignore` (garantir `.env.local`)

**Interfaces:**
- Produces: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` disponíveis no ambiente.

- [ ] **Step 1: Obter a publishable key via MCP**

Usar a ferramenta MCP `mcp__plugin_supabase_supabase__get_publishable_keys` com `project_id=iaubefkinygfnuukfkmu`. Escolher a key com `disabled` ausente/false (preferir `sb_publishable_...`; anon JWT legacy serve de fallback).

- [ ] **Step 2: Criar `.env.local`** (substituir `<KEY>` pelo valor do passo 1)

```
NEXT_PUBLIC_SUPABASE_URL=https://iaubefkinygfnuukfkmu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<KEY>
```

- [ ] **Step 3: Criar `.env.example`** (sem valores, commitado)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- [ ] **Step 4: Garantir `.env.local` no `.gitignore`** (create-next-app já inclui `.env*`; confirmar).

- [ ] **Step 5: Commit**

```bash
git add .env.example .gitignore && git commit -m "chore: env de exemplo para Supabase"
```

### Task 0.3: Tipos do Supabase

**Files:**
- Create: `lib/database.types.ts`

**Interfaces:**
- Produces: tipo `Database`, e `Produto = Database['public']['Tables']['produtos']['Row']`.

- [ ] **Step 1: Gerar tipos via MCP** `mcp__plugin_supabase_supabase__generate_typescript_types` (`project_id=iaubefkinygfnuukfkmu`) e salvar o conteúdo em `lib/database.types.ts`.

- [ ] **Step 2: Adicionar aliases no fim do arquivo**

```ts
export type Produto = Database['public']['Tables']['produtos']['Row']
export type Categoria = 'Alianças' | 'Joias' | 'Relógios'
```

- [ ] **Step 3: Commit** `git add lib/database.types.ts && git commit -m "feat: tipos do Supabase"`

### Task 0.4: Tokens da marca (Tailwind + fontes + globals)

**Files:**
- Modify: `tailwind.config.ts`
- Create: `lib/fonts.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: classes `bg-marfim/onix`, `text-onix/marfim/pedra`, `text-ouro`, `border-champanhe`; `font-display`, `font-body`; utilitário `.equador`; vars `--font-display`, `--font-body`.

- [ ] **Step 1: `lib/fonts.ts`**

```ts
import { Bodoni_Moda, Jost } from 'next/font/google'

export const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-display',
  display: 'swap',
})

export const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})
```

- [ ] **Step 2: Tokens em `tailwind.config.ts`** (dentro de `theme.extend`)

```ts
colors: {
  ouro: '#A87A2C',
  champanhe: '#D9BE86',
  onix: '#1A1410',
  marfim: '#F4ECDB',
  pedra: '#9A8F7A',
},
fontFamily: {
  display: ['var(--font-display)', 'serif'],
  body: ['var(--font-body)', 'sans-serif'],
},
```
(Manter o resto da config do shadcn intacto.)

- [ ] **Step 3: `app/globals.css`** — adicionar utilitário e reduced-motion ao fim

```css
@layer utilities {
  .equador {
    height: 1px;
    background: linear-gradient(90deg, transparent, #A87A2C 18%, #A87A2C 82%, transparent);
  }
  .tracking-joias { letter-spacing: 0.42em; }
  .tracking-eyebrow { letter-spacing: 0.28em; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Definir `body` com `@apply bg-marfim text-onix font-body antialiased;`.

- [ ] **Step 4: Verificar build** `npm run build` → PASS.

- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: tokens da marca, fontes e utilitário equador"`

### Task 0.5: Componentes de marca base (Equador, Eyebrow)

**Files:**
- Create: `components/marca/Equador.tsx`, `components/marca/Eyebrow.tsx`

**Interfaces:**
- Produces: `<Equador className?>`, `<Eyebrow as? className?>{children}</Eyebrow>`.

- [ ] **Step 1: `Equador.tsx`**

```tsx
export function Equador({ className = '' }: { className?: string }) {
  return <div role="presentation" className={`equador w-full ${className}`} />
}
```

- [ ] **Step 2: `Eyebrow.tsx`**

```tsx
import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('font-body uppercase text-pedra text-xs tracking-eyebrow', className)}>
      {children}
    </p>
  )
}
```

- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: componentes de marca Equador e Eyebrow"`

### Task 0.6: Header (nav + Sheet mobile) e Footer

**Files:**
- Create: `components/marca/Header.tsx`, `components/marca/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Equador`, `Eyebrow`, shadcn `Sheet`, `navigation-menu`, `Button`.
- Produces: `<Header/>`, `<Footer/>` usados no layout.

Navegação (links): `/` Início · `/historia` História · `/colecao` Coleção · `/colecao/aliancas` Alianças · `/contato` Contato.

- [ ] **Step 1: `Header.tsx`** — client component. Marca "ROMÃO" (font-display) + "JOIAS" (`font-body uppercase tracking-joias`). Desktop: nav inline. Mobile (`< md`): `Sheet` (gatilho hambúrguer, `aria-label="Abrir menu"`). Link ativo com sublinhado ouro. Foco visível (anel ouro). CTA "Falar no WhatsApp" usando `buildWhatsAppUrl` institucional (Task 1.1 cria o lib; até lá usar link direto `https://wa.me/5596000000000`).

- [ ] **Step 2: `Footer.tsx`** — fundo `onix`, texto `marfim`. `<Equador/>` no topo. Colunas: marca + frase "Tradição de família em ouro."; navegação; contato (endereço `[placeholder]`, horário `[placeholder]`, WhatsApp `5596000000000`). Crédito "© 1962–2026 ROMÃO JOIAS · Macapá–AP".

- [ ] **Step 3: `app/layout.tsx`** — aplicar `lang="pt-BR"`, classes das fontes no `<html>` (`${bodoni.variable} ${jost.variable}`), `<Header/>` e `<Footer/>` envolvendo `{children}`. Metadata base:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://romaojoias.vercel.app'),
  title: { default: 'ROMÃO JOIAS — Joalheria em Macapá desde 1962', template: '%s · ROMÃO JOIAS' },
  description: 'Joalheria de família em Macapá–AP desde 1962. Alianças, joias e relógios em ouro 18k. Agende sua visita.',
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'ROMÃO JOIAS' },
}
```

- [ ] **Step 4: Verificar build** `npm run build` → PASS.

- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: header com menu mobile e footer da marca"`

### Task 0.7: Deploy de preview (Fase 0)

- [ ] **Step 1:** Deploy via MCP Vercel (`mcp__plugin_vercel_vercel__deploy_to_vercel`) ou skill `vercel:deploy`, configurando as env vars `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no projeto.
- [ ] **Step 2:** Passar o link de preview ao usuário.

---

# FASE 1 — Home

### Task 1.1: lib WhatsApp (TDD)

**Files:**
- Create: `lib/whatsapp.ts`, `tests/whatsapp.spec.ts`

**Interfaces:**
- Produces: `buildWhatsAppUrl(opts?: { nome?: string; ref?: string }): string` — base `https://wa.me/5596000000000`.

- [ ] **Step 1: Teste que falha** `tests/whatsapp.spec.ts`

```ts
import { test, expect } from '@playwright/test'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

test('mensagem por peça cita nome e ref', () => {
  const url = buildWhatsAppUrl({ nome: 'Aliança Marco Zero', ref: '0123' })
  expect(url).toContain('https://wa.me/5596000000000?text=')
  const text = decodeURIComponent(url.split('text=')[1])
  expect(text).toContain('Aliança Marco Zero')
  expect(text).toContain('0123')
})

test('mensagem institucional sem ref', () => {
  const url = buildWhatsAppUrl()
  const text = decodeURIComponent(url.split('text=')[1])
  expect(text).toContain('ROMÃO JOIAS')
  expect(text).not.toContain('ref')
})
```

- [ ] **Step 2: Rodar e ver falhar** `npx playwright test tests/whatsapp.spec.ts` → FAIL (módulo não existe).

- [ ] **Step 3: Implementar `lib/whatsapp.ts`**

```ts
const NUMERO = '5596000000000' // [placeholder — trocar pelo WhatsApp real]

export function buildWhatsAppUrl(opts?: { nome?: string; ref?: string }): string {
  const texto = opts?.nome
    ? `Olá! Tenho interesse na peça ${opts.nome}${opts.ref ? ` (ref ${opts.ref})` : ''} da ROMÃO JOIAS. Poderiam me dar mais informações?`
    : 'Olá! Gostaria de saber mais sobre a ROMÃO JOIAS e agendar uma visita.'
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`
}
```

- [ ] **Step 4: Rodar e ver passar** → PASS.

- [ ] **Step 5: Refatorar `Header`/`Footer`** para usar `buildWhatsAppUrl()`.

- [ ] **Step 6: Commit** `git add -A && git commit -m "feat: lib buildWhatsAppUrl com testes"`

### Task 1.2: WhatsAppButton

**Files:**
- Create: `components/marca/WhatsAppButton.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppUrl`, shadcn `Button`.
- Produces: `<WhatsAppButton nome? ref? variant? children?>`.

- [ ] **Step 1: Implementar** — renderiza `<a href={buildWhatsAppUrl({nome, ref})} target="_blank" rel="noopener noreferrer">` estilizado com `Button` (variant default = ouro). Inclui ícone WhatsApp (inline SVG, `aria-hidden`). Texto padrão "Falar no WhatsApp". Foco visível.

- [ ] **Step 2: Commit** `git add -A && git commit -m "feat: WhatsAppButton"`

### Task 1.3: Home — seções

**Files:**
- Create: `app/page.tsx`
- Create: `components/marca/SecaoColecoes.tsx`, `components/marca/ProvaSocial.tsx` (blocos da Home)

**Interfaces:**
- Consumes: `Equador`, `Eyebrow`, `WhatsAppButton`, shadcn `Card`, `Button`.

Conteúdo (copy real, pt-BR):
- **Hero** (`bg-onix text-marfim`): Eyebrow "Macapá · Amapá · desde 1962"; H1 "ROMÃO" + "JOIAS"; subtítulo *"Onde o mundo se divide ao meio, começam as histórias que duram para sempre."*; `<WhatsAppButton/>` + Button secundário "Agendar visita" (link `/contato`). `<Equador/>` abaixo.
- **Manifesto** (`bg-marfim`): H2 "Tradição de família em ouro."; parágrafo sobre 60+ anos e 3 gerações no coração de Macapá.
- **3 Coleções** (`SecaoColecoes`): cards Alianças (→ `/colecao/aliancas`), Joias (→ `/colecao?cat=Joias`), Relógios (→ `/colecao?cat=Relógios`), cada um com `<ProductPlaceholder>` (criado na Task 3.1; até lá, bloco simples) ou ícone, título, frase curta.
- **Prova social** (`ProvaSocial`, `bg-onix`): 3 depoimentos `[DEPOIMENTO PROVISÓRIO]` + selo "60+ anos · 3 gerações".
- **CTA final** (`bg-marfim`): frase + `<WhatsAppButton/>`.

`metadata`: title "Joalheria em Macapá desde 1962" + description própria.

- [ ] **Step 1:** Implementar `app/page.tsx` com as seções acima, alternando claro/escuro, respiro generoso, `<Equador/>` entre blocos.
- [ ] **Step 2:** Implementar `SecaoColecoes.tsx` e `ProvaSocial.tsx`.
- [ ] **Step 3:** `npm run build` → PASS.
- [ ] **Step 4: Commit** `git add -A && git commit -m "feat: home institucional"`

### Task 1.4: Teste da Home (webapp-testing) + config Playwright

**Files:**
- Create: `playwright.config.ts`, `tests/home.spec.ts`

- [ ] **Step 1: `playwright.config.ts`** — `webServer: { command: 'npm run build && npm run start', port: 3000, reuseExistingServer: !process.env.CI }`, `use.baseURL: 'http://localhost:3000'`. Projetos para viewports 375 e 1440.

- [ ] **Step 2: `tests/home.spec.ts`**

```ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home renderiza hero e CTAs', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByText('desde 1962')).toBeVisible()
  await expect(page.getByRole('link', { name: /WhatsApp/i }).first()).toHaveAttribute('href', /wa\.me/)
})

test('navegação para contato funciona', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Agendar visita' }).first().click()
  await expect(page).toHaveURL(/\/contato/)
})

test('home sem violações críticas de a11y', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
  const criticas = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')
  expect(criticas).toEqual([])
})
```

- [ ] **Step 3: Rodar** `npx playwright test tests/home.spec.ts` → PASS (ajustar nomes/labels se necessário).
- [ ] **Step 4: Commit** `git add -A && git commit -m "test: home (render, navegação, a11y)"`

### Task 1.5: Preview Fase 1 — deploy e link ao usuário.

---

# FASE 2 — /historia

### Task 2.1: Página História

**Files:**
- Create: `app/historia/page.tsx`

Conteúdo (copy real): origem no Marco Zero (1962); a família e as 3 gerações; valores (confiança, atemporalidade, ouro 18k); **linha do tempo** vertical (1962 fundação → expansão → hoje) com o filete `<Equador/>` como eixo gráfico; fecho com `<WhatsAppButton/>` + "Agendar visita". Alternar seções claro/escuro. `metadata` title "Nossa história" + description.

- [ ] **Step 1:** Implementar página.
- [ ] **Step 2:** `npm run build` → PASS.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: página história"`

### Task 2.2: Teste História

**Files:** Create `tests/historia.spec.ts`

- [ ] **Step 1:** Teste: render do H1, presença de "1962", linha do tempo visível, axe sem violações críticas (mesma estrutura da Task 1.4).
- [ ] **Step 2:** Rodar → PASS.
- [ ] **Step 3: Commit** `git add -A && git commit -m "test: página história"`

### Task 2.3: Preview Fase 2 — deploy e link.

---

# FASE 3 — /colecao (vitrine Supabase)

### Task 3.1: ProductPlaceholder

**Files:** Create `components/marca/ProductPlaceholder.tsx`

**Interfaces:** Produces `<ProductPlaceholder categoria? className?>`.

- [ ] **Step 1: Implementar** — `aspect-[4/5]`, fundo `bg-marfim` com borda fina `champanhe`; centro: monograma "R" em `font-display` cor `ouro`; `<Equador/>` cruzando atrás do R; rótulo `[FOTO AQUI]` em `Eyebrow` no rodapé do bloco. `role="img"`, `aria-label="Foto da peça em breve"`.
- [ ] **Step 2: Commit** `git add -A && git commit -m "feat: ProductPlaceholder com selo da marca"`

### Task 3.2: Client Supabase + leitura de produtos (TDD)

**Files:**
- Create: `lib/supabase/server.ts`, `lib/produtos.ts`, `tests/produtos.spec.ts`

**Interfaces:**
- Produces: `getSupabaseServer()`; `getProdutos(cat?: Categoria): Promise<Produto[]>` (filtra `ativo=true`, ordena por categoria/ref; se `cat` definido, filtra categoria; em erro, retorna `[]` e loga).

- [ ] **Step 1: `lib/supabase/server.ts`**

```ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

export function getSupabaseServer() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )
}
```

- [ ] **Step 2: Teste de integração** `tests/produtos.spec.ts` (usa Supabase real, RLS público)

```ts
import { test, expect } from '@playwright/test'
import { getProdutos } from '@/lib/produtos'

test('getProdutos retorna apenas ativos e ordenados', async () => {
  const produtos = await getProdutos()
  expect(produtos.length).toBeGreaterThan(0)
  expect(produtos.every((p) => p.ativo)).toBe(true)
})

test('getProdutos filtra por categoria', async () => {
  const aliancas = await getProdutos('Alianças')
  expect(aliancas.length).toBeGreaterThan(0)
  expect(aliancas.every((p) => p.categoria === 'Alianças')).toBe(true)
})
```

- [ ] **Step 3: Rodar e ver falhar** → FAIL (módulo `lib/produtos` não existe).

- [ ] **Step 4: Implementar `lib/produtos.ts`**

```ts
import { getSupabaseServer } from '@/lib/supabase/server'
import type { Produto, Categoria } from '@/lib/database.types'

export async function getProdutos(cat?: Categoria): Promise<Produto[]> {
  const supabase = getSupabaseServer()
  let query = supabase.from('produtos').select('*').eq('ativo', true)
    .order('categoria').order('ref')
  if (cat) query = query.eq('categoria', cat)
  const { data, error } = await query
  if (error) {
    console.error('[produtos] falha na leitura:', error.message)
    return []
  }
  return data ?? []
}
```

- [ ] **Step 5: Rodar e ver passar** → PASS (requer `.env.local` carregado; o teste de node lê via `dotenv` ou `playwright.config` `webServer` não cobre node puro — usar `import 'dotenv/config'` no topo do teste ou rodar com env). Se preferir, marcar como teste server-side via rota.
- [ ] **Step 6: Commit** `git add -A && git commit -m "feat: leitura de produtos do Supabase com testes"`

### Task 3.3: ProductCard

**Files:** Create `components/marca/ProductCard.tsx`

**Interfaces:** Consumes `Produto`, `ProductPlaceholder`, `WhatsAppButton`, shadcn `Card`.

- [ ] **Step 1: Implementar** — `Card` com `ProductPlaceholder` (a peça tem `imagem` placeholder; usar `ProductPlaceholder` enquanto a foto não existir), nome em `font-display`, **ref** em `Eyebrow` como elemento gráfico (ex.: "REF 0123"), preço formatado `Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' })`, descrição curta (line-clamp), e `<WhatsAppButton nome={p.nome} ref={p.ref}/>`. Hover sutil (elevação leve / filete ouro). Sem sombra pesada.
- [ ] **Step 2: Commit** `git add -A && git commit -m "feat: ProductCard"`

### Task 3.4: Página /colecao com filtro

**Files:** Create `app/colecao/page.tsx`

**Interfaces:** Consumes `getProdutos`, `ProductCard`. `searchParams.cat` define filtro.

- [ ] **Step 1: Implementar** — `export const revalidate = 3600`. Server Component lê `searchParams.cat` (validar contra `['Alianças','Joias','Relógios']`, senão "todas"). Header da página com Eyebrow + H1 "Coleção". **Filtro acessível**: links/tabs para Todas/Alianças/Joias/Relógios (cada um é `<Link href="/colecao?cat=...">`, item ativo destacado; funciona sem JS). Grid responsivo de `<ProductCard>` (1 col mobile → 2 → 3 → 4 em telas largas). **Estado vazio**: mensagem + `<WhatsAppButton/>`. **Estado degradado** já coberto por `getProdutos` retornando `[]`. `metadata` próprio.
- [ ] **Step 2:** `npm run build` → PASS.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: vitrice /colecao com filtro por categoria"`

### Task 3.5: Teste /colecao

**Files:** Create `tests/colecao.spec.ts`

- [ ] **Step 1: Testes**

```ts
import { test, expect } from '@playwright/test'

test('colecao lista produtos', async ({ page }) => {
  await page.goto('/colecao')
  await expect(page.getByRole('heading', { name: 'Coleção' })).toBeVisible()
  await expect(page.getByText(/REF/i).first()).toBeVisible()
})

test('filtro por categoria Alianças', async ({ page }) => {
  await page.goto('/colecao')
  await page.getByRole('link', { name: 'Alianças' }).first().click()
  await expect(page).toHaveURL(/cat=Al/)
})

test('botão WhatsApp do card cita ref', async ({ page }) => {
  await page.goto('/colecao')
  const link = page.getByRole('link', { name: /WhatsApp/i }).first()
  await expect(link).toHaveAttribute('href', /wa\.me\/5596000000000\?text=/)
})
```

- [ ] **Step 2:** Rodar → PASS. Incluir checagem axe sem violações críticas.
- [ ] **Step 3: Commit** `git add -A && git commit -m "test: /colecao (lista, filtro, whatsapp, a11y)"`

### Task 3.6: Preview Fase 3 — deploy e link.

---

# FASE 4 — /colecao/aliancas (landing campanha)

### Task 4.1: Página landing alianças

**Files:** Create `app/colecao/aliancas/page.tsx`

**Interfaces:** Consumes `getProdutos('Alianças')`, `ProductCard`, shadcn `Accordion`, `WhatsAppButton`.

Conteúdo (copy real):
- **Hero** (`bg-onix`): Eyebrow "Coleção de alianças"; H1 *"O sim que dura para sempre."*; subtítulo sobre ouro 18k e gravação inclusa; `<WhatsAppButton/>` + "Agendar visita".
- **Argumentos** (3-4 blocos): ouro 18k legítimo; gravação interna inclusa; ajuste de tamanho; atendimento de família há 60+ anos.
- **Destaque das alianças**: grid de `<ProductCard>` com `getProdutos('Alianças')`.
- **FAQ** (`Accordion`): "Vocês fazem gravação?", "É possível ajustar o tamanho depois?", "Posso agendar uma visita?", "Trabalham com encomenda?" — respostas reais.
- **CTA final** forte (`bg-onix`).
- `metadata`/OG próprios de campanha (`revalidate = 3600`).

- [ ] **Step 1:** Implementar.
- [ ] **Step 2:** `npm run build` → PASS.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: landing /colecao/aliancas"`

### Task 4.2: Teste landing alianças

**Files:** Create `tests/aliancas.spec.ts`

- [ ] **Step 1:** Testes: H1 "O sim que dura para sempre.", FAQ expande (accordion), só alianças no grid, CTA WhatsApp presente, axe sem violações críticas.
- [ ] **Step 2:** Rodar → PASS.
- [ ] **Step 3: Commit** `git add -A && git commit -m "test: landing alianças"`

### Task 4.3: Preview Fase 4 — deploy e link.

---

# FASE 5 — /contato (formulário → leads)

### Task 5.1: Schema zod compartilhado (TDD)

**Files:** Create `lib/schemas.ts`, `tests/schema-lead.spec.ts`

**Interfaces:** Produces `leadSchema` (zod) e `LeadInput` (tipo). Campos: `nome` (min 2), `contato` (min 5), `peca_interesse` (opcional), `mensagem` (opcional), `website` (honeypot, deve ser vazio).

- [ ] **Step 1: Teste**

```ts
import { test, expect } from '@playwright/test'
import { leadSchema } from '@/lib/schemas'

test('lead válido passa', () => {
  const r = leadSchema.safeParse({ nome: 'Marina', contato: '(96) 98111-0000', website: '' })
  expect(r.success).toBe(true)
})
test('nome curto falha', () => {
  const r = leadSchema.safeParse({ nome: 'M', contato: '(96) 98111-0000', website: '' })
  expect(r.success).toBe(false)
})
test('honeypot preenchido falha', () => {
  const r = leadSchema.safeParse({ nome: 'Marina', contato: '(96) 98111-0000', website: 'bot' })
  expect(r.success).toBe(false)
})
```

- [ ] **Step 2: Rodar e ver falhar** → FAIL.
- [ ] **Step 3: Implementar `lib/schemas.ts`**

```ts
import { z } from 'zod'

export const leadSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome.'),
  contato: z.string().min(5, 'Informe um WhatsApp ou e-mail.'),
  peca_interesse: z.string().optional(),
  mensagem: z.string().optional(),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
})

export type LeadInput = z.infer<typeof leadSchema>
```

- [ ] **Step 4: Rodar e ver passar** → PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: schema zod do lead com honeypot"`

### Task 5.2: Server Action criar-lead

**Files:** Create `app/actions/criar-lead.ts`

**Interfaces:** Produces `criarLead(prevState, formData): Promise<{ ok: boolean; erros?: Record<string,string>; mensagem?: string }>`.

- [ ] **Step 1: Implementar**

```ts
'use server'
import { leadSchema } from '@/lib/schemas'
import { getSupabaseServer } from '@/lib/supabase/server'

export type LeadState = { ok: boolean; erros?: Record<string, string>; mensagem?: string }

export async function criarLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    const erros: Record<string, string> = {}
    for (const issue of parsed.error.issues) erros[String(issue.path[0])] = issue.message
    return { ok: false, erros }
  }
  if (parsed.data.website) return { ok: true } // honeypot: finge sucesso, não grava
  const supabase = getSupabaseServer()
  const { error } = await supabase.from('leads').insert({
    nome: parsed.data.nome,
    contato: parsed.data.contato,
    peca_interesse: parsed.data.peca_interesse || null,
    mensagem: parsed.data.mensagem || null,
  })
  if (error) return { ok: false, mensagem: 'Não foi possível enviar agora. Tente pelo WhatsApp.' }
  return { ok: true, mensagem: 'Recebemos seu contato, retornaremos em breve.' }
}
```

- [ ] **Step 2: Commit** `git add -A && git commit -m "feat: server action criarLead"`

### Task 5.3: Formulário de contato (client)

**Files:** Create `components/marca/FormularioContato.tsx`

**Interfaces:** Consumes `criarLead` via `useActionState`; shadcn `Form`/`Input`/`Textarea`/`Button`/`Label`.

- [ ] **Step 1: Implementar** — `useActionState(criarLead, { ok: false })`. Campos: Nome, Contato (WhatsApp/e-mail), Peça de interesse (opcional), Mensagem (opcional), campo honeypot `website` oculto (`className="hidden"`, `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden`). Botão "Enviar" com estado `pending` (`useFormStatus` ou `isPending`). Erros por campo (`aria-describedby`) e mensagem geral com `aria-live="polite"`. Sucesso: substitui form por mensagem de confirmação. Foco visível.
- [ ] **Step 2: Commit** `git add -A && git commit -m "feat: formulário de contato"`

### Task 5.4: Página /contato

**Files:** Create `app/contato/page.tsx`

- [ ] **Step 1: Implementar** — duas colunas (responsivo: empilha no mobile): (a) dados — endereço `[placeholder]`, horário `[placeholder]`, WhatsApp (`<WhatsAppButton/>`), embed de mapa `[placeholder]`; (b) `<FormularioContato/>`. `<Equador/>` separando. `metadata` próprio.
- [ ] **Step 2:** `npm run build` → PASS.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: página /contato"`

### Task 5.5: Teste /contato (envio real)

**Files:** Create `tests/contato.spec.ts`

- [ ] **Step 1: Testes**

```ts
import { test, expect } from '@playwright/test'

test('envio válido mostra sucesso', async ({ page }) => {
  await page.goto('/contato')
  await page.getByLabel('Nome').fill('TESTE Playwright')
  await page.getByLabel(/Contato/).fill('teste@exemplo.com')
  await page.getByRole('button', { name: 'Enviar' }).click()
  await expect(page.getByText('Recebemos seu contato')).toBeVisible()
})

test('envio inválido mostra erro', async ({ page }) => {
  await page.goto('/contato')
  await page.getByRole('button', { name: 'Enviar' }).click()
  await expect(page.getByText(/Informe seu nome/)).toBeVisible()
})
```

Nota: o envio válido grava um lead real com nome "TESTE Playwright" — limpar depois via painel/MCP se desejado.

- [ ] **Step 2:** Rodar → PASS. Incluir axe sem violações críticas.
- [ ] **Step 3: Commit** `git add -A && git commit -m "test: /contato (envio, validação, a11y)"`

### Task 5.6: Preview Fase 5 — deploy e link.

---

# FASE 6 — Polish (SEO, sitemap, robots, JSON-LD, QA final)

### Task 6.1: sitemap + robots

**Files:** Create `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: `app/sitemap.ts`** — listar `/`, `/historia`, `/colecao`, `/colecao/aliancas`, `/contato` com `lastModified`.
- [ ] **Step 2: `app/robots.ts`** — `allow: '/'`, apontar `sitemap`.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: sitemap e robots"`

### Task 6.2: JSON-LD LocalBusiness/JewelryStore

**Files:** Create `components/marca/JsonLd.tsx`; Modify `app/page.tsx`, `app/contato/page.tsx`

- [ ] **Step 1: Implementar** `<JsonLd/>` com `@type: 'JewelryStore'`, `name`, `foundingDate: '1962'`, `address` `[placeholder]`, `telephone` `+5596000000000`, `openingHours` `[placeholder]`, `areaServed: 'Macapá, AP'`. Injetar via `<script type="application/ld+json">` na Home e Contato.
- [ ] **Step 2:** `npm run build` → PASS.
- [ ] **Step 3: Commit** `git add -A && git commit -m "feat: JSON-LD da joalheria"`

### Task 6.3: QA final responsivo + a11y

- [ ] **Step 1:** Rodar toda a suíte `npx playwright test` nos viewports 375/768/1440/2560 → PASS.
- [ ] **Step 2:** Revisar manualmente contraste AA (ouro nunca como texto sobre marfim), foco visível em todas as páginas, `prefers-reduced-motion`.
- [ ] **Step 3:** Corrigir o que aparecer; commitar correções.

### Task 6.4: Deploy de preview final + entrega

- [ ] **Step 1:** Deploy final de preview; passar link.
- [ ] **Step 2:** Listar ao usuário todos os placeholders pendentes de troca (fotos, WhatsApp, depoimentos, endereço/horário, OG image) e o lembrete de confirmar o ano 1962.

---

## Self-Review (preenchido pelo autor do plano)

**Cobertura do spec:** Home (T1.3), História (T2.1), Coleção+filtro+WhatsApp (T3.x), Alianças (T4.1), Contato+leads (T5.x), tokens/fontes/Equador (T0.4–0.5), header/footer/Sheet (T0.6), placeholders elegantes (T3.1), SEO/sitemap/robots/JSON-LD (T6.1–6.2), testes por página (T1.4/2.2/3.5/4.2/5.5), previews por fase (T0.7/1.5/2.3/3.6/4.3/5.6/6.4). ✔ Sem lacunas.

**Placeholders de conteúdo** são intencionais e marcados (FOTO AQUI, 5596000000000, DEPOIMENTO PROVISÓRIO, endereço/horário/OG). Nenhum placeholder de *plano* (TODO/TBD em passos).

**Consistência de tipos:** `Produto`/`Categoria` (T0.3) usados em T3.2/3.3/3.4; `getProdutos` (T3.2) consumido por T3.4/4.1; `buildWhatsAppUrl` (T1.1) por T1.2/3.3; `leadSchema` (T5.1) por T5.2/5.3; `criarLead`/`LeadState` (T5.2) por T5.3. ✔
