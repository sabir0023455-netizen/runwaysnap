import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Account</h1>
          <p className="mt-1 text-zinc-500">Manage your plan, billing, and profile.</p>
        </div>

        {/* Auth notice */}
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-medium text-amber-800">Authentication not yet configured</p>
          <p className="mt-1 text-sm text-amber-700">
            Add your Clerk keys to Vercel environment variables to enable sign-in and access account settings.{' '}
            <Link href="/sign-up" className="underline font-medium">Sign up</Link> to get started.
          </p>
        </div>

        {/* Profile placeholder */}
        <div className="card mb-6">
          <h2 className="mb-4 font-semibold text-zinc-900">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-zinc-200 flex items-center justify-center">
              <svg className="h-7 w-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-zinc-400">Sign in to view profile</p>
              <p className="text-sm text-zinc-400">—</p>
            </div>
          </div>
        </div>

        {/* Plan placeholder */}
        <div className="card mb-6">
          <h2 className="mb-4 font-semibold text-zinc-900">Subscription</h2>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-zinc-500">Current plan</p>
              <p className="mt-1 text-xl font-bold text-zinc-900">Free</p>
            </div>
            <Link href="/pricing" className="btn-primary text-sm">
              Upgrade plan
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-zinc-500">Credits remaining</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">3</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Total generations</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">0</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Photos created</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">0</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card flex items-center justify-between">
            <div>
              <p className="font-medium text-zinc-900">Generate photos</p>
              <p className="mt-0.5 text-sm text-zinc-500">Create new model photos</p>
            </div>
            <Link href="/generate" className="btn-primary text-sm">
              Generate
            </Link>
          </div>
          <div className="card flex items-center justify-between">
            <div>
              <p className="font-medium text-zinc-900">View history</p>
              <p className="mt-0.5 text-sm text-zinc-500">Browse past generations</p>
            </div>
            <Link href="/dashboard" className="btn-secondary text-sm">
              View all
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
