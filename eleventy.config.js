import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import esbuild from 'esbuild'
import crypto from 'crypto'
import imageShortcode from './src/utils/image-shortcode.js'
import generateOgImage from './src/utils/og-generator.js'

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)

  // OG Image Shortcode
  eleventyConfig.addAsyncShortcode('ogImage', async function (title, slug) {
    if (!title) {
      console.warn('ogImage: No title provided')
      return ''
    }
    const filename = slug === '/' ? 'home' : slug ? slug.replace(/^\/|\/$/g, '').replace(/\//g, '-') : 'home'
    const url = await generateOgImage(title, filename)
    return url
  })

  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy({ public: '/' })

  // --- Environment & Hashing Helper ---
  const isProd = process.env.NODE_ENV === 'production'

  // Calculate hashes based on source content (simpler for 11ty pipeline integration)
  // This runs once at startup.
  const getHash = (filepath) => {
    try {
      const content = fs.readFileSync(filepath, 'utf8')
      return crypto.createHash('md5').update(content).digest('hex').slice(0, 8)
    } catch (e) {
      return 'latest'
    }
  }

  const cssHash = isProd ? getHash('./src/css/style.css') : 'dev'
  const jsHash = isProd ? getHash('./src/js/app.js') : 'dev'

  // Expose hashes to templates
  eleventyConfig.addGlobalData('hashes', {
    css: cssHash,
    js: jsHash
  })

  // --- CSS Extension ---
  // Processes *.css files. We'll filter to only process style.css
  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',

    // compile: called once per file content
    compile: async function (inputContent, inputPath) {
      if (path.basename(inputPath) !== 'style.css') {
        return // Skip other CSS files if any
      }

      // Process with PostCSS
      const result = await postcss([tailwindcss(), autoprefixer()]).process(inputContent, { from: inputPath })

      let cssCode = result.css

      // Minify if production
      if (isProd) {
        const minified = await esbuild.transform(cssCode, {
          loader: 'css',
          minify: true
        })
        cssCode = minified.code
      }

      // Return render function
      return async () => {
        return cssCode
      }
    },

    // getData: called to get data/permalink
    getData: async function (inputPath) {
      if (path.basename(inputPath) !== 'style.css') return {}

      return {
        permalink: isProd ? `css/style.${cssHash}.css` : `css/style.css`
      }
    }
  })

  // --- JS Extension ---
  // Processes *.js files. We'll filter to only process app.js
  eleventyConfig.addExtension('js', {
    outputFileExtension: 'js',

    compile: async function (inputContent, inputPath) {
      if (path.basename(inputPath) !== 'app.js') {
        return
      }

      // Bundle with Esbuild
      // We use the inputPath directly as entry point
      const result = await esbuild.build({
        entryPoints: [inputPath],
        bundle: true,
        minify: isProd,
        sourcemap: !isProd, // true in dev, false in prod
        write: false
        // We need to return the code, so we use write: false
      })

      // Assuming one output file since we have one entry point
      const code = result.outputFiles[0].text

      return async () => {
        return code
      }
    },

    getData: async function (inputPath) {
      if (path.basename(inputPath) !== 'app.js') return {}

      return {
        permalink: isProd ? `js/app.${jsHash}.js` : `js/app.js`
      }
    }
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'components',
      layouts: 'layouts'
    },
    templateFormats: ['njk', 'md', 'html', 'css', 'js'], // Add css and js to formats
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
