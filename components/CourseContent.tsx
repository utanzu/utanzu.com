import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface CourseContentProps {
  title: string
  summary: string
  onPrevious: () => void
  onNext: () => void
}

export default function CourseContent({ title, summary, onPrevious, onNext }: CourseContentProps) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '100%' }}
    >
      <button
        onClick={onPrevious}
        className="rounded-md bg-secondary-500 hover:bg-primary-400"
        style={{
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="max-w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <blockquote className="text-xl font-semibold italic text-gray-900 dark:text-white">
          <svg
            className="mb-4 h-8 w-8 text-gray-400 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <p>{summary}</p>
        </blockquote>
      </div>

      <button
        onClick={onNext}
        className="rounded-md bg-secondary-500 hover:bg-primary-400"
        style={{
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}
