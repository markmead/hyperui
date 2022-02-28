import '../styles/globals.css'
import 'prismjs/themes/prism-okaidia.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
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

        <title>Open Source Tailwind CSS Component Library | HyperUI</title>
        <meta
          name="description"
          content="HyperUI is a free, open-source Tailwind CSS component library."
          key="description"
        />

        <meta
          property="og:title"
          content="Open Source Tailwind CSS Component Library | HyperUI"
          key="og:title"
        />
        <meta
          property="og:description"
          content="HyperUI is a free, open-source Tailwind CSS component library."
          key="og:description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hyperui.dev/" />
        <meta property="og:image" content="https://hyperui.dev/og.png" />

        <meta
          name="twitter:title"
          content="Open Source Tailwind CSS Component Library | HyperUI"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="HyperUI is a free, open-source Tailwind CSS component library."
          key="twitter:description"
        />
        <meta name="twitter:image" content="https://hyperui.dev/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hyperui.dev/" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
