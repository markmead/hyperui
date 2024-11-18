export default function ButtonStyle({ buttonEmoji, buttonText, buttonActive, children }) {
  const buttonClasses = {
    DEFAULT: `border-gray-900 dark:border-white ${
      buttonActive
        ? 'text-white bg-gray-900 dark:text-gray-900 dark:bg-white'
        : 'bg-white text-gray-900 hover:bg-gray-900 hover:text-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
    }`,
  }

  const buttonClass = buttonClasses.DEFAULT

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border-2 px-3 py-1.5 ${buttonClass}`}
    >
      {children ? (
        children
      ) : (
        <>
          <span aria-hidden="true" role="img" className="text-sm">
            {buttonEmoji}
          </span>

          <span className="text-sm font-medium">{buttonText}</span>
        </>
      )}
    </span>
  )
}
