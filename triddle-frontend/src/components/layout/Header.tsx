import React from 'react';
import { useAuthStore } from '../../store/auth';
import { useThemeStore } from '../../store/theme';
import { Button } from '../ui';
import { 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { cn } from '../../utils';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle, 
  showMenuButton = false 
}) => {
  const { user, isAuthenticated } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleProfileMenuClose = () => {
    setIsProfileMenuOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const profileMenu = document.getElementById('profile-menu');
      const profileButton = document.getElementById('profile-button');
      
      if (profileMenu && !profileMenu.contains(target) && !profileButton?.contains(target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 h-16">
      <div className="flex items-center justify-between h-full">
        {/* Left section */}
        <div className="flex items-center">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="mr-3 lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </Button>
          )}
          
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Triddle
            </h1>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="p-2"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          {/* User menu */}
          {isAuthenticated && user ? (
            <div className="relative">
              <Button
                id="profile-button"
                variant="ghost"
                size="sm"
                onClick={handleProfileClick}
                className="flex items-center p-2"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                )}
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                  {user.firstName} {user.lastName}
                </span>
              </Button>

              {/* Dropdown menu */}
              {isProfileMenuOpen && (
                <div
                  id="profile-menu"
                  className={cn(
                    'absolute right-0 mt-2 w-48 rounded-md shadow-lg',
                    'bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5',
                    'divide-y divide-gray-100 dark:divide-gray-700',
                    'animate-fade-in'
                  )}
                >
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="font-medium">{user.firstName} {user.lastName}</div>
                      <div className="text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <div className="py-1">
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleProfileMenuClose}
                    >
                      Dashboard
                    </a>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleProfileMenuClose}
                    >
                      Profile Settings
                    </a>
                  </div>
                  <div className="py-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        handleProfileMenuClose();
                        // Handle logout
                        useAuthStore.getState().logout();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/login'}
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = '/register'}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;