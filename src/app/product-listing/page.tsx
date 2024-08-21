import Link from 'next/link'

import { Section } from '~/components/atoms/section.component'
import { PageLayout } from '~/components/page-layout'
import { getAllProducts } from '~/lib/api.requests'

export default async function ProductListingPage () {
  const products = await getAllProducts()

  if (!products) {
    return <p>Could not fetch products</p>
  }

  const collections = groupProductsByCollection(products)

  return (
    <PageLayout>
      <Section title="Product Listing">
        { ['coffee', 'misc', 'merch'].map((collection) => (
          <div key={ collection } style={ { marginBottom: 16 } }>
            <h3>{ collection }</h3>
            <ul>
              { collections[collection].map((product) => (
                <li key={ product.id }>
                  <Link href={ `/product-display/${ product.id }` }>
                    <b>{ product.title }</b>
                  </Link>
                </li>
              ))
              }
            </ul>
          </div>
        )) }
      </Section>
    </PageLayout>
  )
}

function groupProductsByCollection (products: Product[]) {
  return products.reduce((acc, product) => {
    if (!acc[product.collection]) {
      acc[product.collection] = []
    }

    acc[product.collection].push(product)

    return acc
  }, {} as Record<string, Product[]>)
}
