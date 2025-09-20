import React from 'react';
import { Menu, Bell, User, Search, LogOut } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <User className="h-5 w-5" />
            <span className="hidden md:block text-sm font-medium">demo@chatmei.com</span>
          </div>

          <button onClick={onLogout} className="p-2 rounded-lg hover:bg-red-100 text-red-600">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
