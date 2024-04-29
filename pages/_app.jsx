import Head from 'next/head'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

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

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <Header />
      <HeaderBanner />

      <main className="bg-white">
        <Component {...pageProps} />
      </main>

      <Footer />

      <Ads />
    </>
  )
}

function Ads() {
  'use client'

  const routerPathname = usePathname()

  useEffect(() => {
    const newScript = document.createElement('script')

    newScript.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    newScript.async = true

    document.body.appendChild(newScript)
  }, [routerPathname])
}
