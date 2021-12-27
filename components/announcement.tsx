import type { FunctionComponent } from 'react'

type Props = {
  text: string
  url: string
}

const Announcement: FunctionComponent<Props> = ({ text, url }) => (
  <aside className="p-3 text-center text-white bg-black">
    <p className="ml-3 text-xs font-medium text-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center hover:opacity-75"
      >
        {text}
      </a>
    </p>
  </aside>
)

export default Announcement
