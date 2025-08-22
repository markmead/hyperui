export default function Button({ children, isActive, onClick, ...buttonProps }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 font-medium text-stone-700 shadow-sm transition-colors hover:text-stone-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none ${isActive ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-stone-300 hover:bg-stone-100'}`}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
