'use client'

import Link from 'next/link'
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
    <Link className={ button } href='/cart'>
      <p>Cart ({ total })</p>
    </Link>
  )
}
