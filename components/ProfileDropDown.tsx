import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type User = {
  id?: string
  name?: string
  username?: string
  email?: string
  role?: string
  image?: string
}

interface ProfileDropDownProps {
  user?: User
}

const ProfileDropDown: React.FC<ProfileDropDownProps> = ({ user }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }) // Redirect to home after logout
  }

  // If no user, return null (hides dropdown)
  if (!user) return null

  return (
    <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
      <ul
        role="menu"
        className="z-10 flex min-w-full flex-col gap-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 font-sans text-sm font-semibold text-gray-600 shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      >
        {/* User Info (Only Show if Name or Email Exists) */}
        {(user.name || user.email) && (
          <div className="flex items-center gap-4">
            {user.image && (
              <Image
                src={user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="Profile Picture"
              />
            )}
            <div className="font-medium dark:text-white">
              {user.name && <div>{user.name}</div>}
              {user.email && (
                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
              )}
            </div>
          </div>
        )}

        <hr className="my-2 dark:border-gray-500" />

        {/* My Learning */}
        <button
          role="menuitem"
          className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-start leading-tight transition-all hover:bg-primary-50 hover:text-primary-900 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          📚 <span>My Learning</span>
        </button>

        {/* Help */}
        <button
          role="menuitem"
          className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-start leading-tight transition-all hover:bg-primary-50 hover:text-primary-900 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          ❓ <span>Help</span>
        </button>

        <hr className="my-2 dark:border-gray-500" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          role="menuitem"
          className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-start leading-tight transition-all hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900 dark:hover:text-white"
        >
          🚪 <span>Sign Out</span>
        </button>
      </ul>
    </div>
  )
}

export default ProfileDropDown
