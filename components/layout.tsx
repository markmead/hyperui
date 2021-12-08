import type { FunctionComponent } from 'react'
import Head from 'next/head'

import Header from './header'
import Footer from './footer'

const Layout: FunctionComponent = ({ children }) => {
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
      </Head>

      <Header />

      <main role="main">{children}</main>

      <Footer />
    </>
  )
}

export default Layout
