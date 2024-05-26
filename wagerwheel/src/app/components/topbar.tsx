"use client"
import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, MagnifyingGlassCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Topbar() {
    return (
        <Disclosure as="header" className="bg-gray-800 shadow divide-y-1 border-b border-gray-700">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
                        <div className="relative h-16 flex justify-between">
                            <div className="relative z-10 px-2 flex lg:px-0">
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block h-12 w-auto"
                                        src="/logo.png"
                                        alt="Workflow"
                                    />
                                <span className="flex text-gray-300 font-semibold px-2 pt-4 text-xl">Wager Wheels</span>
                                </div>
                            </div>
                            <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                                <div className="w-full sm:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                                <button
                                    type="button"
                                    className="flex-shrink-0 bg-gray-300 rounded-md px-2 py-2 text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >    
                                    <div className="flex-shrink-0 flex items-center">
                                        <img
                                            className="block h-5 pr-2 w-auto"
                                            src="/wallet.png"
                                            alt="Workflow"
                                            />
                                        Connect Wallet
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
        )}
        </Disclosure>
        )
}