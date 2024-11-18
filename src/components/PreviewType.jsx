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
        className="rounded-l-md border-2 border-gray-900 bg-white py-1.5 pl-3 text-sm font-medium text-gray-900 dark:border-white dark:bg-gray-900 dark:text-gray-200"
      >
        <option value="html">HTML</option>
        <option value="jsx">JSX</option>
        <option value="vue">Vue</option>
      </select>
    </div>
  )
}
