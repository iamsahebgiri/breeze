import React from 'react'

export default function UpdatePasswordForm(props) {
  return (
    <form id="edit_user" action="/users" method="post">
      <div className="border-b border-gray-200 pb-5 mb-6 sm:mb-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Update Password</h3>
        <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>
    </form>
  )
}
