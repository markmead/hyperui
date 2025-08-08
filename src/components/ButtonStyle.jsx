export default function ButtonStyle({ buttonEmoji, buttonText, buttonActive = false }) {
  return (
    <span
      className={`inline-flex h-10 items-center gap-2 rounded-md px-3 text-gray-900 shadow-sm transition-[color,background-color,box-shadow] ${buttonActive ? 'bg-gray-50 text-gray-900 ring-2 ring-pink-400' : 'ring ring-gray-300 hover:bg-gray-50'} `}
    >
      <span aria-hidden="true">{buttonEmoji}</span>

      <span className="text-sm font-medium">{buttonText}</span>
    </span>
  )
}
