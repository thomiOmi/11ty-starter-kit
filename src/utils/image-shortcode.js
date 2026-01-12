import Image from '@11ty/eleventy-img'
import path from 'path'

export default async function imageShortcode(src, alt, sizes = '100vw', loading = 'lazy') {
  // 11ty-img requires full path for local files if not relative to CWD.
  // We assume src is passed relative to project root or is a full URL.

  const metadata = await Image(src, {
    widths: [640, 960, 1280],
    formats: ['avif', 'webp', 'jpeg'],
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
