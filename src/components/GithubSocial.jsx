import IconGithub from '@component/IconGithub'

export default function GithubSocial() {
  return (
    <a
      href="https://github.com/markmead/hyperui"
      rel="noreferrer"
      target="_blank"
      className="text-gray-900 hover:opacity-75"
    >
      <span className="sr-only"> GitHub </span>

      <IconGithub />
    </a>
  )
}
