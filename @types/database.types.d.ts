type Product = {
  id: string
  title: string
  variants?: ProductVariant[],
  options?: ProductOption[],
  image?: Image
  collection: 'coffee' | 'merch' | 'misc'
}

type Image = {
  id: string;
  src: string;
  height: number;
  width: number;
}

type ProductVariant = {
  id: string
  title: string
  price: number
  position: number
}

type ProductOption = {
  id: number,
  name: string,
  position: number,
  values: string[]
}
