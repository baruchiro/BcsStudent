import json from './json.mjs'
import rss from './rss.mjs'

async function postbuild() {
  await Promise.all([rss(), json()])
}

postbuild()
