export default function Button({ children, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 font-medium text-gray-700 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none ${isActive ? 'border-pink-500 ring-1 ring-pink-500' : 'border-gray-300'}`}
    >
      {children}
    </button>
  )
}
