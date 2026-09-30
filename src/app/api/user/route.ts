export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, credits_remaining, plan_type, created_at')
    .eq('id', userId)
    .single()

  if (error || !user) {
    // Auto-create user with free credits if not found
    const { data: newUser } = await supabase
      .from('users')
      .insert({ id: userId, email: '', credits_remaining: 3, plan_type: 'free' })
      .select()
      .single()
    return NextResponse.json(newUser || { credits_remaining: 3, plan_type: 'free' })
  }

  return NextResponse.json(user)
}
