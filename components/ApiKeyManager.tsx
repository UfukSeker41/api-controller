'use client';

import { useState } from 'react';
import { TrashIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { StoredAPIKey } from '@/types/auth';

interface ApiKeyManagerProps {
  apiId: string;
  keys: StoredAPIKey[];
  onAddKey: (name: string) => Promise<void>;
  onDeleteKey: (keyId: string) => Promise<void>;
}

export function ApiKeyManager({ apiId, keys, onAddKey, onDeleteKey }: ApiKeyManagerProps) {
  const [newKeyName, setNewKeyName] = useState('');
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    setIsCreating(true);
    try {
      await onAddKey(newKeyName.trim());
      setNewKeyName('');
    } finally {
      setIsCreating(false);
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Create new API key */}
      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Create New API Key
        </h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name (e.g., Development, Production)"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating || !newKeyName.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isCreating ? 'Creating...' : 'Create Key'}
          </button>
        </div>
      </form>

      {/* API Keys list */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Your API Keys
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your API keys securely
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {keys.map((key) => (
              <li key={key.id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <KeyIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {key.name}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center">
                      <code className="text-sm font-mono bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                        {showKey[key.id] ? key.key : '••••••••••••••••'}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="ml-2 text-gray-400 hover:text-gray-500"
                      >
                        {showKey[key.id] ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Created: {new Date(key.createdAt).toLocaleDateString()}
                      {key.lastUsed && ` • Last used: ${new Date(key.lastUsed).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => onDeleteKey(key.id)}
                      className="text-red-600 hover:text-red-900 p-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {keys.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                No API keys created yet. Create one to get started.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}