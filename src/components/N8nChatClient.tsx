'use client'

import siteMetadata from '@/data/siteMetadata'
import { useFingerprint } from '@/hooks/useFingerprint'
import { createChat } from '@n8n/chat'
import '@n8n/chat/style.css'
import { useEffect } from 'react'

export default function N8nChatClient() {
  const fingerprint = useFingerprint()

  useEffect(() => {
    if (typeof window !== 'undefined' && siteMetadata.n8nChatWebhookUrl && fingerprint) {
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
            inputPlaceholder: 'מעניין אותי לקרוא על דברים בחינם...',
            closeButtonTooltip: 'סגור',
          },
        },
      })
    }
  }, [fingerprint])
  return null
}
