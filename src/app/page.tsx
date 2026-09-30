import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=420&q=85',
    alt: 'Fashion model in white outfit',
    cls: 'float-1',
    rotate: '-rotate-2',
    delay: 'anim-in-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=420&q=85',
    alt: 'Fashion model editorial',
    cls: 'float-2',
    rotate: 'rotate-1',
    delay: 'anim-in-4',
  },
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=420&q=85',
    alt: 'Fashion models',
    cls: 'float-3',
    rotate: '-rotate-1',
    delay: 'anim-in-5',
  },
]

const showcaseImages = [
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=85', label: 'Studio White' },
  { src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=500&q=85', label: 'Editorial' },
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=85', label: 'Lifestyle' },
  { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=85', label: 'Outdoor' },
  { src: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=500&q=85', label: 'Studio Gray' },
  { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=85', label: 'Fashion Week' },
]

const steps = [
  {
    number: '01',
    title: 'Upload your garment',
    description: 'Drop a flat lay, mannequin, or hanger photo. Any angle works.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Choose your model',
    description: 'Gender, skin tone, body type, pose, and background — all yours to pick.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'AI generates 4 photos',
    description: 'Our virtual try-on AI renders your garment on the model in seconds.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Download & publish',
    description: 'HD photos ready for your store, socials, and ads. Download all at once.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
]

const features = [
  { title: 'Diverse models', desc: 'Female, male, gender-neutral — all skin tones and body types represented.', icon: '👤' },
  { title: 'Multiple poses', desc: 'Standing, casual, editorial, lifestyle — whatever fits your brand voice.', icon: '🎨' },
  { title: 'Custom backgrounds', desc: 'Studio white, outdoor, lifestyle — professional in every setting.', icon: '🖼️' },
  { title: '4 photos per job', desc: 'Every generation delivers 4 unique shots from a single upload.', icon: '📸' },
  { title: 'HD quality', desc: 'High-resolution exports ready for your website, print, or paid ads.', icon: '⚡' },
  { title: 'Generation history', desc: 'All your past generations saved and accessible anytime.', icon: '🗂️' },
]

const plans = [
  {
    name: 'Pay per use',
    price: '$1',
    unit: 'per generation',
    description: 'Perfect for occasional use.',
    features: ['4 photos per generation', 'All model settings', 'HD downloads', 'No subscription'],
    cta: 'Get started',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$19',
    unit: '/ month',
    description: 'For small brands launching.',
    features: ['25 generations/month', 'All model settings', 'HD downloads', 'Generation history'],
    cta: 'Start free trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    unit: '/ month',
    description: 'For growing fashion brands.',
    features: ['80 generations/month', 'All model settings', 'HD downloads', 'Priority processing', 'Generation history'],
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Agency',
    price: '$149',
    unit: '/ month',
    description: 'For agencies, multiple clients.',
    features: ['300 generations/month', 'All model settings', 'HD downloads', 'Priority processing', 'Dedicated support'],
    cta: 'Start free trial',
    popular: false,
  },
]

const stats = [
  { value: '500+', label: 'Fashion brands' },
  { value: '50k+', label: 'Photos generated' },
  { value: '$2M+', label: 'Saved on photoshoots' },
  { value: '4.9★', label: 'Average rating' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-black noise pt-16">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-rose-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-40 h-[400px] w-[600px] rounded-full bg-purple-600/8 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center lg:flex-row lg:items-center lg:gap-16 lg:py-20">

            {/* Left — copy */}
            <div className="flex-1 max-w-2xl pt-16 pb-8 lg:pt-0 lg:pb-0 text-center lg:text-left">
              {/* Badge */}
              <div className="anim-in-1 mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-sm text-rose-400">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                AI-powered virtual try-on
              </div>

              {/* Headline */}
              <h1 className="anim-in-2 mb-6 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Your clothes.{' '}
                <br className="hidden sm:block" />
                <span className="text-gradient">Real models.</span>
                <br className="hidden sm:block" />
                {' '}In seconds.
              </h1>

              <p className="anim-in-3 mb-10 text-lg leading-relaxed text-zinc-400 sm:text-xl max-w-xl mx-auto lg:mx-0">
                Upload any clothing item and get 4 professional AI-generated model photos.
                No studio. No models. No waiting.
              </p>

              {/* CTAs */}
              <div className="anim-in-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/sign-up" className="btn-primary px-8 py-3.5 text-base pulse-glow">
                  Generate photos free
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <span className="text-sm text-zinc-500">3 free generations • No credit card</span>
              </div>

              {/* Social proof inline */}
              <div className="anim-in-5 mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[
                    'photo-1494790108377-be9c29b29330',
                    'photo-1500648767791-00dcc994a43e',
                    'photo-1438761681033-6461ffad8d80',
                    'photo-1472099645785-5658abf4ff4e',
                  ].map((id, i) => (
                    <img
                      key={i}
                      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=60&q=80`}
                      alt="User avatar"
                      className="h-9 w-9 rounded-full border-2 border-black object-cover"
                    />
                  ))}
                </div>
                <div className="text-sm text-zinc-400">
                  <span className="font-semibold text-white">500+</span> brands already generating
                </div>
              </div>
            </div>

            {/* Right — floating model images */}
            <div className="anim-right relative flex-1 max-w-lg w-full pb-12 lg:pb-0">
              <div className="relative mx-auto w-full max-w-md">
                {/* Main large image */}
                <div className={`float-1 relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/10`}>
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=85"
                    alt="Fashion model"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    Generated in 42s
                  </div>
                </div>

                {/* Secondary image — top right overlap */}
                <div className={`float-2 absolute -top-6 -right-4 w-36 sm:w-44 rounded-xl overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/10 rotate-3`}>
                  <img
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=85"
                    alt="Fashion model editorial"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>

                {/* Tertiary image — bottom left overlap */}
                <div className={`float-3 absolute -bottom-4 -left-4 w-32 sm:w-40 rounded-xl overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/10 -rotate-2`}>
                  <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=280&q=85"
                    alt="Fashion models"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>

                {/* Generation count badge */}
                <div className="float-4 absolute -left-8 top-1/3 hidden sm:flex items-center gap-2 rounded-xl bg-zinc-900/90 backdrop-blur-sm px-4 py-2.5 shadow-xl ring-1 ring-white/8">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600/20">
                    <svg className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Generations today</p>
                    <p className="text-sm font-bold text-white">1,247</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      <section className="relative bg-black border-y border-white/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-10 px-6 text-center ${i < stats.length - 1 ? 'border-r border-white/8' : ''} group`}
              >
                <p className="text-3xl sm:text-4xl font-black text-white group-hover:text-rose-400 transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHOTO SHOWCASE ───────────────────────────────────── */}
      <section className="bg-zinc-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-500">The output</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">
              Professional quality,<br />
              <span className="text-zinc-500">every single time.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
            {showcaseImages.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/sign-up" className="btn-primary px-8 py-3.5 text-base">
              Generate your first look free
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-black py-24 sm:py-32" id="how-it-works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-500">Simple process</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">
              From upload to publish<br />
              <span className="text-zinc-500">in under 60 seconds.</span>
            </h2>
          </div>

          {/* Connector line — desktop only, sits behind the icons */}
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 hidden lg:flex items-center px-[12.5%] pointer-events-none">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-500/25 to-transparent" />
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.number} className="group flex flex-col items-center text-center lg:items-start lg:text-left">
                  {/* Icon + number badge */}
                  <div className="relative mb-5 shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 ring-1 ring-white/10 text-rose-400 group-hover:bg-rose-600/10 group-hover:ring-rose-500/30 transition-all duration-300">
                      {step.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-black">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-500">Features</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Everything you need</h2>
            <p className="mt-4 text-lg text-zinc-500 max-w-xl mx-auto">
              Powerful customization to match your brand's exact aesthetic.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="feature-card glass rounded-2xl p-6 cursor-default"
              >
                <div className="mb-4 text-2xl">{f.icon}</div>
                <h3 className="mb-2 font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER TEASER ────────────────────────────── */}
      <section className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-zinc-900">
            <div className="grid lg:grid-cols-2">
              {/* Left copy */}
              <div className="flex flex-col justify-center p-10 lg:p-16">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-500">Why RunwaySnap</p>
                <h2 className="mb-6 text-4xl font-black text-white leading-tight">
                  Replace a $3,000 photoshoot with a $1 generation.
                </h2>
                <p className="mb-8 text-zinc-400 leading-relaxed">
                  Traditional model photography costs thousands. Booking studios, hiring models, photography, editing — it adds up fast. RunwaySnap cuts that to nothing.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    'No studio booking required',
                    'No model casting or scheduling',
                    'Results in under 60 seconds',
                    'Unlimited retries per credit',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-600/20 ring-1 ring-rose-500/30">
                        <svg className="h-3 w-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="btn-primary self-start px-8 py-3.5">
                  Try it free →
                </Link>
              </div>

              {/* Right visual — cost comparison */}
              <div className="flex flex-col justify-center gap-4 bg-black/40 p-10 lg:p-16">
                {[
                  { label: 'Traditional photoshoot', cost: '$3,000+', sub: 'studio + model + photographer + editing', bad: true },
                  { label: 'RunwaySnap generation', cost: '$1', sub: '4 HD photos in under 60 seconds', bad: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl p-6 ring-1 ${
                      item.bad
                        ? 'bg-red-950/30 ring-red-500/20'
                        : 'bg-rose-950/40 ring-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-sm font-medium ${item.bad ? 'text-red-400' : 'text-rose-300'}`}>{item.label}</p>
                        <p className="mt-0.5 text-xs text-zinc-500">{item.sub}</p>
                      </div>
                      <p className={`text-2xl font-black shrink-0 ${item.bad ? 'text-red-400 line-through opacity-60' : 'text-white'}`}>
                        {item.cost}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl bg-white/5 ring-1 ring-white/8 p-6 text-center">
                  <p className="text-zinc-400 text-sm">Average savings per brand</p>
                  <p className="mt-1 text-4xl font-black text-white">$2M+</p>
                  <p className="mt-0.5 text-xs text-zinc-500">across 500+ fashion brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-24 sm:py-32" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-500">Pricing</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Simple, honest pricing</h2>
            <p className="mt-4 text-zinc-500">Start free with 3 generations. No credit card needed.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? 'bg-rose-600 ring-1 ring-rose-500 shadow-2xl shadow-rose-600/30'
                    : 'glass hover:ring-white/15'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-600 shadow-lg">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className={`font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className={`text-4xl font-black ${plan.popular ? 'text-white' : 'text-white'}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? 'text-rose-200' : 'text-zinc-500'}`}>{plan.unit}</span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-rose-200' : 'text-zinc-500'}`}>{plan.description}</p>

                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <svg className={`h-4 w-4 shrink-0 ${plan.popular ? 'text-white' : 'text-rose-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={plan.popular ? 'text-rose-100' : 'text-zinc-400'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/sign-up"
                  className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-bold transition-all active:scale-95 ${
                    plan.popular
                      ? 'bg-white text-rose-600 hover:bg-rose-50 shadow-lg'
                      : 'bg-rose-600/10 text-rose-400 ring-1 ring-rose-500/30 hover:bg-rose-600/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-32 sm:py-40">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[800px] rounded-full bg-rose-600/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-rose-500">Ready to start?</p>
          <h2 className="mb-6 text-5xl font-black leading-tight text-white sm:text-6xl">
            Stop paying for<br />photoshoots.
          </h2>
          <p className="mb-10 text-xl text-zinc-500 max-w-xl mx-auto">
            Join 500+ fashion brands that have already switched to AI model photography. 3 free generations, no card needed.
          </p>
          <Link href="/sign-up" className="btn-primary px-10 py-4 text-lg pulse-glow">
            Generate photos free
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
