import type { FunctionComponent } from 'react'

const Announcement: FunctionComponent = () => (
  <aside className="p-4 text-center text-white bg-black">
    <p className="ml-3 text-sm font-medium text-center">
      <a
        href="https://liquid.hyperui.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center underline"
      >
        Shopify Developer? Checkout Liquid HyperUI 🛍️
      </a>
    </p>
  </aside>
)

export default Announcement
