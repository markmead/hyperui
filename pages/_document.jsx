import { Head, Html, Main, NextScript } from 'next/document'

import { GoogleAnalytics } from '@next/third-parties/google'

export default function Document() {
  return (
    <Html className="h-full scroll-smooth" lang="en" dir="ltr">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="font-sans antialiased">
        <Main />

        <NextScript />
      </body>

      <GoogleAnalytics gaId="G-JKSW02CFZF" />
    </Html>
  )
}
