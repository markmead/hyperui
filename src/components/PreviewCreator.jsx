export default function PreviewCreator({ creatorGithub }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        Created by{' '}
        <a
          href={`https://github.com/${creatorGithub}`}
          target="_blank"
          rel="noreferrer"
          className="underline transition hover:text-gray-600"
        >
          {creatorGithub}
        </a>
      </p>
    </div>
  )
}
