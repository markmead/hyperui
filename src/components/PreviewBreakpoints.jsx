import PreviewBreakpoint from '@component/PreviewBreakpoint'

export default function PreviewBreakpoints({ previewWidth, setPreviewWidth }) {
  const componentBreakpoints = [
    {
      name: 'Mobile',
      emoji: '📱',
      width: '340px',
    },
    {
      name: 'Small',
      emoji: '🐛',
      width: '640px',
    },
    {
      name: 'Medium',
      emoji: '🦭',
      width: '768px',
    },
    {
      name: 'Large',
      emoji: '🐴',
      width: '1024px',
    },
    {
      name: 'Full',
      emoji: '🌕',
      width: '100%',
    },
  ]

  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-2">
      <p className="text-sm font-medium text-gray-700">@ {previewWidth}</p>

      {componentBreakpoints.map(
        ({ name: breakpointName, emoji: breakpointEmoji, width: breakpointWidth }) => (
          <PreviewBreakpoint
            key={breakpointName}
            breakpointText={breakpointName}
            breakpointEmoji={breakpointEmoji}
            breakpointWidth={breakpointWidth}
            handleSetPreviewWidth={setPreviewWidth}
            breakpointActive={previewWidth === breakpointWidth}
          />
        )
      )}
    </div>
  )
}
