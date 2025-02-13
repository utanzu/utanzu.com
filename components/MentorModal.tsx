import ReactModal from 'react-modal'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@/components/ui/link'

type ModalProps = {
  isOpenMentor: boolean
  onRequestCloseMentor: () => void
  mentor?: {
    fullName: string
    profileImage: string
    title: string
    expertise: string
    description: string
    linkedin?: string
  } | null
}

const MentorModal: React.FC<ModalProps> = ({ isOpenMentor, onRequestCloseMentor, mentor }) => {
  return (
    // @ts-ignore
    <ReactModal
      isOpen={isOpenMentor}
      onRequestClose={onRequestCloseMentor}
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
          onClick={onRequestCloseMentor}
        />
      </div>
      {mentor ? (
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
          {/* Expertise Badges */}
          {mentor.expertise ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.expertise.split(',').map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-gray-600 dark:text-white"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No expertise listed.</p>
          )}

          {/* Description */}
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{mentor.description}</p>

          {/* More info link */}
          <Link
            href={mentor.linkedin || '#'}
            className="inline-flex w-max items-center justify-center rounded-full bg-secondary-700 px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-primary-700"
          >
            More details
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">No mentor selected.</p>
      )}
    </ReactModal>
  )
}

export default MentorModal
