'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'weather', name: 'Weather' },
  { id: 'finance', name: 'Finance' },
  { id: 'social', name: 'Social' },
  { id: 'maps', name: 'Maps' }
];

const authTypes = [
  { id: 'all', name: 'All Auth Types' },
  { id: 'apiKey', name: 'API Key' },
  { id: 'OAuth', name: 'OAuth' },
  { id: 'none', name: 'No Auth' }
];

interface SearchBarProps {
  onSearch: (filters: {
    search: string;
    category: string;
    authType: string;
  }) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedAuthType, setSelectedAuthType] = useState(authTypes[0]);

  const handleSearch = () => {
    onSearch({
      search,
      category: selectedCategory.id,
      authType: selectedAuthType.id
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Search APIs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-48">
          <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="relative">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer">
                <span className="block truncate text-gray-900 dark:text-white">{selectedCategory.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg">
                  {categories.map((category) => (
                    <Listbox.Option
                      key={category.id}
                      value={category}
                      className={({ active }) =>
                        `${active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}
                        cursor-pointer select-none relative py-2 pl-10 pr-4`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {category.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Auth Type Dropdown */}
        <div className="w-full md:w-48">
          <Listbox value={selectedAuthType} onChange={setSelectedAuthType}>
            <div className="relative">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer">
                <span className="block truncate text-gray-900 dark:text-white">{selectedAuthType.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg">
                  {authTypes.map((type) => (
                    <Listbox.Option
                      key={type.id}
                      value={type}
                      className={({ active }) =>
                        `${active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}
                        cursor-pointer select-none relative py-2 pl-10 pr-4`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {type.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};