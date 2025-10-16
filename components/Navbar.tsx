'use client';

import { ThemeToggle } from './ThemeToggle';
import { HelpSection } from './HelpSection';
import { UserMenu } from './UserMenu';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-white">
              DENEME
            </Link>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <HelpSection />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}