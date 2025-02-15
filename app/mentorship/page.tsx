import MentorshipPageSection from '@/components/MentorshipPageSection'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Cybersecurity Mentorship | Utanzu',
  description:
    'Get a mentor to help you in your cybersecurity journey or become a mentor to give back to the community',
})

export default function Mentorship() {
  return (
    <>
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 xl:col-span-2">
        Cybersecurity Mentorship
      </h1>
      <h5 className="mb-10 mt-4 text-base text-gray-500 dark:text-gray-300 sm:text-base md:text-lg">
        Our mentorship program connects aspiring cybersecurity professionals with experienced
        mentors. Get insights, career guidance, and hands-on advice while mentors give back to the
        community.
      </h5>

      <MentorshipPageSection />
    </>
  )
}
