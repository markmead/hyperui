import GitHub from '@/components/BrandGithub'
import Logo from '@/components/BrandLogo'

function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-screen-xl px-4 py-12 mx-auto">
        <Logo fontSize="text-lg" />

        <div className="mt-6 lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="max-w-md leading-relaxed text-gray-500">
              Free open source Tailwind CSS components for marketing and
              eCommerce websites, as well as application UI.
            </p>

            <div className="mt-4">
              <GitHub />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500 lg:mt-0">
            Created by Mark Mead.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
