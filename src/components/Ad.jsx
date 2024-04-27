export default function Ad({ adStyle, isCenter = false }) {
  return (
    <div className={`not-prose max-w-lg ${isCenter && 'mx-auto text-center'}`}>
      <div
        data-ea-publisher="hyperuidev"
        data-ea-type="image"
        data-ea-style={adStyle}
        className="bordered horizontal [&_.ea-callout]:!mb-0 [&_.ea-content]:!mx-0 [&_.ea-content]:!mt-0 [&_.ea-stickybox-hide]:hidden"
      ></div>
    </div>
  )
}
