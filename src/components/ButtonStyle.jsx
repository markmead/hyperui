export default function ButtonStyle({ emoji, text, style, dark }) {
  const buttonClasses = {
    dark: 'border-gray-700 text-white hover:bg-gray-700',
    DEFAULT: 'border-gray-900 hover:bg-gray-900 hover:text-white',
  }

  const buttonClass = dark ? buttonClasses.dark : buttonClasses.DEFAULT

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 ${buttonClass} ${style}`}
    >
      <span aria-hidden="true" role="img" className="text-sm">
        {emoji}
      </span>

      <span className="text-xs font-medium">{text}</span>
    </span>
  )
}
