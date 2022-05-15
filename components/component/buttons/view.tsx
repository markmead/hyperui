import { FunctionComponent } from 'react'

type Props = {
  view: boolean
  handleView: CallableFunction
}

const View: FunctionComponent<Props> = ({ handleView, view }) => {
  return <button onClick={() => handleView(!view)}>View</button>
}

export default View
