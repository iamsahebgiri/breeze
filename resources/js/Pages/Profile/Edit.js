import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Settings from '@/Layouts/Settings'
import UpdateProfileForm from './UpdateProfileForm'

export default function Show(props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}
    >
      <Head title="Settings" />
      <Settings>
        <UpdateProfileForm />
      </Settings>
    </Authenticated>
  )
}
