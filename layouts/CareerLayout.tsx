import { ReactNode } from 'react'
import type { Career } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import PageSection from '@/components/PageSection'

interface Props {
  children: ReactNode
  content: CoreContent<Career>
}

export default function CareerLayout({ children, content }: Props) {
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
