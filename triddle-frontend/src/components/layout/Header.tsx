import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui';
import { MoonIcon, SunIcon, BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { cn } from '../../utils';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (notificationsOpen) {
      setNotificationsOpen(false);
    }
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/forms')) return 'Forms';
    if (path.startsWith('/responses')) return 'Responses';
    if (path.startsWith('/settings')) return 'Settings';
    if (path.startsWith('/profile')) return 'Profile';
    
    return 'Dashboard';
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 flex h-16 items-center justify-between border-b bg-white px-4 transition-all dark:border-gray-700 dark:bg-gray-800 z-10',
        scrolled && 'shadow-sm',
        isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
      )}
    >
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
        >
          {isSidebarOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="View notifications"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto py-2">
                <div className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
                  No new notifications
                </div>
              </div>
            </div>
          )}
        </div>

        {isAuthenticated && user && (
          <div className="relative">
            <div>
              <Button
                onClick={toggleDropdown}
                variant="ghost"
                className="flex items-center p-2"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName || ''} ${user.lastName || ''}`}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-700 dark:text-indigo-300">
                    {user.firstName?.[0] || user.name?.[0] || user.email[0]}
                  </div>
                )}
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                  {user.firstName || ''} {user.lastName || ''}
                </span>
                <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            </div>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="font-medium">{user.firstName || ''} {user.lastName || ''}</div>
                    <div className="text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700"></div>
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700"></div>
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    role="menuitem"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;