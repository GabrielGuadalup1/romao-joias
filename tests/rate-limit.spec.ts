import { test, expect } from '@playwright/test'
import { checarRateLimit, resetRateLimit } from '@/lib/rate-limit'

test.beforeEach(() => resetRateLimit())

test('permite até 5 envios por chave na janela', () => {
  for (let i = 1; i <= 5; i++) {
    const r = checarRateLimit('1.2.3.4')
    expect(r.permitido).toBe(true)
    expect(r.restantes).toBe(5 - i)
  }
})

test('bloqueia o sexto envio e informa a espera', () => {
  for (let i = 0; i < 5; i++) checarRateLimit('1.2.3.4')
  const sexto = checarRateLimit('1.2.3.4')
  expect(sexto.permitido).toBe(false)
  expect(sexto.restantes).toBe(0)
  expect(sexto.retryEmSegundos).toBeGreaterThan(0)
})

test('chaves diferentes têm cotas independentes', () => {
  for (let i = 0; i < 5; i++) checarRateLimit('1.2.3.4')
  expect(checarRateLimit('1.2.3.4').permitido).toBe(false)
  expect(checarRateLimit('9.9.9.9').permitido).toBe(true)
})

test('janela expirada libera novos envios', async () => {
  const janelaMs = 50
  for (let i = 0; i < 5; i++) checarRateLimit('1.2.3.4', { janelaMs })
  expect(checarRateLimit('1.2.3.4', { janelaMs }).permitido).toBe(false)

  await new Promise((r) => setTimeout(r, janelaMs + 20))
  expect(checarRateLimit('1.2.3.4', { janelaMs }).permitido).toBe(true)
})
