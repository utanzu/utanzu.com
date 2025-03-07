import { genPageMetadata } from 'app/seo'
import CareersCard from '@/components/CareersCard'
import { allCareers } from 'contentlayer/generated'

export const metadata = genPageMetadata({
  title: 'Career Paths',
  description:
    'Explore cybersecurity career paths and build a successful career in your chosen field.',
})

const AllCareers = () => {
  const careers = allCareers // Fetching data directly as it's statically available

  return (
    <>
      <section className="flex flex-col">
        <div className="flex w-full flex-col pb-8">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 xl:col-span-2">
            Cybersecurity Career Paths
          </h1>
          <hr className="border-t-1 my-3 border-gray-300 dark:border-gray-600"></hr>
          <h5 className="mb-10 mt-4 text-base text-gray-500 dark:text-gray-300 sm:text-base md:text-lg">
            Cybersecurity has many areas you can focus on, each with exciting career opportunities.
            Here, we highlight a few to help you plan your path and build a successful career in
            your chosen field.
          </h5>
          <div className="grid-cols-3 gap-x-4 gap-y-10 space-y-10 md:grid md:space-y-0">
            {careers.map((career) => (
              <CareersCard career={career} key={career.path} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AllCareers
