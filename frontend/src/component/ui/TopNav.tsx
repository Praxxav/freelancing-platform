import React from 'react';

export const TopNav: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-lg">
      <div className="text-xl font-semibold">
        <a href="/">Pro Connect</a>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/profile" className="text-gray-600 hover:text-gray-900">Profile</a>
        <a href="/notifications" className="relative text-gray-600 hover:text-gray-900">
          Notifications
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
        </a>
        <a href="/settings" className="text-gray-600 hover:text-gray-900">Settings</a>
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
