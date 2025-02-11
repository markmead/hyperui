interface iButtonClasses {
  DEFAULT: string
  darkButton: string
}

interface iProps {
  buttonEmoji: string
  buttonText: string
  buttonActive: boolean
  isDark?: boolean
  children?: React.ReactNode
}

export default function ButtonStyle({
  buttonEmoji,
  buttonText,
  buttonActive,
  isDark,
  children,
}: iProps) {
  const buttonClasses: iButtonClasses = {
    DEFAULT: `border-gray-900 ${
      buttonActive
        ? 'text-white bg-gray-900'
        : 'bg-white text-gray-900 hover:bg-gray-900 hover:text-white'
    }`,
    darkButton: `border-gray-800 text-white ${
      buttonActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-800'
    }`,
  }

  const buttonClass: string = isDark ? buttonClasses.darkButton : buttonClasses.DEFAULT

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
