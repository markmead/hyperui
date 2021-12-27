import type { FunctionComponent } from 'react'

type Props = {
  style: string
}

const IconMenu: FunctionComponent<Props> = ({ style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={style}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}

export default IconMenu
