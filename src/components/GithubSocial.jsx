import { useEffect, useState } from 'react'

import { useEffectOnce } from 'react-use'

import IconGithub from '@component/IconGithub'

export default function GithubSocial() {
  const [starCount, setStarCount] = useState(0)

  useEffectOnce(() => {
    async function fetchData() {
      try {
        const githubResponse = await fetch(
          'https://api.github.com/repos/markmead/hyperui'
        )

        const { stargazers_count: stargazeCount } = await githubResponse.json()

        setStarCount(stargazeCount)

        // eslint-disable-next-line no-empty
      } catch {}
    }

    fetchData()
  })

  useEffect(() => {
    const formattedStarCount = `${(starCount / 1000).toFixed(1)}K`

    setStarCount(formattedStarCount)
  }, [starCount])

  return (
    <a
      href="https://github.com/markmead/hyperui"
      rel="noreferrer"
      target="_blank"
      className="inline-flex items-center gap-1 text-gray-900 hover:opacity-75"
    >
      <span className="sr-only"> GitHub </span>

      <IconGithub />

      {!!starCount && (
        <span className="text-sm/none font-medium">{starCount}</span>
      )}
    </a>
  )
}
