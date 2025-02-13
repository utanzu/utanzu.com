import { ReactNode } from 'react'
import type { Course } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import CoursePageSection from '@/components/CoursePageSection'

interface Topic {
  title: string
  subtopics: string[]
}

interface Props {
  children: ReactNode
  content: CoreContent<Course>
}

export default function CourseLayout({ children, content }: Props) {
  const { title, category, image, level, topics, summary } = content

  const formattedTopics: Topic[] =
    Array.isArray(topics) && topics.length > 0
      ? topics.map((topic) => ({
          // @ts-ignore
          title: typeof topic === 'string' ? topic : topic.title, // Ensure title is a string
          // @ts-ignore
          subtopics: Array.isArray(topic.subtopics) ? topic.subtopics : [], // Ensure subtopics is an array
        }))
      : []

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <CoursePageSection
          title={title}
          category={category}
          image={image}
          level={level}
          topics={formattedTopics} // Use transformed topics
          summary={summary}
        ></CoursePageSection>
      </div>
    </>
  )
}
