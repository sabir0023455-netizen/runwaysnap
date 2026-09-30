export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabase, GenerationSettings } from '@/lib/supabase'
import { generateModelPhotos } from '@/lib/replicate'
import { uploadFromUrl } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { garmentUrl, settings } = body as {
      garmentUrl: string
      settings: GenerationSettings
    }

    if (!garmentUrl) {
      return NextResponse.json({ error: 'Garment URL is required' }, { status: 400 })
    }

    // Check/create user and verify credits
    let { data: user } = await supabase
      .from('users')
      .select('id, credits_remaining')
      .eq('id', userId)
      .single()

    if (!user) {
      // First time user - create with 3 free credits
      const { data: newUser } = await supabase
        .from('users')
        .insert({ id: userId, email: '', credits_remaining: 3, plan_type: 'free' })
        .select()
        .single()
      user = newUser
    }

    if (!user || user.credits_remaining < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits. Please upgrade your plan.' },
        { status: 402 }
      )
    }

    // Deduct credit immediately to prevent double-spend
    const { error: deductError } = await supabase
      .from('users')
      .update({ credits_remaining: user.credits_remaining - 1 })
      .eq('id', userId)
      .eq('credits_remaining', user.credits_remaining) // optimistic lock

    if (deductError) {
      return NextResponse.json({ error: 'Failed to deduct credit. Please try again.' }, { status: 500 })
    }

    // Generate photos via Replicate
    let outputUrls: string[]
    try {
      outputUrls = await generateModelPhotos(garmentUrl, settings)
    } catch (genError) {
      // Refund credit on generation failure
      await supabase
        .from('users')
        .update({ credits_remaining: user.credits_remaining })
        .eq('id', userId)
      throw genError
    }

    // Upload outputs to Cloudinary for permanent storage
    const persistedUrls = await Promise.all(
      outputUrls.map((url) =>
        uploadFromUrl(url, `runwaysnap/outputs/${userId}`).catch(() => url)
      )
    )

    // Save generation record
    const { data: generation } = await supabase
      .from('generations')
      .insert({
        user_id: userId,
        input_image_url: garmentUrl,
        output_image_urls: persistedUrls,
        settings,
      })
      .select()
      .single()

    return NextResponse.json({
      outputUrls: persistedUrls,
      generationId: generation?.id,
      creditsRemaining: user.credits_remaining - 1,
    })
  } catch (error) {
    console.error('Generation error:', error)
    const message =
      error instanceof Error ? error.message : 'Generation failed. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
