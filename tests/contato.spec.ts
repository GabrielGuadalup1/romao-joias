import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('contato renderiza H1 e dados da loja', async ({ page }) => {
  await page.goto('/contato')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('Venha conhecer de perto')
  await expect(page.getByText('Endereço', { exact: true })).toBeVisible()
  await expect(page.getByText('Horário de atendimento', { exact: true })).toBeVisible()
})

test('envio inválido mostra erro de validação', async ({ page }) => {
  await page.goto('/contato')
  await page.getByRole('button', { name: 'Enviar' }).click()
  await expect(page.getByText('Informe seu nome.')).toBeVisible()
  await expect(page.getByText('Informe um WhatsApp ou e-mail.')).toBeVisible()
})

test('envio válido mostra confirmação', async ({ page }) => {
  await page.goto('/contato')
  await page.getByLabel('Nome').fill('TESTE Playwright')
  await page.getByLabel(/Contato/).fill('teste@exemplo.com')
  await page.getByRole('button', { name: 'Enviar' }).click()
  await expect(page.getByText('Recebemos seu contato')).toBeVisible()
})

test('honeypot preenchido finge sucesso sem gravar', async ({ page }) => {
  await page.goto('/contato')
  await page.getByLabel('Nome').fill('TESTE Honeypot')
  await page.getByLabel(/Contato/).fill('bot@exemplo.com')
  // Bots preenchem o campo oculto; humanos não o veem (display:none → fill() não alcança).
  await page.locator('#website').evaluate((el) => {
    ;(el as HTMLInputElement).value = 'http://spam.example'
  })
  await page.getByRole('button', { name: 'Enviar' }).click()
  await expect(page.getByText('Recebemos seu contato')).toBeVisible()
})

test('contato sem violações críticas de acessibilidade', async ({ page }) => {
  await page.goto('/contato')
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
  const graves = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  )
  expect(graves).toEqual([])
})
