/* global events, runner */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chromium } from './analytics-qa/node_modules/playwright/index.mjs'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
const root = new URL('../', import.meta.url)
const fixture = `<!doctype html><html><meta charset="utf-8"><body><header><a href="/">Home</a></header><main><div data-measure-placement="article_tags"><a href="/tags/שבת">Tag</a></div><div data-measure-placement="article_next"><a id="next" href="/blog/b">Next</a></div><div data-measure-service style="height:30px">Services</div><a href="mailto:test@example.invalid">Email</a></main><script type="module">
import { startMeasurement } from '/src/analytics/browser.mjs';
window.events=[]; window.sdk={capture:(event,properties)=>events.push({event,properties}),get_session_id:()=> 'test-session',has_opted_out_capturing:()=>false};
window.runner=startMeasurement(window,[{path:'/blog/a',type:'article'},{path:'/blog/b',type:'article'},{path:'/tags/שבת',type:'tag_results'}],window.sdk);
window.runner.route(location.pathname);
document.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>{if(a.pathname.startsWith('/blog/')||a.pathname.startsWith('/tags/')){e.preventDefault();history.pushState({},'',a.pathname);runner.route(a.pathname)}}));
</script></body></html>`

test('real browser: keyboard navigation, Hebrew tags, same-tab confirmation, view dedupe and service visibility', async () => {
  const server = createServer(async (req, res) => {
    if (req.url.startsWith('/src/')) {
      try {
        res.setHeader('Content-Type', 'text/javascript')
        res.end(await readFile(new URL('.' + req.url, root)))
      } catch {
        res.statusCode = 404
        res.end()
      }
    } else {
      res.setHeader('Content-Type', 'text/html')
      res.end(fixture)
    }
  }).listen(0, '127.0.0.1')
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
  try {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 900 },
    ]) {
      const context = await browser.newContext({ viewport })
      const base = `http://127.0.0.1:${server.address().port}`
      let external = 0
      await context.route('**/*', (route) => {
        if (route.request().url().startsWith(base)) route.continue()
        else {
          external++
          route.abort()
        }
      })
      const page = await context.newPage()
      await page.goto(base + '/blog/a')
      await page.waitForFunction(() => window.runner)
      await page.locator('#next').focus()
      await page.keyboard.press('Enter')
      await page.waitForFunction(() => events.some((e) => e.event === 'navigation_confirmed'))
      assert.equal(
        await page.evaluate(() => events.filter((e) => e.event === 'navigation_confirmed').length),
        1
      )
      await page.evaluate(() => runner.route(location.pathname))
      assert.equal(
        await page.evaluate(() => events.filter((e) => e.event === '$pageview').length),
        2
      )
      await page.locator('a[href="/tags/שבת"]').click()
      assert.equal(
        await page.evaluate(
          () => events.find((e) => e.event === 'tag_selected').properties.tag_key
        ),
        'tags/שבת'
      )
      await page.goto(base + '/')
      await page.waitForFunction(() => window.runner)
      await page.bringToFront()
      await page.clock.install()
      for (let i = 0; i < 310; i++) {
        await page.clock.runFor(100)
        await page.evaluate(() => window.dispatchEvent(new Event('scroll')))
      }
      assert.equal(
        await page.evaluate(
          () =>
            events.filter(
              (e) => e.event === 'active_engagement_milestone' && e.properties.milestone === 30
            ).length
        ),
        1
      )
      await page.reload()
      await page.waitForFunction(() => window.runner)
      await page.clock.runFor(1000)
      await page.evaluate(() => {
        document.querySelector('[data-measure-service]').style.transform = 'translateY(5000px)'
        window.dispatchEvent(new Event('scroll'))
      })
      await page.clock.runFor(50)
      await page.evaluate(() => {
        document.querySelector('[data-measure-service]').style.transform = ''
        window.dispatchEvent(new Event('scroll'))
      })
      await page.clock.runFor(1100)
      assert.equal(
        await page.evaluate(
          () => events.filter((e) => e.event === 'service_section_reached').length
        ),
        0
      )
      await page.clock.runFor(1500)
      await page.waitForFunction(
        () => events.some((e) => e.event === 'service_section_reached'),
        {},
        { timeout: 6000 }
      )
      assert.equal(
        await page.evaluate(
          () => events.filter((e) => e.event === 'service_section_reached').length
        ),
        1
      )
      await page.evaluate(() => {
        window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }))
        window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }))
        runner.route('/')
      })
      assert.equal(
        await page.evaluate(() => events.filter((e) => e.event === '$pageview').length),
        1
      )
      assert.equal(external, 0)
      await context.close()
    }
  } finally {
    await browser.close()
    server.close()
  }
})
