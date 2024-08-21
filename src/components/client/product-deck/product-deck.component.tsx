'use client'

import { FC, useMemo, useState } from 'react'

import { AddToCard } from '~/components/client/cart/add-to-cart'

interface Props {
  product: Product
}

export const ProductDeck: FC<Props> = ({ product }) => {
  const defaultOption = product.options.reduce((acc, option) => {
    acc[option.position] = option.values[0]
    return acc
  }, {} as Record<number, string>)

  const [options, setOptions] = useState(defaultOption!)

  const selectedVariant = useMemo(
    () => getSelectedVariant(product, options),
    [options, product],
  )

  function updateOption (position: number, value: string) {
    setOptions({
      ...options,
      [position]: value,
    })
  }

  return (
    <div style={ { position: 'absolute', width: 420, right: 0 } }>
      <div>Product Deck</div>
      <div>
        {
          product.options.map(option => (
            <div key={ option.id } style={ { marginBottom: 16 } }>
              <h4>{ option.name }</h4>
              <select
                value={ options[option.position] }
                onChange={ (event) => {
                  const { value } = event.target
                  updateOption(option.position, value)
                } }>
                { option.values.map(value => (
                  <option key={ value }>{ value }</option>
                )) }
              </select>
            </div>
          ))
        }
      </div>
      <div>
        { selectedVariant && <AddToCard productId={ selectedVariant.id } quantity={ 1 }/> }
      </div>
    </div>
  )
}

function getSelectedVariant (product: Product, options: Record<number, string>): ProductVariant | undefined {
  return product.variants.find(variant => Object.keys(options).every((key, index) => {
    const optionKey = `option${ index + 1 }` as keyof ProductVariant
    return variant[optionKey] === options[Number(key)]
  }))
}
