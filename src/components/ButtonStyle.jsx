export default function ButtonStyle({ buttonEmoji, buttonText, buttonActive = false }) {
  return (
    <span
      className={`inline-flex h-10 items-center gap-2 rounded px-3 shadow-xs transition-colors ${buttonActive ? 'bg-gray-50 text-gray-900 ring-2 ring-pink-400' : 'text-gray-700 ring ring-gray-300 hover:bg-gray-50 hover:text-gray-900'}`}
    >
      <span aria-hidden="true" role="img">
        {buttonEmoji}
      </span>

      <span className="font-medium">{buttonText}</span>
    </span>
  )
}
