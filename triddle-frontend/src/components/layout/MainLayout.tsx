import React from 'react';
import { cn } from '../../utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactElement<SidebarProps>;
  header?: React.ReactElement<HeaderProps>;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  sidebar,
  header,
  className,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar on route change (mobile)
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      {sidebar && (
        <div className="hidden lg:flex lg:flex-shrink-0">
          {React.cloneElement(sidebar, {
            isOpen: true,
            onClose: closeSidebar,
          })}
        </div>
      )}

      {/* Mobile sidebar */}
      {sidebar && (
        <div className="lg:hidden">
          {React.cloneElement(sidebar, {
            isOpen: isSidebarOpen,
            onClose: closeSidebar,
          })}
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Header */}
        {header && (
          <div className="relative z-10 flex-shrink-0">
            {React.cloneElement(header, {
              onMenuToggle: toggleSidebar,
              showMenuButton: true,
            })}
          </div>
        )}

        {/* Page content */}
        <main
          className={cn(
            'flex-1 relative overflow-y-auto focus:outline-none',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;