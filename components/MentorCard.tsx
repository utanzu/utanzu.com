'use client'
import { useState } from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { Button } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import MenteeModal from './MenteeModal'
import MentorModal from './MentorModal'

type Mentor = {
  id: string
  userId: string
  fullName: string
  title: string
  linkedin: string
  description: string
  expertise: string
  profileImage: string
  isConnected?: boolean
}

type Props = {
  mentors: Mentor[]
  user: {
    id: string
  }
  openAuthModal: () => void
}

const MentorCard: React.FC<Props> = ({ mentors, user, openAuthModal }) => {
  const [menteeModalOpen, setMenteeModalOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [viewedMentor, setViewedMentor] = useState<Mentor | null>(null)
  const [mentorModalOpen, setMentorModalOpen] = useState(false)

  const openMenteeModal = (mentor: Mentor) => {
    setSelectedMentor(mentor)
    setMenteeModalOpen(true)
  }

  const closeMenteeModal = () => {
    setMenteeModalOpen(false)
  }

  const closeMentorModal = () => {
    setMentorModalOpen(false)
  }

  const openMentorModal = (mentor: Mentor) => {
    setViewedMentor(mentor)
    setMentorModalOpen(true)
  }

  const handleConnectMentor = (mentor: Mentor) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      openAuthModal()
    } else {
      openMenteeModal(mentor)
    }
  }

  const handleViewMentor = (mentor: Mentor) => (e: React.MouseEvent) => {
    e.preventDefault()
    openMentorModal(mentor)
  }

  return (
    <>
      <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="group relative flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Mentor Image & Info */}
            <div className="flex items-center gap-4">
              <Image
                width={80}
                height={80}
                src={mentor.profileImage}
                alt={mentor.fullName}
                className="h-20 w-20 rounded-full border border-gray-200 object-cover shadow-md dark:border-gray-600"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {mentor.fullName}
                </h3>
                <p className="text-sm text-gray-700 dark:text-primary-400">{mentor.title}</p>
              </div>
            </div>

            {/* Expertise Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.expertise.split(',').map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-primary-500 dark:bg-gray-600 dark:text-white"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="mt-3 line-clamp-2 text-xs text-gray-600 dark:text-gray-300">
              {mentor.description}
            </p>

            {/* Connect Button & Icons */}
            <div className="mt-auto flex items-center gap-4 pt-4">
              {/* Connect Button with Arrow Icon */}
              {user?.id !== mentor.userId && (
                <Button
                  onClick={mentor.isConnected ? undefined : handleConnectMentor(mentor)}
                  disabled={mentor.isConnected}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    mentor.isConnected
                      ? 'cursor-not-allowed bg-gray-400 text-white'
                      : 'bg-secondary-700 text-white hover:bg-primary-700'
                  }`}
                >
                  {mentor.isConnected ? (
                    <>
                      Connected <FontAwesomeIcon icon={faCheckCircle} className="ml-2" />
                    </>
                  ) : (
                    <>
                      Connect <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </>
                  )}
                </Button>
              )}

              {/* LinkedIn Icon */}
              <Link
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors duration-300 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>

              {/* View Icon */}
              <Button
                onClick={handleViewMentor(mentor)}
                className="text-gray-500 transition-colors duration-300 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {selectedMentor && (
        <MenteeModal
          isOpen={menteeModalOpen}
          onRequestClose={closeMenteeModal}
          mentor={selectedMentor}
          user={user}
        />
      )}
      {viewedMentor && (
        <MentorModal
          isOpenMentor={mentorModalOpen}
          onRequestCloseMentor={closeMentorModal}
          mentor={viewedMentor}
        />
      )}
    </>
  )
}

export default MentorCard
