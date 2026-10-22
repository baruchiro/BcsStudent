import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ActiveClock, createRegistry, Navigation, sanitizeEvent } from '../src/analytics/core.mjs'

test('active home time clips at idle and emits each threshold once', () => {
  const c = new ActiveClock(0)
  const seen = []
  for (let n = 1000; n <= 90000; n += 1000) seen.push(...c.tick(n, true))
  assert.deepEqual(seen, [30, 60])
  assert.equal(c.total, 60000)
})

const registry = () =>
  createRegistry([
    { path: '/blog/a', type: 'article' },
    { path: '/blog/b', type: 'article' },
    { path: '/tags/שבת', type: 'tag_results' },
  ])
test('navigation confirms only an ordered distinct same-tab click and matching arrival', () => {
  const n = new Navigation(registry())
  assert.equal(n.arrive('/blog/a', 0), null)
  n.select('/blog/b', 'article_next', 10, false)
  assert.equal(n.arrive('/blog/b', 20), null)
  n.select('/blog/a', 'article_prev', 30, true)
  assert.deepEqual(n.arrive('/blog/a', 40), {
    source_key: 'blog/b',
    target_key: 'blog/a',
    placement: 'article_prev',
    transition: 'article_continuation',
  })
  n.select('/blog/a', 'article_body', 50, true)
  assert.equal(n.arrive('/blog/a', 60), null)
  n.select('/', 'header', 70, true)
  assert.equal(n.arrive('/', 70), null) // ties ambiguous
})
test('Hebrew encoded keys normalize; unknown/query/hash never become keys', () => {
  const r = registry()
  assert.equal(r.page('/tags/%D7%A9%D7%91%D7%AA').key, 'tags/שבת')
  assert.equal(r.page('/blog/a?email=private').key, 'unknown')
  assert.equal(r.page('/blog/page/2').type, 'unknown')
  assert.equal(r.page('/blog/secret#name').key, 'unknown')
})
test('SDK defaults and injected DOM/PII are stripped while numeric pageleave survives', () => {
  const event = sanitizeEvent(
    {
      event: '$pageleave',
      properties: {
        $current_url: 'https://www.baruchiro.com/blog/a?email=private#secret',
        $pathname: '/blog/a',
        $prev_pageview_pathname: '/blog/a',
        $prev_pageview_max_content_percentage: 0.75,
        $prev_pageview_duration: 12,
        $elements: [{ text: 'private' }],
        $referrer: 'https://google.com?q=private',
        $set: { email: 'private' },
        email: 'private',
        $session_id: 'sdk-session',
      },
    },
    registry()
  )
  assert.equal(event.properties.$current_url, 'https://www.baruchiro.com/blog/a')
  assert.equal(event.properties.$prev_pageview_max_content_percentage, 0.75)
  assert.equal(event.properties.email, undefined)
  assert.equal(event.properties.$elements, undefined)
  assert.equal(event.properties.$set, undefined)
  assert.equal(event.properties.$referrer, undefined)
  assert.equal(sanitizeEvent({event:'inquiry_received',properties:{}}, registry()), null)
  const top = sanitizeEvent({event:'contact_intent', $set: {email:'private'}, properties:{channel:'email',placement:'header'}}, registry())
  assert.equal(top.$set,undefined)
  assert.equal(sanitizeEvent({event:'$pageview',properties:{$prev_pageview_id:'01a163cf-c065-79e7-86f0-30f6125c475d'}}, registry()).properties.$prev_pageview_id,'01a163cf-c065-79e7-86f0-30f6125c475d')
})

