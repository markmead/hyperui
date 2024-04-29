import Head from 'next/head'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

import Footer from '@component/Footer'
import Header from '@component/Header'
import HeaderBanner from '@component/HeaderBanner'

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
    </>
  )
}
