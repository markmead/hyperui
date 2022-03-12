/* eslint-disable @next/next/next-script-for-ga */

import type { AppProps } from 'next/app'

import Head from 'next/head'

import '../styles/globals.css'
import 'prismjs/themes/prism-okaidia.css'

import Layout from '../components/layout'
import Banner from '../components/global/banner'
import Header from '../components/global/header'
import Footer from '../components/global/footer'
import Popup from '../components/global/popup'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-VE5EHLYPZP"
      ></script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-VE5EHLYPZP');
            `,
        }}
      />

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
        <meta property="og:url" content="https://hyperui.dev/" />
        <meta property="og:image" content="https://hyperui.dev/og.png" />
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
        <meta name="twitter:image" content="https://hyperui.dev/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hyperui.dev/" />
      </Head>

      <Banner
        text="⭐️ Star HyperUI on GitHub ⭐️"
        url="https://github.com/markmead/hyperui"
      />

      <Popup
        text="Use Alpine JS? Click Here 👋"
        url="https://alpinejs.hyperui.dev"
      />

      <Header />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Footer />
    </>
  )
}

export default MyApp
