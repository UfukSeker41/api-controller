import { useState, useEffect } from 'react';
import { ApiDetails } from '@/types/api';

const FAVORITES_KEY = 'api-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (apiId: string) => {
    setFavorites(prev => {
      if (!prev.includes(apiId)) {
        return [...prev, apiId];
      }
      return prev;
    });
  };

  const removeFavorite = (apiId: string) => {
    setFavorites(prev => prev.filter(id => id !== apiId));
  };

  const isFavorite = (apiId: string) => favorites.includes(apiId);

  const getFavoriteApis = (apis: ApiDetails[]) => {
    return apis.filter(api => favorites.includes(api.id));
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoriteApis,
  };
}