import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Upload, 
  Settings, 
  BarChart3,
  Users,
  CreditCard,
  Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', color: 'text-blue-500' },
    // Financial Management section: invoices and cheques
    { path: '/invoices', icon: FileText, label: 'Invoices', color: 'text-green-500' },
    { path: '/cheques', icon: CreditCard, label: 'Cheques', color: 'text-yellow-500' },
    { path: '/ai-processing', icon: Upload, label: 'AI Processing', color: 'text-purple-500' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', color: 'text-orange-500' },
    { path: '/clients', icon: Users, label: 'Clients', color: 'text-pink-500' },
    { path: '/payments', icon: CreditCard, label: 'Payments', color: 'text-indigo-500' },
    { path: '/archive', icon: Archive, label: 'Archive', color: 'text-gray-500' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'text-slate-500' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-72 bg-base-100/95 backdrop-blur-md border-r border-base-300 z-50 lg:relative lg:translate-x-0"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-base-300">
                <Link to="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <FileText className="text-white" size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gradient">AI Invoice Pro</h1>
                    <p className="text-xs text-base-content/60">Smart Invoice Management</p>
                  </div>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.li
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                            isActive 
                              ? 'bg-primary text-primary-content shadow-lg' 
                              : 'hover:bg-base-200 text-base-content'
                          }`}
                        >
                          <Icon 
                            size={20} 
                            className={`${isActive ? 'text-primary-content' : item.color} group-hover:scale-110 transition-transform`}
                          />
                          <span className="font-medium">{item.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto w-2 h-2 bg-primary-content rounded-full"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-base-300">
                <div className="glass p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-content font-bold">
                        U
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">John Doe</p>
                      <p className="text-xs text-base-content/60">Premium User</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
