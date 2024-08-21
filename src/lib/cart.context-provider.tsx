'use client'

import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'

// Context type
interface CartContextType {
  entries: Map<Product['id'], number>;
  addItem: (id: Product['id'], quantity?: number) => void;
  removeItem: (id: Product['id']) => void;
  reset: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartContextProps {
}

// Context provider (all the logic goes here)
export const CartContextProvider: FC<PropsWithChildren<CartContextProps>> = ({
  children,
}) => {
  const [entries] = useState<Map<Product['id'], number>>(new Map())

  const addItem = useCallback((id: Product['id'], quantity?: number) => {
    if (entries.has(id)) {
      entries.set(id, entries.get(id)! + (quantity || 1))
    } else {
      entries.set(id, quantity || 1)
    }
  }, [entries])

  const removeItem = useCallback((id: Product['id']) => {
    entries.delete(id)
  }, [entries])

  const reset = useCallback(() => {
    entries.clear()
  }, [entries])

  const value = useMemo(() => ({
    entries,
    addItem,
    removeItem,
    reset,
  }), [addItem, entries, removeItem, reset])

  return (
    <CartContext.Provider value={ value }>
      { children }
    </CartContext.Provider>
  )
}

// Hook to use the context
export const useCartContext = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartContextProvider')
  }

  return context
}
