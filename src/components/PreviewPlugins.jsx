export default function PreviewPlugins({ componentPlugins }) {
  return (
    <p className="text-stone-700">
      Plugins:{' '}
      {componentPlugins.map((componentPlugin, pluginIndex) => (
        <span key={pluginIndex}>
          <a
            href={`https://npmjs.com/${componentPlugin}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline transition-colors hover:text-stone-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
          >
            {componentPlugin}
          </a>

          {pluginIndex < componentPlugins.length - 1 && ', '}
        </span>
      ))}
    </p>
  )
}