test('hidden, blur and sleep never backfill; resumed activity accumulates only eligible intervals', () => {
  const c = new ActiveClock(0)
  for (let t = 1000; t <= 10000; t += 1000) c.tick(t, true)
  c.tick(11000, false)
  c.tick(12000, false)
  c.tick(120000, true)
  assert.equal(c.total, 10000)
  c.interact(120000)
  for (let t = 121000; t <= 140000; t += 1000) c.tick(t, true)
  assert.equal(c.total, 30000)
  assert.deepEqual(c.tick(141000, true), [])
})
test('expired, mismatched and cross-tab pending navigation cannot confirm', () => {
  const n = new Navigation(registry())
  n.arrive('/blog/a', 0)
  n.select('/blog/b', 'article_body', 1, true)
  assert.equal(n.arrive('/blog/b', 40000), null)
  n.select('/blog/a', 'article_body', 41000, true)
  assert.equal(n.arrive('/', 42000), null)
  const fresh = new Navigation(registry())
  assert.equal(fresh.arrive('/blog/b', 43000), null)
})
test('loader queues a single SDK even before async load/StrictMode remount', async () => {
  const { initialize } = await import('../src/analytics/initialize.mjs')
  const scripts = []
  const win = {
    document: { createElement: () => ({}), head: { appendChild: (s) => scripts.push(s) } },
  }
  initialize(win, [], 'public-test-key')
  initialize(win, [], 'public-test-key')
  assert.equal(scripts.length, 1)
  const options = win.posthog._i[0][1]
  assert.equal(options.capture_pageview, false)
  assert.equal(options.disable_session_recording, true)
  assert.equal(options.person_profiles, 'never')
  assert.equal(options.ip, false)
  assert.equal(options.opt_out_capturing_by_default, undefined)
})
test('server outcomes atomically deduplicate and aggregate, with retry after failure', async () => {
 const { createOutcomeReceiver }=await import('../src/analytics/server/outcomes.mjs')
 const counters=[], processed=new Set(); let fail=true
 const receive=createOutcomeReceiver({verify:async proof=>proof,commitVerifiedOutcome:async (proof,value)=>{
   if(processed.has(proof.id))return false
   if(fail){fail=false;throw new Error('transaction failed')}
   counters.push(value);processed.add(proof.id);return true
 }})
 assert.equal(await receive({accepted:false}),false)
 const proof={accepted:true,id:'technical-id',outcome:'inquiry_received',source:'inbox',email:'private'}
 await assert.rejects(receive(proof),/transaction failed/)
 assert.equal(await receive(proof),true)
 assert.equal(await receive(proof),false)
 assert.deepEqual(counters,[{outcome:'inquiry_received',source:'inbox'}])
 assert.equal(await receive({accepted:true,outcome:'click',source:'browser'}),false)
})

test('privacy boundary rejects canaries in SDK allowlisted and envelope fields',()=>{
 const clean=sanitizeEvent({event:'$pageview',uuid:'private@example.com',timestamp:'private@example.com',properties:{distinct_id:'private@example.com',$session_id:'private@example.com',$browser:'private@example.com',$os:'private@example.com',$lib:'private@example.com'}},registry())
 assert.equal(JSON.stringify(clean).includes('private@example.com'),false)
})

test('Cal callbacks have stable cleanup and never register booking payload callbacks', async () => {
  const { wireBooking } = await import('../src/analytics/booking.mjs')
  const calls = [],
    events = []
  const cleanup = wireBooking(
    (...args) => calls.push(args),
    (name, props) => events.push({ name, props })
  )
  const ready = calls.find((c) => c[1].action === 'linkReady')[1].callback
  ready({ detail: { data: { email: 'private' } } })
  ready()
  const intent = calls.find((c) => c[1].action === 'eventTypeSelected')[1].callback
  intent({ detail: { data: { eventType: 'private' } } })
  assert.deepEqual(events, [
    { name: 'booking_widget_ready', props: { placement: 'home_booking' } },
    { name: 'booking_intent', props: { placement: 'home_booking' } },
  ])
  assert.equal(
    calls.some((c) => c[1].action.includes('bookingSuccessful')),
    false
  )
  cleanup()
  assert.equal(calls.filter((c) => c[0] === 'off').length, 2)
})
