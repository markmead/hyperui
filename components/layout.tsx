import type { FunctionComponent } from 'react'

import Header from './header'
import Footer from './footer'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />

      <main role="main">{children}</main>

      <Footer />
    </>
  )
}

export default Layout
