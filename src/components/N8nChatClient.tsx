'use client'

import siteMetadata from '@/data/siteMetadata'
import { useFingerprint } from '@/hooks/useFingerprint'
import { useEffect, useState } from 'react'

export default function N8nChatClient() {
  const fingerprint = useFingerprint()
  const [requested, setRequested] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!requested || !fingerprint) return
    let cancelled = false

    Promise.all([
      import('@n8n/chat'),
      // @ts-ignore
      import('@n8n/chat/style.css'),
    ])
      .then(([{ createChat }]) => {
        if (cancelled) return
        createChat({
          webhookUrl: siteMetadata.n8nChatWebhookUrl,
          loadPreviousSession: false,
          // @ts-ignore
          defaultLanguage: 'he',
          initialMessages: ['מה מעניין אותך היום?'],
          metadata: {
            fingerprint,
          },
          i18n: {
            he: {
              title: 'שלום! 👋',
              subtitle: 'אפשר לדבר איתי על תוכן הבלוג',
              footer: '',
              getStarted: 'שיחה חדשה',
              inputPlaceholder: 'מעניין אותי לקרוא על אוטומציות...',
              closeButtonTooltip: 'סגור',
            },
          },
        })
        document.querySelector<HTMLElement>('.chat-window-toggle')?.click()
        setMounted(true)
      })
      .catch((error) => {
        console.error('Error loading chat:', error)
        if (!cancelled) setRequested(false)
      })

    return () => {
      cancelled = true
    }
  }, [requested, fingerprint])

  if (!siteMetadata.n8nChatWebhookUrl || mounted) return null

  return (
    <button
      type="button"
      aria-label="פתיחת צ׳אט"
      disabled={requested}
      onClick={() => setRequested(true)}
      className="fixed bottom-4 left-4 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-[#e74266] text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-70"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      </svg>
    </button>
  )
}
