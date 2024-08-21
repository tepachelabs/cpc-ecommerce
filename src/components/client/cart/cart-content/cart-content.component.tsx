'use client'

import Link from 'next/link'
import { FC, useMemo } from 'react'

import { button } from '~/components/atoms/button.cva'
import { useCartContext } from '~/lib/cart.context-provider'

interface Props {
  products: Product[]
}

export const CartContent: FC<Props> = ({ products }) => {
  const { entries, removeItem } = useCartContext()

  /* Generates the query param for the shopify checkout */
  const checkoutLink = useMemo(() => {
    const hashMap = []

    for (const [productId, quantity] of entries) {
      hashMap.push(`${ productId }:${ quantity }`)
    }

    return `https://cultoperrocafe.myshopify.com/cart/${ hashMap.join(',') }`
  }, [entries])

  /* The data needed to display the cart in a human-readable way */
  const cartData = useMemo(() => {
    const data = []

    for (const [variantId, quantity] of entries) {
      const product = products.find(product => {
        return product.variants.some(variant => variant.id === variantId)
      })
      const variant = product!.variants.find(variant => variant.id === variantId)!

      data.push({ product, variant, quantity })
    }

    return data
  }, [entries, products])

  /* Calculates the cart total, considering individual prices from variant times the quantity */
  const cartTotal = useMemo(() => {
    return cartData.reduce((acc, { quantity, variant }) => {
      acc += quantity * (variant?.price || 0)
      return acc
    }, 0)
  }, [cartData])

  return (
    <div>
      <div>
        { cartData.map(({ product, quantity, variant }) => (
          <div key={ variant.id }>
            <span>{ product?.title }</span>
            <span> ({ variant.title })</span>
            <span> x </span>
            <span>{ quantity }</span>
            <span>
              <button className={ button() } onClick={
                () => removeItem(variant.id)
              }>Remove</button>
            </span>
          </div>
        )) }
        <div>
          <p>Total: <b>${ cartTotal }</b></p>
        </div>
      </div>
      <div style={ { marginTop: 24 } }>
        <Link className={ button() } href={ checkoutLink }>Checkout</Link>
      </div>
    </div>
  )
}
