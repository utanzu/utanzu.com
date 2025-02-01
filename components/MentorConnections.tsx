'use client'
import { Button } from '@headlessui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

type Props = {
  user: {
    id: string
  }
}

interface Mentorship {
  id: string
  title: string
  message: string
  status: string
  mentorId: string
  menteeId: string
  createdAt: string
  mentor: {
    id: string
    fullName: string
    profileImage: string
    title: string
  }
  mentee: {
    id: string
    name: string
    image: string
  }
}

// Helper function to format the date as "01 Feb 2025"
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const MentorConnections: React.FC<Props> = ({ user }) => {
  const [activeMentorships, setActiveMentorships] = useState<Mentorship[]>([])
  const [pastMentorships, setPastMentorships] = useState<Mentorship[]>([])
  const [loading, setLoading] = useState(true)

  // State for modal visibility and details
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMentorship, setSelectedMentorship] = useState<Mentorship | null>(null)

  useEffect(() => {
    if (!user) return // Prevent unauthorized fetch

    const fetchMentorships = async () => {
      try {
        const response = await fetch(`/api/v1/mentorship/${user.id}`)
        if (!response.ok) throw new Error('Failed to fetch mentorships')

        const data = await response.json()
        setActiveMentorships(data.active)
        setPastMentorships(data.past)
      } catch (error) {
        console.error('Error fetching mentorships:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMentorships()
  }, [user])

  // Helper function to get the "other" person in the mentorship
  const getConnectionDetails = (m: Mentorship) => {
    if (user.id === m.mentorId) {
      // User is the mentor, so show mentee details
      return {
        id: m.mentee.id,
        name: m.mentee.name,
        image: m.mentee.image,
      }
    } else if (user.id === m.menteeId) {
      // User is the mentee, so show mentor details
      return {
        id: m.mentor.id,
        name: m.mentor.fullName,
        image: m.mentor.profileImage,
      }
    } else {
      // Fallback: in case neither matches (should not happen if API is correct)
      return {
        id: 'unknown',
        name: 'Unknown',
        image: '/default-profile.png',
      }
    }
  }

  // Open the modal and store the connection details.
  const openModal = (m: Mentorship) => {
    setSelectedMentorship(m)
    setModalOpen(true)
  }

  // Close the modal.
  const closeModal = () => {
    setModalOpen(false)
    setSelectedMentorship(null)
  }

  return (
    <>
      <div className="space-y-5">
        <section className="relative overflow-hidden p-2 text-white shadow-lg">
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <div className="max-w-xl">
              <h2 className="mb-2 text-2xl font-bold text-secondary-600">Mentorship Connections</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">
                Here are your current and past mentorship connections.
              </p>
            </div>
          </div>
        </section>
        {/* Active Mentorships */}
        <section className="rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Current Connections
          </h3>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-300">Loading...</p>
          ) : activeMentorships.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No active connections found.</p>
          ) : (
            <ul className="space-y-3">
              {activeMentorships.map((m) => {
                const connection = getConnectionDetails(m)
                return (
                  <li key={m.id} className="flex items-center space-x-3">
                    <Button
                      onClick={() => openModal(m)}
                      className="group flex w-full cursor-pointer items-center space-x-3 text-left hover:text-primary-500 focus:outline-none"
                    >
                      <Image
                        width={80}
                        height={80}
                        src={connection.image}
                        alt={connection.name}
                        className="h-10 w-10 rounded-full border border-gray-300 object-cover dark:border-gray-600"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-primary-500 dark:text-gray-200">
                          {connection.name}
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200">
                          {m.status}
                        </p>
                      </div>
                    </Button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        {/* Past Mentorships */}
        <section className="rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Past Connections
          </h3>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-300">Loading...</p>
          ) : pastMentorships.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No past connections found.</p>
          ) : (
            <ul className="space-y-3">
              {pastMentorships.map((m) => {
                const connection = getConnectionDetails(m)
                return (
                  <li key={m.id} className="flex items-center space-x-3">
                    <Button
                      onClick={() => openModal(m)}
                      className="group flex w-full cursor-pointer items-center space-x-3 text-left hover:text-primary-500 focus:outline-none"
                    >
                      <Image
                        width={80}
                        height={80}
                        src={connection.image}
                        alt={connection.name}
                        className="h-10 w-10 rounded-full border border-gray-300 object-cover dark:border-gray-600"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-primary-500 dark:text-gray-200">
                          {connection.name}
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200">
                          {m.status}
                        </p>
                      </div>
                    </Button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
      {/* Modal for viewing mentorship details */}
      {modalOpen && selectedMentorship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              onClick={closeModal}
            >
              <FontAwesomeIcon
                icon={faClose}
                className="hover:text-primary h-[1.5rem] w-[1.5rem] cursor-pointer text-gray-600 dark:text-gray-200"
              />
            </button>
            <div className="flex flex-col space-y-4">
              {/* Show the connection's image */}
              <div className="flex items-center space-x-3">
                <Image
                  width={80}
                  height={80}
                  src={
                    // Display the image of the party that is not the logged in user
                    user.id === selectedMentorship.mentorId
                      ? selectedMentorship.mentee.image
                      : selectedMentorship.mentor.profileImage
                  }
                  alt={
                    user.id === selectedMentorship.mentorId
                      ? selectedMentorship.mentee.name
                      : selectedMentorship.mentor.fullName
                  }
                  className="h-10 w-10 rounded-full border border-gray-300 object-cover dark:border-gray-600"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {user.id === selectedMentorship.mentorId
                      ? selectedMentorship.mentee.name
                      : selectedMentorship.mentor.fullName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedMentorship.status} | {formatDate(selectedMentorship.createdAt)}
                  </p>
                </div>
              </div>

              {/* Mentorship details */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <span>RE:</span> {selectedMentorship.title}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedMentorship.message}
                </p>
                {/* Display mentor title */}
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Mentor Title:</span>{' '}
                  {selectedMentorship.mentor.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MentorConnections
