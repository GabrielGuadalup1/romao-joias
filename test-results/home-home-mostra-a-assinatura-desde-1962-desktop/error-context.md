# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> home mostra a assinatura desde 1962
- Location: tests\home.spec.ts:12:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/desde 1962/i)
Expected: visible
Error: strict mode violation: getByText(/desde 1962/i) resolved to 2 elements:
    1) <p class="font-body uppercase text-xs tracking-eyebrow text-champanhe mb-8">Macapá · Amapá · desde 1962</p> aka getByText('Macapá · Amapá · desde')
    2) <p class="font-body text-pedra text-xs uppercase tracking-eyebrow">Joalheria de família em Macapá desde 1962</p> aka getByText('Joalheria de família em Macapá desde')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/desde 1962/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "ROMÃO JOIAS" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e6]: ROMÃO
        - generic [ref=e7]: JOIAS
      - navigation "Principal" [ref=e8]:
        - link "Início" [ref=e9] [cursor=pointer]:
          - /url: /
        - link "História" [ref=e10] [cursor=pointer]:
          - /url: /historia
        - link "Coleção" [ref=e11] [cursor=pointer]:
          - /url: /colecao
        - link "Alianças" [ref=e12] [cursor=pointer]:
          - /url: /colecao/aliancas
        - link "Contato" [ref=e13] [cursor=pointer]:
          - /url: /contato
      - link "Falar no WhatsApp" [ref=e14] [cursor=pointer]:
        - /url: https://wa.me/5596000000000
  - main [ref=e15]:
    - region "ROMÃO JOIAS" [ref=e16]:
      - generic [ref=e17]:
        - paragraph [ref=e18]: Macapá · Amapá · desde 1962
        - heading "ROMÃO JOIAS" [level=1] [ref=e20]:
          - text: ROMÃO
          - generic [ref=e21]: JOIAS
        - paragraph [ref=e22]: Onde o mundo se divide ao meio, começam as histórias que duram para sempre.
        - generic [ref=e23]:
          - link "Falar no WhatsApp" [ref=e24] [cursor=pointer]:
            - /url: https://wa.me/5596000000000?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20ROM%C3%83O%20JOIAS%20e%20agendar%20uma%20visita.
            - img [ref=e25]
            - text: Falar no WhatsApp
          - link "Agendar visita" [ref=e27] [cursor=pointer]:
            - /url: /contato
    - region "Tradição de família em ouro." [ref=e28]:
      - generic [ref=e29]:
        - heading "Tradição de família em ouro." [level=2] [ref=e30]
        - paragraph [ref=e31]: "Há mais de 60 anos e ao longo de três gerações, a ROMÃO JOIAS é referência no coração de Macapá. Nascemos na linha do Equador — onde o mundo se divide ao meio — e cada peça que entregamos carrega essa história: ouro 18k selecionado, mãos que conhecem o ofício e um atendimento próximo, como o de quem recebe amigos. Porque joia boa é aquela que atravessa gerações."
    - region "Nossas coleções" [ref=e32]:
      - generic [ref=e33]:
        - generic [ref=e34]:
          - paragraph [ref=e35]: Coleções
          - heading "Nossas coleções" [level=2] [ref=e36]
        - generic [ref=e37]:
          - link "Ver coleção Alianças" [ref=e38] [cursor=pointer]:
            - /url: /colecao/aliancas
            - article [ref=e39]:
              - generic [ref=e40]:
                - paragraph [ref=e41]: Para os que se escolhem
                - generic [ref=e42]: A
                - generic [ref=e43]:
                  - heading "Alianças" [level=3] [ref=e44]
                  - paragraph [ref=e45]: O sim que dura para sempre.
                  - generic [ref=e46]:
                    - generic [ref=e47]: Ver coleção
                    - generic [ref=e48]: →
          - link "Ver coleção Joias" [ref=e49] [cursor=pointer]:
            - /url: /colecao?cat=Joias
            - article [ref=e50]:
              - generic [ref=e51]:
                - paragraph [ref=e52]: Ouro 18k selecionado
                - generic [ref=e53]: J
                - generic [ref=e54]:
                  - heading "Joias" [level=3] [ref=e55]
                  - paragraph [ref=e56]: Peças que atravessam gerações com elegância.
                  - generic [ref=e57]:
                    - generic [ref=e58]: Ver coleção
                    - generic [ref=e59]: →
          - link "Ver coleção Relógios" [ref=e60] [cursor=pointer]:
            - /url: /colecao?cat=Rel%C3%B3gios
            - article [ref=e61]:
              - generic [ref=e62]:
                - paragraph [ref=e63]: Precisão e distinção
                - generic [ref=e64]: R
                - generic [ref=e65]:
                  - heading "Relógios" [level=3] [ref=e66]
                  - paragraph [ref=e67]: O tempo, guardado com arte.
                  - generic [ref=e68]:
                    - generic [ref=e69]: Ver coleção
                    - generic [ref=e70]: →
    - region "Quem confia na ROMÃO" [ref=e71]:
      - generic [ref=e72]:
        - generic [ref=e73]:
          - paragraph [ref=e74]: Quem confia na ROMÃO
          - heading "Quem confia na ROMÃO" [level=2] [ref=e75]
        - generic [ref=e76]:
          - figure "Ana Paula M. Cliente há 12 anos" [ref=e77]:
            - generic [ref=e78]: "\""
            - blockquote [ref=e79]: Compramos nossas alianças na Romão e, anos depois, voltamos para o anel de aniversário. Sempre fui tratada como família, com toda a atenção que esse momento merece.
            - generic [ref=e80]:
              - paragraph [ref=e81]: Ana Paula M.
              - paragraph [ref=e82]: Cliente há 12 anos
          - figure "José Carlos F. Macapá – AP" [ref=e83]:
            - generic [ref=e84]: "\""
            - blockquote [ref=e85]: A qualidade do ouro 18k e o acabamento impecável me surpreenderam. Minha filha usa o colar que ganhei da Romão até hoje — já tem mais de quinze anos.
            - generic [ref=e86]:
              - paragraph [ref=e87]: José Carlos F.
              - paragraph [ref=e88]: Macapá – AP
          - figure "Mariana S. Cliente há 8 anos" [ref=e89]:
            - generic [ref=e90]: "\""
            - blockquote [ref=e91]: Atendimento próximo, sem pressa. Senti que minha escolha importava para eles tanto quanto importava para mim. Volto sempre.
            - generic [ref=e92]:
              - paragraph [ref=e93]: Mariana S.
              - paragraph [ref=e94]: Cliente há 8 anos
        - generic [ref=e96]:
          - paragraph [ref=e97]: 60+ anos · 3 gerações
          - paragraph [ref=e98]: Joalheria de família em Macapá desde 1962
    - region "Encontre a peça que conta a sua história." [ref=e99]:
      - generic [ref=e100]:
        - paragraph [ref=e101]: Venha nos conhecer
        - heading "Encontre a peça que conta a sua história." [level=2] [ref=e102]
        - paragraph [ref=e103]: Nossa equipe está pronta para receber você com toda a atenção que o momento merece. Fale com a gente pelo WhatsApp ou agende uma visita à loja.
        - generic [ref=e104]:
          - link "Falar no WhatsApp" [ref=e105] [cursor=pointer]:
            - /url: https://wa.me/5596000000000?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20ROM%C3%83O%20JOIAS%20e%20agendar%20uma%20visita.
            - img [ref=e106]
            - text: Falar no WhatsApp
          - link "Agendar visita" [ref=e108] [cursor=pointer]:
            - /url: /contato
  - contentinfo [ref=e109]:
    - generic [ref=e111]:
      - generic [ref=e112]:
        - generic [ref=e113]:
          - paragraph [ref=e114]: ROMÃO
          - paragraph [ref=e115]: JOIAS
        - paragraph [ref=e116]: Tradição de família em ouro.
        - paragraph [ref=e117]: Aliança · Joias · Relógios.
      - navigation "Rodapé" [ref=e118]:
        - paragraph [ref=e119]: Navegação
        - list [ref=e120]:
          - listitem [ref=e121]:
            - link "Início" [ref=e122] [cursor=pointer]:
              - /url: /
          - listitem [ref=e123]:
            - link "História" [ref=e124] [cursor=pointer]:
              - /url: /historia
          - listitem [ref=e125]:
            - link "Coleção" [ref=e126] [cursor=pointer]:
              - /url: /colecao
          - listitem [ref=e127]:
            - link "Alianças" [ref=e128] [cursor=pointer]:
              - /url: /colecao/aliancas
          - listitem [ref=e129]:
            - link "Contato" [ref=e130] [cursor=pointer]:
              - /url: /contato
      - generic [ref=e131]:
        - paragraph [ref=e132]: Contato
        - generic [ref=e133]:
          - paragraph [ref=e134]: "[ENDEREÇO AQUI]"
          - paragraph [ref=e135]: "[HORÁRIO AQUI]"
          - link "Falar no WhatsApp" [ref=e136] [cursor=pointer]:
            - /url: https://wa.me/5596000000000
    - paragraph [ref=e139]: © 1962–2026 ROMÃO JOIAS · Macapá–AP
  - alert [ref=e140]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import AxeBuilder from '@axe-core/playwright'
  3  | 
  4  | test('home renderiza o nome da marca no H1', async ({ page }) => {
  5  |   await page.goto('/')
  6  |   const h1 = page.getByRole('heading', { level: 1 })
  7  |   await expect(h1).toBeVisible()
  8  |   await expect(h1).toContainText('ROMÃO')
  9  |   await expect(h1).toContainText('JOIAS')
  10 | })
  11 | 
  12 | test('home mostra a assinatura desde 1962', async ({ page }) => {
  13 |   await page.goto('/')
> 14 |   await expect(page.getByText(/desde 1962/i)).toBeVisible()
     |                                               ^ Error: expect(locator).toBeVisible() failed
  15 | })
  16 | 
  17 | test('CTA do WhatsApp aponta para wa.me', async ({ page }) => {
  18 |   await page.goto('/')
  19 |   const wa = page.getByRole('link', { name: /WhatsApp/i }).first()
  20 |   await expect(wa).toHaveAttribute('href', /wa\.me\/5596000000000/)
  21 |   await expect(wa).toHaveAttribute('target', '_blank')
  22 | })
  23 | 
  24 | test('CTA "Agendar visita" leva para /contato (por href)', async ({ page }) => {
  25 |   await page.goto('/')
  26 |   const visita = page.getByRole('link', { name: /Agendar visita/i }).first()
  27 |   await expect(visita).toHaveAttribute('href', '/contato')
  28 | })
  29 | 
  30 | test('home sem violações sérias/críticas de acessibilidade', async ({ page }) => {
  31 |   await page.goto('/')
  32 |   const results = await new AxeBuilder({ page })
  33 |     .withTags(['wcag2a', 'wcag2aa'])
  34 |     .analyze()
  35 |   const graves = results.violations.filter(
  36 |     (v) => v.impact === 'critical' || v.impact === 'serious',
  37 |   )
  38 |   if (graves.length) {
  39 |     console.log('Violações graves:', JSON.stringify(graves.map((v) => ({ id: v.id, nodes: v.nodes.length })), null, 2))
  40 |   }
  41 |   expect(graves).toEqual([])
  42 | })
  43 | 
```