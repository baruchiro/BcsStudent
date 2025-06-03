import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useEffect, useState } from 'react'

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        setFingerprint(result.visitorId)
      })
      .catch((error) => {
        console.error('Error loading fingerprint:', error)
        setFingerprint(Math.random().toString(36).substring(2, 15))
      })
  }, [])

  return fingerprint
}
