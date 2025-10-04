import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
