'use client'

import { useState, useEffect, useCallback } from 'react'
import PageHeading from '@/components/PageHeading'
import { allItems as items } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { useAuth } from 'app/hooks/useAuth'

interface Props {
  title: string
  category: string
  image: string
  level: string
  topics: { title: string; subtopics: string[] }[]
  summary: string
}

export default function CoursePageSection({
  title,
  category,
  image,
  level,
  topics,
  summary,
}: Props) {
  const { user, loading } = useAuth()
  const [selectedSubtopic, setSelectedSubtopic] = useState('')
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const [subtopicContent, setSubtopicContent] = useState<string | null>(null)
  const [checkedSubtopics, setCheckedSubtopics] = useState<Record<string, boolean>>({})

  // Optimize getUserCourses to run once user data is available
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
        // Extract the completed subtopics from the response data
        const completedSubtopics = data.map((course) => course.subtopic)

        // Match the user's completed courses and set checkedSubtopics
        const newCheckedState: Record<string, boolean> = {}

        topics.forEach((topic) => {
          topic.subtopics.forEach((subtopic) => {
            newCheckedState[subtopic] = completedSubtopics.includes(subtopic)
          })
        })

        setCheckedSubtopics(newCheckedState)
      } catch (error) {
        console.error(`Network Error: ${error.message}`)
      }
    },
    [topics]
  )

  // Initialize the first topic, subtopic, and its content on component mount
  useEffect(() => {
    if (!loading && user && user.id) {
      getUserCourses(user.id) // Get user's completed courses
    }
  }, [loading, user, getUserCourses])

  useEffect(() => {
    if (topics.length > 0) {
      const firstTopic = topics[0]
      const firstSubtopic = firstTopic.subtopics[0]
      setExpandedTopic(firstTopic.title)
      setSelectedSubtopic(firstSubtopic)

      // Fetch the content of the first subtopic
      const matchedItem = items.find((item) => item.title === firstSubtopic)
      setSubtopicContent(
        matchedItem ? matchedItem.body.code : 'Content not found for the selected subtopic.'
      )
    }
  }, [topics])

  // Handle topic toggle (accordion functionality)
  const handleTopicToggle = (topic: string) => {
    setExpandedTopic((prev) => (prev === topic ? null : topic))
  }

  // Handle subtopic click and fetch its content
  const handleSubtopicClick = (subtopic: string) => {
    setSelectedSubtopic(subtopic)

    // Only update content if different from current
    const matchedItem = items.find((item) => item.title === subtopic)
    const newContent = matchedItem
      ? matchedItem.body.code
      : 'Content not found for the selected subtopic.'
    if (newContent !== subtopicContent) {
      setSubtopicContent(newContent)
    }
  }

  // Handle checkbox state for subtopics
  const handleCheckboxChange = (subtopic: string) => {
    setCheckedSubtopics((prevState) => {
      const newState = { ...prevState, [subtopic]: !prevState[subtopic] }
      // Save the learning progress when checkbox is checked/unchecked
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
        const data = await response.json()
        console.log(`Success: ${data.message}`)
      } catch (error) {
        console.error(`Network Error: ${error.message}`)
      }
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageHeading title={title}>
        <div className="flex flex-col gap-6 py-6 md:flex-row">
          {/* Sidebar */}
          <aside className="w-full rounded-md bg-gray-100 p-4 dark:bg-gray-800 md:w-1/4">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Course Content
            </h2>
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
                    <span className="ml-2">{expandedTopic === topic.title ? '↑' : '↓'}</span>
                  </button>

                  {expandedTopic === topic.title && (
                    <ul className="mt-2 space-y-1 pl-6">
                      {topic.subtopics.map((subtopic) => (
                        <li key={subtopic} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={checkedSubtopics[subtopic] || false}
                            onChange={() => handleCheckboxChange(subtopic)}
                            className="border-gray-300bg-white h-5 w-5 rounded-sm checked:border-primary-700 checked:bg-primary-700 dark:border-gray-600 dark:bg-gray-700 dark:checked:border-secondary-600 checked:dark:bg-secondary-500 dark:checked:bg-secondary-400"
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
          </aside>

          {/* Content Section */}
          <main className="w-full rounded-md bg-white px-6 shadow-md dark:bg-gray-900 md:w-3/4">
            {selectedSubtopic && (
              <>
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {selectedSubtopic}
                </h3>
                <div className="prose max-w-full dark:prose-dark">
                  {subtopicContent && (
                    <MDXLayoutRenderer code={subtopicContent} components={components} />
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
