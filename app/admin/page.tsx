'use client'
import { genPageMetadata } from 'app/seo'
import { components } from '@/components/MDXComponents'
import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTachometerAlt, faUsers, faCog } from '@fortawesome/free-solid-svg-icons'

//export const metadata = genPageMetadata({ title: 'Administrator' })

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-md dark:bg-gray-800 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'} transition-transform md:relative md:w-64 md:translate-x-0`}
      >
        <div className="p-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faUsers} /> Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faCog} /> Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6 text-gray-900 dark:bg-gray-800 dark:text-gray-100 md:ml-10">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute left-4 top-4 rounded-md bg-gray-200 p-2 dark:bg-gray-700 md:hidden"
        >
          <FontAwesomeIcon icon={faBars} className="text-gray-900 dark:text-gray-100" />
        </button>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the admin panel.</p>
      </main>
    </div>
  )
}

export default AdminPage
