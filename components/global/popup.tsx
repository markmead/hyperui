import { FunctionComponent, useEffect, useState } from 'react'

type Props = {
  text: string
  url: string
}

const Popup: FunctionComponent<Props> = ({ text, url }) => {
  let [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    let showPopup: string | null = localStorage.getItem('showPopup')

    if (showPopup === 'FALSE') {
      setShow(false)
    }
  }, [])

  function hidePopup() {
    localStorage.setItem('showPopup', 'FALSE')

    setShow(false)
  }

  if (!show) return <></>

  return (
    <aside className="fixed flex items-center p-3 text-center text-white bg-black rounded-lg bottom-4 right-4">
      <a
        className="text-sm font-medium hover:opacity-75"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {text}
      </a>

      <button
        aria-label="Dismiss Popup"
        className="p-1 ml-4 rounded bg-white/25 hover:bg-white/10"
        onClick={() => hidePopup()}
        type="button"
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </aside>
  )
}

export default Popup
