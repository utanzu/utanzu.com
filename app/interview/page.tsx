import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Interview Preparation' })

export default function Mentorship() {
  return (
    <>
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 xl:col-span-2">
        Interview Preparation
      </h1>
      <h5 className="mb-10 mt-4 text-base text-gray-500 dark:text-gray-300 sm:text-base md:text-lg">
        Do you have an upcoming interview in cybersecurity? Our AI-powered tool is designed to help
        you prepare with ease. It provides practice questions, clear feedback, and simple guidance
        to boost your confidence and skills. Get ready for your interview and take the next step in
        your career.
      </h5>
    </>
  )
}
