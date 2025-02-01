'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  user
}

interface Mentorship {
  id: string
  title: string
  message: string
  status: string
  createdAt: string
  mentor: {
    id: string
    name: string
    image: string
  }
}

const MentorConnections: React.FC<Props> = ({ user }) => {
  const [activeMentorships, setActiveMentorships] = useState<Mentorship[]>([])
  const [pastMentorships, setPastMentorships] = useState<Mentorship[]>([])
  const [loading, setLoading] = useState(true)

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

  console.log(activeMentorships)

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
          <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-primary-500">
            Current Connections
          </h3>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-300">Loading...</p>
          ) : activeMentorships.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No active connections found.</p>
          ) : (
            <ul className="space-y-3">
              {activeMentorships.map((m) => (
                <li key={m.id} className="flex items-center space-x-3">
                  <Image
                    width={80}
                    height={80}
                    src={m.mentor.image}
                    alt={m.mentor.name}
                    className="h-10 w-10 rounded-full border border-gray-300 object-cover dark:border-gray-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {m.mentor.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{m.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Past Mentorships */}
        <section className="rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-primary-500">
            Past Connections
          </h3>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-300">Loading...</p>
          ) : pastMentorships.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No past connections found.</p>
          ) : (
            <ul className="space-y-3">
              {pastMentorships.map((m) => (
                <li key={m.id} className="flex items-center space-x-3">
                  <Image
                    width={80}
                    height={80}
                    src={m.mentor.profileImage}
                    alt={m.mentor.fullName}
                    className="h-10 w-10 rounded-full border border-gray-300 object-cover dark:border-gray-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {m.mentor.fullName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{m.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}

export default MentorConnections
