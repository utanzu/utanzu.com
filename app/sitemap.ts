import { MetadataRoute } from 'next'
import { allBlogs, allCareers, allCourses } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // Generate career-specific routes
  const careerRoutes = allCareers
    .filter((career) => career.slug)
    .map((career) => ({
      url: `${siteUrl}/careers/${career.slug}`,
      lastModified: career.date || new Date().toISOString().split('T')[0],
    }))

  // Generate course-specific routes
  const courseRoutes = allCourses
    .filter((course) => course.slug)
    .map((course) => ({
      url: `${siteUrl}/courses/${course.slug}`,
      lastModified: course.date || new Date().toISOString().split('T')[0],
    }))

  // Generate blog-specific routes
  const blogRoutes = allBlogs
    .filter((blog) => blog.slug)
    .map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: blog.date || new Date().toISOString().split('T')[0],
    }))

  // Define standard static routes
  const staticRoutes = [
    '',
    'about',
    'careers',
    'courses',
    'mentorship',
    'interview',
    'terms',
    'privacy',
    'blog',
    'tags',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0], // Current date for static pages
  }))

  return [...staticRoutes, ...careerRoutes, ...courseRoutes, ...blogRoutes]
}
