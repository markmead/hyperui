import type { FunctionComponent } from 'react'

import { useEffect } from 'react'

type Props = {
  children: React.ReactNode[]
}

const Announcements: FunctionComponent<Props> = ({ children }) => {
  useEffect(() => {
    const announcements: Element[] = [
      ...document.querySelectorAll('.announcement'),
    ]

    setInterval(() => {
      announcements.forEach((announcement) =>
        announcement.classList.toggle('hidden')
      )
    }, 5000)
  }, [])

  return (
    <section>
      {children.map((child: React.ReactNode, index) => {
        let classNames = `announcement ${index === 0 ? 'hidden' : ''}`

        classNames = classNames.trim()

        return (
          <div className={classNames} key={index}>
            {child}
          </div>
        )
      })}
    </section>
  )
}

export default Announcements
