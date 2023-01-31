type Props = {
  toggleValue: boolean
  toggleHandler: CallableFunction
  toggleId: string
  toggleLabel: string
}

function SettingToggle({
  toggleValue,
  toggleHandler,
  toggleId,
  toggleLabel,
}: Props) {
  return (
    <label
      htmlFor={toggleId}
      className="relative block h-7 w-12 cursor-pointer"
    >
      <span className="sr-only">{toggleLabel}</span>

      <input
        type="checkbox"
        id={toggleId}
        className="peer sr-only"
        checked={toggleValue}
        onChange={() => toggleHandler(!toggleValue)}
      />

      <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>

      <span className="absolute inset-0 m-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"></span>
    </label>
  )
}

export default SettingToggle
