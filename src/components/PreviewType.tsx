interface Props {
  codeType: string
  componentId: string
  handleSetCodeType: (codeType: string) => void
}

export default function PreviewType({ codeType, componentId, handleSetCodeType }: Props) {
  return (
    <label htmlFor={`CodeType${componentId}`}>
      <span className="sr-only">Code Type</span>

      <select
        id={`CodeType${componentId}`}
        value={codeType}
        className="rounded-l-md border-2 border-gray-900 py-1.5 pl-3 text-sm font-medium"
        aria-label="Code Type"
        onInput={(selectEvent) =>
          handleSetCodeType((selectEvent.target as HTMLSelectElement).value)
        }
      >
        <option value="html">HTML</option>
        <option value="jsx">JSX</option>
        <option value="vue">Vue</option>
      </select>
    </label>
  )
}
