'use client'
import { Button } from '@headlessui/react'
//import { Button } from '@material-tailwind/react'
import { useAuth } from 'app/hooks/useAuth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthModal from '../components/AuthModal'
import ProfileDropDown from './ProfileDropDown'

const Avatar = () => {
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const router = useRouter()

  function closeModal() {
    setModalOpen(false)
  }

  function OpenAuthModal() {
    setModalOpen(true)
  }

  const handleProfileClick = () => {
    setDropdownVisible((prev) => !prev) // Toggle dropdown visibility
  }

  return (
    <>
      {user ? (
        <div className="relative">
          <Image
            alt="User Avatar"
            src={user.image || '/static/images/avatar.png'}
            width={30}
            height={30}
            className="h-auto max-w-full rounded-full"
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate it's clickable
          />

          {isDropdownVisible && <ProfileDropDown user={user} />}
        </div>
      ) : (
        <Button
          onClick={OpenAuthModal}
          className="block rounded border border-primary-500 bg-transparent px-4 py-1 text-sm font-semibold text-primary-500 hover:border-transparent hover:bg-orange-500 hover:text-black dark:hover:text-white"
        >
          Sign In
        </Button>
      )}
      <AuthModal isOpen={modalOpen} onRequestClose={closeModal} />
    </>
  )
}

export default Avatar
