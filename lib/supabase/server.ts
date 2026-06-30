import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

/**
 * Client Supabase para leitura no servidor (Server Components / Server Actions).
 * Usa a anon/publishable key — o RLS restringe `produtos` a `ativo = true`.
 */
export function getSupabaseServer() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )
}
