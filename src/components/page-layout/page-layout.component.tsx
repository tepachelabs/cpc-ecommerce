'use client'

import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import { useTransition } from 'react-transition-state'

import { IconMenu } from '~/components/icons'

import {
  wrapper,
  header,
  logo,
  mainNav,
  nav,
  navTrigger,
  footer,
  footerNav,
  row,
  animatedNav,
} from './page-layout.styles'
import { CartStatus } from '../client/cart/cart-status'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Listing', path: '/product-listing' },
  { label: 'Cart', path: '/cart' },
]

const footerItems = [
  { label: 'Acerca', path: '#1' },
  { label: 'Términos', path: '#2' },
  { label: 'Privacidad', path: '#3' },
]

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const [{ isEnter, status }, toggle] = useTransition({
    timeout: { enter: 250, exit: 250 },
    preEnter: true,
  })

  return (
    <>
      <header className={ header }>
        <div className={ row }>
          <div className={ wrapper }>
            <Link href="/" onClick={ () => toggle(false) } className={ logo }>
              <h1>Known Ecommerce Platform</h1>
            </Link>
            <button className={ navTrigger({ isEnter }) } onClick={ () => toggle() }>
              <IconMenu/>
            </button>
          </div>
          <div className={ animatedNav({ show: status }) }>
            <nav className={ nav }>
              <ul className={ mainNav }>
                { navItems.map(({ label, path }) => (
                  <li key={ path }>
                    <Link href={ path } onClick={ () => toggle(false) }>{ label }</Link>
                  </li>
                )) }
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        { children }
        <CartStatus />
      </main>

      <footer className={ footer }>
        <div className={ wrapper }>
          <h1 className={ logo }>Known Ecommerce Platform</h1>
          <div>
            <ul className={ footerNav }>
              { footerItems.map(({ label, path }) => (
                <li key={ path }>
                  <Link href={ path }>{ label }</Link>
                </li>
              )) }
            </ul>
            <p>&copy; 2020-{new Date().getFullYear()} TepacheLabs. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
