'use client'
import { useAuth } from 'app/hooks/useAuth'
import { useSession, signIn } from 'next-auth/react'
import { Button } from '@headlessui/react'
import Image from 'next/image'

const ProfileCard = () => {
  const { user } = useAuth()

  const { data: session } = useSession()

  if (!session) {
    return (
      <div>
        <h1>You need to be authenticated to view this page.</h1>
      </div>
    )
  }

  return (
    <>
      {user && (
        <>
          <div className="mx-auto max-w-full space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
            <Image
              width={100}
              height={100}
              className="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
              src={user.image || '/static/images/avatar.png'}
              alt="User profile picture"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg font-semibold text-black">{user.name}</p>
                <p className="font-medium text-slate-500">{user.email}</p>
              </div>
              <Button className="rounded-full border border-primary-200 px-4 py-1 text-sm font-semibold text-primary-600 hover:border-transparent hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2">
                Edit
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfileCard
