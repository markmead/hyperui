import { useEffect, useState } from 'react'

import IconGithub from '@component/IconGithub'

export default function GithubSocial() {
  const [starCount, setStarCount] = useState('')

  useEffect(() => {
    const cachedStarCount = sessionStorage.getItem('GitHubStarCount')

    if (cachedStarCount) {
      setStarCount(cachedStarCount)

      return
    }

    async function fetchData() {
      try {
        const githubResponse = await fetch(
          'https://api.github.com/repos/markmead/hyperui'
        )

        const { stargazers_count: stargazeCount } = await githubResponse.json()

        setStarCount(stargazeCount)

        sessionStorage.setItem('GitHubStarCount', `${stargazeCount}`)
        // eslint-disable-next-line no-empty
      } catch {}
    }

    fetchData()
  }, [])

  return (
    <a
      href="https://github.com/markmead/hyperui"
      rel="noreferrer"
      target="_blank"
      className="inline-flex items-center gap-1 text-gray-900 hover:opacity-75"
    >
      <span className="sr-only"> GitHub </span>

      <IconGithub />

      {!!starCount && <span className="text-sm font-medium">{starCount}</span>}
    </a>
  )
}
