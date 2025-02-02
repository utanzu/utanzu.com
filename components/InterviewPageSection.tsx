'use client'
import { Button } from '@headlessui/react'
import { IconDots, IconArrowRight } from '@tabler/icons-react'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useAuth } from 'app/hooks/useAuth'
import AuthModal from '../components/AuthModal'

/**
 * Message type for our chat.
 */
type Message = {
  role: 'user' | 'assistant'
  content: string
}

const InterviewPageSection = () => {
  const { user } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [cvFile, setCvFile] = useState<File | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const openAuthModal = () => {
    setAuthModalOpen(true)
  }

  function closeAuthModal() {
    setAuthModalOpen(false)
  }

  // Scroll to the bottom whenever messages change.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle changes in the textarea (job description).
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length > 4000) {
      alert('Message limit is 4000 characters')
      return
    }
    setContent(value)
  }

  // Handle file input changes for the CV/resume.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0])
    }
  }

  // Handle sending the message.
  const handleSend = async () => {
    // Validate that a CV has been uploaded.
    if (!cvFile) {
      alert('Please upload your CV before sending a message.')
      return
    }

    if (!content.trim()) {
      alert('Please enter a message')
      return
    }

    // Append the user's message immediately.
    const userMessage: Message = { role: 'user', content }
    setMessages((prev) => [...prev, userMessage])

    // Append an empty assistant message to display the loading indicator.
    const loadingMessage: Message = { role: 'assistant', content: '' }
    setMessages((prev) => [...prev, loadingMessage])
    setLoading(true)
    const jobDescription = content // Save current job description.
    setContent('') // Clear textarea.

    // Build a FormData object to send the CV and job description.
    const formData = new FormData()
    if (cvFile) {
      formData.append('cv', cvFile)
    }
    formData.append('job', jobDescription)

    try {
      // Call the AI API endpoint to get interview questions.
      const res = await fetch('/api/v1/interview/new', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Failed to get AI response')
      }
      const data = await res.json()
      const aiResponse = data.response // Expecting a JSON response with a "response" field.
      // Replace the loading message with the actual AI response.
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: aiResponse }
        return updated
      })
    } catch (error: any) {
      // Replace the loading message with an error message.
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Error: ' + error.message,
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  // Allow sending message on Enter (without Shift).
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {!user && (
        <section className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-3 text-base text-gray-600 dark:text-gray-300">
            Please sign in to get started.
          </p>
          <Button
            onClick={openAuthModal}
            className="block rounded border border-primary-500 bg-transparent px-4 py-1 text-sm font-semibold text-primary-500 hover:border-transparent hover:bg-orange-500 hover:text-black dark:hover:text-white"
          >
            Sign In
          </Button>
          <h3 className="mb-3 mt-5 text-lg text-gray-900 dark:text-gray-100">Demo Video</h3>
          <div className="relative h-0 overflow-hidden rounded-lg pb-[56.25%] shadow-lg">
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src={`https://www.youtube.com/embed/VkJObemd7C4`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}
      {user && (
        <div className="mx-auto mt-4 max-w-[1000px] sm:mt-8">
          {/* File Upload Section */}
          <div className="mb-4 sm:mb-8">
            <label
              className="mb-3 block text-base font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload your updated CV or Resume
            </label>
            <input
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400" id="file_input_help">
              Only PDF files are supported at the moment (Max. 5MB).
            </p>
          </div>

          {/* Chat Interface */}
          <div className="flex flex-col rounded-lg border border-neutral-200 px-2 dark:border-neutral-700 sm:border sm:p-4">
            {/* Render messages */}
            {messages.map((message, index) => (
              <div key={index} className="my-1 sm:my-1.5">
                <div
                  className={`flex flex-col ${message.role === 'assistant' ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`flex items-center ${
                      message.role === 'assistant'
                        ? 'bg-neutral-200 text-neutral-900'
                        : 'bg-primary-500 text-white'
                    } max-w-[67%] whitespace-pre-wrap rounded-2xl px-3 py-2`}
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    {message.content ||
                      (message.role === 'assistant' && loading && (
                        <IconDots className="animate-pulse" />
                      ))}
                  </div>
                </div>
              </div>
            ))}

            {/* New Message Input Area */}
            <div className="mt-4 w-full sm:mt-8">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  className="min-h-[44px] w-full rounded-lg border-2 border-neutral-200 py-2 pl-4 pr-12 focus:text-gray-700 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:border-neutral-700 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-neutral-600"
                  style={{ resize: 'none' }}
                  placeholder="Paste the job description here..."
                  value={content}
                  rows={3}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>
                  <IconArrowRight className="absolute bottom-3 right-2 h-8 w-8 rounded-full bg-primary-500 p-1 text-white hover:cursor-pointer hover:opacity-80" />
                </button>
              </div>
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
      <AuthModal
        isOpen={authModalOpen}
        onRequestClose={closeAuthModal}
        message="Sign in to start exploring this feature."
      />
    </>
  )
}

export default InterviewPageSection
