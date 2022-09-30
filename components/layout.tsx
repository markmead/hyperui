import { ReactChild } from 'react'

type Props = {
  children: ReactChild
}

function Layout({ children }: Props) {
  return (
    <main role="main" id="MainContent">
      {children}
    </main>
  )
}

export default Layout
