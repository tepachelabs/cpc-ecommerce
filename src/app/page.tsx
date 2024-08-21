export const revalidate = 5

import Link from 'next/link'

import { Section } from '~/components/atoms/section.component'
import { PageLayout } from '~/components/page-layout'

export default async function Home () {
  return (
    <PageLayout>
      <Section title="Homepage">
        <ul>
          <li>
            <Link href="/product-listing">Product Listing</Link>
          </li>
        </ul>
      </Section>
    </PageLayout>
  )
}
