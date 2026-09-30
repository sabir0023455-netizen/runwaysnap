import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase env vars not set')
    _client = createClient(url, key)
  }
  return _client
}

// Convenience proxy — safe to import and call only at request time
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export type GenerationSettings = {
  modelType: 'female' | 'male' | 'gender_neutral'
  skinTone: 'fair' | 'medium' | 'dark' | 'deep'
  bodyType: 'slim' | 'average' | 'curvy' | 'plus_size'
  poseStyle: 'standing' | 'casual' | 'editorial' | 'lifestyle'
  background: 'studio_white' | 'studio_gray' | 'outdoor' | 'lifestyle'
}
