import { FunctionComponent } from 'react'

type Props = {
  text: string
  url: string
}

const Popup: FunctionComponent<Props> = ({ text, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center max-w-xs gap-4 p-4 text-white bg-black rounded-lg shadow bottom-4 right-4"
    >
      <span className="text-sm font-medium">{text}</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  )
}

export default Popup
