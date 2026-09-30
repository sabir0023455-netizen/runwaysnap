export const dynamic = 'force-dynamic'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function POST() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', APP_URL))
  }

  const user = await currentUser()
  const email = user?.emailAddresses?.[0]?.emailAddress

  if (!email) {
    return NextResponse.redirect(new URL('/account', APP_URL))
  }

  try {
    // Find customer by email
    const customers = await stripe.customers.list({ email, limit: 1 })
    if (customers.data.length === 0) {
      return NextResponse.redirect(new URL('/account', APP_URL))
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${APP_URL}/account`,
    })

    return NextResponse.redirect(session.url)
  } catch (error) {
    console.error('Portal error:', error)
    return NextResponse.redirect(new URL('/account', APP_URL))
  }
}
