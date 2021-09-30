import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'

export default function RoundedNavLink({ href, active, children }) {
  return (
    <InertiaLink
      href={href}
      className={
        active
          ? 'mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md bg-gray-200 '
          : 'mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150'
      }
    >
      {children}
    </InertiaLink>
  )
}
