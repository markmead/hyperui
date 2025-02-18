interface Props {
  creatorGithub: string
}

export default function PreviewCreator({ creatorGithub }: Props) {
  return (
    <p className="text-sm text-gray-700">
      Created by{' '}
      <a
        href={`https://github.com/${creatorGithub}`}
        target="_blank"
        rel="noreferrer"
        className="inline-block font-medium underline underline-offset-2 transition hover:text-gray-900 hover:no-underline"
      >
        {creatorGithub}
      </a>
    </p>
  )
}
