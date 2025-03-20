import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import { allCourses } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const outputFolder = process.env.EXPORT ? 'out' : 'public'

/**
 * Generate an RSS item for each course.
 */
const generateRssItem = (config, course) => `
  <item>
    <guid>${config.siteUrl}/courses/${course.slug}</guid>
    <title>${escape(course.title)}</title>
    <link>${config.siteUrl}/courses/${course.slug}</link>
    ${course.summary ? `<description>${escape(course.summary)}</description>` : ''}
    <pubDate>${new Date(course.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${course.category ? `<category>${escape(course.category)}</category>` : ''}
    ${course.topics && course.topics.map((t) => `<category>${escape(t)}</category>`).join('')}
  </item>
`

/**
 * Generate the full RSS feed for courses.
 */
const generateRss = (config, courses, page = 'courses.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)} - Courses</title>
      <link>${config.siteUrl}/courses</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(courses[0]?.date || new Date()).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${courses.map((course) => generateRssItem(config, course)).join('')}
    </channel>
  </rss>
`

/**
 * Generate RSS feeds for all courses and categories.
 */
async function generateRSS(config, allCourses, page = 'courses.xml') {
  const publishedCourses = allCourses.filter((course) => !!course.date) // Only include courses with a date

  // Generate global RSS feed for all courses
  if (publishedCourses.length > 0) {
    const rss = generateRss(config, sortPosts(publishedCourses))
    writeFileSync(`./${outputFolder}/${page}`, rss)
  }

  // Generate RSS feeds for each category
  if (publishedCourses.length > 0) {
    for (const category of Object.keys(tagData)) {
      const filteredCourses = allCourses.filter((course) =>
        course.category.toLowerCase().includes(category.toLowerCase())
      )
      if (filteredCourses.length > 0) {
        const rss = generateRss(config, filteredCourses, `categories/${category}/${page}`)
        const rssPath = path.join(outputFolder, 'categories', category)
        mkdirSync(rssPath, { recursive: true })
        writeFileSync(path.join(rssPath, page), rss)
      }
    }
  }
}

/**
 * Main function to execute RSS generation.
 */
const rss = () => {
  generateRSS(siteMetadata, allCourses)
  console.log('RSS feed for courses generated...')
}

export default rss
