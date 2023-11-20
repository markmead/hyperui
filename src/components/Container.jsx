export default function Container({ children, classNames }) {
  return <div className={`mx-auto max-w-screen-xl px-4 ${classNames}`}>{children}</div>
}
