import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Home,
  BarChart2,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon, label, isActive, isCollapsed, onClick }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative group',
        isActive
          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
          : 'text-gray-700 hover:bg-gray-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400'
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!isCollapsed && <span className="transition-opacity duration-200">{label}</span>}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const menuItems = [
    { to: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Accueil' },
    { to: '/dashboard/data', icon: <BarChart2 className="h-5 w-5" />, label: 'Mes données' },
    { to: '/dashboard/recommendations', icon: <Lightbulb className="h-5 w-5" />, label: 'Recommandations IA' },
    { to: '/dashboard/training', icon: <GraduationCap className="h-5 w-5" />, label: 'Formation' },
    { to: '/dashboard/messages', icon: <MessageSquare className="h-5 w-5" />, label: 'Messagerie' },
    { to: '/dashboard/settings', icon: <Settings className="h-5 w-5" />, label: 'Paramètres' }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out lg:relative lg:z-0',
          isCollapsed ? 'w-16' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p">
            <Link to="/" className="flex items-center">
              {!isCollapsed && (
				<img src="/logo.png" alt="Logo" className="h-24" />
                // <span className="text-xl font-bold text-green-600 dark:text-green-500">MAITSO</span>
              )}
            </Link>
            <div className="flex items-center">
              <button
                className="lg:flex hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-8"
                onClick={toggleCollapse}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </button>
              <button
                className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ml-2"
                onClick={toggleSidebar}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-2">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
                isCollapsed={isCollapsed}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
              />
            ))}
          </nav>

          <div className="p-2 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={logout}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-red-400 rounded-md transition-colors relative group',
                isCollapsed && 'justify-center'
              )}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span>Se déconnecter</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  Se déconnecter
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        className="fixed bottom-4 left-4 z-40 lg:hidden bg-green-600 text-white p-3 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
};

export default Sidebar;
