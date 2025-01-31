'use client'
import Image from '@/components/Image'
import { Button } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from 'app/hooks/useAuth'
import AuthModal from '../components/AuthModal'
import MentorCard from './MentorCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faLightbulb, faEnvelope, faHandshake } from '@fortawesome/free-solid-svg-icons'
import MentorForm from './MentorForm'

const MentorshipPageSection = () => {
  interface Mentor {
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

  const [activeTab, setActiveTab] = useState('get-mentor')
  const [searchTerm, setSearchTerm] = useState('')
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(mentors)
  const [loadingMentors, setLoadingMentors] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const router = useRouter()
  const { loading, user } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [isMentor, setIsMentor] = useState<boolean | null>(null)
  const [checkingMentorStatus, setCheckingMentorStatus] = useState(true)

  // Fetch all mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(`/api/v1/mentors`)
        if (!response.ok) throw new Error('Failed to fetch mentors')

        const data = await response.json()
        //console.log(data.mentors)
        setMentors(data.mentors) // Expecting mentors array in response
        setFilteredMentors(data.mentors) // Default to showing all
      } catch (error) {
        console.error('Error fetching mentors:', error)
        setFetchError(error.message)
      } finally {
        setLoadingMentors(false)
      }
    }

    fetchMentors()
  }, [])

  // Fetch user's mentorship connections and mark connected mentors
  useEffect(() => {
    const checkUserMentors = async () => {
      if (!user) return

      try {
        const response = await fetch(`/api/v1/mentorship/${user.id}/mentors`)
        if (!response.ok) return

        const { mentors: connectedMentors } = await response.json()

        if (connectedMentors.length > 0) {
          const connectedMentorIds = new Set(connectedMentors.map((m) => m.mentorId))

          setMentors((prevMentors) =>
            prevMentors.map((mentor) => ({
              ...mentor,
              isConnected: connectedMentorIds.has(mentor.userId),
            }))
          )
          setFilteredMentors((prevFiltered) =>
            prevFiltered.map((mentor) => ({
              ...mentor,
              isConnected: connectedMentorIds.has(mentor.userId),
            }))
          )
        }
      } catch (error) {
        console.error('Error checking mentorship connections:', error)
      }
    }

    if (user) {
      checkUserMentors()
    }
  }, [user])

  // Search functionality
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase()
    setSearchTerm(value)

    setFilteredMentors(
      mentors.filter(
        (mentor) =>
          mentor.fullName.toLowerCase().includes(value) ||
          mentor.title.toLowerCase().includes(value) ||
          mentor.expertise.toLowerCase().includes(value) // Assuming expertise is a comma-separated string
      )
    )
  }

  // Fetch mentor status when user is logged in
  useEffect(() => {
    const checkMentorStatus = async () => {
      if (!user) return setCheckingMentorStatus(false)

      try {
        const response = await fetch(`/api/v1/mentors/${user.id}`)

        if (response.status === 200) {
          setIsMentor(true)
        } else if (response.status === 404) {
          setIsMentor(false)
        } else {
          //console.error('Unexpected error checking mentor status')
          setIsMentor(false)
        }
      } catch (error) {
        //console.error('Error fetching mentor status:', error)
        setIsMentor(false)
      } finally {
        setCheckingMentorStatus(false)
      }
    }

    if (user) {
      checkMentorStatus()
    } else {
      setCheckingMentorStatus(false)
    }
  }, [user])

  const openAuthModal = () => {
    setAuthModalOpen(true)
  }

  function closeAuthModal() {
    setAuthModalOpen(false)
  }

  // Function to dynamically apply active class
  const getTabClass = (tabName: string) =>
    `flex w-max items-center rounded-lg p-2 transition-all duration-300 ${
      activeTab === tabName
        ? 'bg-gray-600 dark:bg-gray-700 text-white' // Active background
        : 'hover:bg-gray-100 dark:hover:bg-gray-500' // Default hover
    }`

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for Larger Screens */}
        <aside className="hidden w-64 flex-shrink-0 rounded-md border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:block">
          <ul className="space-y-2 pt-4">
            <li>
              <Button
                onClick={() => setActiveTab('get-mentor')}
                className={getTabClass('get-mentor')}
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-gray-400" />
                <span className="ms-3 flex-1 whitespace-nowrap">Get a Mentor</span>
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveTab('become-mentor')}
                className={getTabClass('become-mentor')}
              >
                <FontAwesomeIcon icon={faLightbulb} className="text-gray-400" />
                <span className="ms-3 flex-1 whitespace-nowrap">Become a Mentor</span>
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveTab('connections')}
                className={getTabClass('connections')}
              >
                <FontAwesomeIcon icon={faHandshake} className="text-gray-400" />
                <span className="ms-3 flex-1 whitespace-nowrap">Connections</span>
              </Button>
            </li>
            <li>
              <Button onClick={() => setActiveTab('messages')} className={getTabClass('messages')}>
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                <span className="ms-3 flex-1 whitespace-nowrap">Messages</span>
              </Button>
            </li>
          </ul>
        </aside>

        {/* Responsive Top Menu for Small Screens */}
        <nav className="mb-2 flex flex-wrap justify-center gap-2 rounded-md bg-gray-50 p-2 dark:bg-gray-800 md:hidden">
          <Button onClick={() => setActiveTab('get-mentor')} className={getTabClass('get-mentor')}>
            Mentee
          </Button>
          <Button
            onClick={() => setActiveTab('become-mentor')}
            className={getTabClass('become-mentor')}
          >
            Mentor
          </Button>
          <Button
            onClick={() => setActiveTab('connections')}
            className={getTabClass('connections')}
          >
            Connections
          </Button>
          <Button onClick={() => setActiveTab('messages')} className={getTabClass('messages')}>
            Messages
          </Button>
        </nav>

        {/* Main Content */}
        <div className="flex-grow px-6">
          {activeTab === 'get-mentor' && (
            <>
              {/* Search Bar */}
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Search by name, title, or expertise"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Mentor Cards */}
              <MentorCard mentors={filteredMentors} user={user} openAuthModal={openAuthModal} />
            </>
          )}
          {activeTab === 'become-mentor' && (
            <div className="space-y-10">
              {/* Hero / Intro Section */}
              <section className="relative overflow-hidden p-2 text-white shadow-lg">
                <div className="flex flex-col items-start space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
                  <div className="max-w-xl">
                    <h2 className="mb-2 text-2xl font-bold text-secondary-600">Become a Mentor</h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">
                      Share your expertise, guide aspiring cybersecurity professionals, and make a
                      lasting impact on the next generation of security leaders.
                    </p>
                  </div>
                  {/* Sample Illustration / Image */}
                  <Image
                    width={200}
                    height={100}
                    src="/static/images/community.png"
                    alt="Mentorship Illustration"
                    className="mt-4 h-32 w-32 sm:mt-0"
                  />
                </div>
              </section>
              {/* Benefits of Becoming a Mentor */}
              <section className="rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-primary-500">
                  Why Mentor with Us?
                </h3>
                <ul className="ml-4 list-disc space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>
                    <strong className="text-gray-800 dark:text-gray-100">
                      Professional Growth:
                    </strong>{' '}
                    Hone your leadership and coaching skills by guiding others.
                  </li>
                  <li>
                    <strong className="text-gray-800 dark:text-gray-100">
                      Networking Opportunities:
                    </strong>{' '}
                    Connect with industry peers and emerging talent.
                  </li>
                  <li>
                    <strong className="text-gray-800 dark:text-gray-100">Community Impact:</strong>{' '}
                    Give back to the cybersecurity community and help shape its future.
                  </li>
                  <li>
                    <strong className="text-gray-800 dark:text-gray-100">
                      Continuous Learning:
                    </strong>{' '}
                    Stay on top of trends and fresh perspectives from your mentees.
                  </li>
                </ul>
              </section>
              {/* Mentor Sign-up Form */}
              {checkingMentorStatus ? (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Checking mentorship status...
                </p>
              ) : user ? (
                isMentor ? (
                  <section className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      You are already a mentor! 🎉
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Thank you for mentoring! Your profile is already registered.
                    </p>
                  </section>
                ) : (
                  <section className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Become a Mentor Today
                    </h3>
                    <MentorForm user={user} />
                  </section>
                )
              ) : (
                <section className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Become a Mentor Today
                  </h3>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                    Please sign in to become a mentor.
                  </p>
                  <Button
                    onClick={openAuthModal}
                    className="block rounded border border-primary-500 bg-transparent px-4 py-1 text-sm font-semibold text-primary-500 hover:border-transparent hover:bg-orange-500 hover:text-black dark:hover:text-white"
                  >
                    Sign In
                  </Button>
                </section>
              )}
            </div>
          )}

          {activeTab === 'messages' && <p>Resources content...</p>}
        </div>
      </div>
      <AuthModal
        isOpen={authModalOpen}
        onRequestClose={closeAuthModal}
        message="Sign in to start your mentorship journey. Select your preferred sign-in method below to get started."
      />
    </>
  )
}

export default MentorshipPageSection
