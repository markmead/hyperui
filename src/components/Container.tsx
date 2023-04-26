import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  classNames?: string
}

export default function Container({ children, classNames }: Props) {
  return (
    <div className={`mx-auto max-w-screen-xl px-4 ${classNames}`}>
      {children}
    </div>
  )
}
