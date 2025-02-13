import Head from 'next/head'
import { genPageMetadata } from 'app/seo'
import { allCourses } from 'contentlayer/generated'
import CourseSearch from '@/components/CourseSearch'

export const metadata = genPageMetadata({ title: 'Careers' })

const AllCourses = () => {
  const transformedCourses = allCourses.map((course) => ({
    ...course,
    topics: Array.isArray(course.topics)
      ? course.topics.map(
          (topic) =>
            typeof topic === 'string'
              ? { title: topic, subtopics: [] } // Convert string to object
              : topic // Already an object, keep it as is
        )
      : [],
  }))

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
          <CourseSearch courses={transformedCourses} />
        </div>
      </section>
    </>
  )
}

export default AllCourses
