'use client';

import { ApiDetails } from '@/types/api';
import { ArrowRightIcon, BeakerIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface ApiCardProps {
  api: ApiDetails;
  onViewDetails: () => void;
  onTryIt?: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ApiCard = ({ api, onViewDetails, onTryIt, isFavorite = false, onToggleFavorite }: ApiCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{api.name}</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <StarIconSolid className="w-5 h-5 text-yellow-400" />
            ) : (
              <StarIcon className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
            )}
          </button>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">v{api.version}</span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {api.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {api.categories.map((category) => (
          <span
            key={category}
            className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
        <span>{api.endpoints.length} endpoints</span>
        <span>{api.authentication.type}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onViewDetails}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
          <ArrowRightIcon className="w-4 h-4" />
        </button>
        {onTryIt && (
          <button
            onClick={onTryIt}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Try It
            <BeakerIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};