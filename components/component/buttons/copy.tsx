import { FunctionComponent, useContext } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import ToastContext from '../../../context/toast'

type Props = {
  code: string
}

const Copy: FunctionComponent<Props> = ({ code }) => {
  let toast = useContext(ToastContext)

  return (
    <CopyToClipboard text={code} onCopy={() => toast('Copied to Clipboard!')}>
      <button>Copy</button>
    </CopyToClipboard>
  )
}

export default Copy
