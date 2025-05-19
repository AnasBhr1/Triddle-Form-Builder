import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pt-20">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;