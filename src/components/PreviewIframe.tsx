import { RefObject } from 'react'

type Props = {
  showPreview: boolean
  componentHtml: string | undefined
  componentTitle: string
  previewWidth?: string
  refIframe: RefObject<HTMLIFrameElement>
}

function PreviewIframe({
  showPreview,
  componentHtml,
  componentTitle,
  previewWidth = '100%',
  refIframe,
}: Props) {
  return (
    <div className={showPreview ? 'block' : 'hidden'}>
      <iframe
        className="h-[400px] w-full rounded-lg bg-white ring-2 ring-gray-900 dark:ring-gray-800 lg:h-[600px] lg:transition-all"
        loading="lazy"
        srcDoc={componentHtml}
        style={{ maxWidth: previewWidth }}
        title={`${componentTitle} Component`}
        ref={refIframe}
      ></iframe>
    </div>
  )
}

export default PreviewIframe
