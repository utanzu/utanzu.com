import { Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface CourseVideoProps {
  title: string
  src: string
  onPrevious: () => void
  onNext: () => void
}

export default function CourseVideo({ title, src, onPrevious, onNext }: CourseVideoProps) {
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
      <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
        <Suspense fallback={<p>Loading video...</p>}>
          <iframe
            src={src}
            title={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Suspense>
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
