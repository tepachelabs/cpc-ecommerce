import { log } from '@logtail/next'

import { getBaseUrl } from '~/lib/utils'

export async function getAllProducts (): Promise<Product[]> {
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

export async function getProductById (id: string): Promise<Product> {
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
