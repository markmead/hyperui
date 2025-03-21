export default function PreviewPlugins({ componentPlugins }) {
  return (
    <div>
      <p className="text-sm text-gray-700">
        Plugins:{' '}
        {componentPlugins.map((componentPlugin, pluginIndex) => (
          <span>
            <a
              href={`https://npmjs.com/${componentPlugin}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block font-medium underline underline-offset-2 transition hover:text-gray-900 hover:no-underline"
            >
              {componentPlugin}
            </a>

            {pluginIndex < componentPlugins.length - 1 && ', '}
          </span>
        ))}
      </p>
    </div>
  )
}
