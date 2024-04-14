export default function Announcement() {
  return (
    <div className="fixed bottom-4 z-50 p-4" role="alert">
      <div className="max-w-sm rounded-md border-2 border-gray-900 bg-white p-4 shadow-lg">
        <p className="text-lg font-medium text-gray-900">
          Potential changes coming to HyperUI, have your say in the{' '}
          <a
            href="https://github.com/markmead/hyperui/discussions"
            target="_blank"
            rel="noreferrer"
            className="underline hover:no-underline"
          >
            GitHub Discussions
          </a>
          .
        </p>
      </div>
    </div>
  )
}
