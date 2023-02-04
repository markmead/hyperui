import { useEffect, useState } from 'react'

import styles from '@/styles/button.module.css'

type Props = {
  componentCode: string
  handleEditCode: CallableFunction
}

function PreviewEdit({ componentCode, handleEditCode }: Props) {
  const [editedCode, setEditedCode] = useState<string>('')

  useEffect(() => setEditedCode(componentCode), [componentCode])

  return (
    <div className="relative">
      <button
        onClick={() => handleEditCode(editedCode)}
        className={`${styles.pill} absolute top-4 right-4 z-50 bg-white`}
      >
        <span aria-hidden="true" role="img" className="text-sm">
          💾
        </span>

        <span className="text-xs font-medium">Save</span>
      </button>

      <textarea
        onInput={(e) => setEditedCode(e.currentTarget.value)}
        defaultValue={editedCode}
        className="h-[400px] w-full overflow-auto rounded-lg border-none p-4 ring-2 ring-black focus:ring-2 lg:h-[600px]"
      ></textarea>
    </div>
  )
}

export default PreviewEdit
