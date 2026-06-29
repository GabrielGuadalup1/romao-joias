---
name: identidade-romao
description: Identidade visual da ROMÃO JOIAS — paleta de cores, tipografia, conceito Marco Zero, elemento-assinatura e regras de uso da marca. Use SEMPRE que for criar, gerar ou ajustar qualquer interface, página, layout, componente, cor, tipografia, espaçamento, ícone ou copy deste projeto, mesmo que o pedido não mencione a marca explicitamente. Consulte antes de escrever qualquer JSX/HTML/CSS/Tailwind.
---

# Identidade Visual — Romão Joias

Joalheria de Macapá–Amapá, fundada em 1962. Marca tradicional, de família, com
estética atemporal, confiável e acolhedora. Toda decisão visual deve transmitir
"tradição em ouro" — nada de modismos que envelhecem rápido.

> Se houver conflito entre "ficar moderno/diferente" e "respeitar estas regras",
> as regras da marca sempre vencem.

## Conceito central (use como fio condutor)

A Romão nasceu sobre a **linha do Equador**, na terra do **Marco Zero**. A ideia-mãe
é: *"onde o mundo se divide ao meio, começam as histórias que duram para sempre."*
Sempre que possível, ancore copy e elementos visuais nesse conceito.

Frases-âncora da marca (use-as ou crie no mesmo tom):
- "O sim que dura para sempre." (coleção de alianças)
- "Tradição de família em ouro."
- "Aliança · Joias · Relógios."

## Paleta de cores (tokens — use EXATAMENTE estes valores)

| Token       | Hex       | Uso                                                        |
|-------------|-----------|------------------------------------------------------------|
| `ouro`      | `#A87A2C` | Cor-assinatura: acentos, detalhes, ícones, filetes, CTAs.  |
| `champanhe` | `#D9BE86` | Apoio: metal claro, destaques sobre fundo escuro, filetes. |
| `onix`      | `#1A1410` | Textos e fundos escuros (seções escuras, rodapé).          |
| `marfim`    | `#F4ECDB` | Fundo principal claro, respiro, luz.                       |
| `pedra`     | `#9A8F7A` | Texto auxiliar, legendas, linhas finas.                    |

Configure como tokens no Tailwind (`tailwind.config`):

```js
theme: {
  extend: {
    colors: {
      ouro: '#A87A2C',
      champanhe: '#D9BE86',
      onix: '#1A1410',
      marfim: '#F4ECDB',
      pedra: '#9A8F7A',
    },
  },
}
```

### Regras de contraste (importante)
- **Nunca** use `ouro` como texto grande/corrido sobre `marfim` (some, fica ilegível).
  Sobre fundo claro, texto = `onix`; o `ouro` entra só em acentos pequenos e fortes.
- Sobre fundo escuro (`onix`), os destaques vêm de `champanhe` e `ouro`.
- Alterne seções claras (`marfim`) e escuras (`onix`) para dar ritmo. O rodapé é escuro.
- Garanta contraste AA em todo texto.

## Tipografia (use EXATAMENTE estas duas)

Duas famílias do Google Fonts. Nunca troque por outras nem altere o espaçamento padrão.

- **Bodoni Moda** (serifada Didone, alto contraste) — pesos 400/500.
  Uso: nome da marca, títulos, números, preços e frases de destaque.
- **Jost** (sans geométrica fina) — pesos 300/400/500.
  Uso: textos corridos, legendas, contatos, UI e a palavra "JOIAS" espaçada.

Configure no Tailwind:

```js
fontFamily: {
  display: ['"Bodoni Moda"', 'serif'], // títulos, nome, números
  body: ['Jost', 'sans-serif'],        // textos, UI, legendas
}
```

Detalhe de marca: a palavra **"JOIAS"** aparece sempre em Jost, em caixa alta e
bem espaçada (ex.: `letter-spacing: 0.42em`). Eyebrows e legendas também usam
caixa alta com tracking amplo (`~0.28em`).

## Elemento-assinatura: a linha do Equador

O logo tem um "R" atravessado por uma linha (o Equador). Reaproveite isso como
recurso visual recorrente: um **filete dourado fino e horizontal** que cruza ou
separa seções. É a marca registrada do site. Exemplo de utilitário:

```css
.equador {
  height: 1px;
  background: linear-gradient(90deg, transparent, #A87A2C 18%, #A87A2C 82%, transparent);
}
```

Use com moderação e sempre com área de respiro generosa ao redor.

## Tom de voz

Sofisticado, acolhedor e confiável — fala de quem entende de joias há mais de 60
anos, sem ser arrogante. Frases curtas e elegantes. Copy sempre realista em
pt-BR; nunca "Lorem ipsum" nem "Texto aqui".

## Faça / Não faça

**Faça**
- Preservar muita área de respiro ao redor da marca e dos blocos.
- Usar a versão clara da marca sobre fundo escuro (`onix`) e a escura sobre claro.
- Manter ritmo entre seções claras e escuras.
- Tratar o ouro como detalhe precioso (pouco e bem aplicado), não como cor de fundo.

**Não faça**
- Não distorça, incline nem recomponha o logo.
- Não troque as fontes nem altere o espaçamento definido.
- Não use ouro como texto sobre fundo claro sem contraste suficiente.
- Não adicione sombras pesadas, contornos ou gradientes ao logo.
- Não use imagens de `source.unsplash.com` (descontinuado). Para foto de produto,
  deixe placeholders claramente marcados `[FOTO AQUI]` para troca posterior.

## Dado a confirmar com o cliente
O manual diverge no ano: o símbolo diz "desde 1962", mas um mockup de Instagram diz
"1992". Use **1962** por padrão e confirme antes de publicar.
