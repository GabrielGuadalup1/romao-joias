import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { getProdutos } from '@/lib/produtos'

test('alianças renderiza o H1 da campanha', async ({ page }) => {
  await page.goto('/colecao/aliancas')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('O sim que dura para sempre')
})

test('grade mostra apenas alianças (mesma contagem de getProdutos)', async ({ page }) => {
  const aliancas = await getProdutos('Alianças')
  await page.goto('/colecao/aliancas')
  const cards = page.getByRole('article')
  await expect(cards.first()).toBeVisible()
  expect(await cards.count()).toBe(aliancas.length)
})

test('FAQ expande ao clicar na pergunta (accordion)', async ({ page }) => {
  await page.goto('/colecao/aliancas')
  const gatilho = page.getByRole('button', { name: 'Vocês fazem gravação?' })
  const resposta = page.getByText(/A gravação interna é inclusa/i)
  await expect(resposta).toBeHidden()
  await gatilho.click()
  await expect(resposta).toBeVisible()
})

test('CTA de WhatsApp presente e apontando para wa.me', async ({ page }) => {
  await page.goto('/colecao/aliancas')
  const wa = page.getByRole('link', { name: /Falar sobre alianças/i }).first()
  await expect(wa).toBeVisible()
  await expect(wa).toHaveAttribute('href', /wa\.me\/5596000000000/)
  await expect(wa).toHaveAttribute('target', '_blank')
})

test('alianças sem violações críticas de acessibilidade', async ({ page }) => {
  await page.goto('/colecao/aliancas')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  const graves = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  )
  expect(graves).toEqual([])
})
