import { FunctionComponent } from 'react'

import styles from '../../../styles/button.module.css'

type Props = {
  handleView: any
  view: boolean
}

const View: FunctionComponent<Props> = ({ view, handleView }) => {
  return (
    <>
      <button
        className={styles.pill}
        onClick={() => handleView(!view)}
        type="button"
      >
        <span aria-hidden="true" className="mr-1.5 text-sm" role="img">
          👀
        </span>

        <span className="text-xs font-medium">View</span>
      </button>
    </>
  )
}

export default View
