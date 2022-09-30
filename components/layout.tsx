import { FunctionComponent, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout: FunctionComponent = ({ children }) => {
  return (
    <main role="main" id="MainContent">
      {children}
    </main>
  )
}

export default Layout
