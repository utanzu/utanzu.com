import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { NavOptions } from './NavOptions'
import Avatar from './Avatar'

const Header = () => {
  return (
    <header className="relative flex items-center justify-between px-4 py-10 sm:px-0">
      <div className="align-center flex flex-row items-center">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              {/* <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg dark:bg-gradient-to-r dark:from-primary-400 dark:to-primary-600">
                <span className="text-3xl font-bold tracking-wide drop-shadow-lg">
                  :U
                </span>
              </div> */}
              <Logo className="h-12 w-12 rounded-full border-2 border-primary-500 p-2 dark:border-2 dark:border-primary-400" />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <NavOptions />
        <Avatar />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
