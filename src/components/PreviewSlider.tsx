type Props = {
  previewRange: number
  handleSetPreviewRange: CallableFunction
  componentId: string
}

function Slider({ previewRange, handleSetPreviewRange, componentId }: Props) {
  return (
    <label htmlFor="ComponentWidth" className="flex">
      <span className="sr-only">Component preview width</span>

      <input
        type="range"
        min="340"
        max="1348"
        step="4"
        value={previewRange}
        id={`ComponentWidth${componentId}`}
        onChange={(e) => handleSetPreviewRange(Number(e.currentTarget.value))}
      />
    </label>
  )
}

export default Slider
