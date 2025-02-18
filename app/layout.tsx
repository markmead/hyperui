import { Inter } from 'next/font/google'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

import { PageMeta } from '@type/site'
import Footer from '@component/Footer'
import Header from '@component/Header'
import HeaderBanner from '@component/HeaderBanner'

interface GlobalMeta extends Omit<PageMeta, 'alternates'> {
  metadataBase: URL
  openGraph: {
    type: string
    url: string
    siteName: string
    images: {
      alt: string
      url: string
      width: number
      height: number
    }[]
  }
}

interface Props {
  children: React.ReactNode
}

export const metadata: GlobalMeta = {
  metadataBase: new URL('https://hyperui.dev'),
  title: 'Free Open Source Tailwind CSS v4 Components | HyperUI',
  description:
    'Discover free Tailwind CSS v4 components for your next project, designed to enhance your web development with the latest features and styles.',
  openGraph: {
    type: 'website',
    url: 'https://www.hyperui.dev/',
    siteName: 'HyperUI',
    images: [
      {
        alt: 'HyperUI',
        url: 'https://www.hyperui.dev/og.jpg',
        width: 2400,
        height: 1260,
      },
    ],
  },
}

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: Props) {
  return (
    <html className="h-full scroll-pt-20 scroll-smooth" lang="en" dir="ltr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#mainContent"
          className="absolute left-1/2 z-999 -translate-x-1/2 -translate-y-full bg-black px-6 py-3 text-white transition-transform focus:translate-y-0"
        >
          Skip to Main Content
        </a>

        <Header />

        <HeaderBanner />

        <main className="bg-white">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
