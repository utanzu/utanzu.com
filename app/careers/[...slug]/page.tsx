import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { allCareers } from 'contentlayer/generated'
import CareerLayout from '@/layouts/CareerLayout'

// Generate static paths
export async function generateStaticParams() {
  return allCareers.map((p) => ({ slug: p.slug.split('/') }))
}

// Fetch data for the page
async function getCareerData(slug: string) {
  return allCareers.find((p) => p.slug === slug)
}

export default async function CareerPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const careerSlug = slug.join('/')
  const career = await getCareerData(careerSlug)

  if (!career) {
    return <div>Career not found</div>
  }
  return (
    <>
      <CareerLayout content={career}>
        <MDXLayoutRenderer code={career.body.code} components={components} />
      </CareerLayout>
    </>
  )
}
