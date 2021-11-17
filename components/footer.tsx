import { FunctionComponent } from 'react'

const Footer: FunctionComponent = () => {
  return (
    <footer className="border-t border-gray-100">
      <div className="container py-6">
        <p className="text-sm text-center text-gray-500">
          Created with 💖 by{' '}
          <a
            href="https://twitter.com/itsmarkmead"
            rel="noreferrer"
            target="_blank"
            className="underline"
          >
            @itsmarkmead
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
