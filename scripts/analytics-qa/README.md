# Website measurement QA

Run from the repository root, using Node >=22 and the repository Yarn release. QA dependencies are isolated from the production bundle.

```sh
npm ci --prefix scripts/analytics-qa --ignore-scripts --no-audit --no-fund
node scripts/analytics-qa/node_modules/playwright/cli.js install chromium
node --test scripts/test-analytics.mjs scripts/test-analytics-browser.mjs
NEXT_PUBLIC_POSTHOG_KEY=public-local-test-key NEXT_TELEMETRY_DISABLED=1 INIT_CWD=$PWD node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 -p 4318
# In another terminal:
ANALYTICS_TEST_URL=http://127.0.0.1:4318 node --test scripts/test-analytics.mjs scripts/test-analytics-browser.mjs scripts/test-analytics-site.mjs
```

Never use a real project key for automated QA. Browser tests intercept external requests, serve the pinned PostHog SDK locally and abort external collection. Do not point ANALYTICS_TEST_URL at production or a preview with real integrations. The isolated SDK fixture disables bot filtering only in its local test configuration; production keeps it enabled. Test artifacts are written to the parent directory of the repository.

Observed on the current master-based implementation: Next build completed with 155 static pages; all 14 tests passed; mobile 390x844 and desktop 1440x900 surface checks reported no uncaught browser errors. The integrated real-SDK test observed three pageviews with IDs and exactly one tag-to-content confirmation. Targeted lint passed for instrumentation modules and QA scripts. Full lint also reports pre-existing formatting errors in scripts/migrate-ideas.mjs; these are not changed here. Build reported existing video metadata and unauthenticated GitHub metadata warnings.

The earlier malformed MDX and plugin-resolution blockers belonged to the old base/environment. Updating to current master and using the current worktree removed those blockers without modifying unrelated content or ESLint configuration. Missing build-time key disabled the production initializer; a synthetic key and a dedicated server for this exact build verified the integrated path. The old server on port 4317 must not be used to validate this worktree.

## Deployment and integration gates

This is a draft PR, not merge or production authorization. Before deployment verify the existing project host/key, consent storage/defaults, the actual deployed SDK version, and aggregate coverage. The production SDK URL is unpinned; the local pinned fixture is not proof of all future SDK behavior. No real inquiry or booking was created.

Received inquiries, business qualification, booking confirmations and failed sends are not inferred from clicks. The server-only adapter is unconnected: connecting it requires approval of the exact authenticated receiver, atomic dedupe-plus-aggregate transaction, retry handling and privacy rules. Business counts remain unavailable, not zero. Live Cal callback delivery remains unverified; missing readiness/intent events do not prove no interest.
