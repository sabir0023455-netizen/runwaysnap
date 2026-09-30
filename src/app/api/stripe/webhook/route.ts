export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { userId, plan, credits } = session.metadata || {}

        if (!userId || !credits) break

        const creditsToAdd = parseInt(credits, 10)

        // Get current user credits
        const { data: user } = await supabase
          .from('users')
          .select('credits_remaining')
          .eq('id', userId)
          .single()

        const currentCredits = user?.credits_remaining || 0

        await supabase.from('users').upsert({
          id: userId,
          email: session.customer_email || '',
          credits_remaining: currentCredits + creditsToAdd,
          plan_type: plan || 'pay_per_generation',
        })

        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        if (!subscriptionId) break

        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const { userId, plan, credits } = subscription.metadata || {}

        if (!userId || !credits) break

        // Monthly renewal: reset credits (not add)
        const creditsToSet = parseInt(credits, 10)

        await supabase
          .from('users')
          .update({ credits_remaining: creditsToSet, plan_type: plan })
          .eq('id', userId)

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const { userId } = subscription.metadata || {}

        if (!userId) break

        await supabase
          .from('users')
          .update({ plan_type: 'free', credits_remaining: 0 })
          .eq('id', userId)

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
