import Container from '@component/Container'

export default function HeaderBanner() {
  return (
    <section className="-mt-px border-y border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
      <Container classNames="py-2">
        <a
          href="https://github.com/markmead/hyperui"
          rel="noreferrer"
          target="_blank"
          className="flex items-center justify-center gap-1.5 transition hover:opacity-75"
        >
          <span className="text-sm/none font-medium text-gray-900 dark:text-white">
            Enjoy HyperUI? Give it a star on GitHub
          </span>

          <span aria-hidden="true" role="img">
            🎉
          </span>
        </a>
      </Container>
    </section>
  )
}
