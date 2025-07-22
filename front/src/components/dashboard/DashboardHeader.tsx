import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 pt-2 pb-2">
      <div className="px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
          Tableau de bord
        </h1>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1.5 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>

          <div className="flex items-center">
            <div className="mr-3 hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name || 'Utilisateur'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || 'utilisateur@example.com'}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-700 dark:text-green-400">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
