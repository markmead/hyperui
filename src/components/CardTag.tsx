interface iTagClass {
  new: string
  update: string
  DEFAULT: string
}

interface iProps {
  tagType?: string
  tagText?: string
}

export default function CardTag({ tagType = 'DEFAULT', tagText }: iProps) {
  const tagClasses: iTagClass = {
    new: 'bg-green-100 text-green-700',
    update: 'bg-blue-100 text-blue-700',
    DEFAULT: 'bg-blue-100 text-blue-700',
  }

  const tagClass: string = tagClasses[tagType]

  return (
    <span
      className={`-me-1.5 -mt-1.5 self-end rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap capitalize sm:-me-3 sm:-mt-3 ${tagClass}`}
    >
      {tagText || tagType}
    </span>
  )
}
