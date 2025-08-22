export default function PreviewType({ componentId, codeType, handleSetCodeType }) {
  return (
    <span className="hidden sm:block">
      <label htmlFor={`CodeType${componentId}`} className="sr-only">
        Code Type
      </label>

      <select
        id={`CodeType${componentId}`}
        value={codeType}
        onInput={(e) => handleSetCodeType(e.target.value)}
        className="h-10 rounded-lg border-stone-300 pl-3 font-medium shadow-sm transition-colors hover:bg-stone-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
      >
        <option value="html">HTML</option>
        <option value="jsx">JSX</option>
        <option value="vue">Vue</option>
      </select>
    </span>
  )
}
