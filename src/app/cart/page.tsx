import { Section } from '~/components/atoms/section.component'
import { CartContent } from '~/components/client/cart/cart-content'
import { PageLayout } from '~/components/page-layout'
import { getAllProducts } from '~/lib/api.requests'

export default async function ProductListingPage () {
  const products = await getAllProducts()

  if (!products) {
    return <p>Could not fetch products</p>
  }

  return (
    <PageLayout>
      <Section title="Cart">
        <CartContent products={products} />
      </Section>
    </PageLayout>
  )
}

