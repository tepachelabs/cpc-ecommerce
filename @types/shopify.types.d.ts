type Product = {
  id: number
  title: string
  variants: ProductVariant[],
  options: ProductOption[],
  image?: Image
  /* NOTE: collection is not part of the shopify payload */
  collection: 'coffee' | 'merch' | 'misc'
}

type Image = {
  id: string;
  src: string;
  height: number;
  width: number;
}

type ProductVariant = {
  id: number
  title: string
  price: number
  position: number
  [key: `option${ number }`]: string
}

type ProductOption = {
  id: number,
  name: string,
  position: number,
  values: string[]
}
