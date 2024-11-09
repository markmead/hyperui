export default function PreviewType({ componentId, codeType, handleSetCodeType }) {
  return (
    <div>
      <label htmlFor={`CodeType${componentId}`} className="sr-only">
        Code Type
      </label>

      <select
			  id={`CodeType${componentId}`}
			  value={codeType}
        onInput={(e) => handleSetCodeType(e.target.value)}
        className="rounded-l-md border-2 border-gray-900 py-1.5 pl-3 text-sm font-medium"
      >
        <option value="html">HTML</option>
        <option value="jsx">JSX</option>
        <option value="vue">Vue</option>
      </select>
    </div>
  )
}
