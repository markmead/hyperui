import { FunctionComponent } from 'react'

import Announcement from './announcement'
import Popup from './popup'
import Header from './header'
import Footer from './footer'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
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
