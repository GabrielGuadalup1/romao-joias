import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('coleção renderiza o H1 e a vitrine com produtos', async ({ page }) => {
  await page.goto('/colecao')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('Coleção')
  // A vitrine deve trazer os produtos ativos do Supabase (regressão: vitrine vazia).
  const cards = page.getByRole('article')
  await expect(cards.first()).toBeVisible()
  expect(await cards.count()).toBeGreaterThan(0)
})

test('cada card traz REF, preço em BRL e botão de WhatsApp', async ({ page }) => {
  await page.goto('/colecao')
  const card = page.getByRole('article').first()
  await expect(card.getByText(/REF /)).toBeVisible()
  await expect(card.getByText(/R\$\s?\d/)).toBeVisible()
  await expect(card.getByRole('link', { name: /WhatsApp/i })).toBeVisible()
})

test('WhatsApp do card aponta para wa.me com a referência da peça', async ({ page }) => {
  await page.goto('/colecao')
  const card = page.getByRole('article').first()
  const wa = card.getByRole('link', { name: /WhatsApp/i })
  await expect(wa).toHaveAttribute('href', /wa\.me\/5596000000000\?text=/)
  await expect(wa).toHaveAttribute('href', /ref/i)
  await expect(wa).toHaveAttribute('target', '_blank')
})

test('filtro por categoria navega, marca aria-current e mostra peças', async ({ page }) => {
  await page.goto('/colecao')
  const filtros = page.getByRole('navigation', { name: 'Filtrar por categoria' })
  await filtros.getByRole('link', { name: 'Alianças', exact: true }).click()
  await expect(page).toHaveURL(/\/colecao\?cat=Alian/)
  await expect(
    filtros.getByRole('link', { name: 'Alianças', exact: true }),
  ).toHaveAttribute('aria-current', 'page')
  const cards = page.getByRole('article')
  await expect(cards.first()).toBeVisible()
  expect(await cards.count()).toBeGreaterThan(0)
})

test('filtro "Todas" volta para a vitrine completa', async ({ page }) => {
  await page.goto('/colecao?cat=Alianças')
  const filtros = page.getByRole('navigation', { name: 'Filtrar por categoria' })
  await filtros.getByRole('link', { name: 'Todas', exact: true }).click()
  await expect(page).toHaveURL(/\/colecao$/)
  await expect(
    filtros.getByRole('link', { name: 'Todas', exact: true }),
  ).toHaveAttribute('aria-current', 'page')
})

test('coleção sem violações críticas de acessibilidade', async ({ page }) => {
  await page.goto('/colecao')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  const graves = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  )
  expect(graves).toEqual([])
})
