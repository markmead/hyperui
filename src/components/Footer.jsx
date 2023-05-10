import Container from '@component/Container'
import BrandLogo from '@component/BrandLogo'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container classNames="py-8 lg:py-12">
        <BrandLogo fontSize="text-lg" />

        <div className="mt-6 lg:flex lg:items-end lg:justify-between">
          <p className="max-w-md leading-relaxed text-gray-600">
            Free open source Tailwind CSS components for marketing and eCommerce
            websites, as well as application UI.
          </p>

          <p className="mt-4 text-sm text-gray-600">Created by Mark Mead.</p>
        </div>
      </Container>
    </footer>
  )
}
