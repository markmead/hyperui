'use client'

import { useSessionStorage } from 'react-use'

export default function Announcement() {
  const [showPopup, setShowPopup] = useSessionStorage('showPopup', true)

  if (!showPopup) {
    return null
  }

  return (
    <div className="fixed bottom-4 z-50 p-4" role="alert">
      <div className="relative max-w-sm rounded-md border-2 border-gray-900 bg-white p-4 shadow-lg">
        <button
          className="absolute -right-3 -top-3 size-8 rounded border-2 border-gray-900 bg-white text-xs hover:bg-gray-100"
          onClick={() => setShowPopup(!showPopup)}
        >
          ❌
        </button>

        <p className="text-center text-lg font-medium text-gray-900">
          New eBook has launched!
          <br />
          Build your own HyperUI style website with Next JS, Tailwind CSS and MDX!
        </p>

        <div className="mt-2 flex items-center gap-2">
          <a
            href="https://markmdev.gumroad.com/l/hyperui-clone"
            target="_blank"
            rel="noreferrer"
            className="block flex-1 rounded-md border-2 border-gray-900 bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800"
          >
            Get the eBook for $5.99
          </a>
        </div>
      </div>
    </div>
  )
}
