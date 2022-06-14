import { FunctionComponent } from 'react'

const Footer: FunctionComponent = () => {
  return (
    <footer className="border-t border-gray-50">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="py-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm text-gray-700">
            Created by{' '}
            <a
              href="https://twitter.com/itsmarkmead"
              className="font-medium underline"
              target="_blank"
              rel="noreferrer"
            >
              Mark Mead
            </a>
          </p>

          <p className="mt-4 text-sm text-gray-700 sm:mt-0">
            Built with Next JS, Tailwind CSS and hosted on Vercel.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
