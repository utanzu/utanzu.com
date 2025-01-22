'use client'

import { useState, useEffect } from 'react'
import PageHeading from '@/components/PageHeading'
import { allItems as items } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'

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
  const [selectedSubtopic, setSelectedSubtopic] = useState('')
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const [subtopicContent, setSubtopicContent] = useState<string | null>(null)

  // Initialize the first topic, subtopic, and its content on component mount
  useEffect(() => {
    if (topics.length > 0) {
      const firstTopic = topics[0]
      const firstSubtopic = firstTopic.subtopics[0]
      setExpandedTopic(firstTopic.title)
      setSelectedSubtopic(firstSubtopic)

      // Fetch the content of the first subtopic
      const matchedItem = items.find((item) => item.title === firstSubtopic)
      if (matchedItem) {
        setSubtopicContent(matchedItem.body.code)
      } else {
        setSubtopicContent('Content not found for the selected subtopic.')
      }
    }
  }, [topics])

  // Handle topic toggle (accordion functionality)
  const handleTopicToggle = (topic: string) => {
    setExpandedTopic(expandedTopic === topic ? null : topic) // Toggle the accordion
  }

  // Handle subtopic click and fetch its content
  const handleSubtopicClick = (subtopic: string) => {
    setSelectedSubtopic(subtopic)

    // Find the matching item's body content
    const matchedItem = items.find((item) => item.title === subtopic)
    if (matchedItem) {
      setSubtopicContent(matchedItem.body.code)
    } else {
      setSubtopicContent('Content not found for the selected subtopic.')
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Page Header */}
      <PageHeading title={title}>
        {/* Main Layout */}
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

                  {/* Subtopics */}
                  {expandedTopic === topic.title && (
                    <ul className="mt-2 space-y-1 pl-6">
                      {topic.subtopics.map((subtopic) => (
                        <li key={subtopic}>
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
