import { ReactNode, useState } from 'react'
import type { Career } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import PageHeading from '@/components/PageHeading'
import PageSection from '@/components/PageSection'

interface Props {
  children: ReactNode
  content: CoreContent<Career>
}

export default function PageLayout({ children, content }: Props) {
  const { title = '', image = '', tags } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <PageSection title={title} image={image} tags={tags}>
          {children}
        </PageSection>
      </div>
    </>
  )
}
