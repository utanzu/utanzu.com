'use client'
import Image from '@/components/Image'
import { Link } from '@/components/ui/link'
import { Button } from '@headlessui/react'
import { useState } from 'react'

const mentors = [
  {
    name: 'John Doe',
    title: 'Cybersecurity Expert',
    expertise: ['Network Security', 'Threat Analysis', 'Penetration Testing'],
    image: '/static/images/avatar.png',
    description:
      'Experienced cybersecurity professional with 10+ years in network security and threat analysis.',
  },
  {
    name: 'Jane Smith',
    title: 'Ethical Hacker',
    expertise: ['Web Application Security', 'Penetration Testing'],
    image: '/static/images/avatar.png',
    description:
      'Certified ethical hacker specializing in web application security and penetration testing.',
  },
  {
    name: 'Ali Khan',
    title: 'Cloud Security Engineer',
    expertise: ['AWS Security', 'IAM Policies'],
    image: '/static/images/avatar.png',
    description:
      'Cloud security engineer focused on securing AWS environments and implementing robust IAM policies.',
  },
]

const MentorshipPageSection = () => {
  const [activeTab, setActiveTab] = useState('get-mentor')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMentors, setFilteredMentors] = useState(mentors)

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

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for Larger Screens */}
        <aside className="hidden w-64 flex-shrink-0 rounded-md border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:block">
          <ul className="space-y-2 pt-4">
            <li>
              <Button
                onClick={() => setActiveTab('get-mentor')}
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">Get a Mentor</span>
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveTab('become-mentor')}
                className="flex w-full items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Become a Mentor
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveTab('resources')}
                className="flex w-full items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Resources
              </Button>
            </li>
          </ul>
        </aside>

        {/* Top Menu for Small Screens */}
        <nav className="mb-2 flex flex-wrap justify-center gap-4 rounded-md bg-gray-50 p-2 dark:bg-gray-800 md:hidden">
          <Button
            onClick={() => setActiveTab('get-mentor')}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Get a Mentor
          </Button>
          <Button
            onClick={() => setActiveTab('become-mentor')}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Become a Mentor
          </Button>
          <Button
            onClick={() => setActiveTab('resources')}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Resources
          </Button>
        </nav>

        {/* Main Content */}
        <div className="flex-grow px-6">
          {activeTab === 'get-mentor' && (
            <>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Search by name, title, or expertise"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMentors.map((mentor, index) => (
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
                          className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                      {mentor.description}
                    </p>

                    {/* View Profile Button */}
                    <div className="mt-auto max-w-max pt-4">
                      <Link
                        href={`/mentor/${mentor.name.toLowerCase().replace(' ', '-')}`}
                        className="inline-block w-full rounded-lg bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-primary-700"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'become-mentor' && (
            <div className="space-y-10">
              {/* Hero / Intro Section */}
              <section className="relative overflow-hidden rounded-md bg-gradient-to-r from-gray-600 to-gray-100 p-2 text-white shadow-lg">
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
                    width={32}
                    height={32}
                    src="/static/images/community.png"
                    alt="Mentorship Illustration"
                    className="mt-4 h-32 w-32 sm:mt-0"
                  />
                </div>
              </section>

              {/* Benefits of Becoming a Mentor */}
              <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
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
              <section className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Become a Mentor Today
                </h3>
                <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="mentorName"
                      className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="mentorName"
                      placeholder="Jane Doe"
                      className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="mentorEmail"
                      className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="mentorEmail"
                      placeholder="jane@example.com"
                      className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>

                  {/* Expertise */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="mentorExpertise"
                      className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Area of Expertise
                    </label>
                    <input
                      type="text"
                      id="mentorExpertise"
                      placeholder="Network Security, Threat Analysis..."
                      className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="mentorExperience"
                      className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      id="mentorExperience"
                      placeholder="5"
                      className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>

                  {/* Why Mentor */}
                  <div className="col-span-1 flex flex-col sm:col-span-2">
                    <label
                      htmlFor="mentorReason"
                      className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Why do you want to be a mentor?
                    </label>
                    <textarea
                      id="mentorReason"
                      rows={4}
                      placeholder="Share a brief statement about what motivates you to mentor others..."
                      className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>

                  {/* Submit */}
                  <div className="col-span-1 flex justify-end sm:col-span-2">
                    <button
                      type="submit"
                      className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </section>
            </div>
          )}

          {activeTab === 'resources' && <p>Resources content...</p>}
        </div>
      </div>
    </>
  )
}

export default MentorshipPageSection
