export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type ClerkEvent = {
  type: string
  data: {
    id: string
    email_addresses: Array<{ email_address: string; id: string }>
    primary_email_address_id: string
  }
}

export async function POST(req: NextRequest) {
  // Verify Clerk webhook signature (use svix in production)
  const svixId = req.headers.get('svix-id')
  const svixTimestamp = req.headers.get('svix-timestamp')
  const svixSignature = req.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  let event: ClerkEvent
  try {
    event = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.type === 'user.created') {
    const { id, email_addresses, primary_email_address_id } = event.data
    const primaryEmail = email_addresses.find(
      (e) => e.id === primary_email_address_id
    )?.email_address || email_addresses[0]?.email_address || ''

    await supabase.from('users').upsert({
      id,
      email: primaryEmail,
      credits_remaining: 3,
      plan_type: 'free',
    })
  }

  return NextResponse.json({ received: true })
}
