# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> home sem violações sérias/críticas de acessibilidade
- Location: tests\home.spec.ts:30:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 204

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f4ecdb",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9a8f7a",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #9a8f7a, background color: #f4ecdb, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<header class=\"sticky top-0 z-40 bg-marfim/95 backdrop-blur-sm\">",
+                 "target": Array [
+                   "header",
+                 ],
+               },
+               Object {
+                 "html": "<body class=\"min-h-screen flex flex-col\">",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #9a8f7a, background color: #f4ecdb, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-body uppercase tracking-joias text-xs text-pedra\">JOIAS</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".leading-none.rounded-sm[href=\"/\"] > .tracking-joias",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1a1410",
+               "contrastRatio": 3.43,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a694b",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.43 (foreground color: #7a694b, background color: #1a1410, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"bg-onix rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1\">",
+                 "target": Array [
+                   "a[aria-label=\"Ver coleção Alianças\"] > article",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.43 (foreground color: #7a694b, background color: #1a1410, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-body text-xs uppercase tracking-eyebrow\">Ver coleção</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-label=\"Ver coleção Alianças\"] > article > .p-8.min-h-\\[18rem\\].flex-col > .mt-8 > .text-champanhe\\/50.gap-2.mt-6 > span:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1a1410",
+               "contrastRatio": 3.43,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a694b",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.43 (foreground color: #7a694b, background color: #1a1410, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"bg-onix rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1\">",
+                 "target": Array [
+                   "a[aria-label=\"Ver coleção Joias\"] > article",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.43 (foreground color: #7a694b, background color: #1a1410, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-body text-xs uppercase tracking-eyebrow\">Ver coleção</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-label=\"Ver coleção Joias\"] > article > .p-8.min-h-\\[18rem\\].flex-col > .mt-8 > .text-champanhe\\/50.gap-2.mt-6 > span:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1a1410",
+               "contrastRatio": 3.43,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a694b",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.43 (foreground color: #7a694b, background color: #1a1410, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"bg-onix rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1\">",
+                 "target": Array [
+                   "a[aria-label=\"Ver coleção Relógios\"] > article",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.43 (foreground color: #7a694b, background color: #1a1410, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-body text-xs uppercase tracking-eyebrow\">Ver coleção</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-label=\"Ver coleção Relógios\"] > article > .p-8.min-h-\\[18rem\\].flex-col > .mt-8 > .text-champanhe\\/50.gap-2.mt-6 > span:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1a1410",
+               "contrastRatio": 2.86,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#675e50",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.86 (foreground color: #675e50, background color: #1a1410, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer class=\"bg-onix text-marfim\">",
+                 "target": Array [
+                   "footer",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.86 (foreground color: #675e50, background color: #1a1410, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-body text-xs text-pedra/60 tracking-widest uppercase mt-1\">Aliança · Joias · Relógios.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".text-pedra\\/60",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
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
      - button "Abrir menu" [ref=e9]:
        - img
  - main [ref=e10]:
    - region "ROMÃO JOIAS" [ref=e11]:
      - generic [ref=e12]:
        - paragraph [ref=e13]: Macapá · Amapá · desde 1962
        - heading "ROMÃO JOIAS" [level=1] [ref=e15]:
          - text: ROMÃO
          - generic [ref=e16]: JOIAS
        - paragraph [ref=e17]: Onde o mundo se divide ao meio, começam as histórias que duram para sempre.
        - generic [ref=e18]:
          - link "Falar no WhatsApp" [ref=e19] [cursor=pointer]:
            - /url: https://wa.me/5596000000000?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20ROM%C3%83O%20JOIAS%20e%20agendar%20uma%20visita.
            - img [ref=e20]
            - text: Falar no WhatsApp
          - link "Agendar visita" [ref=e22] [cursor=pointer]:
            - /url: /contato
    - region "Tradição de família em ouro." [ref=e23]:
      - generic [ref=e24]:
        - heading "Tradição de família em ouro." [level=2] [ref=e25]
        - paragraph [ref=e26]: "Há mais de 60 anos e ao longo de três gerações, a ROMÃO JOIAS é referência no coração de Macapá. Nascemos na linha do Equador — onde o mundo se divide ao meio — e cada peça que entregamos carrega essa história: ouro 18k selecionado, mãos que conhecem o ofício e um atendimento próximo, como o de quem recebe amigos. Porque joia boa é aquela que atravessa gerações."
    - region "Nossas coleções" [ref=e27]:
      - generic [ref=e28]:
        - generic [ref=e29]:
          - paragraph [ref=e30]: Coleções
          - heading "Nossas coleções" [level=2] [ref=e31]
        - generic [ref=e32]:
          - link "Ver coleção Alianças" [ref=e33] [cursor=pointer]:
            - /url: /colecao/aliancas
            - article [ref=e34]:
              - generic [ref=e35]:
                - paragraph [ref=e36]: Para os que se escolhem
                - generic [ref=e37]: A
                - generic [ref=e38]:
                  - heading "Alianças" [level=3] [ref=e39]
                  - paragraph [ref=e40]: O sim que dura para sempre.
                  - generic [ref=e41]:
                    - generic [ref=e42]: Ver coleção
                    - generic [ref=e43]: →
          - link "Ver coleção Joias" [ref=e44] [cursor=pointer]:
            - /url: /colecao?cat=Joias
            - article [ref=e45]:
              - generic [ref=e46]:
                - paragraph [ref=e47]: Ouro 18k selecionado
                - generic [ref=e48]: J
                - generic [ref=e49]:
                  - heading "Joias" [level=3] [ref=e50]
                  - paragraph [ref=e51]: Peças que atravessam gerações com elegância.
                  - generic [ref=e52]:
                    - generic [ref=e53]: Ver coleção
                    - generic [ref=e54]: →
          - link "Ver coleção Relógios" [ref=e55] [cursor=pointer]:
            - /url: /colecao?cat=Rel%C3%B3gios
            - article [ref=e56]:
              - generic [ref=e57]:
                - paragraph [ref=e58]: Precisão e distinção
                - generic [ref=e59]: R
                - generic [ref=e60]:
                  - heading "Relógios" [level=3] [ref=e61]
                  - paragraph [ref=e62]: O tempo, guardado com arte.
                  - generic [ref=e63]:
                    - generic [ref=e64]: Ver coleção
                    - generic [ref=e65]: →
    - region "Quem confia na ROMÃO" [ref=e66]:
      - generic [ref=e67]:
        - generic [ref=e68]:
          - paragraph [ref=e69]: Quem confia na ROMÃO
          - heading "Quem confia na ROMÃO" [level=2] [ref=e70]
        - generic [ref=e71]:
          - figure "Ana Paula M. Cliente há 12 anos" [ref=e72]:
            - generic [ref=e73]: "\""
            - blockquote [ref=e74]: Compramos nossas alianças na Romão e, anos depois, voltamos para o anel de aniversário. Sempre fui tratada como família, com toda a atenção que esse momento merece.
            - generic [ref=e75]:
              - paragraph [ref=e76]: Ana Paula M.
              - paragraph [ref=e77]: Cliente há 12 anos
          - figure "José Carlos F. Macapá – AP" [ref=e78]:
            - generic [ref=e79]: "\""
            - blockquote [ref=e80]: A qualidade do ouro 18k e o acabamento impecável me surpreenderam. Minha filha usa o colar que ganhei da Romão até hoje — já tem mais de quinze anos.
            - generic [ref=e81]:
              - paragraph [ref=e82]: José Carlos F.
              - paragraph [ref=e83]: Macapá – AP
          - figure "Mariana S. Cliente há 8 anos" [ref=e84]:
            - generic [ref=e85]: "\""
            - blockquote [ref=e86]: Atendimento próximo, sem pressa. Senti que minha escolha importava para eles tanto quanto importava para mim. Volto sempre.
            - generic [ref=e87]:
              - paragraph [ref=e88]: Mariana S.
              - paragraph [ref=e89]: Cliente há 8 anos
        - generic [ref=e91]:
          - paragraph [ref=e92]: 60+ anos · 3 gerações
          - paragraph [ref=e93]: Joalheria de família em Macapá desde 1962
    - region "Encontre a peça que conta a sua história." [ref=e94]:
      - generic [ref=e95]:
        - paragraph [ref=e96]: Venha nos conhecer
        - heading "Encontre a peça que conta a sua história." [level=2] [ref=e97]
        - paragraph [ref=e98]: Nossa equipe está pronta para receber você com toda a atenção que o momento merece. Fale com a gente pelo WhatsApp ou agende uma visita à loja.
        - generic [ref=e99]:
          - link "Falar no WhatsApp" [ref=e100] [cursor=pointer]:
            - /url: https://wa.me/5596000000000?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20ROM%C3%83O%20JOIAS%20e%20agendar%20uma%20visita.
            - img [ref=e101]
            - text: Falar no WhatsApp
          - link "Agendar visita" [ref=e103] [cursor=pointer]:
            - /url: /contato
  - contentinfo [ref=e104]:
    - generic [ref=e106]:
      - generic [ref=e107]:
        - generic [ref=e108]:
          - paragraph [ref=e109]: ROMÃO
          - paragraph [ref=e110]: JOIAS
        - paragraph [ref=e111]: Tradição de família em ouro.
        - paragraph [ref=e112]: Aliança · Joias · Relógios.
      - navigation "Rodapé" [ref=e113]:
        - paragraph [ref=e114]: Navegação
        - list [ref=e115]:
          - listitem [ref=e116]:
            - link "Início" [ref=e117] [cursor=pointer]:
              - /url: /
          - listitem [ref=e118]:
            - link "História" [ref=e119] [cursor=pointer]:
              - /url: /historia
          - listitem [ref=e120]:
            - link "Coleção" [ref=e121] [cursor=pointer]:
              - /url: /colecao
          - listitem [ref=e122]:
            - link "Alianças" [ref=e123] [cursor=pointer]:
              - /url: /colecao/aliancas
          - listitem [ref=e124]:
            - link "Contato" [ref=e125] [cursor=pointer]:
              - /url: /contato
      - generic [ref=e126]:
        - paragraph [ref=e127]: Contato
        - generic [ref=e128]:
          - paragraph [ref=e129]: "[ENDEREÇO AQUI]"
          - paragraph [ref=e130]: "[HORÁRIO AQUI]"
          - link "Falar no WhatsApp" [ref=e131] [cursor=pointer]:
            - /url: https://wa.me/5596000000000
    - paragraph [ref=e134]: © 1962–2026 ROMÃO JOIAS · Macapá–AP
  - alert [ref=e135]
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
  14 |   await expect(page.getByText(/desde 1962/i)).toBeVisible()
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
> 41 |   expect(graves).toEqual([])
     |                  ^ Error: expect(received).toEqual(expected) // deep equality
  42 | })
  43 | 
```