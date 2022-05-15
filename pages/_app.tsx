import type { AppProps } from 'next/app'

import '../styles/globals.css'

import Layout from '../components/layout'
import Header from '../components/global/header'
import Footer from '../components/global/footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Footer />
    </>
  )
}

export default MyApp
