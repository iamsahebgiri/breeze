import React from 'react'

export default function DangerButton({ type, className, children, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring focus:ring-red-200 active:bg-red-600 sm:w-auto sm:text-sm disabled:opacity-25 transition ${className}`}
    >
      {children}
    </button>
  )
}
