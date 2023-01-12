import type { AppProps } from 'next/app'

import Head from 'next/head'

import '@/styles/site.css'
import 'prismjs/themes/prism-okaidia.css'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Free Open Source Tailwind CSS Components | HyperUI</title>
        <meta
          name="description"
          content="Free Tailwind CSS components that can be used in your next project. Perfect for Laravel, Rails, React, Vue and more."
          key="description"
        />
        <meta
          property="og:title"
          content="Free Open Source Tailwind CSS Components | HyperUI"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Free Tailwind CSS components that can be used in your next project. Perfect for Laravel, Rails, React, Vue and more."
          key="og:description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hyperui.dev/" />
        <meta property="og:image" content="https://www.hyperui.dev/og.jpg" />
        <meta
          name="twitter:title"
          content="Free Open Source Tailwind CSS Components | HyperUI"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="Free Tailwind CSS components that can be used in your next project. Perfect for Laravel, Rails, React, Vue and more."
          key="twitter:description"
        />
        <meta name="twitter:image" content="https://www.hyperui.dev/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.hyperui.dev/" />
      </Head>

      <Header />

      <main role="main" id="MainContent">
        <Component {...pageProps} />
      </main>

      <Footer />
    </>
  )
}

export default MyApp
