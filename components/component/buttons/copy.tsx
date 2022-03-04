import { FunctionComponent, useContext } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from '../../../styles/button.module.css'

import ToastContext from '../../../context/toast'

type Props = {
  code: string
}

const Copy: FunctionComponent<Props> = ({ code }) => {
  let toast = useContext(ToastContext)

  return (
    <>
      <CopyToClipboard text={code} onCopy={() => toast('Copied to Clipboard!')}>
        <button type="button" className={styles.pill}>
          <span role="img" className="text-sm mr-1.5">
            📋
          </span>

          <span className="text-xs font-medium">Copy</span>
        </button>
      </CopyToClipboard>
    </>
  )
}

export default Copy
