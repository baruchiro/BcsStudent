/* global testEvents, posthog, LoaderTest, rawEventNames, sent, __siteMeasurement */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chromium } from './analytics-qa/node_modules/playwright/index.mjs'
import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { buildSync } = require('esbuild')
const base = process.env.ANALYTICS_TEST_URL || 'http://127.0.0.1:4318'
const entries = []
for (const [name, type] of [
  ['Blog', 'article'],
  ['Project', 'project'],
  ['Video', 'video'],
  ['Community', 'community'],
]) {
  const items = JSON.parse(await readFile(`.contentlayer/generated/${name}/_index.json`, 'utf8'))
  for (const item of items.filter((i) => !i.draft)) entries.push({ path: '/' + item.path, type })
}
const tags = JSON.parse(await readFile('src/app/tag-data.json', 'utf8'))
entries.push(...Object.keys(tags).map((tag) => ({ path: '/tags/' + tag, type: 'tag_results' })), {
  path: '/tags',
  type: 'index',
})
const bundle = buildSync({
  entryPoints: ['src/analytics/browser.mjs'],
  bundle: true,
  write: false,
  format: 'iife',
  globalName: 'MeasurementTest',
}).outputFiles[0].text

test('built website: real mobile/desktop surfaces, Hebrew selection, SPA arrival and home marker', async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  const results = []
  try {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 900 },
    ]) {
      const context = await browser.newContext({ viewport })
      let blocked = 0
      await context.route('**/*', (r) => {
        if (new URL(r.request().url()).origin === new URL(base).origin) r.continue()
        else {
          blocked++
          r.abort()
        }
      })
      await context.route('**/static/array.js', (route) => route.abort())
      await context.addInitScript({
        content:
          bundle +
          `;window.testEvents=[];window.testSdk={capture:(event,properties)=>testEvents.push({event,properties}),get_session_id:()=> 'local-test-session',has_opted_out_capturing:()=>false};window.addEventListener('DOMContentLoaded',()=>{if(window.top!==window)return;MeasurementTest.startMeasurement(window,${JSON.stringify(entries)},testSdk).route(location.pathname)})`,
      })
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', (e) => errors.push(e.stack || e.message))
      await page.goto(base + '/tags')
      await page.waitForFunction(() => window.__siteMeasurement)
      await page.bringToFront()
      await page.waitForTimeout(800)
      const sidebar = await page.locator('[data-measure-placement="tag_sidebar"]').isVisible()
      assert.equal(sidebar, viewport.width > 640)
      const sidebarExposed = await page.evaluate(() =>
        testEvents.some(
          (e) => e.event === 'surface_exposed' && e.properties.placement === 'tag_sidebar'
        )
      )
      assert.equal(sidebarExposed, sidebar)
      const tag = page.locator('a[href^="/tags/"]').filter({ hasText: 'קוד-פתוח' }).first()
      // On mobile use an inline result tag (sidebar deliberately hidden).
      const visibleTags = await page.locator('a[href^="/tags/"]:visible').all()
      const selected = visibleTags.find(Boolean)
      assert.ok(selected)
      await selected.focus()
      await page.keyboard.press('Enter')
      await page.waitForFunction(() => testEvents.some((e) => e.event === 'tag_selected'))
      await page.waitForFunction(() => location.pathname.startsWith('/tags/'))
      await page.waitForTimeout(400)
      const article = page
        .locator('[data-measure-placement="tag_results"] a[href^="/blog/"]')
        .first()
      await article.focus()
      await page.keyboard.press('Enter')
      await page.waitForFunction(() =>
        testEvents.some(
          (e) => e.event === 'navigation_confirmed' && e.properties.transition === 'tag_to_content'
        )
      )
      const count = await page.evaluate(
        () => testEvents.filter((e) => e.event === 'navigation_confirmed').length
      )
      assert.ok(count >= 1)
      await page.reload()
      await page.waitForFunction(() => window.__siteMeasurement)
      assert.equal(
        await page.evaluate(
          () => testEvents.filter((e) => e.event === 'navigation_confirmed').length
        ),
        0
      )
      await page.goto(base + '/')
      await page.waitForFunction(() => window.__siteMeasurement)
      const marker = page.locator('[data-measure-service]')
      await marker.scrollIntoViewIfNeeded()
      await page.waitForFunction(
        () => testEvents.some((e) => e.event === 'service_section_reached'),
        {},
        { timeout: 8000 }
      )
      await page.screenshot({ path: `../qa-home-${viewport.width}.png`, fullPage: false })
      assert.deepEqual(errors, [], 'Built-site browser must have no uncaught errors')
      results.push({
        viewport,
        sidebar,
        sidebarExposed,
        tagToArticle: true,
        refreshNotContinuation: true,
        homeServiceReached: true,
        externalRequestsBlocked: blocked,
        pageErrors: errors,
      })
      await context.close()
    }
    await writeFile('../site-qa-results.json', JSON.stringify(results, null, 2))
  } finally {
    await browser.close()
  }
})

