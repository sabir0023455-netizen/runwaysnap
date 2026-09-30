export const dynamic = 'force-dynamic'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS, PlanKey } from '@/lib/stripe'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// One-time price IDs for pay-per-generation
const PAY_PER_GENERATION_UNIT_AMOUNT = 100 // $1.00

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const { plan } = await req.json() as { plan: PlanKey | 'pay_per_generation' }

  try {
    const email = user.emailAddresses?.[0]?.emailAddress

    if (plan === 'pay_per_generation') {
      // One-time payment for 1 credit
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'RunwaySnap — 1 Generation',
                description: '4 AI-generated model photos',
              },
              unit_amount: PAY_PER_GENERATION_UNIT_AMOUNT,
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          plan: 'pay_per_generation',
          credits: '1',
        },
        success_url: `${APP_URL}/dashboard?success=true`,
        cancel_url: `${APP_URL}/pricing`,
      })
      return NextResponse.json({ url: session.url })
    }

    // Subscription plans
    const planConfig = PLANS[plan as PlanKey]
    if (!planConfig) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `RunwaySnap ${planConfig.name}`,
              description: planConfig.description,
            },
            unit_amount: planConfig.price,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
        credits: String(planConfig.credits),
      },
      subscription_data: {
        metadata: { userId, plan },
      },
      success_url: `${APP_URL}/dashboard?success=true&plan=${plan}`,
      cancel_url: `${APP_URL}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
