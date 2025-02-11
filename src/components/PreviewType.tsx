interface iProps {
  codeType: string
  componentId: string
  handleSetCodeType: (codeType: string) => void
}

export default function PreviewType({ codeType, componentId, handleSetCodeType }: iProps) {
  return (
    <div>
      <label htmlFor={`CodeType${componentId}`} className="sr-only">
        Code Type
      </label>

      <select
        id={`CodeType${componentId}`}
        value={codeType}
        className="rounded-l-md border-2 border-gray-900 py-1.5 pl-3 text-sm font-medium"
        onInput={(e) => handleSetCodeType((e.target as HTMLSelectElement).value)}
      >
        <option value="html">HTML</option>
        <option value="jsx">JSX</option>
        <option value="vue">Vue</option>
      </select>
    </div>
  )
}
