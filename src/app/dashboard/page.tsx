import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
            <p className="mt-1 text-zinc-500">Manage your generations and account.</p>
          </div>
          <Link href="/generate" className="btn-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New generation
          </Link>
        </div>

        {/* Auth notice */}
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-medium text-amber-800">Authentication not yet configured</p>
          <p className="mt-1 text-sm text-amber-700">
            Add your Clerk keys to Vercel environment variables to enable sign-in and access your dashboard.{' '}
            <Link href="/sign-up" className="underline font-medium">Sign up</Link> to get started.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="card">
            <p className="text-sm text-zinc-500">Credits remaining</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900">3</p>
            <p className="mt-1 text-xs text-zinc-400">Free plan. Sign in to manage.</p>
          </div>
          <div className="card">
            <p className="text-sm text-zinc-500">Current plan</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900">Free</p>
            <Link href="/pricing" className="mt-1 text-xs text-zinc-500 underline hover:text-zinc-700">
              Upgrade plan
            </Link>
          </div>
          <div className="card">
            <p className="text-sm text-zinc-500">Total generations</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900">0</p>
            <Link href="/generate" className="mt-1 text-xs text-zinc-500 underline hover:text-zinc-700">
              Create new
            </Link>
          </div>
        </div>

        {/* Empty state */}
        <div className="card flex flex-col items-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100">
            <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-zinc-900">No generations yet</h3>
          <p className="mt-1 text-sm text-zinc-500">
            Create your first AI model photo in seconds.
          </p>
          <Link href="/generate" className="btn-primary mt-6">
            Generate your first photo
          </Link>
        </div>
      </main>
    </div>
  )
}
