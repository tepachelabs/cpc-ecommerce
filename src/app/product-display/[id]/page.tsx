import Image from 'next/image'

import { Section } from '~/components/atoms/section.component'
import { AddToCard } from '~/components/client/cart/add-to-cart'
import { PageLayout } from '~/components/page-layout'
import { getProductById } from '~/lib/api.requests'

export default async function ProductDisplayPage ({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  const image = product.image

  return (
    <PageLayout>
      <Section title="Product Display">
        <h3>{ product.title }</h3>

        <AddToCard productId={ product.id } quantity={ 1 }/>

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
