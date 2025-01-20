import Head from 'next/head'
import { genPageMetadata } from 'app/seo'
import Avatar from '@/components/Avatar'
import ProfileCard from '@/components/ProfileCard'
export const metadata = genPageMetadata({ title: 'User Profile ' })

const UserProfile = () => {
  return (
    <>
      <Head>
        <title>User Profile | Utanzu</title>
      </Head>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">
            User Profile
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <ProfileCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
