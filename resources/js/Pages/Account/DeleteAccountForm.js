import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DangerButton from '@/Components/DangerButton'
import SecondaryButton from '@/Components/SecondaryButton'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import ValidationErrors from '@/Components/ValidationErrors'
import { Head, Link, useForm } from '@inertiajs/inertia-react'

export default function DeleteAccountForm(props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    console.log(data)
    // post('/login')
  }

  return (
    <>
      <div className="border-b border-gray-200 pb-5 mb-6 sm:mb-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Account</h3>
        <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          Once your account is deleted, all of its resources and data will be permanently deleted.
          Before deleting your account, please download any data or information that you wish to
          retain.
        </p>
      </div>
      <DangerButton onClick={openModal}>Delete Account</DangerButton>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-opacity-80 bg-gray-800" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Delete Account
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete your account? Please enter your password to
                    confirm you would like to permanently delete your account.
                  </p>
                </div>
                <ValidationErrors errors={errors} />
                <form onSubmit={submit}>
                  <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                      type="password"
                      name="password"
                      value={data.password}
                      className="mt-1 block w-full"
                      autoComplete="current-password"
                      handleChange={onHandleChange}
                    />
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row-reverse">
                    <DangerButton className="">Delete Account</DangerButton>
                    <SecondaryButton onClick={closeModal} className="mt-2 sm:mr-2 sm:mt-0">
                      Cancel
                    </SecondaryButton>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
