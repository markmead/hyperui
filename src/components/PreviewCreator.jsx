export default function PreviewCreator({ creatorGithub }) {
  return (
    <p className="text-stone-700">
      Creator:{' '}
      <a
        href={`https://github.com/${creatorGithub}`}
        rel="noreferrer"
        target="_blank"
        className="font-medium underline transition-colors hover:text-stone-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
      >
        {creatorGithub}
      </a>
    </p>
  )
}
