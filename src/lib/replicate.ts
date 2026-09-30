import Replicate from 'replicate'
import type { GenerationSettings } from './supabase'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

// Maps user settings to a stock model image URL for IDM-VTON
function getModelImageUrl(settings: GenerationSettings): string {
  const { modelType, skinTone, bodyType } = settings

  // Stock model images based on settings combinations
  // These are placeholder Unsplash model images categorized by type
  const modelImages: Record<string, string> = {
    'female_fair_slim': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=768&q=80',
    'female_fair_average': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=768&q=80',
    'female_fair_curvy': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=768&q=80',
    'female_fair_plus_size': 'https://images.unsplash.com/photo-1595956553066-fe24a8c33395?w=768&q=80',
    'female_medium_slim': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=768&q=80',
    'female_medium_average': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=768&q=80',
    'female_medium_curvy': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=768&q=80',
    'female_medium_plus_size': 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=768&q=80',
    'female_dark_slim': 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=768&q=80',
    'female_dark_average': 'https://images.unsplash.com/photo-1523264939339-c89f9dadde2e?w=768&q=80',
    'female_dark_curvy': 'https://images.unsplash.com/photo-1568585219054-b6b8d48ee8b2?w=768&q=80',
    'female_dark_plus_size': 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=768&q=80',
    'female_deep_slim': 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=768&q=80',
    'female_deep_average': 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=768&q=80',
    'female_deep_curvy': 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=768&q=80',
    'female_deep_plus_size': 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=768&q=80',
    'male_fair_slim': 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=768&q=80',
    'male_fair_average': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=768&q=80',
    'male_fair_curvy': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=768&q=80',
    'male_fair_plus_size': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=768&q=80',
    'male_medium_slim': 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=768&q=80',
    'male_medium_average': 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=768&q=80',
    'male_medium_curvy': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=768&q=80',
    'male_medium_plus_size': 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=768&q=80',
    'male_dark_slim': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=768&q=80',
    'male_dark_average': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=768&q=80',
    'male_dark_curvy': 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=768&q=80',
    'male_dark_plus_size': 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=768&q=80',
    'male_deep_slim': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=768&q=80',
    'male_deep_average': 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=768&q=80',
    'male_deep_curvy': 'https://images.unsplash.com/photo-1519460173447-e4f5f57acf6e?w=768&q=80',
    'male_deep_plus_size': 'https://images.unsplash.com/photo-1521341957697-b93449760f30?w=768&q=80',
    'gender_neutral_fair_slim': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=768&q=80',
    'gender_neutral_fair_average': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=768&q=80',
    'gender_neutral_medium_slim': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=768&q=80',
    'gender_neutral_medium_average': 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=768&q=80',
    'gender_neutral_dark_slim': 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=768&q=80',
    'gender_neutral_dark_average': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=768&q=80',
    'gender_neutral_deep_slim': 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=768&q=80',
    'gender_neutral_deep_average': 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=768&q=80',
  }

  const key = `${modelType}_${skinTone}_${bodyType}`
  return modelImages[key] || modelImages['female_medium_average']
}

export async function generateModelPhotos(
  garmentImageUrl: string,
  settings: GenerationSettings
): Promise<string[]> {
  const modelImageUrl = getModelImageUrl(settings)

  const outputs: string[] = []

  // Generate 4 images with slight prompt variations for variety
  const promptVariations = [
    'professional model wearing the garment, studio photography, high quality',
    'fashion model wearing the clothing, editorial style, professional lighting',
    'lifestyle photo of model wearing the outfit, natural lighting',
    'fashion photography, model wearing garment, clean background',
  ]

  // Run all 4 in parallel
  const promises = promptVariations.map(async (extraPrompt) => {
    const output = await replicate.run('yisol/idm-vton', {
      input: {
        crop: false,
        seed: Math.floor(Math.random() * 1000000),
        steps: 30,
        category: 'upper_body',
        force_dc: false,
        human_img: modelImageUrl,
        garm_img: garmentImageUrl,
        garment_des: extraPrompt,
        mask_only: false,
      },
    })

    if (Array.isArray(output)) {
      return output[0] as unknown as string
    }
    return output as unknown as string
  })

  const results = await Promise.allSettled(promises)

  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      outputs.push(result.value)
    }
  }

  if (outputs.length === 0) {
    throw new Error('Failed to generate any images. Please try again.')
  }

  return outputs
}
