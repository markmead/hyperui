import { FunctionComponent, useContext } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from '../styles/copy.module.css'
import ToastContext from '../context/toast'

type Props = {
  code: string
}

const Copy: FunctionComponent<Props> = ({ code }) => {
  let toast = useContext(ToastContext)

  return (
    <>
      <CopyToClipboard text={code} onCopy={() => toast('Copied to Clipboard!')}>
        <button type="button" className={styles.toggle}>
          <span role="img" className="mr-1.5">
            📋
          </span>
          Copy
        </button>
      </CopyToClipboard>
    </>
  )
}

export default Copy
