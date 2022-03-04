import { FunctionComponent } from 'react'

const Footer: FunctionComponent = () => {
  return (
    <footer className="border-t-2 border-gray-100">
      <div className="max-w-screen-xl px-4 py-6 mx-auto">
        <p className="text-sm text-center text-gray-500">
          Created with 💖 by{' '}
          <a
            className="underline"
            href="https://twitter.com/itsmarkmead"
            rel="noopener noreferrer"
            target="_blank"
          >
            @itsmarkmead
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
