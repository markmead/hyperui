import { useEffect, useRef } from 'react'

export default function Ad({ adStyle, isCenter = false }) {
  const adRef = useRef(null)

  useEffect(() => {
    adRef.current.innerHTML = ''

    const newScript = document.createElement('script')

    newScript.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    newScript.async = true

    adRef.current.appendChild(newScript)
  }, [])

  return (
    <div className={`not-prose max-w-lg ${isCenter && 'mx-auto text-center'}`}>
      <div
        ref={adRef}
        data-ea-publisher="hyperuidev"
        data-ea-type="image"
        data-ea-style={adStyle}
        className="bordered horizontal [&_.ea-callout]:!mb-0 [&_.ea-content]:!mx-0 [&_.ea-content]:!mt-0 [&_.ea-stickybox-hide]:hidden"
      ></div>
    </div>
  )
}
