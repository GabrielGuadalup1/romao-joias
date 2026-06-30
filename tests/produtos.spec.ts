import { test, expect } from '@playwright/test'
import { getProdutos } from '@/lib/produtos'

test('getProdutos retorna apenas produtos ativos', async () => {
  const produtos = await getProdutos()
  expect(produtos.length).toBeGreaterThan(0)
  expect(produtos.every((p) => p.ativo)).toBe(true)
})

test('getProdutos filtra por categoria Alianças', async () => {
  const aliancas = await getProdutos('Alianças')
  expect(aliancas.length).toBeGreaterThan(0)
  expect(aliancas.every((p) => p.categoria === 'Alianças')).toBe(true)
})
