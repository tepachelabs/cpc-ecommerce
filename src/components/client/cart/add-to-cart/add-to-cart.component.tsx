'use client'

import { FC } from 'react'

import { useCartContext } from '~/lib/cart.context-provider'

interface Props {
  productId: Product['id'],
  quantity?: number
}

export const AddToCard: FC<Props> = ({ productId, quantity = 1 }) => {
  const { addItem } = useCartContext()

  return (
    <button onClick={ () => addItem(productId, quantity) }>
      <p>Add to cart</p>
    </button>
  )
}
