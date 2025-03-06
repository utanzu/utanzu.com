import AdminPageSection from '@/components/AdminPageSection'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Administrator' })

const AdminPage = () => {
  return (
    <>
      <section className="flex flex-col">
        <div className="flex w-full flex-col pb-8">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 xl:col-span-2">
            Administrator
          </h1>
          <hr className="border-t-1 my-3 border-gray-300 dark:border-gray-600"></hr>
          <AdminPageSection />
        </div>
      </section>
    </>
  )
}

export default AdminPage
