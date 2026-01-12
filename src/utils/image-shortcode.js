import Image from '@11ty/eleventy-img'
import path from 'path'

export async function imgShortcode(src, alt, sizes = '100vw', loading = 'lazy') {
  const metadata = await Image(src, {
    widths: [640, 960, 1280],
    formats: ['jpeg'], // Single format for <img>
    outputDir: './dist/img/',
    urlPath: '/img/',
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src)
      const name = path.basename(src, extension)
      return `${name}-${width}w.${format}`
    }
  })

  // We take the jpeg format (or the only format generated)
  const format = Object.keys(metadata)[0]
  const tag = `<img src="${metadata[format][0].url}" srcset="${metadata[format].map((p) => p.srcset).join(', ')}" alt="${alt}" sizes="${sizes}" loading="${loading}" decoding="async">`

  return tag
}

export async function pictureShortcode(src, alt, sizes = '100vw', loading = 'lazy') {
  const metadata = await Image(src, {
    widths: [640, 960, 1280],
    formats: ['avif', 'webp', 'jpeg'], // Multiple formats
    outputDir: './dist/img/',
    urlPath: '/img/',
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src)
      const name = path.basename(src, extension)
      return `${name}-${width}w.${format}`
    }
  })

  const imageAttributes = {
    alt,
    sizes,
    loading,
    decoding: 'async'
  }

  return Image.generateHTML(metadata, imageAttributes)
}

export default pictureShortcode // Default export for backward compatibility if needed, though we will switch to named in config
