import type { AppProps } from 'next/app'

import { useRouter } from 'next/router'

import Head from 'next/head'
import Script from 'next/script'

import '../styles/globals.css'
import 'prismjs/themes/prism-okaidia.css'

import Layout from '../components/layout'
import Banner from '../components/global/banner'
import Header from '../components/global/header'
import Footer from '../components/global/footer'
import Popup from '../components/global/popup'

function MyApp({ Component, pageProps }: AppProps) {
  let router = useRouter()

  let isHome = router.asPath === '/'

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
        <meta property="og:image" content="https://www.hyperui.dev/og.png" />
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
        <meta name="twitter:image" content="https://www.hyperui.dev/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.hyperui.dev/" />
      </Head>

      <Banner
        text="⭐️ Star HyperUI on GitHub ⭐️"
        url="https://github.com/markmead/hyperui"
      />

      {isHome && (
        // <Popup
        //   text="Use Alpine JS? Click Here 👋"
        //   url="https://hyperjs.dev/"
        // />

        <Popup
          text="Bored of writing markdown in your code editor? Try my new product"
          url="https://tiny-markdown.vercel.app/"
        />
      )}

      <Header />

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-VE5EHLYPZP"
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VE5EHLYPZP');
          `,
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Footer />
    </>
  )
}

export default MyApp
