import { FunctionComponent } from 'react'
import Head from 'next/head'

import Announcement from './announcement'
import Popup from './popup'
import Header from './header'
import Footer from './footer'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <script
          src="https://www.googletagmanager.com/gtag/js?id=G-VE5EHLYPZP"
          async
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
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hyperui.dev/" />
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
        <meta property="og:image" content="https://hyperui.dev/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hyperui.dev/" />
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
      </Head>

      <Announcement
        text="⭐️ Like HyperUI? Star on GitHub ⭐️"
        url="https://github.com/markmead/hyperui"
      />

      <Popup
        text="Click for Alpine JS Snippets 🥳"
        url="https://alpinejs.hyperui.dev"
      />

      <Header />

      <main role="main">{children}</main>

      <Footer />
    </>
  )
}

export default Layout
