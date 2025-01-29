'use client'
import Image from '@/components/Image'
import { Button } from '@headlessui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from 'app/hooks/useAuth'
import AuthModal from '../components/AuthModal'
import MentorCard from './MentorCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faLightbulb, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import MentorForm from './MentorForm'

const mentors = [
  {
    name: 'John Doe',
    title: 'Cybersecurity Expert',
    expertise: ['Network Security', 'Threat Analysis', 'Penetration Testing'],
    image: '/static/images/avatar.png',
    description:
      'Experienced cybersecurity professional with 10+ years in network security and threat analysis.',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    email: 'johndoe@example.com',
  },
  {
    name: 'Jane Smith',
    title: 'Ethical Hacker',
    expertise: ['Web Application Security', 'Penetration Testing'],
    image: '/static/images/avatar.png',
    description:
      'Certified ethical hacker specializing in web application security and penetration testing.',
    linkedin: 'https://www.linkedin.com/in/janesmith',
    email: 'janesmith@example.com',
  },
  {
    name: 'Ali Khan',
    title: 'Cloud Security Engineer',
    expertise: ['AWS Security', 'IAM Policies'],
    image: '/static/images/avatar.png',
    description:
      'Cloud security engineer focused on securing AWS environments and implementing robust IAM policies.',
    linkedin: 'https://www.linkedin.com/in/alikhan',
    email: 'alikhan@example.com',
  },
]

const MentorshipPageSection = () => {
  const [activeTab, setActiveTab] = useState('get-mentor')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMentors, setFilteredMentors] = useState(mentors)
  const router = useRouter()
  const { loading, user } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase()
    setSearchTerm(value)
    setFilteredMentors(
      mentors.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(value) ||
          mentor.title.toLowerCase().includes(value) ||
          mentor.expertise.some((skill) => skill.toLowerCase().includes(value))
      )
    )
  }

  const openAuthModal = () => {
    setAuthModalOpen(true)
  }

  function closeAuthModal() {
    setAuthModalOpen(false)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for Larger Screens */}
        <aside className="hidden w-64 flex-shrink-0 rounded-md border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:block">
          <ul className="space-y-2 pt-4">
            <li>
              <Button
                onClick={() => setActiveTab('get-mentor')}
                className="group flex max-w-max items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-gray-400" />
                <span className="ms-3 flex-1 whitespace-nowrap">Get a Mentor</span>
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveTab('become-mentor')}
                className="flex max-w-max items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faLightbulb} className="text-gray-400" />
                <span className="ms-3 flex-1 whitespace-nowrap">Become a Mentor</span>
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveTab('resources')}
                className="flex max-w-max items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                <span className="ms-3 flex-1 whitespace-nowrap">Messages</span>
              </Button>
            </li>
          </ul>
        </aside>

        {/* Responsive Top Menu for Small Screens */}
        <nav className="mb-2 flex flex-wrap justify-center gap-2 rounded-md bg-gray-50 p-2 dark:bg-gray-800 md:hidden">
          <Button
            onClick={() => setActiveTab('get-mentor')}
            className="rounded-lg px-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Mentee
          </Button>
          <Button
            onClick={() => setActiveTab('become-mentor')}
            className="rounded-lg px-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Mentor
          </Button>
          <Button
            onClick={() => setActiveTab('resources')}
            className="rounded-lg px-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
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
                    <p className="text-sm sm:text-base">
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
              {user ? (
                <section className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Become a Mentor Today
                  </h3>
                  <MentorForm user={user} />
                </section>
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

          {activeTab === 'resources' && <p>Resources content...</p>}
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
