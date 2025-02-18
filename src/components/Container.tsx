interface Props {
  children: React.ReactNode
  id?: string
  classNames?: string
}

export default function Container({ children, id, classNames }: Props) {
  return (
    <div id={id} className={`mx-auto max-w-screen-xl px-4 ${classNames}`}>
      {children}
    </div>
  )
}
