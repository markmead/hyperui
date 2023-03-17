type Props = {
  showPreview: boolean
  componentCode: string | undefined
}

function PreviewCode({ showPreview, componentCode }: Props) {
  return (
    <div className={showPreview ? 'hidden' : 'block'}>
      <pre className="h-[400px] overflow-auto rounded-lg p-4 ring-2 ring-gray-900 dark:bg-gray-800 dark:ring-gray-800 lg:h-[600px]">
        <code className="language-html">{componentCode}</code>
      </pre>
    </div>
  )
}

export default PreviewCode
