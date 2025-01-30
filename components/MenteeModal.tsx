import ReactModal from 'react-modal'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import MenteeForm from './MenteeForm'

type ModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  mentor
  user
}

const MenteeModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, mentor, user }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="max-h-full w-full overflow-y-auto bg-white p-8 shadow-xl dark:bg-stone-800 sm:w-1/2 sm:rounded-xl lg:w-1/3"
      overlayClassName="inset-0 fixed bg-[rgba(0,_0,_0,_0.75)] flex items-center justify-center"
      appElement={
        typeof window === 'undefined' ? undefined : document?.getElementById('root') || undefined
      }
      ariaHideApp={false}
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
            alt={mentor?.fullName || 'Mentor'}
            src={mentor?.profileImage || '/static/images/avatar.png'}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="mb-2 text-xl font-bold text-primary-400">{mentor?.fullName}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{mentor?.title}</p>
          </div>
        </div>
      </div>
      <MenteeForm mentor={mentor} user={user} />
    </ReactModal>
  )
}

export default MenteeModal
