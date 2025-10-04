import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';
import { 
  LayoutDashboard, 
  Database, 
  Brain, 
  Search, 
  BarChart3,
  Rocket
} from 'lucide-react';

const Sidebar = () => {
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Data Management', href: '/data', icon: Database },
    { name: 'Model Training', href: '/train', icon: Brain },
    { name: 'Classification', href: '/classify', icon: Search },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ${
      sidebarOpen ? 'w-64' : 'w-16'
    } bg-gray-800 border-r border-gray-700`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-900 rounded-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-display font-bold text-white">ExoVision</h1>
                <p className="text-xs text-gray-400">AI Exoplanet Detection</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                    isActive
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="ml-3">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="px-4 py-4 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              <p>ExoVision v1.0.0</p>
              <p>NASA Exoplanet Archive</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
