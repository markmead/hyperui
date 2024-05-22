import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import ProductGrid from '@component/ProductGrid'

export default function Page() {
  return (
    <>
      <HeroBanner title="Shop" subtitle="Browse the Collection of Tailwind CSS Products" />

      <Container id="mainContent" classNames="py-8 lg:py-12">
        <ProductGrid />
      </Container>
    </>
  )
}
