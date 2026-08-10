/**
 * Rate limit simples, em memória, por chave (IP).
 *
 * LIMITAÇÃO CONHECIDA: o estado vive no processo. Em serverless/Fluid Compute
 * cada instância tem o seu próprio Map, então o limite é por instância, não
 * global — segura spam casual, não um ataque distribuído. Se um dia precisar de
 * garantia forte, trocar por Upstash Redis / Vercel KV mantendo esta assinatura.
 */

const JANELA_MS = 60 * 60 * 1000 // 1 hora
const MAX_POR_JANELA = 5
/** Teto de chaves rastreadas, para o Map não crescer sem limite. */
const MAX_CHAVES = 5_000

const registros = new Map<string, number[]>()

function limpar(agora: number) {
  for (const [chave, marcas] of registros) {
    const vivas = marcas.filter((t) => agora - t < JANELA_MS)
    if (vivas.length === 0) registros.delete(chave)
    else registros.set(chave, vivas)
  }
}

export type ResultadoRateLimit = {
  permitido: boolean
  restantes: number
  /** Segundos até liberar de novo (0 quando permitido). */
  retryEmSegundos: number
}

export function checarRateLimit(
  chave: string,
  { max = MAX_POR_JANELA, janelaMs = JANELA_MS } = {},
): ResultadoRateLimit {
  const agora = Date.now()

  if (registros.size > MAX_CHAVES) limpar(agora)

  const marcas = (registros.get(chave) ?? []).filter((t) => agora - t < janelaMs)

  if (marcas.length >= max) {
    const maisAntiga = marcas[0]
    const esperaMs = janelaMs - (agora - maisAntiga)
    registros.set(chave, marcas)
    return {
      permitido: false,
      restantes: 0,
      retryEmSegundos: Math.max(1, Math.ceil(esperaMs / 1000)),
    }
  }

  marcas.push(agora)
  registros.set(chave, marcas)
  return { permitido: true, restantes: max - marcas.length, retryEmSegundos: 0 }
}

/** Somente para testes: zera o estado acumulado. */
export function resetRateLimit() {
  registros.clear()
}
