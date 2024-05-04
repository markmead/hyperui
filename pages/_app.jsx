import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

import Footer from '@component/Footer'
import Header from '@component/Header'
import HeaderBanner from '@component/HeaderBanner'
import Announcement from '@component/Announcement'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <HeaderBanner />

      <main className="bg-white">
        <Component {...pageProps} />
      </main>

      <Footer />

      <Announcement />
    </>
  )
}
