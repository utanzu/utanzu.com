import { ReactNode } from 'react'
import type { Course } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import CoursePageSection from '@/components/CoursePageSection'

interface Props {
  children: ReactNode
  content: CoreContent<Course>
}

export default function CourseLayout({ children, content }: Props) {
  const { title, category, image, level, topics, summary } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <CoursePageSection
          title={title}
          category={category}
          image={image}
          level={level}
          topics={topics}
          summary={summary}
        >
          {children}
        </CoursePageSection>
      </div>
    </>
  )
}
