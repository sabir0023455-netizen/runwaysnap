import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-bold text-zinc-900">RunwaySnap</span>
        </div>
        <h1 className="mb-1 text-2xl font-bold text-zinc-900">Create account</h1>
        <p className="mb-6 text-sm text-zinc-500">Authentication coming soon. Connect Clerk to enable sign-up.</p>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          Auth is not yet configured. Add your Clerk keys to Vercel environment variables to enable this page.
        </div>
        <Link href="/" className="mt-6 block text-center text-sm text-zinc-500 hover:text-zinc-900">
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
