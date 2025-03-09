'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTachometerAlt, faUsers, faBook, faCog } from '@fortawesome/free-solid-svg-icons'

const AdminPageSection = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true) // Expanded by default on desktop
  const [activeTab, setActiveTab] = useState('dashboard') // Track active section

  // Define the content for each section
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <h2 className="text-xl font-semibold">Dashboard Content</h2>
      case 'users':
        return <h2 className="text-xl font-semibold">User Management Section</h2>
      case 'settings':
        return <h2 className="text-xl font-semibold">Courses Panel</h2>
      default:
        return <h2 className="text-xl font-semibold">Welcome to Admin Dashboard</h2>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 ${
          isSidebarExpanded ? 'w-64' : 'w-16'
        } bg-white shadow-md transition-all dark:bg-gray-800 md:relative md:w-64`}
      >
        {/* Sidebar Toggle Button */}
        <div className="flex justify-between p-4">
          <span
            className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${!isSidebarExpanded && 'hidden'}`}
          >
            Admin
          </span>
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="text-gray-700 dark:text-gray-300"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                activeTab === 'dashboard' ? 'bg-gray-300 dark:bg-gray-700' : ''
              }`}
            >
              <FontAwesomeIcon icon={faTachometerAlt} />
              {isSidebarExpanded && <span>Dashboard</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                activeTab === 'users' ? 'bg-gray-300 dark:bg-gray-700' : ''
              }`}
            >
              <FontAwesomeIcon icon={faUsers} />
              {isSidebarExpanded && <span>Users</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                activeTab === 'courses' ? 'bg-gray-300 dark:bg-gray-700' : ''
              }`}
            >
              <FontAwesomeIcon icon={faBook} />
              {isSidebarExpanded && <span>Courses</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                activeTab === 'settings' ? 'bg-gray-300 dark:bg-gray-700' : ''
              }`}
            >
              <FontAwesomeIcon icon={faCog} />
              {isSidebarExpanded && <span>Settings</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6 text-gray-900 dark:bg-gray-800 dark:text-gray-100 md:ml-10">
        {renderContent()}
      </main>
    </div>
  )
}

export default AdminPageSection
