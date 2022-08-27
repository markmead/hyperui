import { FunctionComponent } from 'react'

type Props = {
  range: number
  handleRange: CallableFunction
}

const Range: FunctionComponent<Props> = ({ range, handleRange }) => {
  return (
    <label htmlFor="ComponentWidth">
      <span className="sr-only">Component preview width</span>

      <input
        type="range"
        min="340"
        max="1348"
        step="4"
        value={range}
        id="ComponentWidth"
        onChange={(e) => handleRange(Number(e.currentTarget.value))}
      />
    </label>
  )
}

export default Range
