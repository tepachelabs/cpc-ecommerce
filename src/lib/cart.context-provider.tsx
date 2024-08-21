'use client'

import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'
import { useBoolean } from 'usehooks-ts'

// Context type
interface CartContextType {
  usd: number;
  mxn: number;
  isDirty: boolean;
  setUsd: (price: number) => void;
  setMxn: (price: number) => void;
  reset: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartContextProps {
}

// Context provider (all the logic goes here)
export const CartContextProvider: FC<PropsWithChildren<CartContextProps>> = ({
  children,
}) => {
  const { setFalse, setTrue: setIsDirty, value: isDirty } = useBoolean(false)
  const [usd, setUsd] = useState<number>(1)
  const [mxn, setMxn] = useState<number>(0)

  const setWithDirtyStatus = useMemo(() => (fn: any) => (args: any) => {
    setIsDirty()
    fn(args)
  }, [setIsDirty])

  const reset = useCallback(() => {
    setFalse()
    setUsd(1)
    setMxn(0)
  }, [setFalse])

  const value = useMemo(() => ({
    usd,
    mxn,
    isDirty,
    setUsd: setWithDirtyStatus(setUsd),
    setMxn: setWithDirtyStatus(setMxn),
    reset,
  }), [isDirty, mxn, reset, setWithDirtyStatus, usd])

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
