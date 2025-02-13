'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from '@/components/Link'
import CoursesCard from '@/components/CoursesCard'
import { useAuth } from 'app/hooks/useAuth'
import AuthModal from '../components/AuthModal'

type Course = {
  title: string
  category: string
  image: string
  level: string
  topics: { title: string; subtopics: string[] }[]
  modules: number
  summary: string
  path: string
}

interface CourseSearchProps {
  courses: Course[]
}

const CourseSearch: React.FC<CourseSearchProps> = ({ courses }) => {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [courseProgress, setCourseProgress] = useState<{ title: string; subtopicCount: number }[]>(
    []
  )

  const closeModal = () => setModalOpen(false)
  const openAuthModal = () => setModalOpen(true)

  // Fetch course progress based on user
  useEffect(() => {
    if (!user) return // Don't fetch if no user

    const fetchCourseProgress = async () => {
      try {
        const response = await fetch(`/api/v1/courses/${user.id}/progress`)
        if (!response.ok) {
          throw new Error('Failed to fetch course progress')
        }
        const data = await response.json()
        setCourseProgress(data)
      } catch (error) {
        console.error('Error fetching course progress:', error)
      }
    }

    fetchCourseProgress()
  }, [user])

  // Filter courses based on search term and category
  useEffect(() => {
    let filtered = courses

    // Filter by category if present
    if (category) {
      filtered = filtered.filter(
        (course) => course.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Further filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()

      filtered = filtered.filter((course) => {
        const matchesTitle = course.title.toLowerCase().includes(lowerCaseSearchTerm)
        const matchesCategory = course.category.toLowerCase().includes(lowerCaseSearchTerm)

        const matchesTopics = course.topics.some((topic) => {
          const matchesTopicTitle = topic.title.toLowerCase().includes(lowerCaseSearchTerm)
          const matchesSubtopics = topic.subtopics.some((subtopic) =>
            subtopic.toLowerCase().includes(lowerCaseSearchTerm)
          )
          return matchesTopicTitle || matchesSubtopics
        })

        return matchesTitle || matchesCategory || matchesTopics
      })
    }

    setFilteredCourses(filtered)
  }, [category, searchTerm, courses])

  return (
    <>
      {category && (
        <p className="my-2 text-base">
          <span className="font-semibold text-primary-600">Category:</span> {category}
        </p>
      )}
      <div className="my-2 flex items-center space-x-4">
        <form className="flex-grow">
          <div className="relative">
            <input
              type="search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-8 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-300 dark:focus:ring-primary-300"
              placeholder="Search Courses ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </div>
        </form>
        <Link
          href="/courses/my-learning"
          className="block whitespace-nowrap rounded border border-primary-500 bg-transparent px-4 py-1 text-sm font-semibold text-primary-500 hover:border-transparent hover:bg-orange-500 hover:text-black dark:hover:text-white"
        >
          My Learning
        </Link>
      </div>
      <div className="grid-cols-4 gap-x-4 gap-y-10 space-y-10 md:grid md:space-y-0">
        {filteredCourses.map((course) => {
          const progress = courseProgress.find((progress) => progress.title === course.title)
          const percentage = progress?.subtopicCount
            ? Math.round((progress.subtopicCount / course.modules) * 100) // Round to nearest whole number
            : 0

          return (
            <CoursesCard
              key={course.title}
              title={course.title}
              category={course.category}
              image={course.image}
              level={course.level}
              topics={course.topics}
              modules={course.modules}
              summary={course.summary}
              path={course.path}
              user={user}
              openAuthModal={openAuthModal}
              subtopicCount={progress?.subtopicCount || 0}
              percentage={percentage}
            />
          )
        })}
      </div>
      <AuthModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        message="Sign in to start learning. Select your preferred sign-in method below to get started."
      />
    </>
  )
}

export default CourseSearch
