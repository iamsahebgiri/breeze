import React from 'react'
import {
  HiOutlineUserCircle,
  HiOutlineKey,
  HiOutlineCog,
  HiOutlineColorSwatch,
} from 'react-icons/hi'
import RoundedNavLink from '@/Components/RoundedNavLink'

export default function Settings({ children }) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 md:flex">
        <nav className="md:w-1/4 md:pr-8">
          <RoundedNavLink
            href="/settings/profile"
            active={window.location.pathname === '/settings/profile'}
          >
            <HiOutlineUserCircle className="mr-3 text-gray-500 dark:text-gray-100 h-5 w-5 flex-shrink-0 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Profile</span>
          </RoundedNavLink>
          <RoundedNavLink
            href="/settings/account"
            active={window.location.pathname === '/settings/account'}
          >
            <HiOutlineCog className="mr-3 text-gray-500 dark:text-gray-100 h-5 w-5 flex-shrink-0 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Account</span>
          </RoundedNavLink>
          <RoundedNavLink
            href="/settings/appearance"
            active={window.location.pathname === '/settings/appearance'}
          >
            <HiOutlineColorSwatch className="mr-3 text-gray-500 dark:text-gray-100 h-5 w-5 flex-shrink-0 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Appearance</span>
          </RoundedNavLink>
          <RoundedNavLink
            href="/settings/password"
            active={window.location.pathname === '/settings/password'}
          >
            <HiOutlineKey className="mr-3 text-gray-500 dark:text-gray-100 h-5 w-5 flex-shrink-0 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Password</span>
          </RoundedNavLink>
        </nav>
        <div className="mt-4 md:mt-0 md:w-3/4">
          <div className="mb-4 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
