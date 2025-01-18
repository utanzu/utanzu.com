import Link from '@/components/Link'
export default function OpenToWorkBadge() {
  return (
    <div className="static sm:absolute sm:mt-24">
      <Link href={'/resume'}>
        <div className="focus:ring-ring text-primary ml-0 inline-flex max-w-full items-center rounded-full border border-primary-500 bg-transparent px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md transition-colors duration-150 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-0 md:ml-0">
          <div
            className="mr-1 flex aspect-square h-[14px] w-[14px] animate-pulse rounded-full bg-green-500/50 dark:bg-green-400/50"
            aria-hidden="true"
          >
            <div className="m-auto h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></div>
          </div>
          <span className="inline whitespace-nowrap">Available</span>
        </div>
      </Link>
    </div>
  )
}
