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
