'use client'

import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import PageHeading from '@/components/PageHeading'
import { allItems as items } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { useAuth } from 'app/hooks/useAuth'
import CourseVideo from './CourseVideo'
import CourseContent from './CourseContent'

interface Props {
  title: string
  category: string
  image: string
  level: string
  topics: { title: string; subtopics: string[] }[]
  summary: string
}

export default function CoursePageSection({ title, topics, summary }: Props) {
  const { user, loading } = useAuth()
  const [selectedSubtopic, setSelectedSubtopic] = useState('')
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const [subtopicContent, setSubtopicContent] = useState<string | null>(null)
  const [checkedSubtopics, setCheckedSubtopics] = useState<Record<string, boolean>>({})
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)

  const getUserCourses = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/v1/courses/${id}`)
        if (!response.ok) {
          const errorData = await response.json()
          console.error(`Error: ${errorData.message}`)
          return
        }

        const data = await response.json()
        const completedSubtopics = data.map((course) => course.subtopic)

        const newCheckedState: Record<string, boolean> = {}
        topics.forEach((topic) => {
          topic.subtopics.forEach((subtopic) => {
            newCheckedState[subtopic] = completedSubtopics.includes(subtopic)
          })
        })

        setCheckedSubtopics(newCheckedState)
      } catch (error) {
        console.error(`Network Error: ${(error as Error).message}`)
      }
    },
    [topics]
  )

  useEffect(() => {
    if (!loading && user && user.id) {
      getUserCourses(user.id)
    }
  }, [loading, user, getUserCourses])

  useEffect(() => {
    if (topics.length > 0) {
      const firstTopic = topics[0]
      const firstSubtopic = firstTopic.subtopics[0]
      setExpandedTopic(firstTopic.title)
      setSelectedSubtopic(firstSubtopic)

      const matchedItem = items.find((item) => item.title === firstSubtopic)
      setSubtopicContent(
        matchedItem ? matchedItem.body.code : 'Content not found for the selected subtopic.'
      )
    }
  }, [topics])

  const handleTopicToggle = (topic: string) => {
    setExpandedTopic((prev) => (prev === topic ? null : topic))
  }

  const handleSubtopicClick = (subtopic: string) => {
    setSelectedSubtopic(subtopic)

    const matchedItem = items.find((item) => item.title === subtopic)
    const newContent = matchedItem
      ? matchedItem.body.code
      : 'Content not found for the selected subtopic.'
    if (newContent !== subtopicContent) {
      setSubtopicContent(newContent)
    }
  }

  const handleCheckboxChange = (subtopic: string) => {
    setCheckedSubtopics((prevState) => {
      const newState = { ...prevState, [subtopic]: !prevState[subtopic] }
      saveLearningProgress(title, expandedTopic, subtopic)
      return newState
    })
  }

  const saveLearningProgress = async (title, topic, subtopic) => {
    if (user) {
      const submitData = {
        title: title,
        topic: topic,
        subtopic: subtopic,
        user: user.id,
      }
      try {
        const response = await fetch('/api/v1/courses/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        })
        if (!response.ok) {
          const errorData = await response.json()
          console.error(`Error: ${errorData.message}`)
          return
        }
        //console.log(`Success: ${data.message}`)
      } catch (error) {
        console.error(`Network Error: ${(error as Error).message}`)
      }
    }
  }

  const handleNextSubtopic = () => {
    if (!selectedSubtopic) return

    const allSubtopics = topics.flatMap((topic) => topic.subtopics)
    const currentIndex = allSubtopics.indexOf(selectedSubtopic)

    if (currentIndex !== -1 && currentIndex < allSubtopics.length - 1) {
      const nextSubtopic = allSubtopics[currentIndex + 1]
      handleSubtopicClick(nextSubtopic)
    }
  }

  const handlePreviousSubtopic = () => {
    if (!selectedSubtopic) return

    const allSubtopics = topics.flatMap((topic) => topic.subtopics)
    const currentIndex = allSubtopics.indexOf(selectedSubtopic)

    if (currentIndex > 0) {
      const previousSubtopic = allSubtopics[currentIndex - 1]
      handleSubtopicClick(previousSubtopic)
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageHeading title={title}>
        <p className="py-2 text-base font-semibold text-gray-600 dark:text-gray-400">{summary}</p>
        <div className="flex flex-col gap-6 py-6 md:flex-row-reverse">
          {/* Sidebar on the right */}
          <aside
            className={`transition-all duration-300 ${
              isSidebarCollapsed ? 'w-16' : 'w-80'
            } overflow-hidden md:block`}
          >
            <div className="relative rounded-md bg-white p-4 dark:bg-gray-900">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="mr-2 rounded-full p-1 text-white"
                >
                  <FontAwesomeIcon
                    className="text-primary-600 dark:text-primary-400"
                    icon={isSidebarCollapsed ? faChevronCircleLeft : faChevronCircleRight}
                    size="xl"
                  />
                </button>
                {isSidebarCollapsed ? '' : 'Course Content'}
              </h2>
              {!isSidebarCollapsed && (
                <ul className="space-y-2">
                  {topics.map((topic) => (
                    <li key={topic.title}>
                      <button
                        onClick={() => handleTopicToggle(topic.title)}
                        className={`flex w-full items-center justify-between rounded-sm px-4 py-2 text-left text-sm font-medium transition-colors ${
                          expandedTopic === topic.title
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-primary-200 hover:text-white dark:bg-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {topic.title}
                      </button>
                      {expandedTopic === topic.title && (
                        <ul className="mt-2 space-y-1 pl-6">
                          {topic.subtopics.map((subtopic) => (
                            <li key={subtopic} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={checkedSubtopics[subtopic] || false}
                                onChange={() => handleCheckboxChange(subtopic)}
                                className="h-5 w-5 rounded-sm border-gray-300 checked:border-primary-700 checked:bg-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:checked:border-secondary-600"
                              />
                              <button
                                onClick={() => handleSubtopicClick(subtopic)}
                                className={`w-full rounded-sm px-4 py-1 text-left text-sm transition-colors ${
                                  selectedSubtopic === subtopic
                                    ? 'bg-gray-400 font-semibold text-white'
                                    : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                              >
                                {subtopic}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>

          {/* Content Section on the left */}
          <main className="flex-1 rounded-md bg-white shadow-md dark:bg-gray-900">
            {selectedSubtopic && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {selectedSubtopic}
                </h2>
                <div className="prose flex max-w-full flex-col dark:prose-dark prose-h3:my-4 prose-h3:text-secondary-600 prose-h4:my-2 prose-p:my-1 prose-table:my-3 dark:prose-h3:text-secondary-600">
                  {subtopicContent && (
                    <MDXLayoutRenderer
                      code={subtopicContent}
                      components={{
                        ...components,
                        CourseVideo: (props) => (
                          <CourseVideo
                            {...props}
                            onNext={handleNextSubtopic}
                            onPrevious={handlePreviousSubtopic}
                          />
                        ),
                        CourseContent: (props) => (
                          <CourseContent
                            {...props}
                            onNext={handleNextSubtopic}
                            onPrevious={handlePreviousSubtopic}
                          />
                        ),
                      }}
                    />
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </PageHeading>
    </div>
  )
}
