import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Upload, 
  Settings, 
  Moon, 
  Sun, 
  Palette,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentTheme, themes, changeTheme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/invoices', icon: FileText, label: 'Invoices' },
    { path: '/ai-processing', icon: Upload, label: 'AI Processing' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50">
      <div className="navbar-start">
        <button
          className="btn btn-ghost btn-circle lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <motion.div
            animate={{ rotate: sidebarOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </button>
        
        <Link to="/" className="btn btn-ghost text-xl font-bold text-gradient">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AI Invoice Pro
          </motion.div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`btn btn-ghost btn-sm ${
                    isActive ? 'bg-primary text-primary-content' : ''
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        {/* Theme Selector */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Palette size={20} />
          </div>
          <div className="dropdown-content z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-80 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme) => (
                <motion.button
                  key={theme.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => changeTheme(theme.value)}
                  className={`btn btn-sm justify-start ${
                    currentTheme === theme.value ? 'btn-primary' : 'btn-ghost'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: theme.preview.primary }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: theme.preview.secondary }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: theme.preview.accent }}
                      />
                    </div>
                    <span className="text-xs">{theme.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
        >
          <AnimatePresence mode="wait">
            {currentTheme === 'light' ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* User Menu */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-content font-bold">
              U
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;