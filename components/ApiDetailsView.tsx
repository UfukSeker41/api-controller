'use client';

import { ApiDetails, ApiEndpoint } from '@/types/api';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ApiDetailsViewProps {
  api: ApiDetails;
  onTryEndpoint: (endpoint: ApiEndpoint) => void;
}

export const ApiDetailsView = ({ api, onTryEndpoint }: ApiDetailsViewProps) => {
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{api.name}</h2>
        <div className="text-gray-600 dark:text-gray-300 mb-4">
          Base URL: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">{api.baseUrl}</code>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{api.description}</p>
      </div>

      {/* Authentication Info */}
      {api.authentication.type !== 'none' && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Authentication</h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Type: <span className="font-semibold">{api.authentication.type}</span>
            </p>
            {api.authentication.location && (
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Location: <span className="font-semibold">{api.authentication.location}</span>
                {api.authentication.paramName && ` (${api.authentication.paramName})`}
              </p>
            )}
            {api.authentication.instructions && (
              <p className="text-gray-600 dark:text-gray-300">{api.authentication.instructions}</p>
            )}
          </div>
        </div>
      )}

      {/* Endpoints */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Endpoints</h3>
        
        {api.endpoints.map((endpoint) => (
          <div
            key={endpoint.path}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setExpandedEndpoint(expandedEndpoint === endpoint.path ? null : endpoint.path)}
            >
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  endpoint.method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' :
                  endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' :
                  endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100' :
                  endpoint.method === 'DELETE' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100'
                }`}>
                  {endpoint.method}
                </span>
                <span className="font-mono text-gray-900 dark:text-white">{endpoint.path}</span>
              </div>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${
                  expandedEndpoint === endpoint.path ? 'transform rotate-180' : ''
                }`}
              />
            </div>

            {expandedEndpoint === endpoint.path && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{endpoint.description}</p>

                {/* Parameters */}
                {endpoint.parameters.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Parameters</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      {endpoint.parameters.map((param) => (
                        <div key={param.name} className="mb-4 last:mb-0">
                          <div className="flex items-center gap-2">
                            <code className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded font-mono">
                              {param.name}
                            </code>
                            {param.required && (
                              <span className="text-xs text-red-500">required</span>
                            )}
                          </div>
                          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {param.description}
                          </div>
                          {param.options && (
                            <div className="mt-1 text-sm text-gray-500">
                              Options: {param.options.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example Response */}
                {endpoint.responses[200] && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Example Response</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-gray-800 dark:text-gray-200">
                          {JSON.stringify(endpoint.responses[200].example, null, 2)}
                        </code>
                      </pre>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => onTryEndpoint(endpoint)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Try It Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};