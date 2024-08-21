import { log } from '@logtail/next'
import Image from 'next/image'

import { CartContextProvider } from '~/lib/cart.context-provider'
import { getBaseUrl } from '~/lib/utils'

export default async function ProductDisplayPage ({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const image = product.image

  return (
    <CartContextProvider>
      <h1>{ product.title }</h1>
      { image && (
        <Image
          src={ image.src }
          width={ 500 }
          height={ 500 }
          alt={ product.title }
        />
      ) }
      <p>This is the product display page</p>
    </CartContextProvider>
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