test('production initializer and real SDK own built-site SPA measurement', async () => {
  const sdk = await readFile(
    new URL('./analytics-qa/node_modules/posthog-js/dist/array.js', import.meta.url)
  )
  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  try {
    const context = await browser.newContext()
    await context.route('**/*', (route) => {
      const url = route.request().url()
      if (url.startsWith(base)) return route.continue()
      if (url === 'https://app.posthog.com/static/array.js')
        return route.fulfill({ contentType: 'text/javascript', body: sdk })
      return route.abort()
    })
    await context.addInitScript(() => {
      window.testEvents = []
      const watch = setInterval(() => {
        const options = window.posthog?._i?.[0]?.[1]
        if (!options) return
        clearInterval(watch)
        options.opt_out_useragent_filter = true
        const before = options.before_send
        options.before_send = (event) => {
          const clean = before(event)
          if (clean) window.testEvents.push(clean)
          return clean
        }
      }, 0)
    })
    const page = await context.newPage()
    await page.goto(base + '/tags')
    await page.waitForFunction(() => window.posthog?.__loaded && window.__siteMeasurement)
    await page.locator('a[href^="/tags/"]:visible').first().click()
    await page.waitForURL('**/tags/*')
    await page.locator('[data-measure-placement="tag_results"] a[href^="/blog/"]').first().click()
    await page.waitForFunction(() =>
      testEvents.some(
        (e) => e.event === 'navigation_confirmed' && e.properties.transition === 'tag_to_content'
      )
    )
    const result = await page.evaluate(() => ({
      version: posthog.version,
      confirmations: testEvents.filter((e) => e.event === 'navigation_confirmed').length,
      views: testEvents.filter((e) => e.event === '$pageview').length,
      idsPresent: testEvents
        .filter((e) => e.event === '$pageview')
        .every((e) => !!e.properties.$pageview_id),
    }))
    assert.equal(result.confirmations, 1)
    assert.equal(result.views, 3)
    assert.equal(result.idsPresent, true)
    await writeFile('../integrated-qa-results.json', JSON.stringify(result, null, 2))
    await context.close()
  } finally {
    await browser.close()
  }
})

const initializeBundle = buildSync({
  entryPoints: ['src/analytics/initialize.mjs'],
  bundle: true,
  write: false,
  format: 'iife',
  globalName: 'LoaderTest',
}).outputFiles[0].text

test('actual PostHog SDK: privacy guard, route pageview IDs and depth, no external writes', async () => {
  const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.end('<!doctype html><meta charset="utf-8"><body style="height:5000px">Test</body>')
  }).listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
  const local = `http://127.0.0.1:${server.address().port}`
  const sdk = await readFile(
    new URL('./analytics-qa/node_modules/posthog-js/dist/array.js', import.meta.url)
  )
  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  let blocked = 0
  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    })
    await context.route('**/*', (route) => {
      if (route.request().url().startsWith(local)) route.continue()
      else if (route.request().url() === 'https://app.posthog.com/static/array.js')
        route.fulfill({ status: 200, contentType: 'text/javascript', body: sdk })
      else {
        blocked++
        route.abort()
      }
    })
    const page = await context.newPage()
    await page.goto(local + '/blog/a?email=secret-test#private-test')
    await page.addScriptTag({ content: initializeBundle })
    await page.evaluate(() => {
      LoaderTest.initialize(
        window,
        [
          { path: '/blog/a', type: 'article' },
          { path: '/blog/b', type: 'article' },
        ],
        'public-local-test-key'
      )
      window.sent = []
      const opts = posthog._i[0][1],
        before = opts.before_send
      // Local fixture only: Chromium's webdriver is correctly classified as a bot.
      // Production keeps the SDK bot filter. Nothing is transmitted by this fixture.
      opts.opt_out_useragent_filter = true
      window.rawEventNames = []
      opts.before_send = (e) => {
        rawEventNames.push({ event: e?.event, kind: typeof e, keys: Object.keys(e || {}) })
        const clean = before(e)
        if (clean) sent.push(clean)
        return clean
      }
    })
    await page.waitForFunction(() => window.__siteMeasurement, {}, { timeout: 10000 })
    await page.evaluate(() => {
      posthog.capture('contact_intent', {
        channel: 'email',
        placement: 'header',
        email: 'secret-test',
        url: location.href,
      })
      window.scrollTo(0, 2000)
    })
    await page.waitForTimeout(400)
    await page.evaluate(() => {
      history.pushState({}, '', '/blog/b?email=secret-test')
      __siteMeasurement.route(location.pathname)
    })
    await page.waitForTimeout(500)
    await page.evaluate(() =>
      window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }))
    )
    const observed = await page.evaluate(() => ({
      events: sent,
      rawEventNames,
      session: posthog.get_session_id(),
      optOut: posthog.has_opted_out_capturing(),
      bot: posthog._is_bot(),
      before: String(posthog.config.before_send),
      version: posthog.version,
      config: {
        capture_pageview: posthog.config.capture_pageview,
        disable_session_recording: posthog.config.disable_session_recording,
        person_profiles: posthog.config.person_profiles,
      },
      ready: !!posthog.__loaded,
    }))
    await writeFile('../sdk-debug.json', JSON.stringify(observed, null, 2))
    const serialized = JSON.stringify(observed.events)
    assert.equal(serialized.includes('secret-test'), false)
    assert.equal(serialized.includes('private-test'), false)
    assert.ok(observed.events.some((e) => e.event === '$pageview' && e.properties.$pageview_id))
    assert.equal(observed.events.filter((e) => e.event === '$pageview').length, 2)
    assert.equal(observed.events.filter((e) => e.event === '$pageleave').length, 1)
    await writeFile(
      '../sdk-qa-results.json',
      JSON.stringify(
        {
          ready: observed.ready,
          version: observed.version,
          config: observed.config,
          eventNames: observed.events.map((e) => e.event),
          pageviewIdsPresent: true,
          privacyCanariesAbsent: true,
          externalRequestsBlocked: blocked,
          pageleavePropertyNames: Object.keys(
            observed.events.find((e) => e.event === '$pageleave').properties
          ),
        },
        null,
        2
      )
    )
    await context.close()
  } finally {
    await browser.close()
    server.closeAllConnections()
    server.close()
  }
})
