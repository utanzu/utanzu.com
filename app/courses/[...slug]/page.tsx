import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { allCourses } from 'contentlayer/generated'
import CourseLayout from '@/layouts/CourseLayout'

// Generate static paths
export async function generateStaticParams() {
  return allCourses.map((p) => ({ slug: p.slug.split('/') }))
}

// Fetch data for the page
async function getCourseData(slug) {
  return allCourses.find((p) => p.slug === slug)
}

export default async function CoursePage({ params }) {
  const { slug } = await params
  const courseSlug = slug.join('/')
  const course = await getCourseData(courseSlug)

  if (!course) {
    return <div>Career not found</div>
  }
  return (
    <>
      <CourseLayout content={course}>
        <MDXLayoutRenderer code={course.body.code} components={components} />
      </CourseLayout>
    </>
  )
}
