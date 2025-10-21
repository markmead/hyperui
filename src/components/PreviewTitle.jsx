import PreviewCopyUrl from '@component/PreviewCopyUrl'

export default function PreviewTitle({ componentTitle, shareUrl }) {
  return (
    <div className="flex items-center gap-2">
      <PreviewCopyUrl shareUrl={shareUrl} />

      <h2 className="text-2xl font-bold text-stone-900">{componentTitle}</h2>
    </div>
  )
}
