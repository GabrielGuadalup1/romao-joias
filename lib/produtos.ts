import { getSupabaseServer } from '@/lib/supabase/server'
import type { Produto, Categoria } from '@/lib/database.types'

/**
 * Lê os produtos ativos do Supabase, ordenados por categoria e referência.
 * Se `cat` for informado, filtra pela categoria. Em caso de erro, loga e
 * devolve `[]` (estado degradado tratado pela UI).
 */
export async function getProdutos(cat?: Categoria): Promise<Produto[]> {
  const supabase = getSupabaseServer()
  let query = supabase
    .from('produtos')
    .select('*')
    .eq('ativo', true)
    .order('categoria')
    .order('ref')
  if (cat) query = query.eq('categoria', cat)
  const { data, error } = await query
  if (error) {
    console.error('[produtos] falha na leitura:', error.message)
    return []
  }
  return data ?? []
}
