import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { plan?: string }
}) {
  const plan = searchParams.plan

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-zinc-900">Payment successful!</h1>
        <p className="mb-8 text-zinc-500">
          {plan
            ? `Your ${plan} plan is now active. Credits have been added to your account.`
            : 'Your credits have been added to your account.'}
        </p>
        <div className="flex gap-4">
          <Link href="/generate" className="btn-primary">
            Start generating
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            View dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
