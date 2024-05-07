export default function Announcement() {
  return (
    <div className="fixed bottom-4 z-50 p-4" role="alert">
      <div className="max-w-md rounded-md border-2 border-gray-900 bg-white p-4 shadow-lg">
        <p className="text-center text-lg font-medium text-gray-900">
          New eBook has launched! Build your own HyperUI style website with Next JS, Tailwind CSS
          and MDX!
          <div className="mt-2 flex items-center gap-2">
            <a
              href="https://markmdev.gumroad.com/l/hyperui-clone"
              target="_blank"
              rel="noreferrer"
              className="block flex-1 rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800"
            >
              I want this!
            </a>

            <span className="shrink-0">or</span>

            <a
              href="https://markmdev.gumroad.com/subscribe"
              target="_blank"
              rel="noreferrer"
              className="block flex-1 rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800"
            >
              Subscribe
            </a>
          </div>
        </p>
      </div>
    </div>
  )
}
