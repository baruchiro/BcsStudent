import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contactChannel, privacyOptions, sanitizeEvent } from '../src/analytics/core.mjs'

const id = '01a163cf-c065-79e7-86f0-30f6125c475d'

test('pageleave keeps time and scroll depth, strips URLs query/hash, PII and DOM data', () => {
  const event = sanitizeEvent({
    event: '$pageleave',
    properties: {
      $current_url: 'https://www.baruchiro.com/blog/a?email=private#secret',
      $pathname: '/blog/a?email=private',
      $prev_pageview_duration: 12,
      $prev_pageview_max_scroll_percentage: 0.75,
      $prev_pageview_id: id,
      $elements: [{ text: 'private' }],
      $referrer: 'https://google.com?q=private',
      $set: { email: 'private' },
      email: 'private',
      $session_id: 'not-a-uuid',
    },
  })
  const p = event.properties
  assert.equal(p.$current_url, 'https://www.baruchiro.com/blog/a')
  assert.equal(p.$pathname, '/blog/a')
  assert.equal(p.$prev_pageview_duration, 12)
  assert.equal(p.$prev_pageview_max_scroll_percentage, 0.75)
  assert.equal(p.$prev_pageview_id, id)
  for (const key of ['email', '$elements', '$set', '$referrer', '$session_id'])
    assert.equal(p[key], undefined)
  assert.equal(p.$process_person_profile, false)
})

test('pageview keeps referrer and UTM, strips their query, hash and click ids', () => {
  const event = sanitizeEvent({
    event: '$pageview',
    properties: {
      token: 'phc_test',
      $referrer: 'https://www.google.com/search?q=private#x',
      $referring_domain: 'www.google.com',
      utm_source: 'newsletter',
      utm_medium: 'email',
      utm_campaign: 'spring sale',
      utm_content: 'https://evil.example/?email=private',
      gclid: 'abc',
      fbclid: 'def',
      $initial_referrer: 'https://www.google.com/search?q=private',
    },
  })
  const p = event.properties
  assert.equal(p.token, 'phc_test')
  assert.equal(p.$referrer, 'https://www.google.com/search')
  assert.equal(p.$referring_domain, 'www.google.com')
  assert.equal(p.utm_source, 'newsletter')
  assert.equal(p.utm_medium, 'email')
  assert.equal(p.utm_campaign, 'spring sale')
  for (const key of ['utm_content', 'gclid', 'fbclid', '$initial_referrer'])
    assert.equal(p[key], undefined)
  assert.equal(
    sanitizeEvent({ event: '$pageview', properties: { $referrer: 'javascript:alert(1)' } })
      .properties.$referrer,
    undefined
  )
  assert.equal(
    sanitizeEvent({ event: '$pageleave', properties: { $referrer: 'https://a.example/' } })
      .properties.$referrer,
    undefined
  )
})

test('project token is kept on every approved event so PostHog accepts it', () => {
  for (const event of ['$pageview', '$pageleave', 'contact_intent'])
    assert.equal(
      sanitizeEvent({ event, properties: { token: 'phc_test' } }).properties.token,
      'phc_test'
    )
  assert.equal(sanitizeEvent({ event: '$pageview', properties: {} }).properties.token, undefined)
  assert.equal(
    sanitizeEvent({ event: '$pageview', properties: { token: 'bad token!' } }).properties.token,
    undefined
  )
})

test('SDK event id and timestamp survive, top-level person data does not', () => {
  const when = new Date()
  const event = sanitizeEvent({
    event: '$pageview',
    uuid: id,
    timestamp: when,
    $set: { email: 'private' },
    properties: {},
  })
  assert.equal(event.uuid, id)
  assert.equal(event.timestamp, when)
  assert.equal(event.$set, undefined)
})

test('only approved events pass; unknown events and values are dropped', () => {
  assert.equal(sanitizeEvent({ event: 'inquiry_received', properties: {} }), null)
  assert.equal(sanitizeEvent({ event: '$autocapture', properties: {} }), null)
  assert.equal(sanitizeEvent({ event: '$web_vitals', properties: {} }), null)
  const contact = sanitizeEvent({
    event: 'contact_intent',
    $set: { email: 'private' },
    properties: { channel: 'whatsapp', href: 'https://wa.me/123', $session_id: id },
  })
  assert.deepEqual(contact.properties, {
    $process_person_profile: false,
    channel: 'whatsapp',
    $session_id: id,
  })
  assert.equal(contact.$set, undefined)
  assert.equal(
    sanitizeEvent({ event: 'contact_intent', properties: { channel: 'other' } }).properties.channel,
    undefined
  )
})

test('PostHog init options use the SDK features and keep the privacy guardrails', () => {
  const options = privacyOptions({ location: { pathname: '/blog/a' } })
  assert.equal(options.capture_pageview, 'history_change')
  assert.equal(options.capture_pageleave, true)
  assert.equal(options.autocapture, false)
  assert.equal(options.disable_session_recording, true)
  assert.equal(options.person_profiles, 'never')
  assert.equal(options.ip, false)
  assert.equal(options.save_referrer, true)
  assert.equal(options.save_campaign_params, true)
  assert.equal(options.mask_personal_data_properties, true)
  assert.equal(options.get_current_url(), 'https://www.baruchiro.com/blog/a')
  assert.equal(options.before_send({ event: 'inquiry_received', properties: {} }), null)
})

test('contact links are classified, article-body contact links are ignored', () => {
  const link = (href, inArticle = false) => ({
    href,
    closest: (sel) => (inArticle && sel.includes('article_body') ? {} : null),
  })
  assert.equal(contactChannel(link('mailto:a@b.co')), 'email')
  assert.equal(contactChannel(link('tel:+972500000000')), 'phone')
  assert.equal(contactChannel(link('https://wa.me/972500000000')), 'whatsapp')
  assert.equal(contactChannel(link('https://wa.me/972500000000', true)), null)
  assert.equal(contactChannel(link('https://example.com')), null)
  assert.equal(contactChannel(link('not a url')), null)
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
