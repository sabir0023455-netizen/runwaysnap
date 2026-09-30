'use client'

import { useState, useRef, useCallback, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import type { GenerationSettings } from '@/lib/supabase'

type Step = 'upload' | 'settings' | 'generating' | 'results'

const OPTION_CLASSES = {
  base: 'cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition-all',
  active: 'border-zinc-900 bg-zinc-900 text-white',
  inactive: 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400',
}

function OptionButton({
  value,
  current,
  onClick,
  children,
}: {
  value: string
  current: string
  onClick: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`${OPTION_CLASSES.base} ${value === current ? OPTION_CLASSES.active : OPTION_CLASSES.inactive}`}
    >
      {children}
    </button>
  )
}

const DEFAULT_SETTINGS: GenerationSettings = {
  modelType: 'female',
  skinTone: 'medium',
  bodyType: 'average',
  poseStyle: 'standing',
  background: 'studio_white',
}

function GenerateContent() {
  const [step, setStep] = useState<Step>('upload')
  const [garmentFile, setGarmentFile] = useState<File | null>(null)
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null)
  const [settings, setSettings] = useState<GenerationSettings>(DEFAULT_SETTINGS)
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [credits, setCredits] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Fetch user credits
  useEffect(() => {
    fetch('/api/user')
      .then((r) => r.json())
      .then((d) => setCredits(d.credits_remaining ?? null))
      .catch(() => {})
  }, [])

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.')
      return
    }
    setError(null)
    setGarmentFile(file)
    setGarmentPreview(URL.createObjectURL(file))
    setStep('settings')
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const set = <K extends keyof GenerationSettings>(key: K) =>
    (value: GenerationSettings[K]) =>
      setSettings((prev) => ({ ...prev, [key]: value }))

  const generate = async () => {
    if (!garmentFile) return
    setError(null)
    setStep('generating')
    setProgress(0)

    // Simulate progress animation
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return p + Math.random() * 8
      })
    }, 2000)

    try {
      // 1. Upload garment image
      setUploading(true)
      const formData = new FormData()
      formData.append('file', garmentFile)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) {
        const err = await uploadRes.json()
        throw new Error(err.error || 'Upload failed')
      }
      const { url: garmentUrl } = await uploadRes.json()
      setUploading(false)

      // 2. Generate
      const genRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ garmentUrl, settings }),
      })
      if (!genRes.ok) {
        const err = await genRes.json()
        throw new Error(err.error || 'Generation failed')
      }
      const { outputUrls } = await genRes.json()

      clearInterval(progressInterval)
      setProgress(100)
      setResults(outputUrls)
      setCredits((c) => (c !== null ? c - 1 : null))
      setTimeout(() => setStep('results'), 500)
    } catch (err: unknown) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStep('settings')
    }
  }

  const downloadImage = async (url: string, index: number) => {
    const res = await fetch(url)
    const blob = await res.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `runwaysnap-${Date.now()}-${index + 1}.jpg`
    link.click()
  }

  const downloadAll = async () => {
    for (let i = 0; i < results.length; i++) {
      await downloadImage(results[i], i)
    }
  }

  const reset = () => {
    setStep('upload')
    setGarmentFile(null)
    setGarmentPreview(null)
    setResults([])
    setError(null)
    setProgress(0)
    setSettings(DEFAULT_SETTINGS)
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
            <Link href="/dashboard" className="hover:text-zinc-900">Dashboard</Link>
            <span>/</span>
            <span className="text-zinc-900">Generate</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-zinc-900">Generate Photos</h1>
            {credits !== null && (
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium text-zinc-700">{credits} credit{credits !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>

        {credits === 0 && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-medium text-red-800">No credits remaining</p>
            <p className="mt-1 text-sm text-red-700">
              <Link href="/pricing" className="underline font-medium">Purchase credits</Link> to continue generating photos.
            </p>
          </div>
        )}

        {/* Step: Upload */}
        {(step === 'upload' || step === 'settings') && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload panel */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-zinc-900">
                {step === 'settings' && garmentPreview ? 'Garment uploaded' : '1. Upload garment photo'}
              </h2>

              {garmentPreview ? (
                <div className="relative">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                    <Image src={garmentPreview} alt="Garment" fill className="object-contain" />
                  </div>
                  <button
                    onClick={() => {
                      setGarmentFile(null)
                      setGarmentPreview(null)
                      setStep('upload')
                    }}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white transition-colors"
                  >
                    <svg className="h-4 w-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileRef.current?.click()}
                  className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-6 text-center transition-all hover:border-zinc-400 hover:bg-zinc-50"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100">
                    <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <p className="font-medium text-zinc-700">Drop your garment photo here</p>
                  <p className="mt-1 text-sm text-zinc-400">or click to browse</p>
                  <p className="mt-3 text-xs text-zinc-400">PNG, JPG, WEBP up to 10MB</p>
                  <p className="mt-1 text-xs text-zinc-400">Flat lay, mannequin, or hanger photos work best</p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>

            {/* Settings panel */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-zinc-900">2. Configure your model</h2>
              <div className="space-y-5">
                {/* Model type */}
                <div>
                  <label className="label">Model type</label>
                  <div className="flex flex-wrap gap-2">
                    {[['female', 'Female'], ['male', 'Male'], ['gender_neutral', 'Gender neutral']].map(([v, l]) => (
                      <OptionButton key={v} value={v} current={settings.modelType} onClick={set('modelType') as (v: string) => void}>{l}</OptionButton>
                    ))}
                  </div>
                </div>

                {/* Skin tone */}
                <div>
                  <label className="label">Skin tone</label>
                  <div className="flex flex-wrap gap-2">
                    {[['fair', 'Fair'], ['medium', 'Medium'], ['dark', 'Dark'], ['deep', 'Deep']].map(([v, l]) => (
                      <OptionButton key={v} value={v} current={settings.skinTone} onClick={set('skinTone') as (v: string) => void}>{l}</OptionButton>
                    ))}
                  </div>
                </div>

                {/* Body type */}
                <div>
                  <label className="label">Body type</label>
                  <div className="flex flex-wrap gap-2">
                    {[['slim', 'Slim'], ['average', 'Average'], ['curvy', 'Curvy'], ['plus_size', 'Plus size']].map(([v, l]) => (
                      <OptionButton key={v} value={v} current={settings.bodyType} onClick={set('bodyType') as (v: string) => void}>{l}</OptionButton>
                    ))}
                  </div>
                </div>

                {/* Pose */}
                <div>
                  <label className="label">Pose style</label>
                  <div className="flex flex-wrap gap-2">
                    {[['standing', 'Standing'], ['casual', 'Casual'], ['editorial', 'Editorial'], ['lifestyle', 'Lifestyle']].map(([v, l]) => (
                      <OptionButton key={v} value={v} current={settings.poseStyle} onClick={set('poseStyle') as (v: string) => void}>{l}</OptionButton>
                    ))}
                  </div>
                </div>

                {/* Background */}
                <div>
                  <label className="label">Background</label>
                  <div className="flex flex-wrap gap-2">
                    {[['studio_white', 'Studio white'], ['studio_gray', 'Studio gray'], ['outdoor', 'Outdoor'], ['lifestyle', 'Lifestyle']].map(([v, l]) => (
                      <OptionButton key={v} value={v} current={settings.background} onClick={set('background') as (v: string) => void}>{l}</OptionButton>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  onClick={generate}
                  disabled={!garmentFile || credits === 0}
                  className="btn-primary w-full py-3 text-base disabled:opacity-50"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  Generate 4 photos — 1 credit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Generating */}
        {step === 'generating' && (
          <div className="card flex flex-col items-center py-20 text-center">
            <div className="mb-6 relative">
              <div className="h-20 w-20 rounded-full border-4 border-zinc-100 border-t-zinc-900 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-900">Generating your photos</h2>
            <p className="mt-2 text-zinc-500">
              {uploading ? 'Uploading garment...' : 'AI is placing your garment on the model...'}
            </p>
            <p className="mt-1 text-sm text-zinc-400">This takes about 30–60 seconds</p>

            <div className="mt-8 w-full max-w-sm">
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-200">
                <div
                  className="h-2 rounded-full bg-zinc-900 transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Step: Results */}
        {step === 'results' && results.length > 0 && (
          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-900">Your photos are ready!</h2>
                <p className="mt-1 text-zinc-500">{results.length} photos generated</p>
              </div>
              <div className="flex gap-3">
                <button onClick={reset} className="btn-secondary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  New generation
                </button>
                <button onClick={downloadAll} className="btn-primary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download all
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {results.map((url, i) => (
                <div key={i} className="group relative">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                    <Image
                      src={url}
                      alt={`Generated photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3">
                      <button
                        onClick={() => downloadImage(url, i)}
                        className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-900 hover:bg-white transition-colors"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                  <p className="mt-1.5 text-center text-xs text-zinc-400">Photo {i + 1}</p>
                </div>
              ))}
            </div>

            {/* Settings summary */}
            <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="mb-3 text-sm font-semibold text-zinc-900">Generation settings</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {Object.entries(settings).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                    <p className="mt-0.5 text-sm font-medium text-zinc-700 capitalize">{String(value).replace(/_/g, ' ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50">
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin" />
        </div>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  )
}
