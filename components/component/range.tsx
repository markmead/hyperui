import { FunctionComponent } from 'react'

type Props = {
  range: number
  handleRange: CallableFunction
}

const Range: FunctionComponent<Props> = ({ handleRange, range }) => {
  return (
    <div>
      <input
        type="range"
        min="340"
        max="1348"
        step="4"
        aria-label="Breakpoint Width"
        value={range}
        onChange={(e) => handleRange(Number(e.currentTarget.value))}
      />
    </div>
  )
}

export default Range
