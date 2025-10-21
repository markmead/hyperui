export default function PreviewContributors({ componentContributors }) {
  return (
    <p className="text-stone-700">
      Contributors:{' '}
      {componentContributors
        .map((contributorGithub) => (
          <a
            key={contributorGithub}
            href={`https://github.com/${contributorGithub}`}
            rel="noreferrer"
            target="_blank"
            className="font-medium underline transition-colors hover:text-stone-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
          >
            {contributorGithub}
          </a>
        ))
        .reduce((prevElement, currentElement) => [prevElement, ', ', currentElement])}
    </p>
  )
}
