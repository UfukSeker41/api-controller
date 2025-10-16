'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface HelpTopic {
  id: string;
  title: string;
  content: string;
}

const helpTopics: HelpTopic[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: 'Welcome to the API Documentation Tool! This tool helps you manage, test, and document your APIs. Start by adding your API details or exploring the sample APIs provided.'
  },
  {
    id: 'api-testing',
    title: 'API Testing',
    content: 'The API Tester allows you to send requests to your API endpoints. You can set headers, parameters, and view response details including status codes, response time, and data.'
  },
  {
    id: 'api-keys',
    title: 'Managing API Keys',
    content: 'Store and manage your API keys securely. You can add, edit, and delete API keys. Keys are encrypted before being stored locally.'
  },
  {
    id: 'test-history',
    title: 'Test History',
    content: 'View your API test history including response times, status codes, and full request/response details. Use the charts to analyze API performance over time.'
  },
  {
    id: 'themes',
    title: 'Themes',
    content: 'Switch between light and dark themes using the theme toggle button in the navigation bar. Your preference is saved and will persist across sessions.'
  }
];

export function HelpSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic>(helpTopics[0]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Open help"
      >
        <QuestionMarkCircleIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Help & Documentation
                    </Dialog.Title>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="col-span-1 space-y-1">
                      {helpTopics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => setSelectedTopic(topic)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedTopic.id === topic.id
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {topic.title}
                        </button>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="col-span-3">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {selectedTopic.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {selectedTopic.content}
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}