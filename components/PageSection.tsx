import { ReactNode } from 'react'
import Image from '@/components/Image'
import PageHeading from '@/components/PageHeading'
import Link from '@/components/Link'

interface Props {
  children: ReactNode
  title: string
  image: string
  tags?: string[]
}

export default function PageSection({ title, image, tags, children }: Props) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageHeading title={title}>
        <div className="flex flex-col items-center space-x-0 pt-8 xl:flex-row xl:items-start xl:space-x-8">
          <div className="flex flex-col justify-center xl:w-1/3 xl:justify-start">
            <Image src={image} alt="avatar" width={400} height={306} className="h-auto w-full" />
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            {tags && (
              <div className="py-2">
                <h2 className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Tags
                </h2>
                <div className="flex flex-wrap">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="mr-3 text-xs font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {tag.split(' ').join('-')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <h3 className="mb-2 mt-2 text-lg font-semibold text-gray-900 dark:text-white">
              Start Learing
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Dive in to become a leader in {title}.
            </p>
            <Link
              href={`/courses?category=${title}`}
              className="my-6 w-1/3 rounded border border-primary-500 bg-transparent px-4 py-1 text-sm font-semibold text-primary-500 hover:border-transparent hover:bg-orange-500 hover:text-black dark:hover:text-white"
            >
              Go to Courses
            </Link>
          </div>
          <div className="prose max-w-none pb-8 dark:prose-dark xl:w-2/3 xl:pb-0 xl:pt-0">
            {children}
          </div>
        </div>
      </PageHeading>
    </div>
  )
}
