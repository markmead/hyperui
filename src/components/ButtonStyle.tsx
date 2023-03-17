import type { ReactNode } from 'react'

type Props = {
  emoji: string
  text: string
  style?: string
}

export default function ButtonStyle({ emoji, text, style }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-gray-900 px-3 py-1.5 hover:bg-gray-900 hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 ${style}`}
    >
      <span aria-hidden="true" role="img" className="text-sm">
        {emoji}
      </span>

      <span className="text-xs font-medium">{text}</span>
    </span>
  )
}
