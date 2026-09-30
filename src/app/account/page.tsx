import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'

async function getUserData(userId: string) {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return data
}

async function getGenerationCount(userId: string) {
  const { count } = await supabase
    .from('generations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
  return count || 0
}

export default async function AccountPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const [user, userData, generationCount] = await Promise.all([
    currentUser(),
    getUserData(userId),
    getGenerationCount(userId),
  ])

  const plan = userData?.plan_type ?? 'free'
  const credits = userData?.credits_remaining ?? 0

  const planLabels: Record<string, { name: string; color: string }> = {
    free: { name: 'Free', color: 'bg-zinc-100 text-zinc-700' },
    pay_per_generation: { name: 'Pay per use', color: 'bg-blue-100 text-blue-700' },
    starter: { name: 'Starter', color: 'bg-violet-100 text-violet-700' },
    pro: { name: 'Pro', color: 'bg-emerald-100 text-emerald-700' },
    agency: { name: 'Agency', color: 'bg-amber-100 text-amber-700' },
  }

  const planInfo = planLabels[plan] ?? planLabels.free

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Account</h1>
          <p className="mt-1 text-zinc-500">Manage your plan, billing, and profile.</p>
        </div>

        {/* Profile */}
        <div className="card mb-6">
          <h2 className="mb-4 font-semibold text-zinc-900">Profile</h2>
          <div className="flex items-center gap-4">
            {user?.imageUrl && (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="h-14 w-14 rounded-full object-cover border border-zinc-200"
              />
            )}
            <div>
              <p className="font-medium text-zinc-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-zinc-500">
                {user?.emailAddresses?.[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Plan & credits */}
        <div className="card mb-6">
          <h2 className="mb-4 font-semibold text-zinc-900">Subscription</h2>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-zinc-500">Current plan</p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-xl font-bold text-zinc-900">{planInfo.name}</p>
                <span className={`badge ${planInfo.color} text-xs px-2.5 py-1`}>Active</span>
              </div>
            </div>
            {plan === 'free' || plan === 'pay_per_generation' ? (
              <Link href="/pricing" className="btn-primary text-sm">
                Upgrade plan
              </Link>
            ) : (
              <form action="/api/stripe/portal" method="POST">
                <button type="submit" className="btn-secondary text-sm">
                  Manage billing
                </button>
              </form>
            )}
          </div>

          <div className="divider mb-6" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-zinc-500">Credits remaining</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{credits}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Total generations</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{generationCount}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Photos created</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{generationCount * 4}</p>
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

        {/* Buy more credits */}
        {credits < 5 && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-amber-900">Running low on credits</h3>
            <p className="mt-1 text-sm text-amber-700">
              You have {credits} credit{credits !== 1 ? 's' : ''} remaining.
              {' '}<Link href="/pricing" className="underline font-medium">Upgrade your plan</Link> to get more.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
