const https = require('https')
const fs = require('fs')
const path = require('path')

const files = [
  {
    url: 'https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js',
    dest: 'public/static/scripts/webcomponents-loader.js',
  },
  {
    url: 'https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js',
    dest: 'public/static/scripts/polyfill-support.js',
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js',
    dest: 'public/static/scripts/n8n-demo.bundled.js',
  },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    const file = fs.createWriteStream(dest)
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`))
          return
        }
        response.pipe(file)
        file.on('finish', () => {
          file.close(resolve)
        })
      })
      .on('error', (err) => {
        fs.unlink(dest, () => reject(err))
      })
  })
}

;(async () => {
  for (const { url, dest } of files) {
    try {
      console.log(`[n8n-demo] Downloading ${url} -> ${dest}`)
      await download(url, dest)
      console.log(`[n8n-demo] Downloaded ${dest}`)
    } catch (err) {
      console.error(`[n8n-demo] Failed to download ${url}:`, err)
      process.exit(1)
    }
  }
  console.log('[n8n-demo] All scripts downloaded successfully.')
})()
