import { Inter } from 'next/font/google'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

import Footer from '@component/global/Footer'
import Header from '@component/global/Header'
import HeaderCta from '@component/global/HeaderCta'

// prettier-ignore
export const metadata = {
  metadataBase: new URL('https://hyperui.dev'),
  title: 'Free Open Source Tailwind CSS v4 Components | HyperUI',
  description: 'Discover free Tailwind CSS v4 components for your next project, designed to enhance your web development with the latest features and styles.',
  openGraph: {
    url: 'https://www.hyperui.dev/',
    siteName: 'HyperUI',
    type: 'website',
    images: [
      {
        url: 'https://www.hyperui.dev/og.jpg',
        width: 2400,
        height: 1260,
        alt: 'HyperUI',
      },
    ],
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="h-full scroll-pt-20 scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'HyperUI',
              url: 'https://www.hyperui.dev/',
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HyperUI',
              url: 'https://www.hyperui.dev/',
              logo: 'https://www.hyperui.dev/og.jpg',
            }),
          }}
        />

        <a
          href="#mainContent"
          className="absolute left-1/2 z-999 -translate-x-1/2 -translate-y-full bg-stone-900 px-6 py-3 text-white transition-transform focus:translate-y-4 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
        >
          Skip to Main Content
        </a>

        <Header />

        <HeaderCta />

        <main className="bg-white">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
