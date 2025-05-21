import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { cn } from '../../utils';
import {
  HomeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  LogoutIcon,
  UserIcon,
  PlusIcon,
  DocumentDuplicateIcon,
  InboxInIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/outline';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();
  const [formsDropdownOpen, setFormsDropdownOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  React.useEffect(() => {
    // Automatically open the forms dropdown if we're on a forms page
    if (location.pathname.includes('/forms') || location.pathname.includes('/form/') || location.pathname.includes('/templates')) {
      setFormsDropdownOpen(true);
    }
  }, [location]);

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: HomeIcon,
    },
    {
      name: 'Forms',
      path: '/forms',
      icon: DocumentTextIcon,
      subItems: [
        {
          name: 'All Forms',
          path: '/forms',
        },
        {
          name: 'Create Form',
          path: '/form/new', // Updated from /forms/create to /form/new
        },
        {
          name: 'Templates',
          path: '/templates', // Updated from /forms/templates to /templates
        },
      ],
    },
    {
      name: 'Responses',
      path: '/responses',
      icon: InboxInIcon,
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: ChartBarIcon,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: CogIcon,
    },
  ];

  // Function to render icons consistently
  const renderIcon = (Icon: React.FC<React.ComponentProps<'svg'>>, isActive: boolean) => {
    return (
      <Icon 
        className={cn(
          'h-5 w-5 text-gray-500 transition dark:text-gray-400',
          isActive && 'text-indigo-600 dark:text-indigo-400'
        )}
      />
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-full w-64 flex-col border-r bg-white pt-16 dark:border-gray-700 dark:bg-gray-800',
        'transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-16',
        'flex'
      )}
    >
      <div className="overflow-y-auto py-4 px-3 h-full flex flex-col">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => setFormsDropdownOpen(!formsDropdownOpen)}
                    className={cn(
                      'flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                      location.pathname.includes(item.path) && 'bg-gray-100 dark:bg-gray-700'
                    )}
                  >
                    {renderIcon(item.icon, location.pathname.includes(item.path))}
                    <span
                      className={cn(
                        'ml-3 text-left',
                        isSidebarOpen ? 'inline' : 'hidden',
                        location.pathname.includes(item.path) && 'font-medium text-indigo-600 dark:text-indigo-400'
                      )}
                    >
                      {item.name}
                    </span>
                    {isSidebarOpen && (
                      <span className="ml-auto">
                        {formsDropdownOpen ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </button>
                  <ul
                    className={cn(
                      'space-y-2 py-2 pl-11',
                      formsDropdownOpen && isSidebarOpen ? 'block' : 'hidden'
                    )}
                  >
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            cn(
                              'block rounded-lg py-2 pl-9 text-sm font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                              isActive && 'bg-gray-100 font-medium text-indigo-600 dark:bg-gray-700 dark:text-indigo-400'
                            )
                          }
                        >
                          {subItem.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                      isActive && 'bg-gray-100 dark:bg-gray-700'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {renderIcon(item.icon, isActive)}
                      <span
                        className={cn(
                          'ml-3',
                          isSidebarOpen ? 'inline' : 'hidden',
                          location.pathname === item.path && 'font-medium text-indigo-600 dark:text-indigo-400'
                        )}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div
          className={cn(
            'mt-4 pt-4 border-t border-gray-200 dark:border-gray-700',
            !isSidebarOpen && 'border-t-0'
          )}
        >
          <NavLink
            to="/help"
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                isActive && 'bg-gray-100 dark:bg-gray-700'
              )
            }
          >
            {({ isActive }) => (
              <>
                {renderIcon(QuestionMarkCircleIcon, isActive)}
                <span className={cn('ml-3', isSidebarOpen ? 'inline' : 'hidden')}>Help Center</span>
              </>
            )}
          </NavLink>
        </div>

        {isAuthenticated && user && (
          <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-700">
            <div
              className={cn(
                'flex items-center justify-between p-2',
                !isSidebarOpen && 'justify-center'
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.firstName || ''} ${user.lastName || ''}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.firstName?.[0] || ''}{user.lastName?.[0] || ''}
                      </span>
                    </div>
                  )}
                </div>
                <div className={cn('flex-1 min-w-0', isSidebarOpen ? 'block' : 'hidden')}>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.firstName || ''} {user.lastName || ''}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className={cn(
                  'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                  isSidebarOpen ? 'block' : 'hidden'
                )}
              >
                <LogoutIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;