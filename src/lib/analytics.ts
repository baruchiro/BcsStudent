import mixpanelPlugin from '@analytics/mixpanel'
import Analytics from 'analytics'

const analytics = Analytics({
  app: 'baruch-odem',
  debug: process.env.NODE_ENV === 'development',
  plugins: [
    mixpanelPlugin({
      token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    }),
  ],
})

export default analytics
