'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) =>
    pathname === path ? 'text-zinc-900 font-medium' : 'text-zinc-500 hover:text-zinc-900'

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-zinc-900">RunwaySnap</span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <Link href="/pricing" className={`text-sm transition-colors ${isActive('/pricing')}`}>
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="btn-ghost text-sm">Sign in</Link>
          <Link href="/sign-up" className="btn-primary text-sm">Get started free</Link>
        </div>
      </div>
    </nav>
  )
}
