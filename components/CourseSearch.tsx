'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from '@/components/Link'
import CoursesCard from '@/components/CoursesCard'

const CourseSearch = ({ courses }) => {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])

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
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredCourses(filtered)
  }, [category, searchTerm, courses])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // No additional filtering needed here as useEffect handles it
  }

  return (
    <>
      {category && (
        <p className="my-2 text-base">
          <span className="font-semibold text-primary-600">Category:</span> {category}
        </p>
      )}
      <div className="my-2 flex items-center space-x-4">
        <form className="flex-grow" onSubmit={handleSearchSubmit}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-8 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-300 dark:focus:ring-primary-300"
              placeholder="Search Courses ..."
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
            <button
              type="submit"
              className="absolute end-2 top-1/2 -translate-y-1/2 transform rounded-full bg-primary-700 px-4 py-1 text-xs font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Search
            </button>
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
        {filteredCourses.map((d) => (
          <CoursesCard
            key={d.title}
            title={d.title}
            category={d.category}
            image={d.image}
            level={d.level}
            topics={d.topics}
            duration={d.duration}
            summary={d.summary}
            path={d.path}
          />
        ))}
      </div>
    </>
  )
}

export default CourseSearch
