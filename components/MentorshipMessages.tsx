'use client'
import { useEffect, useState } from 'react'
import { Button } from '@headlessui/react'
import Toast from './Toast'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

type MessageType = {
  id: number
  mentorshipId: number
  senderId: string
  receiverId: string
  title: string
  message: string
  createdAt: string
  sender?: {
    name: string
    image: string
  }
  receiver?: {
    name: string
    image: string
  }
}

type Props = {
  user: { id: string; image: string }
}

const MentorshipMessages: React.FC<Props> = ({ user }) => {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [loading, setLoading] = useState(true)
  // For the chat input, store the message for the currently selected conversation.
  const [newMessage, setNewMessage] = useState('')
  // Store the currently selected conversation partner id (the other user's id)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  // Fetch messages for the logged in user.
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/v1/messages/${user.id}`)
        if (!res.ok) throw new Error('Failed to fetch messages')
        const data = await res.json()
        // Assume your API returns { messages: MessageType[] } including sender and receiver details.
        setMessages(data.messages)
      } catch (error) {
        setToast({ type: 'error', message: error.message })
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [user.id])

  // Group messages by conversation partner.
  // For each message, the conversation partner is determined as:
  // - If the current user is the sender, partner = receiver.
  // - Otherwise, partner = sender.
  const groupedMessages = messages.reduce(
    (groups, msg) => {
      const partnerId = msg.senderId === user.id ? msg.receiverId : msg.senderId
      if (!groups[partnerId]) groups[partnerId] = []
      groups[partnerId].push(msg)
      return groups
    },
    {} as Record<string, MessageType[]>
  )

  // Toggle the selected conversation.
  const toggleConversation = (partnerId: string) => {
    if (selectedConversation === partnerId) {
      setSelectedConversation(null)
    } else {
      setSelectedConversation(partnerId)
    }
  }

  // Handle sending a new message in the currently open conversation.
  const handleNewMessage = async () => {
    if (!selectedConversation) return
    if (!newMessage.trim()) {
      setToast({ type: 'error', message: 'Please enter a message.' })
      return
    }

    // Get the current conversation messages.
    const convMsgs = groupedMessages[selectedConversation]
    // Use the mentorshipId from the first message of this conversation.
    const mentorshipId = convMsgs && convMsgs.length > 0 ? convMsgs[0].mentorshipId : 0

    // Build the FormData.
    const formData = new FormData()
    // Use a default title for the conversation (e.g. "Conversation with {partnerName}").
    const partnerName =
      convMsgs && convMsgs.length > 0
        ? convMsgs[0].senderId === user.id
          ? convMsgs[0].receiver?.name || 'Unknown'
          : convMsgs[0].sender?.name || 'Unknown'
        : 'Conversation'
    formData.append('title', `Conversation with ${partnerName}`)
    formData.append('mentorship', mentorshipId.toString())
    formData.append('sender', user.id)
    formData.append('receiver', selectedConversation)
    formData.append('message', newMessage.trim())

    try {
      const res = await fetch('/api/v1/messages/new', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        setToast({ type: 'error', message: 'Error sending message' })
      } else {
        setToast({ type: 'success', message: 'Message sent successfully' })
        setNewMessage('')
        // Refresh messages after sending
        const res2 = await fetch(`/api/v1/messages/${user.id}`)
        const data2 = await res2.json()
        setMessages(data2.messages)
      }
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} />}
      <div className="space-y-5">
        {/* Header */}
        <section className="relative overflow-hidden p-2 text-white shadow-lg">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-2 text-2xl font-bold text-secondary-600">Mentorship Messages</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Here are your messages with your mentorship connections.
              </p>
            </div>
          </div>
        </section>
        {/* Conversation List (Accordion style) */}
        <section className="flex min-h-[400px] flex-col rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : Object.keys(groupedMessages).length === 0 ? (
            <p className="text-gray-500">No messages found.</p>
          ) : (
            Object.entries(groupedMessages).map(([partnerId, msgs]) => {
              // Determine partner details from the first message.
              const partner = msgs[0].senderId === user.id ? msgs[0].receiver : msgs[0].sender
              const partnerName = partner?.name || 'Unknown'
              const partnerImage = partner?.image || 'https://via.placeholder.com/40'

              return (
                <div key={partnerId} className="mb-6">
                  {/* Conversation header as an accordion button */}
                  <button
                    onClick={() => toggleConversation(partnerId)}
                    className="flex w-full items-center justify-start space-x-3 focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={selectedConversation === partnerId ? faMinus : faPlus}
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <Image
                      width={40}
                      height={40}
                      src={partnerImage}
                      alt={partnerName}
                      className="h-10 w-10 rounded-full"
                    />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {partnerName}
                    </h3>
                  </button>
                  {selectedConversation === partnerId && (
                    <div className="mt-2 space-y-4">
                      {msgs.map((msg) => {
                        const isOutgoing = msg.senderId === user.id
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}
                          >
                            {/* For incoming messages, show partner image */}
                            {!isOutgoing && (
                              <Image
                                width={32}
                                height={32}
                                src={partnerImage}
                                alt={partnerName}
                                className="mr-2 h-8 w-8 rounded-full"
                              />
                            )}
                            <div className="flex flex-col">
                              {!isOutgoing && (
                                <span className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                                  {partnerName}
                                </span>
                              )}
                              <div
                                className={`max-w-md rounded-lg px-4 py-2 shadow ${
                                  isOutgoing
                                    ? 'bg-primary-700 text-white'
                                    : 'bg-gray-200 text-gray-800'
                                }`}
                              >
                                <p className="text-sm">{msg.message}</p>
                                <span className="mt-1 block text-right text-xs">
                                  {new Date(msg.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            {isOutgoing && (
                              <Image
                                width={32}
                                height={32}
                                src={user.image}
                                alt="You"
                                className="ml-2 h-8 w-8 rounded-full"
                              />
                            )}
                          </div>
                        )
                      })}
                      {/* New Message Input Area for this conversation */}
                      <div className="border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-3">
                          <Image
                            width={40}
                            height={40}
                            src={user.image}
                            alt="You"
                            className="h-10 w-10 rounded-full"
                          />
                          <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            rows={2}
                          ></textarea>
                          <button
                            onClick={handleNewMessage}
                            className="rounded-full bg-secondary-600 px-3 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </section>
      </div>
    </>
  )
}

export default MentorshipMessages
