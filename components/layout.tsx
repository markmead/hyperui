import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main role="main" id="MainContent">
      {children}
    </main>
  )
}

export default Layout
