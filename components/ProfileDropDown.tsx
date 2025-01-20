import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProfileDropDownProps {
  user: {
    id: string
    name: string
    username: string
    email: string
    role: string
    image?: string
  }
}

const ProfileDropDown: React.FC<ProfileDropDownProps> = ({ user }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: '/' })
    router.refresh()
    window.location.reload()
  }

  return (
    <>
      <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
        <ul
          role="menu"
          data-popover="profile-menu"
          data-popover-placement="bottom"
          className="absolute z-10 flex min-w-full flex-col gap-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 font-sans text-sm font-semibold text-gray-600 shadow-lg shadow-primary-500/10 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
        >
          <div className="flex items-center gap-4">
            <Image
              src={user.image || '/static/images/avatar.png'}
              width={30}
              height={30}
              className="rounded-full"
              alt="Profile Picture"
            />
            <div className="font-medium dark:text-white">
              <div>{user.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
            </div>
          </div>
          <hr className="my-2 dark:border-gray-500" />
          <button
            role="menuitem"
            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pb-2 pt-[9px] text-start leading-tight outline-none transition-all hover:bg-primary-50 hover:bg-opacity-80 hover:text-primary-900 focus:bg-primary-50 focus:bg-opacity-80 focus:text-primary-900 active:bg-primary-50 active:bg-opacity-80 active:text-primary-900"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H2ZM2 2H12V9H10L9 11H5L4 9H2V2Z"
                fill="#90A4AE"
              ></path>
            </svg>
            <p className="block font-sans text-sm font-medium leading-normal text-inherit antialiased">
              My Learning
            </p>
          </button>
          <button
            role="menuitem"
            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pb-2 pt-[9px] text-start leading-tight outline-none transition-all hover:bg-primary-50 hover:bg-opacity-80 hover:text-primary-900 focus:bg-primary-50 focus:bg-opacity-80 focus:text-primary-900 active:bg-primary-50 active:bg-opacity-80 active:text-primary-900"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM14 8C14 8.993 13.759 9.929 13.332 10.754L11.808 9.229C12.0362 8.52269 12.0632 7.76679 11.886 7.046L13.448 5.484C13.802 6.249 14 7.1 14 8ZM8.835 11.913L10.415 13.493C9.654 13.8281 8.83149 14.0007 8 14C7.13118 14.0011 6.27257 13.8127 5.484 13.448L7.046 11.886C7.63267 12.0298 8.24426 12.039 8.835 11.913ZM4.158 9.117C3.96121 8.4394 3.94707 7.72182 4.117 7.037L4.037 7.117L2.507 5.584C2.1718 6.34531 1.99913 7.16817 2 8C2 8.954 2.223 9.856 2.619 10.657L4.159 9.117H4.158ZM5.246 2.667C6.09722 2.22702 7.04179 1.99825 8 2C8.954 2 9.856 2.223 10.657 2.619L9.117 4.159C8.34926 3.93538 7.53214 3.94687 6.771 4.192L5.246 2.668V2.667ZM10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10C7.46957 10 6.96086 9.78929 6.58579 9.41421C6.21071 9.03914 6 8.53043 6 8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21071 7.46957 6 8 6C8.53043 6 9.03914 6.21071 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8Z"
                fill="#90A4AE"
              ></path>
            </svg>
            <p className="block font-sans text-sm font-medium leading-normal text-inherit antialiased">
              Help
            </p>
          </button>
          <hr className="my-2 dark:border-gray-500" />
          <button
            onClick={handleLogout}
            role="menuitem"
            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pb-2 pt-[9px] text-start leading-tight outline-none transition-all hover:bg-primary-50 hover:bg-opacity-80 hover:text-primary-900 focus:bg-primary-50 focus:bg-opacity-80 focus:text-primary-900 active:bg-primary-50 active:bg-opacity-80 active:text-primary-900"
          >
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                fill="#90A4AE"
              ></path>
            </svg>
            <p className="block font-sans text-sm font-medium leading-normal text-inherit antialiased">
              Sign Out
            </p>
          </button>
        </ul>
      </div>
    </>
  )
}

export default ProfileDropDown
