import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/types';
import { toggleSidebar, addNotification, setTheme } from '../../store/slices/uiSlice';
import { 
  Menu, 
  Bell, 
  Settings, 
  User, 
  Search,
  Moon,
  Sun
} from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, theme, notifications } = useSelector((state: RootState) => state.ui);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-300" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search exoplanets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-300" />
            )}
          </button>

          <div className="relative">
            <button
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-300" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>

          <button
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-gray-300" />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="User profile"
          >
            <User className="h-5 w-5 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
