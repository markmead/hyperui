import { FunctionComponent } from 'react'

import styles from '../styles/copy.module.css'

type Props = {
  view: boolean
  handleView: any
}

const Code: FunctionComponent<Props> = ({ view, handleView }) => {
  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => handleView(!view)}
      >
        <span role="img" className="mr-1.5">
          👀
        </span>
        View
      </button>
    </>
  )
}

export default Code
