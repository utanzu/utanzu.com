'use client'
import { ReactNode, useState } from 'react'
import type { Career } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import PageHeading from '@/components/PageHeading'

interface Props {
  children: ReactNode
  content: CoreContent<Career>
}

export default function PageLayout({ children, content }: Props) {
  const { heading, title, summary, path } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <PageHeading title={title}>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">{children}</div>
        </PageHeading>
      </div>
    </>
  )
}
