export default function PreviewCreator({ creatorGithub }) {
  return (
    <div>
      <p className="text-sm text-gray-700">
        Created by{' '}
        <a
          href={`https://github.com/${creatorGithub}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block font-medium no-underline transition hover:text-gray-900"
        >
          {creatorGithub}
        </a>
      </p>
    </div>
  )
}
