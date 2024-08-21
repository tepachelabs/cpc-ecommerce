'use client'

import { FC, useMemo } from 'react'

import { useCartContext } from '~/lib/cart.context-provider'

import { button } from './cart-status.styles'

export const CartStatus: FC = () => {
  const { entries } = useCartContext()

  const total = useMemo(() => {
    let total = 0

    for (const [, quantity] of entries) {
      total += quantity
    }

    return total
  }, [entries])

  return (
    <button onClick={ () => {
    } } className={ button }>
      <p>Cart ({ total })</p>
    </button>
  )
}
