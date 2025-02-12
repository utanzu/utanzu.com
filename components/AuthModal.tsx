'use client'

import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import AuthForm from './AuthForm'

type ModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  message: string
}

const AuthModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, message }) => {
  return (
    // @ts-ignore
    <Dialog
      open={isOpen}
      handler={onRequestClose}
      size="xl"
      dismiss={{ enabled: false }}
      className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-md"
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
      animate={{
        mount: { scale: 1, opacity: 1 },
        unmount: { scale: 0.95, opacity: 0 },
      }}
    >
      <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl dark:bg-stone-800 sm:w-1/2 lg:w-1/3">
        {/* @ts-ignore*/}
        <DialogHeader className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              alt="Login"
              src="/static/images/avatar.png"
              width={50}
              height={50}
              className="rounded-xl"
            />
            <h2 id="auth-modal-title" className="text-xl font-bold text-cyan-900 dark:text-white">
              Join the Community
            </h2>
          </div>
          <button
            type="button"
            onClick={onRequestClose}
            className="hover:text-primary h-6 w-6 text-gray-600 dark:text-gray-200"
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </DialogHeader>
        {/* @ts-ignore*/}
        <DialogBody
          id="auth-modal-description"
          className="flex flex-col space-y-4 py-2 text-gray-700 dark:text-gray-300"
        >
          <p>{message}</p>
        </DialogBody>
        {/* @ts-ignore*/}
        <DialogFooter className="flex justify-end">
          <AuthForm message={message} />
        </DialogFooter>
      </div>
    </Dialog>
  )
}

export default AuthModal
