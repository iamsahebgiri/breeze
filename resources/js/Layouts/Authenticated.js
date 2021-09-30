import React, { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import ValidationErrors from '@/Components/ValidationErrors'
import { Link } from '@inertiajs/inertia-react'

export default function Authenticated({ auth, header, children, errors }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink href="/dashboard" active={window.location.pathname === '/dashboard'}>
                  Dashboard
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ml-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {auth.user.avatar ? (
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={auth.user.avatar}
                            alt={auth.user.name}
                          />
                        ) : (
                          <>
                            {auth.user.name}
                            <HiChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
                          </>
                        )}
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href="/iamsahebgiri" method="get" as="button">
                      Profile
                    </Dropdown.Link>
                    <Dropdown.Link href="/settings/profile" method="get" as="button">
                      Settings
                    </Dropdown.Link>
                    <Dropdown.Link href="/logout" method="post" as="button">
                      Log out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href="/dashboard" active={window.location.pathname === '/dashboard'}>
              Dashboard
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex items-center px-4">
              {auth.user.avatar && (
                <div className="flex-shrink-0 mr-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={auth.user.avatar}
                    alt={auth.user.name}
                  />
                </div>
              )}

              <div>
                <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <ResponsiveNavLink method="post" href="/logout" as="button">
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>
        <ValidationErrors errors={errors} />
        {children}
      </main>
    </div>
  )
}
