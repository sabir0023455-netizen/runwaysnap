'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const plans = [
  {
    key: 'pay_per_generation',
    name: 'Pay per use',
    price: '$1',
    unit: 'per generation',
    description: 'No commitment. Pay only when you need it.',
    credits: 1,
    features: [
      '4 photos per generation',
      'All model settings',
      'HD downloads',
      'No subscription',
      'Credits never expire',
    ],
    cta: 'Buy a generation',
    popular: false,
    priceAmount: 100,
  },
  {
    key: 'starter',
    name: 'Starter',
    price: '$19',
    unit: '/ month',
    description: 'For small brands launching their store.',
    credits: 25,
    features: [
      '25 generations/month',
      'All model settings',
      'HD downloads',
      'Generation history',
      'Email support',
    ],
    cta: 'Get Starter',
    popular: false,
    priceAmount: 1900,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$49',
    unit: '/ month',
    description: 'For growing brands with regular content needs.',
    credits: 80,
    features: [
      '80 generations/month',
      'All model settings',
      'HD downloads',
      'Generation history',
      'Priority processing',
      'Priority support',
    ],
    cta: 'Get Pro',
    popular: true,
    priceAmount: 4900,
  },
  {
    key: 'agency',
    name: 'Agency',
    price: '$149',
    unit: '/ month',
    description: 'For agencies managing multiple fashion clients.',
    credits: 300,
    features: [
      '300 generations/month',
      'All model settings',
      'HD downloads',
      'Generation history',
      'Priority processing',
      'Dedicated account manager',
      'Custom invoicing',
    ],
    cta: 'Get Agency',
    popular: false,
    priceAmount: 14900,
  },
]

const faqs = [
  {
    q: 'What is a generation?',
    a: 'One generation = 4 AI-generated model photos of your garment. Each generation uses 1 credit.',
  },
  {
    q: 'How realistic are the generated photos?',
    a: 'We use IDM-VTON, a state-of-the-art virtual try-on model that produces highly realistic results. Quality depends on the clarity of your garment photo.',
  },
  {
    q: 'Can I use the photos commercially?',
    a: 'Yes. All generated photos are yours to use however you like, including on your website, social media, and advertising.',
  },
  {
    q: 'What happens if I run out of credits mid-month?',
    a: 'You can top up with pay-per-generation credits at any time, or upgrade your plan.',
  },
  {
    q: 'Do unused credits roll over?',
    a: 'Monthly plan credits reset each billing period. Pay-per-generation credits never expire.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, you can cancel your subscription at any time. You\'ll keep your credits until the end of the billing period.',
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = (_planKey: string) => {
    router.push('/sign-up')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-zinc-500">
              Start free with 3 generations. No credit card required.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan) => (
                <div
                  key={plan.key}
                  className={`relative flex flex-col rounded-2xl p-6 ${
                    plan.popular
                      ? 'border-2 border-zinc-900 bg-zinc-900 text-white shadow-xl'
                      : 'border border-zinc-200 bg-white'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-zinc-900 ring-2 ring-zinc-900">
                        Most popular
                      </span>
                    </div>
                  )}

                  <div className="flex-1">
                    <h2 className={`font-semibold ${plan.popular ? 'text-white' : 'text-zinc-900'}`}>
                      {plan.name}
                    </h2>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-zinc-900'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm ${plan.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {plan.unit}
                      </span>
                    </div>
                    <p className={`mt-2 text-sm ${plan.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {plan.description}
                    </p>
                    <p className={`mt-1 text-sm font-medium ${plan.popular ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {plan.credits} credit{plan.credits !== 1 ? 's' : ''} included
                    </p>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm">
                          <svg
                            className={`h-4 w-4 flex-shrink-0 ${plan.popular ? 'text-zinc-300' : 'text-zinc-900'}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={plan.popular ? 'text-zinc-300' : 'text-zinc-600'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleCheckout(plan.key)}
                    disabled={loading === plan.key}
                    className={`mt-8 w-full rounded-xl px-4 py-3 text-sm font-medium transition-all active:scale-95 disabled:opacity-70 ${
                      plan.popular
                        ? 'bg-white text-zinc-900 hover:bg-zinc-100'
                        : 'bg-zinc-900 text-white hover:bg-zinc-700'
                    }`}
                  >
                    {loading === plan.key ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Redirecting...
                      </span>
                    ) : (
                      plan.cta
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free tier callout */}
        <section className="border-y border-zinc-100 bg-zinc-50 py-12">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-zinc-900">Not ready to commit?</h2>
            <p className="mt-2 text-zinc-500">
              Sign up and get 3 free generations to try RunwaySnap risk-free. No credit card needed.
            </p>
            <a href="/sign-up" className="btn-primary mt-6 inline-flex">
              Try for free
            </a>
          </div>
        </section>

        {/* Feature comparison */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-10 text-center text-3xl font-bold text-zinc-900">Compare plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="py-3 text-left font-medium text-zinc-500">Feature</th>
                    {plans.map((p) => (
                      <th key={p.key} className="py-3 text-center font-medium text-zinc-900">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    ['Monthly credits', ['1', '25', '80', '300']],
                    ['Photos per generation', ['4', '4', '4', '4']],
                    ['HD downloads', ['✓', '✓', '✓', '✓']],
                    ['All model settings', ['✓', '✓', '✓', '✓']],
                    ['Generation history', ['✓', '✓', '✓', '✓']],
                    ['Priority processing', ['✗', '✗', '✓', '✓']],
                    ['Priority support', ['✗', '✗', '✓', '✓']],
                    ['Dedicated manager', ['✗', '✗', '✗', '✓']],
                  ].map(([feature, values]) => (
                    <tr key={feature as string}>
                      <td className="py-3 font-medium text-zinc-700">{feature}</td>
                      {(values as string[]).map((v, i) => (
                        <td key={i} className="py-3 text-center text-zinc-500">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-zinc-100 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-center text-3xl font-bold text-zinc-900">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-zinc-200 p-6">
                  <h3 className="font-semibold text-zinc-900">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
