'use client'
import { useState } from 'react'
import { Link } from './ui/link'
import Toast from './Toast'

type Props = {
  mentor
  user
}

const MenteeForm: React.FC<Props> = ({ mentor }) => {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // State variables
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Prepare form data
    const formData = new FormData()
    formData.append('mentor', mentor.userId)
    formData.append('title', title)
    formData.append('request', message)

    console.log('FormData entries:', Array.from(formData.entries())) // Debugging

    try {
      const response = await fetch('/api/v1/mentorship/new', {
        method: 'POST',
        body: formData,
      })

      const responseData = await response.json()

      if (response.status === 200 || response.status === 201) {
        setToast({
          type: 'success',
          message:
            responseData.message ||
            'Your mentorship connection has been sent successfully. Keep checking for a response.',
        })
        // Reload after 2 seconds
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setToast({
          type: 'error',
          message: responseData.message || 'Failed to submit application. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setToast({ type: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} />}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} id="mentorshipRegForm">
        <section className="flex flex-col gap-1">
          <div className="px-4 py-4">
            <div className="items-center space-y-4">
              <h2 className="mb-8 text-cyan-900 dark:text-gray-200">
                Send a mentorship connection request to {mentor?.fullName}. Remember, first
                impressions matter—make it count!
              </h2>
            </div>
            <div className="mt-4 grid space-y-4">
              <input type="text" id="mentor_id" value={mentor.id} hidden readOnly required />
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title*
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow-xs dark:shadow-xs-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-300 dark:focus:ring-primary-300"
                  placeholder="Request for Mentorship"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message*
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  maxLength={500}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-300 dark:focus:ring-primary-300"
                  placeholder="Who are you and what do you want to achieve with this mentorship?"
                ></textarea>
              </div>
              <div className="mb-5 flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="focus:ring-3 h-4 w-4 rounded-sm border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree with the{' '}
                  <Link
                    href="/"
                    className="text-secondary-600 hover:underline dark:text-secondary-500"
                  >
                    terms and conditions
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                className="w-max rounded-full bg-primary-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send request
              </button>
            </div>
            <div className="mt-14 space-y-4 py-3 text-center text-gray-600 dark:text-gray-400">
              <p className="text-xs">
                By proceeding, you agree to our{' '}
                <a href="/privacy-policy/" className="underline">
                  Terms of Use
                </a>{' '}
                and confirm you have read our{' '}
                <a href="/privacy-policy/" className="underline">
                  Privacy and Cookie Statement
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}

export default MenteeForm
