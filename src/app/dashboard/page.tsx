import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'

async function getUserData(userId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return user
}

async function getRecentGenerations(userId: string) {
  const { data } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(6)
  return data || []
}

export default async function DashboardPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const [userData, generations] = await Promise.all([
    getUserData(userId),
    getRecentGenerations(userId),
  ])

  const credits = userData?.credits_remaining ?? 3
  const plan = userData?.plan_type ?? 'free'

  const planLabel: Record<string, string> = {
    free: 'Free',
    pay_per_generation: 'Pay per use',
    starter: 'Starter',
    pro: 'Pro',
    agency: 'Agency',
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
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

        {/* Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="card">
            <p className="text-sm text-zinc-500">Credits remaining</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900">{credits}</p>
            <p className="mt-1 text-xs text-zinc-400">
              {credits === 0
                ? 'Purchase more credits to continue'
                : `Each generation uses 1 credit`}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-zinc-500">Current plan</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900">{planLabel[plan] ?? plan}</p>
            <Link href="/pricing" className="mt-1 text-xs text-zinc-500 underline hover:text-zinc-700">
              Upgrade plan
            </Link>
          </div>
          <div className="card">
            <p className="text-sm text-zinc-500">Total generations</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900">{generations.length}</p>
            <Link href="/generate" className="mt-1 text-xs text-zinc-500 underline hover:text-zinc-700">
              Create new
            </Link>
          </div>
        </div>

        {/* Low credits warning */}
        {credits <= 1 && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-medium text-amber-800">
                  {credits === 0 ? 'You\'re out of credits' : 'Only 1 credit remaining'}
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  <Link href="/pricing" className="underline font-medium">Upgrade your plan</Link> or purchase additional credits to continue generating.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent generations */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900">Recent generations</h2>
            {generations.length > 0 && (
              <Link href="/generate" className="text-sm text-zinc-500 hover:text-zinc-900 underline">
                View all
              </Link>
            )}
          </div>

          {generations.length === 0 ? (
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
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {generations.map((gen) => (
                <div key={gen.id} className="card p-4">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {gen.output_image_urls.slice(0, 4).map((url: string, i: number) => (
                      <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-100">
                        <Image
                          src={url}
                          alt={`Generated model photo ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-400">
                      {new Date(gen.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </p>
                    <Link
                      href={`/generate?regenerate=${gen.id}`}
                      className="text-xs font-medium text-zinc-600 hover:text-zinc-900 underline"
                    >
                      Regenerate
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
