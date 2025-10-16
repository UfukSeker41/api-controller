import { useState, useEffect } from 'react';
import { StoredAPIKey, APIKeyStorage } from '@/types/auth';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

const API_KEYS_STORAGE_KEY = 'api-keys';

export function useApiKeys(apiId: string) {
  const { data: session } = useSession();
  const userId = session?.user?.email;
  const [keys, setKeys] = useState<StoredAPIKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load API keys from storage
  useEffect(() => {
    if (!userId) return;

    const loadKeys = () => {
      const storedData = localStorage.getItem(API_KEYS_STORAGE_KEY);
      if (!storedData) return [];

      try {
        const allKeys: APIKeyStorage = JSON.parse(storedData);
        return allKeys[apiId] || [];
      } catch {
        return [];
      }
    };

    setKeys(loadKeys());
    setIsLoading(false);
  }, [apiId, userId]);

  // Save keys to storage
  const saveKeys = (newKeys: StoredAPIKey[]) => {
    if (!userId) return;

    const storedData = localStorage.getItem(API_KEYS_STORAGE_KEY);
    let allKeys: APIKeyStorage = {};

    if (storedData) {
      try {
        allKeys = JSON.parse(storedData);
      } catch {
        // If parsing fails, start with empty object
      }
    }

    allKeys[apiId] = newKeys;
    localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(allKeys));
    setKeys(newKeys);
  };

  // Generate a new API key
  const addKey = async (name: string) => {
    if (!userId) throw new Error('User must be authenticated');

    const newKey: StoredAPIKey = {
      id: uuidv4(),
      name,
      key: `key_${uuidv4().replace(/-/g, '')}`,
      createdAt: new Date().toISOString(),
    };

    const newKeys = [...keys, newKey];
    saveKeys(newKeys);
  };

  // Delete an API key
  const deleteKey = async (keyId: string) => {
    if (!userId) throw new Error('User must be authenticated');

    const newKeys = keys.filter(key => key.id !== keyId);
    saveKeys(newKeys);
  };

  // Update last used timestamp
  const updateKeyUsage = (keyId: string) => {
    if (!userId) return;

    const newKeys = keys.map(key =>
      key.id === keyId
        ? { ...key, lastUsed: new Date().toISOString() }
        : key
    );
    saveKeys(newKeys);
  };

  return {
    keys,
    isLoading,
    addKey,
    deleteKey,
    updateKeyUsage
  };
}