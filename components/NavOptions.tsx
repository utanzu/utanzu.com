'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import headerNavLinks from '@/data/headerNavLinks'
import Link from 'next/link'

type NavItemBase = {
  title: string
  isButton?: boolean
}

type NavItemWithHref = NavItemBase & {
  href: string
  children?: never
}

type NavItemWithChildren = NavItemBase & {
  children: NavItemChild[]
  href?: never
}

export type NavItemChild = {
  href: string
  title: string
}

export type NavItem = NavItemWithHref | NavItemWithChildren

export const NavOptions = () => {
  return (
    <>
      {headerNavLinks
        .filter((link) => link.href !== '/')
        .map((link) => (
          <RenderNavLink navItem={link} key={link.title} />
        ))}
    </>
  )
}

const RenderNavLink = ({ navItem }: { navItem: NavItem }) => {
  if (!navItem.children) {
    return (
      <Link
        key={navItem.title}
        href={navItem.href}
        className={`hidden font-medium ${
          navItem.isButton
            ? 'rounded border border-orange-500 bg-transparent px-4 py-2 font-semibold text-orange-500 hover:border-transparent hover:bg-orange-500 hover:text-white'
            : 'text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400'
        } sm:block`}
      >
        {navItem.title}
      </Link>
    )
  }
  return (
    <div className="mr-5">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {navItem.title && (
            <Menu.Button
              className={
                'hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100  dark:hover:text-primary-400 sm:block'
              }
            >
              {navItem.title}
            </Menu.Button>
          )}
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <div className="p-1">
              {navItem.children &&
                navItem.children.map((link: NavItemChild) => (
                  <Menu.Item key={link.title}>
                    {({ active }) => (
                      <Link
                        href={link.href}
                        className={`${
                          active ? 'bg-primary-600 text-white' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {link.title}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
