import { FC, useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'

import { IconChevronUp } from '~/components/icons'

import { button } from './to-top.styles'

const heightLimit = 500

export const ToTop: FC = () => {
  const { setValue: setIsVisible, value: isVisible } = useBoolean(false)

  function scrollToTop () {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  function listenToScroll () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop

    if (winScroll > heightLimit) {
      !isVisible && setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () =>
      window.removeEventListener('scroll', listenToScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      { isVisible && (
        <button onClick={ scrollToTop } className={ button }>
          <IconChevronUp/>
          <p>Ir arriba</p>
        </button>
      ) }
    </>
  )
}
