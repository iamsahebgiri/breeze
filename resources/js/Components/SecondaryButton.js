import React from 'react'

export default function SecondaryButton({ type, className, children, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:border-gray-300 focus:ring focus:ring-gray-100 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-25 transition ${className}`}
    >
      {children}
    </button>
  )
}
