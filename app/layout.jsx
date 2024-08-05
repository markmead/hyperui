import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

import Ads from '@/ads'

import Footer from '@component/Footer'
import Header from '@component/Header'
import HeaderBanner from '@component/HeaderBanner'

export const metadata = {
  metadataBase: new URL('https://hyperui.dev'),
  title: 'Free Open Source Tailwind CSS Components | HyperUI',
  description: 'Free Tailwind CSS components that can be used in your next project.',
  openGraph: {
    title: 'Free Open Source Tailwind CSS Components | HyperUI',
    description: 'Free Tailwind CSS components that can be used in your next project.',
    url: 'https://www.hyperui.dev/',
    siteName: 'HyperUI',
    type: 'website',
    images: ['https://www.hyperui.dev/og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Open Source Tailwind CSS Components | HyperUI',
    description: 'Free Tailwind CSS components that can be used in your next project.',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html className="h-full scroll-pt-20 scroll-smooth" lang="en" dir="ltr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#mainContent"
          className="absolute left-1/2 z-[999] -translate-x-1/2 -translate-y-full bg-black px-6 py-3 text-white transition-transform focus:translate-y-0"
        >
          Skip to Main Content
        </a>

        <Header />
        <HeaderBanner />

        <main className="bg-white">{children}</main>

        <Footer />

        <Ads />

        <GoogleAnalytics gaId="G-JKSW02CFZF" />
      </body>
    </html>
  )
}
