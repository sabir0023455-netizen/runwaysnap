'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = pathname === '/'
  const isActive = (path: string) => pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-black/90 backdrop-blur-xl border-b border-white/8 shadow-2xl'
        : isDark
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-sm border-b border-zinc-100'
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
            scrolled || isDark ? 'bg-rose-600' : 'bg-zinc-900'
          } group-hover:scale-110`}>
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className={`text-lg font-bold transition-colors ${
            scrolled || isDark ? 'text-white' : 'text-zinc-900'
          }`}>RunwaySnap</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 sm:flex">
          {[
            { href: '/#how-it-works', label: 'How it works' },
            { href: '/pricing', label: 'Pricing' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                scrolled || isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/8'
                  : isActive(href)
                    ? 'text-zinc-900 font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className={`hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full transition-all ${
              scrolled || isDark
                ? 'text-zinc-400 hover:text-white'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 active:scale-95"
          >
            Get started
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`sm:hidden p-2 rounded-lg transition-colors ${scrolled || isDark ? 'text-white' : 'text-zinc-900'}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-black/95 backdrop-blur-xl border-t border-white/8 px-4 py-4 space-y-1">
          <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/8 rounded-xl transition-colors">How it works</Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/8 rounded-xl transition-colors">Pricing</Link>
          <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/8 rounded-xl transition-colors">Sign in</Link>
        </div>
      )}
    </nav>
  )
}
