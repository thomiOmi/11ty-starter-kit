import fs from 'fs'
import path from 'path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

// ESM version of the generator
export default async function generateOgImage(title, outputFilename) {
  // Use relative path resolution or process.cwd()
  const fontPath = path.resolve('src/assets/fonts/Inter-Regular.ttf')

  // Read font
  let fontData
  try {
    fontData = fs.readFileSync(fontPath)
  } catch (e) {
    console.error('Font file not found for OG generator:', fontPath)
    return null
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: title,
              style: {
                fontSize: '64px',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: 1.2,
                padding: '0 40px'
              }
            },
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: '#111827', // Tailwind gray-900
              backgroundImage: 'linear-gradient(to bottom right, #1f2937, #111827)'
            }
          },
          {
            type: 'div',
            props: {
              children: '11ty Starter Kit',
              style: {
                position: 'absolute',
                bottom: '40px',
                right: '50px',
                fontSize: '24px',
                color: '#9ca3af', // gray-400
                fontFamily: 'Inter'
              }
            }
          }
        ],
        style: {
          display: 'flex',
          width: 1200,
          height: 630
        }
      }
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 400,
          style: 'normal'
        }
      ]
    }
  )

  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  const outputPath = path.resolve(`./dist/og/${outputFilename}.png`)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, pngBuffer)

  return `/og/${outputFilename}.png`
}
