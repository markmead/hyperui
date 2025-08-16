export default function HeaderCta() {
  return (
    <section className="-mt-px border-y border-gray-300 bg-gray-50">
      <div className="mx-auto flex max-w-screen-xl justify-center px-4 py-2">
        <a
          href="https://github.com/markmead/hyperui"
          rel="noreferrer"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 text-gray-700 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
        >
          <span className="text-sm/none font-medium">Enjoy HyperUI? Give it a star on GitHub</span>

          <span aria-hidden="true">🎉</span>
        </a>
      </div>
    </section>
  )
}
