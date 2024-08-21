import { log } from '@logtail/next'
import Image from 'next/image'

import { Section } from '~/components/atoms/section.component'
import { AddToCard } from '~/components/client/cart/add-to-cart'
import { PageLayout } from '~/components/page-layout'
import { getBaseUrl } from '~/lib/utils'

export default async function ProductDisplayPage ({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const image = product.image

  return (
    <PageLayout>
      <Section title={ product.title } size="compact">
        <p>This is the product display page</p>

        <AddToCard productId={product.id} quantity={1} />

        { image && (
          <Image
            src={ image.src }
            width={ 500 }
            height={ 500 }
            alt={ product.title }
          />
        ) }
      </Section>
    </PageLayout>
  )
}

async function getProduct (id: string): Promise<Product> {
  try {
    const fetchResponse = await fetch(`${ getBaseUrl() }/api/products/${ id }`, { next: { tags: ['prices'] } })

    if (!fetchResponse.ok) {
      throw new Error('Could not fetch product')
    }

    return await fetchResponse.json()
  } catch (error) {
    // @ts-ignore
    log.error(error)
    throw new Error('Could not fetch product')
  }
}

