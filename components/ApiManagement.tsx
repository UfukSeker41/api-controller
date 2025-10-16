'use client';

import { useState } from 'react';
import { ApiDetails } from '@/types/api';
import { Tab } from '@headlessui/react';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  KeyIcon, 
  ClockIcon, 
  BeakerIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import TestHistoryView from './TestHistoryView';

interface ApiManagementProps {
  api: ApiDetails;
}

export function ApiManagement({ api }: ApiManagementProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: 'Overview', icon: ChartBarIcon },
    { name: 'Documentation', icon: DocumentTextIcon },
    { name: 'API Keys', icon: KeyIcon },
    { name: 'Usage Stats', icon: ChartBarIcon },
    { name: 'Test History', icon: ClockIcon },
    { name: 'Tests', icon: BeakerIcon },
    { name: 'Reviews', icon: StarIcon },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <Tab.List className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `flex items-center gap-2 py-4 border-b-2 font-medium text-sm outline-none cursor-pointer transition-colors ${
                    selected
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`
                }
              >
                <tab.icon className="h-5 w-5" aria-hidden="true" />
                <span>{tab.name}</span>
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="p-6">
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    API Information
                  </h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Provider
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <a
                          href={api.provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-500"
                        >
                          {api.provider.name}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Version
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {api.version}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Base URL
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                        {api.baseUrl}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Status
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Uptime
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {api.status.uptime.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Response Time
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {api.status.responseTime}ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Last Checked
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(api.status.lastChecked).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Usage Statistics
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Requests
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {api.stats.totalCalls.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Success Rate
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {(100 - api.stats.failureRate).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Avg Response Time
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {api.stats.avgResponseTime}ms
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Rate Limits
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Requests
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {api.rateLimit.requests} per {api.rateLimit.period}
                      </span>
                    </div>
                    {api.pricing.plans && (
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Available Plans:
                        </span>
                        <ul className="mt-2 space-y-2">
                          {api.pricing.plans.map((plan) => (
                            <li
                              key={plan.name}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-gray-900 dark:text-white">
                                {plan.name}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                ${plan.price}/{plan.period}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="prose dark:prose-invert max-w-none">
              <h2>{api.documentation.overview}</h2>
              {api.documentation.gettingStarted.map((section) => (
                <div key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                  {section.code && (
                    <pre className="language-{section.language}">
                      <code>{section.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            {/* API Keys management will be implemented next */}
            <div>API Keys Panel Coming Soon</div>
          </Tab.Panel>

          <Tab.Panel>
            {/* Usage Stats will be implemented next */}
            <div>Usage Stats Panel Coming Soon</div>
          </Tab.Panel>

          <Tab.Panel>
            <TestHistoryView api={api} />
          </Tab.Panel>

          <Tab.Panel>
            {/* Tests will be implemented next */}
            <div>Tests Panel Coming Soon</div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {api.rating.score.toFixed(1)}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(api.rating.score)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({api.rating.count} reviews)
                </span>
              </div>

              <div className="space-y-4">
                {api.rating.reviews.map((review) => (
                  <div
                    key={`${review.user}-${review.date}`}
                    className="border-b border-gray-200 dark:border-gray-700 pb-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {review.user}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}