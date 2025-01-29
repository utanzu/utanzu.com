'use client'
import { useState } from 'react'
import Image from '@/components/Image'
import { Link } from '@/components/ui/link'
import { Button } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import MenteeModal from './MenteeModal'

type Mentor = {
  image: string
  name: string
  title: string
  expertise: string[]
  description: string
  linkedin: string
  email: string
}

type Props = {
  mentors: Mentor[]
  user
  openAuthModal
}

const MentorCard: React.FC<Props> = ({ mentors, user, openAuthModal }) => {
  const [menteeModalOpen, setMenteeModalOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null) // Store selected mentor

  const openMenteeModal = (mentor) => {
    setSelectedMentor(mentor)
    setMenteeModalOpen(true)
  }

  const closeMenteeModal = () => {
    setMenteeModalOpen(false)
  }

  const handleConnectMentor = (mentor) => (e) => {
    e.preventDefault()
    if (!user) {
      openAuthModal()
    } else {
      openMenteeModal(mentor)
    }
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
                src={mentor.image}
                alt={mentor.name}
                className="h-20 w-20 rounded-full border border-gray-300 object-cover shadow-md dark:border-gray-600"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {mentor.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.title}</p>
              </div>
            </div>

            {/* Expertise Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.expertise.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-gray-600 dark:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{mentor.description}</p>

            {/* Connect Button & Icons */}
            <div className="mt-auto flex items-center gap-4 pt-4">
              {/* Connect Button with Arrow Icon */}
              <Button
                onClick={handleConnectMentor(mentor)}
                className="inline-flex items-center justify-center rounded-full bg-gray-600 px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-primary-700"
              >
                Connect
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>

              {/* LinkedIn Icon */}
              <Link
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors duration-300 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>

              {/* Email Icon */}
              <Link
                href={`mailto:${mentor.email}`}
                className="text-gray-500 transition-colors duration-300 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <MenteeModal
        isOpen={menteeModalOpen}
        onRequestClose={closeMenteeModal}
        mentor={selectedMentor}
        user={user}
      />
    </>
  )
}

export default MentorCard
