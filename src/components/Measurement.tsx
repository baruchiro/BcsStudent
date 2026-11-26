import MeasurementClient from './MeasurementClient'
import siteMetadata from '@/data/siteMetadata'

export default function Measurement() {
  return (
    <MeasurementClient
      apiKey={siteMetadata.analytics?.posthogAnalytics?.posthogProjectApiKey}
      siteUrl={siteMetadata.siteUrl}
    />
  )
}
