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
        <button className={styles.pill} type="button">
          <span aria-hidden="true" className="text-sm mr-1.5" role="img">
            📋
          </span>

          <span className="text-xs font-medium">Copy</span>
        </button>
      </CopyToClipboard>
    </>
  )
}

export default Copy
