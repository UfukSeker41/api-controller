'use client';

import { Fragment } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export function UserMenu() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  if (status === 'loading') {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  if (!isAuthenticated) {
    return (
      <a
        href="/auth/signin"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Sign In
      </a>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User profile'}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <UserCircleIcon className="h-10 w-10 text-gray-400" />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900 dark:text-white">
              Signed in as
            </p>
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {session.user?.email}
            </p>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}