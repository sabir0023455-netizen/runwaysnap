import { v2 as cloudinary } from 'cloudinary'

let configured = false

function ensureConfigured() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    configured = true
  }
}

export async function uploadImage(
  file: Buffer | string,
  folder = 'runwaysnap'
): Promise<{ url: string; publicId: string }> {
  ensureConfigured()
  return new Promise((resolve, reject) => {
    if (typeof file === 'string') {
      cloudinary.uploader.upload(
        file,
        { folder, resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('Upload failed'))
          resolve({ url: result.secure_url, publicId: result.public_id })
        }
      )
    } else {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image', transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('Upload failed'))
          resolve({ url: result.secure_url, publicId: result.public_id })
        }
      )
      stream.end(file)
    }
  })
}

export async function uploadFromUrl(
  url: string,
  folder = 'runwaysnap/outputs'
): Promise<string> {
  ensureConfigured()
  const result = await cloudinary.uploader.upload(url, {
    folder,
    resource_type: 'image',
  })
  return result.secure_url
}

export { cloudinary }
