import { FunctionComponent } from 'react'

import styles from '../../../styles/button.module.css'

type Props = {
  view: boolean
  handleView: CallableFunction
}

const View: FunctionComponent<Props> = ({ handleView, view }) => {
  return (
    <>
      <button onClick={() => handleView(!view)} className={styles.pill}>
        <span aria-hidden="true" className="text-sm" role="img">
          👀
        </span>

        <span className="text-xs font-medium">View</span>
      </button>
    </>
  )
}

export default View
