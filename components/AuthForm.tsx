import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Link } from './ui/link'
import { Button } from '@headlessui/react'

type ModalProps = {
  message: string
}

const AuthForm: React.FC<ModalProps> = ({ message }) => {
  const handleGoogleSignIn = async () => {
    await signIn('google')
  }
  const handleGithubSignIn = async () => {
    await signIn('github')
  }
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <section className="flex flex-col gap-1">
          <div className="py-2">
            <div className="mt-2 grid space-y-4">
              {/* Google Button */}
              <Button
                name="btnGoogle"
                onClick={handleGoogleSignIn}
                className="group h-12 rounded-full border-2 border-gray-400 px-6 text-gray-800 transition duration-300 
               hover:border-orange-500 hover:bg-gray-100 hover:text-gray-900 
               focus:border-orange-400 focus:bg-gray-200 focus:ring-2 focus:ring-orange-300 
               active:border-gray-500 active:bg-gray-300 active:text-gray-900 
               dark:border-gray-700 dark:text-gray-200 
               dark:hover:border-orange-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 
               dark:focus:border-orange-400 dark:focus:bg-gray-700 dark:focus:ring-orange-400 
               dark:active:border-gray-500 dark:active:bg-gray-600 dark:active:text-gray-300"
              >
                <div className="relative flex items-center justify-center space-x-4">
                  <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    width={96}
                    height={96}
                    className="absolute left-0 w-5"
                    alt="google logo"
                  />
                  <span
                    className="block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 
                       group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-base"
                  >
                    Continue with Google
                  </span>
                </div>
              </Button>

              {/* GitHub Button */}
              <Button
                name="btnGithub"
                onClick={handleGithubSignIn}
                className="group h-12 rounded-full border-2 border-gray-400 px-6 text-gray-800 transition duration-300 
               hover:border-orange-500 hover:bg-gray-100 hover:text-gray-900 
               focus:border-orange-400 focus:bg-gray-200 focus:ring-2 focus:ring-orange-300 
               active:border-gray-500 active:bg-gray-300 active:text-gray-900 
               dark:border-gray-700 dark:text-gray-200 
               dark:hover:border-orange-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 
               dark:focus:border-orange-400 dark:focus:bg-gray-700 dark:focus:ring-orange-400 
               dark:active:border-gray-500 dark:active:bg-gray-600 dark:active:text-gray-300"
              >
                <div className="relative flex items-center justify-center space-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute left-0 w-5 text-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  <span
                    className="block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 
                       group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-base"
                  >
                    Continue with GitHub
                  </span>
                </div>
              </Button>
            </div>

            <div className="mt-14 space-y-4 py-3 text-center text-gray-600 dark:text-gray-400">
              <p className="text-xs">
                By proceeding, you agree to our{' '}
                <Link href="/terms/" className="underline">
                  Terms of Use
                </Link>{' '}
                and confirm you have read our{' '}
                <Link href="/privacy/" className="underline">
                  Privacy and Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}

export default AuthForm
