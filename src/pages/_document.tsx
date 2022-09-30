import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full scroll-smooth" lang="en">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href="https://www.hyperui.dev/rss.xml"
        />

        <link
          rel="alternate"
          type="application/feed+json"
          href="https://www.hyperui.dev/rss.json"
        />

        <link
          rel="alternate"
          type="application/feed+atom"
          href="https://www.hyperui.dev/rss.atom"
        />
      </Head>
      <body className="antialiased">
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}
