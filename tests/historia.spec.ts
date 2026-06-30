import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('história renderiza o H1', async ({ page }) => {
  await page.goto('/historia')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('Nascidos')
})

test('história cita o ano de fundação 1962', async ({ page }) => {
  await page.goto('/historia')
  await expect(page.getByText(/1962/).first()).toBeVisible()
})

test('história mostra a linha do tempo com seus marcos', async ({ page }) => {
  await page.goto('/historia')
  await expect(
    page.getByRole('heading', { name: /De 1962 até aqui/i }),
  ).toBeVisible()
  const itens = page.locator('ol li')
  await expect(itens.first()).toBeVisible()
  expect(await itens.count()).toBeGreaterThanOrEqual(4)
})

test('CTA do WhatsApp aponta para wa.me', async ({ page }) => {
  await page.goto('/historia')
  const wa = page.getByRole('link', { name: /WhatsApp/i }).first()
  await expect(wa).toHaveAttribute('href', /wa\.me\/5596000000000/)
  await expect(wa).toHaveAttribute('target', '_blank')
})

test('CTA Agendar visita leva para contato', async ({ page }) => {
  await page.goto('/historia')
  const visita = page.getByRole('link', { name: /Agendar visita/i }).first()
  await expect(visita).toHaveAttribute('href', '/contato')
})

test('história sem violações críticas de acessibilidade', async ({ page }) => {
  await page.goto('/historia')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  const graves = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  )
  expect(graves).toEqual([])
})
