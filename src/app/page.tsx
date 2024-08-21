export const revalidate = 5

import Link from 'next/link'

import { CartContextProvider } from '~/lib/cart.context-provider'

export default async function Home () {
  return (
    <CartContextProvider>
      <h1>Homepage</h1>
      <p>This is the homepage</p>
      <ul>
        <li>
          <Link href="/product-listing">Product Listing</Link>
        </li>
      </ul>
    </CartContextProvider>
  )
}
