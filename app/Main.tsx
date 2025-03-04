import Link from '@/components/Link'
import Typing from '@/components/Typing'
import Image from 'next/image'

export default function Main() {
  return (
    <>
      <div className="mx-2 flex flex-col items-center divide-y divide-gray-100 dark:divide-gray-800 md:mx-0 md:flex-row md:divide-y-0">
        {/* Image Section */}
        <div className="flex w-full items-center justify-center md:basis-2/5">
          <Image
            alt="Take Charge"
            src="/static/images/home.png"
            width={300}
            height={300}
            className="h-auto max-w-full"
            priority={true}
          />
        </div>

        {/* Text Content Section */}
        <div className="flex w-full flex-col items-center justify-center space-y-4 text-center md:basis-3/5">
          <h1 className="text-2xl font-extrabold leading-8 tracking-tight text-primary-400 dark:text-primary-500 max-[375px]:text-xl sm:text-2xl sm:leading-9 md:py-4 md:text-4xl md:leading-12 lg:text-5xl">
            Join,&nbsp;
            <span className="block lg:inline">
              <Typing />
            </span>
          </h1>
          <h3 className="text-base font-medium text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl">
            Unlock your potential with a community that guides you through every step of your
            cybersecurity journey, from learning to earning.
          </h3>
          <Link
            href="/careers"
            className="block rounded border border-primary-500 bg-transparent px-4 py-2 font-semibold text-primary-500 hover:border-transparent hover:bg-orange-500 hover:text-black dark:hover:text-white"
          >
            Get started - it&apos;s free
          </Link>
        </div>
      </div>
      <div className="mx-2 mt-4 flex divide-y divide-gray-100 dark:divide-gray-800 md:mx-0">
        <div className="space-y-2 pb-4 pt-6 md:space-y-5 xl:pt-6">
          <h2 className="text-xl font-bold leading-8 tracking-tight text-gray-700 dark:text-gray-100 max-[375px]:text-lg sm:text-xl sm:leading-8 md:text-2xl md:leading-10 lg:text-3xl">
            Why Utanzu?
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full pr-4 md:w-3/5">
              <p className="mt-4 leading-7 text-gray-500 dark:text-gray-400 md:text-xl">
                By joining the
                <span className="font-semibold text-primary-500"> Utanzu Cybersecurity </span>
                community, you become part of a dynamic network dedicated to empowering the next
                generation of cybersecurity experts, helping them branch out into new areas of
                knowledge, mentorship, and professional success.
              </p>
            </div>
            <div className="w-full pl-4 md:w-2/5">
              <Image
                alt="Take Charge"
                src="/static/images/community.png"
                width={200}
                height={200}
                className="h-auto max-w-full"
                priority={true}
              />
            </div>
          </div>
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/about"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Read more"
            >
              Read more &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
