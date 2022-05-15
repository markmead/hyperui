import type { FunctionComponent } from 'react'

type Props = {
  handleWidth: CallableFunction
  size: string
  text: string
}

const Breakpoint: FunctionComponent<Props> = ({ handleWidth, size, text }) => {
  return <button onClick={() => handleWidth(size)}>{text}</button>
}

export default Breakpoint
