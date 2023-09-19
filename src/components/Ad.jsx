export default function Ad({ adType, adClass, adId }) {
  return (
    <div className="not-prose mx-auto max-w-lg text-center">
      <div
        data-ea-publisher="hyperuidev"
        data-ea-type={adType}
        className={`${adClass} [&_.ea-callout]:!mb-0 [&_.ea-content]:!mx-0 [&_.ea-content]:!mt-0`}
        id={adId}
      ></div>
    </div>
  )
}
