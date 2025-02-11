interface iProps {
  children: React.ReactNode
  id?: string
  classNames?: string
}

export default function Container({ children, id, classNames }: iProps) {
  return (
    <div id={id} className={`mx-auto max-w-screen-xl px-4 ${classNames}`}>
      {children}
    </div>
  )
}
