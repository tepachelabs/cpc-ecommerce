export const revalidate = 5

import { log } from '@logtail/next'
import Link from 'next/link'

import { Section } from '~/components/atoms/section.component'
import { PageLayout } from '~/components/page-layout'
import { getBaseUrl } from '~/lib/utils'

interface Data {
  'coffee': Product[],
  'merch': Product[],
  'misc': Product[],
}

export default async function ProductListingPage () {
  const data = await getProducts()

  if (!data) {
    return <p>Could not fetch products</p>
  }

  return (
    <PageLayout>
      <Section title="Products">
        <p>This is the product listing page</p>
        <ul>
          { data.coffee.map((product) => (
            <li key={ product.id }>
              <Link href={ `/product-display/${ product.id }` }>
                <b>{ product.title }</b>
              </Link>
            </li>
          )) }
        </ul>
      </Section>
    </PageLayout>
  )
}

async function getProducts (): Promise<Data> {
  try {
    const fetchResponse = await fetch(`${ getBaseUrl() }/api/products`, {
      next: {
        tags: ['products'],
      },
    })

    if (!fetchResponse.ok) {
      throw new Error('Could not fetch products')
    }

    return await fetchResponse.json()
  } catch (error) {
    // @ts-ignore
    log.error(error)
    throw new Error('Could not fetch products')
  }
}

