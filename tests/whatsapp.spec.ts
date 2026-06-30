import { test, expect } from '@playwright/test'
import { buildWhatsAppUrl } from '../lib/whatsapp'

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
  expect(text).not.toContain('ref ')
})
