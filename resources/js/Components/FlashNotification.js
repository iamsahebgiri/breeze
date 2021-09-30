import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { useTimeoutFn } from 'react-use'
import { HiOutlineX, HiOutlineCheckCircle } from 'react-icons/hi'

const Notification = ({ message }) => {
  let [isShowing, setIsShowing] = useState(true)
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(false), 4000)

  return (
    <Transition
      show={isShowing}
      enter="transform ease-out duration-300 transition"
      enterFrom="-translate-y-4 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="max-w-sm w-full bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-md rounded-lg pointer-events-auto">
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <HiOutlineCheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-100">
                  {message.title}
                </p>
                <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-500">
                  {message.description}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => {
                    setIsShowing(false)
                    resetIsShowing()
                  }}
                  className="inline-flex text-gray-400 dark:text-gray-100 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                >
                  <span className="sr-only">Close</span>
                  <HiOutlineX className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default function FlashNotification() {
  const messages = [
    {
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
    },
  ]
  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <Notification key={message.title} message={message} />
      ))}
    </div>
  )
}
