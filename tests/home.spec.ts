import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home renderiza o nome da marca no H1', async ({ page }) => {
  await page.goto('/')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('ROMÃO')
  await expect(h1).toContainText('JOIAS')
})

test('home mostra a assinatura desde 1962', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/desde 1962/i).first()).toBeVisible()
})

test('CTA do WhatsApp aponta para wa.me', async ({ page }) => {
  await page.goto('/')
  const wa = page.getByRole('link', { name: /WhatsApp/i }).first()
  await expect(wa).toHaveAttribute('href', /wa\.me\/5596000000000/)
  await expect(wa).toHaveAttribute('target', '_blank')
})

test('CTA "Agendar visita" leva para /contato (por href)', async ({ page }) => {
  await page.goto('/')
  const visita = page.getByRole('link', { name: /Agendar visita/i }).first()
  await expect(visita).toHaveAttribute('href', '/contato')
})

test('home sem violações sérias/críticas de acessibilidade', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  const graves = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  )
  if (graves.length) {
    console.log('Violações graves:', JSON.stringify(graves.map((v) => ({ id: v.id, nodes: v.nodes.length })), null, 2))
  }
  expect(graves).toEqual([])
})
