import Head from 'next/head'
import { genPageMetadata } from 'app/seo'
import { allCourses } from 'contentlayer/generated'
import CourseSearch from '@/components/CourseSearch'

export const metadata = genPageMetadata({ title: 'Careers' })

const AllCourses = () => {
  const courses = allCourses

  return (
    <>
      <Head>
        <title>Courses | Utanzu</title>
      </Head>
      <section className="flex flex-col">
        <div className="flex w-full flex-col pb-8">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 xl:col-span-2">
            Cybersecurity Courses
          </h1>
          <hr className="border-t-1 my-3 border-gray-300 dark:border-gray-600"></hr>
          <CourseSearch courses={courses} />
        </div>
      </section>
    </>
  )
}

export default AllCourses
