'use client'

import { Button } from '@headlessui/react'
import { useAuth } from 'app/hooks/useAuth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthModal from '../components/AuthModal'
import ProfileDropDown from './ProfileDropDown'

type User = {
  id?: string
  name?: string
  username?: string
  email?: string
  role?: string
  image?: string
}

const Avatar = () => {
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const router = useRouter()

  const closeModal = () => setModalOpen(false)
  const openAuthModal = () => setModalOpen(true)
  const handleProfileClick = () => setDropdownVisible((prev) => !prev)

  // Ensure `role` is converted to a string before passing to ProfileDropDown
  const formattedUser: User | undefined = user
    ? { ...user, role: user.role ? String(user.role) : undefined }
    : undefined

  if (!user) {
    return (
      <>
        <Button
          onClick={openAuthModal}
          className="block rounded border border-primary-500 bg-transparent px-4 py-1 text-sm font-semibold text-primary-500 hover:border-transparent hover:bg-orange-500 hover:text-black dark:hover:text-white"
        >
          Sign In
        </Button>
        <AuthModal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          message="Sign in to unlock a personalized experience. Select your preferred sign-in method below to get started."
        />
      </>
    )
  }

  return (
    <div className="relative">
      <Image
        alt="User Avatar"
        src={user.image || '/static/images/avatar.png'}
        width={30}
        height={30}
        unoptimized
        className="h-auto max-w-full cursor-pointer rounded-full"
        onClick={handleProfileClick}
      />

      {/* Only show dropdown if user exists and isDropdownVisible is true */}
      {isDropdownVisible && <ProfileDropDown user={formattedUser} />}
    </div>
  )
}

export default Avatar
