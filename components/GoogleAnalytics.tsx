'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Extend the global Window type to include dataLayer
declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

interface GoogleAnalyticsProps {
  googleAnalyticsId?: string
}

export default function GoogleAnalytics({ googleAnalyticsId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!googleAnalyticsId || typeof window === 'undefined') return

    // Ensure dataLayer is defined on window
    window.dataLayer = window.dataLayer || []

    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }

    gtag('js', new Date())
    gtag('config', googleAnalyticsId)
  }, [googleAnalyticsId])

  if (!googleAnalyticsId) return null

  return (
    <>
      {/* Load Google Analytics script */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>
    </>
  )
}
