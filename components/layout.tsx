import { FunctionComponent } from 'react'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <main role="main">{children}</main>
    </>
  )
}

export default Layout
