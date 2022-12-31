import type { ReactNode } from 'react'

type Props = {
  selectValue: string
  selectHandler: CallableFunction
  selectId: string
  selectLabel: string
  children: ReactNode
}

function SettingSelect({
  selectValue,
  selectHandler,
  selectId,
  selectLabel,
  children,
}: Props) {
  return (
    <div className="shrink-0">
      <label htmlFor={selectId} className="sr-only">
        {selectLabel}
      </label>

      <select
        id={selectId}
        value={selectValue}
        onChange={(e) => selectHandler(e.currentTarget.value)}
        className="w-full border-gray-200 rounded-md shadow-sm sm:text-sm"
      >
        {children}
      </select>
    </div>
  )
}

export default SettingSelect
