'use client'
import Image from './Image'
import { Button } from '@headlessui/react'
import { useRouter } from 'next/navigation'

const CoursesCard = ({
  title,
  category,
  image,
  level,
  topics,
  modules,
  summary,
  path,
  user,
  openAuthModal,
  subtopicCount,
  percentage,
}) => {
  const router = useRouter()
  const handleStartCourse = (e) => {
    e.preventDefault() // Prevent navigation when opening the modal
    if (!user) {
      // Open the auth modal if the user is not signed in
      openAuthModal()
    } else {
      // Navigate to the course page if the user is signed in
      router.push(`/${path}`)
    }
  }

  return (
    <>
      <div className="mt-2 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <Image
          width={544}
          height={306}
          className="h-48 w-full rounded-t-lg object-cover p-4"
          src={image}
          alt="course image"
          priority
        />
        <div className="px-3 pb-3">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-900 dark:text-gray-200">
            {summary}
          </p>
          <div className="mb-1 flex justify-between">
            <span className="text-xs font-medium text-primary-700 dark:text-white">Completion</span>
            <span className="text-xs font-medium text-primary-700 dark:text-white">
              {percentage}%
            </span>
          </div>
          <div className="mb-4 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-1 rounded-full bg-secondary-600" style={{ width: percentage }}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-primary-600">
              {level} Level
            </span>
            <Button
              onClick={handleStartCourse}
              className="rounded-full bg-primary-500 px-4 py-2 text-center text-xs font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              {percentage > 0 ? 'RESUME' : 'START COURSE'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CoursesCard
