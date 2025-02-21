'use client'
import { Button } from '@headlessui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
import Toast from './Toast'

type Props = {
  user: {
    id: string
  }
}

interface Mentorship {
  id: number
  title: string
  message: string
  status: string
  mentorId: string
  menteeId: string
  createdAt: string
  mentor: {
    id: string
    userId: string
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

  // State for main mentorship modal
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMentorship, setSelectedMentorship] = useState<Mentorship | null>(null)

  // State for the nested action modal (for Accept/Reminder/Message)
  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [messageText, setMessageText] = useState('')

  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

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
        userId: m.mentor.userId,
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

  // Open the main mentorship modal and store the selected mentorship
  const openModal = (m: Mentorship) => {
    setSelectedMentorship(m)
    setModalOpen(true)
  }

  // Close the main mentorship modal (without clearing selectedMentorship)
  const closeModal = () => {
    setModalOpen(false)
  }

  // Open the nested action modal. First, close the main modal.
  const openActionModal = () => {
    setModalOpen(false)
    setActionModalOpen(true)
  }

  // Close the nested action modal and clear the message text.
  const closeActionModal = () => {
    setActionModalOpen(false)
    setMessageText('')
  }

  // Handle send/accept action
  const handleAction = async () => {
    if (!selectedMentorship) return

    // Determine sender and receiver:
    // If the current user is the mentor, then they are sending the message to the mentee.
    // If the current user is the mentee, then they are sending the message to the mentor.
    const senderId = user.id
    const receiverId =
      user.id === selectedMentorship.mentorId
        ? selectedMentorship.mentee.id
        : selectedMentorship.mentor.userId
    // Build the form data to send
    const formData = new FormData()
    let status = 'false'
    formData.append('mentorship', selectedMentorship.id.toString())
    formData.append('sender', senderId)
    formData.append('receiver', receiverId)
    // You can use the mentorship title as the title for the message, or customize as needed.
    formData.append('title', selectedMentorship.title)
    formData.append('message', messageText)
    if (
      selectedMentorship.status.toUpperCase() === 'PENDING' &&
      user.id === selectedMentorship.mentorId
    ) {
      status = 'true'
      formData.append('status', status)
    }

    try {
      const res = await fetch('/api/v1/messages/new', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        //console.error('Error sending message')
        setToast({
          type: 'error',
          message: 'Error sending message',
        })
      } else {
        //console.log('Message sent successfully')
        setToast({
          type: 'success',
          message: 'Message sent successfully',
        })
        // Reload after 2 seconds
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      //console.error('Error sending message:', error)
      setToast({
        type: 'error',
        message: `Error sending message, ${error}`,
      })
    }

    // After sending, close the nested action modal.
    closeActionModal()
  }

  // Determine the action button text (and visibility) based on status and role.
  const renderActionButton = () => {
    if (!selectedMentorship) return null

    // Do not show the button if status is REJECTED.
    if (selectedMentorship.status.toUpperCase() === 'REJECTED') return null

    let buttonText = ''
    if (selectedMentorship.status.toUpperCase() === 'PENDING') {
      buttonText =
        user.id === selectedMentorship.mentorId ? 'Accept Mentorship' : 'Send a Reminder Message'
    } else if (selectedMentorship.status.toUpperCase() === 'ONGOING') {
      buttonText = 'Send a Message'
    }

    return (
      <Button
        onClick={openActionModal}
        className={
          user.id === selectedMentorship.mentorId &&
          selectedMentorship.status.toUpperCase() === 'PENDING'
            ? 'w-max rounded-full bg-secondary-500 px-5 py-2 text-center text-sm font-semibold text-white hover:bg-green-600'
            : 'w-max rounded-full bg-primary-500 px-5 py-2 text-center text-sm font-semibold text-white hover:bg-primary-600'
        }
      >
        {buttonText} <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
      </Button>
    )
  }

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} />}
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
                        unoptimized
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
      {/* Main Mentorship Modal */}
      {modalOpen && selectedMentorship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              onClick={() => {
                setModalOpen(false)
                setSelectedMentorship(null)
              }}
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
                  unoptimized
                  src={
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
              </div>
              {/* Conditionally render the action button */}
              <div>{renderActionButton()}</div>
            </div>
          </div>
        </div>
      )}
      {/* Nested Action Modal */}
      {actionModalOpen && selectedMentorship && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              onClick={closeActionModal}
            >
              <FontAwesomeIcon
                icon={faClose}
                className="hover:text-primary h-[1.5rem] w-[1.5rem] cursor-pointer"
              />
            </button>
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {selectedMentorship.status.toUpperCase() === 'PENDING'
                  ? user.id === selectedMentorship.mentorId
                    ? 'Accept Mentorship'
                    : 'Send a Reminder Message'
                  : 'Send a Message'}
              </p>
              <p className="text-xs text-gray-800 dark:text-gray-200">
                {selectedMentorship.status.toUpperCase() === 'PENDING'
                  ? user.id === selectedMentorship.mentorId
                    ? `Send them a message to "${selectedMentorship.mentee.name}" letting them know that you have accepted their request. You can share with them your contacts and/or ask them to schedule the first meeting. Thank you.`
                    : `Send a reminder to "${selectedMentorship.mentor.fullName}" requesting them to recheck your connection request. You can share with them your contacts.`
                  : 'Send a Message to your mentor/mentee'}
              </p>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter your message..."
                rows={4}
              />
              <Button
                onClick={handleAction}
                className="w-full rounded-full bg-primary-500 py-2 text-sm font-semibold text-white hover:bg-primary-600"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MentorConnections
