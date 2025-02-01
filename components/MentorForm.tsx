'use client'
import Image from '@/components/Image'
import { Button } from '@headlessui/react'
import { useState } from 'react'
import Select from 'react-select'
import Toast from './Toast'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

type Props = {
  user
}

const MentorForm: React.FC<Props> = ({ user }) => {
  // State variables
  const [fullName, setFullName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [title, setTitle] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [description, setDescription] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState([])
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState(user.image || '') // Set URL if exists
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const router = useRouter()
  const { theme } = useTheme()

  // Define expertise options
  const expertiseOptions = [
    { value: 'Network Security', label: 'Network Security' },
    { value: 'Penetration Testing', label: 'Penetration Testing' },
    { value: 'Cloud Security', label: 'Cloud Security' },
    { value: 'Incident Response', label: 'Incident Response' },
    { value: 'Application Security', label: 'Application Security' },
    { value: 'IAM & Access Management', label: 'IAM & Access Management' },
    { value: 'Threat Intelligence', label: 'Threat Intelligence' },
    { value: 'Risk Management', label: 'Risk Management' },
    { value: 'Digital Forensics', label: 'Digital Forensics' },
    { value: 'Security Operations (SOC)', label: 'Security Operations (SOC)' },
    { value: 'Red Teaming & Ethical Hacking', label: 'Red Teaming & Ethical Hacking' },
    { value: 'DevSecOps', label: 'DevSecOps' },
    { value: 'Industrial Control Systems (ICS) Security', label: 'ICS Security' },
    { value: 'Zero Trust Architecture', label: 'Zero Trust Architecture' },
    { value: 'Cloud Identity & Access Management', label: 'Cloud IAM' },
    { value: 'API Security', label: 'API Security' },
    { value: 'Security Awareness & Training', label: 'Security Awareness & Training' },
    { value: 'Security Compliance & Governance', label: 'Security Compliance & Governance' },
    { value: 'Cyber Threat Hunting', label: 'Cyber Threat Hunting' },
    { value: 'Endpoint Security', label: 'Endpoint Security' },
    { value: 'SIEM & Log Analysis', label: 'SIEM & Log Analysis' },
    {
      value: 'Malware Analysis & Reverse Engineering',
      label: 'Malware Analysis & Reverse Engineering',
    },
    { value: 'Blockchain Security', label: 'Blockchain Security' },
    { value: 'IoT Security', label: 'IoT Security' },
    { value: 'Artificial Intelligence & Cybersecurity', label: 'AI & Cybersecurity' },
    { value: 'Dark Web Intelligence', label: 'Dark Web Intelligence' },
    { value: 'Privacy & Data Protection', label: 'Privacy & Data Protection' },
    { value: 'Cybersecurity Strategy & Leadership', label: 'Cybersecurity Strategy & Leadership' },
    { value: 'Supply Chain Security', label: 'Supply Chain Security' },
    { value: 'Mobile Security', label: 'Mobile Security' },
    {
      value: 'Social Engineering & Psychological Security',
      label: 'Social Engineering & Psychological Security',
    },
  ]

  const handleExpertiseChange = (selectedOptions) => {
    if (selectedOptions.length <= 3) {
      setSelectedExpertise(selectedOptions)
    }
  }

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Replace spaces in filename with underscores and prepend user ID
      const sanitizedFileName = file.name.replace(/\s+/g, '_')
      const renamedFile = new File([file], `${user.id}_${sanitizedFileName}`, { type: file.type })

      setProfileImage(renamedFile) // Store as a file
      setProfileImageUrl('') // Clear the URL when a new file is selected
    }
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Prepare form data
    const formData = new FormData()
    formData.append('fullName', fullName)
    formData.append('email', email)
    formData.append('title', title)
    formData.append('linkedin', linkedin)
    formData.append('description', description)
    formData.append('expertise', JSON.stringify(selectedExpertise.map((e) => e.value))) // Convert to JSON

    // Append profile image - either a file or a URL
    if (profileImage instanceof File) {
      formData.append('profileImage', profileImage) // Upload file
    } else if (profileImageUrl) {
      formData.append('profileImageUrl', profileImageUrl) // Send existing URL
    }

    //console.log('FormData entries:', Array.from(formData.entries())) // Debugging

    try {
      const response = await fetch('/api/v1/mentors/new', {
        method: 'POST',
        body: formData,
      })

      const responseData = await response.json()

      if (response.status === 200 || response.status === 201) {
        setToast({
          type: 'success',
          message: responseData.message || 'You have been added successfully. Welcome!',
        })
        // Redirect to /mentorship after 1 second
        setTimeout(() => {
          window.location.reload()
        }, 1000)
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor:
        theme === 'dark' || theme === 'system'
          ? state.isFocused
            ? '#424242'
            : '#616161'
          : state.isFocused
            ? '#FFFFFF'
            : '#F3F4F6',
      borderColor:
        theme === 'dark' || theme === 'system'
          ? state.isFocused
            ? '#FF7518'
            : '#A9A9A9'
          : state.isFocused
            ? '#3B82F6'
            : '#D1D5DB',
      color: theme === 'dark' || theme === 'system' ? '#E5E7EB' : '#1F2937',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' || theme === 'system' ? '#808080' : '#FFFFFF',
      color: theme === 'dark' || theme === 'system' ? '#E5E7EB' : '#1F2937',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        theme === 'dark' || theme === 'system'
          ? state.isFocused
            ? '#FF7518'
            : '#808080'
          : state.isFocused
            ? '#E5E7EB'
            : '#FFFFFF',
      color:
        theme === 'dark' || theme === 'system'
          ? state.isFocused
            ? '#FFFFFF'
            : '#E5E7EB'
          : state.isFocused
            ? '#1F2937'
            : '#4B5563',
      cursor: 'pointer',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' || theme === 'system' ? '#FF7518' : '#3B82F6',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#FFFFFF',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#FFFFFF',
      ':hover': {
        backgroundColor: theme === 'dark' || theme === 'system' ? '#DC2626' : '#EF4444',
        color: '#FFFFFF',
      },
    }),
  }

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} />}
      <form
        id="mentorRegForm"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        onSubmit={handleSubmit}
      >
        {/* Profile Image Upload */}
        <div className="col-span-1 flex flex-col items-center sm:col-span-2">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Profile Picture
          </p>
          <div className="relative">
            <Image
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : user.image || '/static/images/avatar.png'
              }
              alt="Profile"
              width={100}
              height={100}
              className="h-24 w-24 rounded-full border border-gray-300 object-cover shadow-md dark:border-gray-600"
            />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
              onChange={handleImageChange}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Click to change profile picture.
          </p>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="mentorName"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name*
          </label>
          <input
            type="text"
            id="mentorName"
            placeholder="Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="mentorEmail"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email*
          </label>
          <input
            type="email"
            id="mentorEmail"
            placeholder="jane@example.com"
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label
            htmlFor="mentorTitle"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title*
          </label>
          <input
            type="text"
            id="mentorTitle"
            placeholder="Security Architect"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* LinkedIn Profile */}
        <div className="flex flex-col">
          <label
            htmlFor="mentorLinkedIn"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            LinkedIn Profile*
          </label>
          <input
            type="url"
            id="mentorLinkedIn"
            placeholder="https://www.linkedin.com/in/your-profile"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            required
            className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Cybersecurity Expertise Selection */}
        <div className="col-span-1 flex flex-col sm:col-span-2">
          <label
            htmlFor="mentorExpertise"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Expertise Area*
          </label>
          <Select
            id="mentorExpertise"
            options={expertiseOptions}
            isMulti
            value={selectedExpertise}
            onChange={handleExpertiseChange}
            classNamePrefix="select"
            placeholder="Select up to 3 expertise areas"
            styles={customStyles}
          />
        </div>

        {/* Mentor Description */}
        <div className="col-span-1 flex flex-col sm:col-span-2">
          <label
            htmlFor="mentorDescription"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Short Bio*
          </label>
          <textarea
            id="mentorDescription"
            rows={4}
            placeholder="Briefly describe your experience, background, and mentorship approach..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Submit */}
        <div className="col-span-1 flex justify-end sm:col-span-2">
          <Button
            type="submit"
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Submit Application
          </Button>
        </div>
      </form>
    </>
  )
}

export default MentorForm
