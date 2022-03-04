import { FunctionComponent } from 'react'

import Banner from './global/banner'
import Header from './global/header'
import Footer from './global/footer'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Banner
        text="⭐️ Star HyperUI on GitHub ⭐️"
        url="https://github.com/markmead/hyperui"
      />

      <Header />

      <main role="main">{children}</main>

      <Footer />
    </>
  )
}

export default Layout
