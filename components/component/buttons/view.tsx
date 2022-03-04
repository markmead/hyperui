import { FunctionComponent } from 'react'

import styles from '../../../styles/button.module.css'

type Props = {
  view: boolean
  handleView: any
}

const View: FunctionComponent<Props> = ({ view, handleView }) => {
  return (
    <>
      <button
        type="button"
        className={styles.pill}
        onClick={() => handleView(!view)}
      >
        <span role="img" className="mr-1.5 text-sm">
          👀
        </span>

        <span className="text-xs font-medium">View</span>
      </button>
    </>
  )
}

export default View
