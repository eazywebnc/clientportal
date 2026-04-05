import { createAdminClient } from '@/lib/supabase/server'

/**
 * Ensures the authenticated user has a cp_settings record.
 * Called on first dashboard access to support cross-SaaS login.
 */
export async function ensureUserProfile(userId: string) {
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('cp_settings')
    .select('user_id')
    .eq('user_id', userId)
    .single()

  if (existing) return

  await supabase.from('cp_settings').upsert(
    {
      user_id: userId,
      plan: 'starter',
      branding_color: '#4f46e5',
    },
    { onConflict: 'user_id' }
  )
}
