type Props = {
  componentCode: string
}

function PreviewCode({ componentCode }: Props) {
  return (
    <pre className="max-h-[400px] overflow-auto rounded-lg p-4 ring-2 ring-black">
      <code className="language-html">{componentCode}</code>
    </pre>
  )
}

export default PreviewCode
