export default function Announcement() {
  return (
    <div className="fixed bottom-4 z-50 p-4" role="alert">
      <div className="max-w-sm rounded-md border-2 border-gray-900 bg-white p-4 shadow-lg">
        <p className="text-lg font-medium text-gray-900">
          I'm currently working on a new course! Subscribe on Gumroad to find out when it launches!
          <a
            href="https://markmdev.gumroad.com/subscribe"
            target="_blank"
            rel="noreferrer"
            className="mt-4 block rounded-md bg-black px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-black/90"
          >
            Subscribe!{' '}
            <span aria-hidden="true" role="img">
              🚀
            </span>
          </a>
        </p>
      </div>
    </div>
  )
}
