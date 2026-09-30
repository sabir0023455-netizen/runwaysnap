import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY not set')
    _stripe = new Stripe(key)
  }
  return _stripe
}

// Convenience alias — only safe to use at request time
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export const PLANS = {
  starter: {
    name: 'Starter',
    credits: 25,
    price: 1900,
    description: '25 generations per month',
  },
  pro: {
    name: 'Pro',
    credits: 80,
    price: 4900,
    description: '80 generations per month',
  },
  agency: {
    name: 'Agency',
    credits: 300,
    price: 14900,
    description: '300 generations per month',
  },
} as const

export type PlanKey = keyof typeof PLANS
