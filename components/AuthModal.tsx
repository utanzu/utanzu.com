import ReactModal from 'react-modal'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import AuthForm from './AuthForm'

type ModalProps = {
  isOpen: boolean
  onRequestClose: () => void
}

const AuthModal: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="max-h-full w-full overflow-y-auto bg-white p-8 shadow-xl dark:bg-stone-800 sm:w-1/2 sm:rounded-xl lg:w-1/3"
      overlayClassName="inset-0 fixed bg-[rgba(0,_0,_0,_0.75)] flex items-center justify-center"
      appElement={
        typeof window === 'undefined' ? undefined : document?.getElementById('root') || undefined
      }
    >
      <div className="relative -mb-10 flex justify-end">
        <FontAwesomeIcon
          icon={faClose}
          className="hover:text-primary h-[1.5rem] w-[1.5rem] cursor-pointer text-gray-600 dark:text-gray-200"
          onClick={onRequestClose}
        />
      </div>
      <div className="flex flex-col space-y-4 py-2">
        <div className="flex items-center gap-4">
          <Image
            alt="Login"
            src="/static/images/avatar.png"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <div className="flex flex-col">
            <h2 className="mb-2 text-2xl font-bold text-cyan-900 dark:text-white">
              Join the Community
            </h2>
          </div>
        </div>
      </div>
      <AuthForm />
    </ReactModal>
  )
}

export default AuthModal
