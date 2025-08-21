import { Inter } from 'next/font/google'
import { headers } from 'next/headers'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

import Ad from '@component/global/Ad'
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
  const userAgent = headers().get('user-agent') || ''

  let osName = ''

  if (/mac/i.test(userAgent)) {
    osName = 'macos'
  } else if (/win/i.test(userAgent)) {
    osName = 'windows'
  } else if (/linux/i.test(userAgent)) {
    osName = 'linux'
  }

  return (
    <html className="h-full scroll-pt-20 scroll-smooth" lang="en" dir="ltr" data-os={osName}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#mainContent"
          className="absolute left-1/2 z-999 -translate-x-1/2 -translate-y-full bg-black px-6 py-3 text-white transition-transform focus:translate-y-4 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
        >
          Skip to Main Content
        </a>

        <Header />

        <HeaderCta />

        <main className="bg-white">{children}</main>

        <Footer />

        <Ad />
      </body>
    </html>
  )
}
