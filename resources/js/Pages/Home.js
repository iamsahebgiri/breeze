import { Link } from '@inertiajs/inertia-react'
import React, { useState } from 'react'
import FlashNotification from '../Components/FlashNotification'

export default function Home(props) {
  return (
    <div>
      {props.auth.user ? (
        <Link href="/dashboard" className="text-gray-700">
          Dashboard
        </Link>
      ) : (
        <>
          <Link href="/login" className="text-gray-700">
            Log in
          </Link>

          <Link href="/register" className="ml-4 text-gray-700">
            Register
          </Link>
        </>
      )}
    </div>
  )
}
