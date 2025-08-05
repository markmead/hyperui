export default function PreviewType({ componentId, codeType, handleSetCodeType }) {
  return (
    <div className="hidden sm:block">
      <label htmlFor={`CodeType${componentId}`} className="sr-only">
        Code Type
      </label>

      <select
        id={`CodeType${componentId}`}
        value={codeType}
        onInput={(e) => handleSetCodeType(e.target.value)}
        className="h-10 rounded-md border-none pl-3 font-medium shadow-sm ring ring-gray-300 sm:text-sm"
      >
        <option value="html">HTML</option>
        <option value="jsx">JSX</option>
        <option value="vue">Vue</option>
      </select>
    </div>
  )
}
