import sharp from 'sharp'
import fs from 'node:fs'

export async function saveImage(image, name) {
  const buffer = Buffer.from(image, 'base64')

  // Resize and save the image
  sharp(buffer)
    .resize(400) // maintains aspect ratio
    .toFile(`images/${name}.png`, (err, info) => {
      if (err) {
        console.error('Error saving image:', err)
      } else {
        console.log('Image resized and saved successfully:', info)
      }
    })
}

export async function loadImage(name) {
  const path = `images/${name}.png`
  try {
    if (fs.existsSync(path)) {
      const buffer =  await sharp(`images/${name}.png`).resize(400).toBuffer()
      return buffer.toString('base64')
    }
  } catch (err) {
    return null
  }

}