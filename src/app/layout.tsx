import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'RunwaySnap — AI Model Photography for Fashion Brands',
  description:
    'Upload any clothing item and get professional AI-generated model photos in seconds. No expensive photoshoots needed.',
  keywords: ['AI fashion photography', 'virtual model', 'clothing photography', 'fashion AI'],
  openGraph: {
    title: 'RunwaySnap — AI Model Photography',
    description: 'Professional AI-generated model photos for your clothing line.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
