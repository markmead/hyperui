import { FunctionComponent } from 'react'

type Props = {
  range: number
  handleRange: CallableFunction
  id: string
}

const Range: FunctionComponent<Props> = ({ range, handleRange, id }) => {
  return (
    <>
      <label htmlFor="ComponentWidth" className="flex">
        <span className="sr-only">Component preview width</span>

        <input
          type="range"
          min="340"
          max="1348"
          step="4"
          value={range}
          id={`ComponentWidth${id}`}
          onChange={(e) => handleRange(Number(e.currentTarget.value))}
        />
      </label>
    </>
  )
}

export default Range
