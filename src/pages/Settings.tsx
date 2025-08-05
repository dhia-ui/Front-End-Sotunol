import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Mail,
  Globe,
  Save
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/UI/Card';

const Settings: React.FC = () => {
  const { currentTheme, themes, changeTheme } = useTheme();

  const settingSections = [
    {
      title: 'Profile Settings',
      icon: User,
      color: 'text-blue-500',
      items: [
        { label: 'Full Name', type: 'input', value: 'John Doe' },
        { label: 'Email', type: 'input', value: 'john@example.com' },
        { label: 'Company', type: 'input', value: 'Acme Corp' },
        { label: 'Phone', type: 'input', value: '+1 (555) 123-4567' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: 'text-yellow-500',
      items: [
        { label: 'Email Notifications', type: 'toggle', value: true },
        { label: 'Invoice Reminders', type: 'toggle', value: true },
        { label: 'Payment Alerts', type: 'toggle', value: false },
        { label: 'Weekly Reports', type: 'toggle', value: true }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      color: 'text-red-500',
      items: [
        { label: 'Two-Factor Authentication', type: 'toggle', value: false },
        { label: 'Login Alerts', type: 'toggle', value: true },
        { label: 'Session Timeout', type: 'select', value: '30', options: ['15', '30', '60', '120'] }
      ]
    },
    {
      title: 'Integrations',
      icon: Database,
      color: 'text-green-500',
      items: [
        { label: 'AI Processing API', type: 'input', value: 'Connected' },
        { label: 'CRUD API', type: 'input', value: 'Connected' },
        { label: 'Email Service', type: 'select', value: 'smtp', options: ['smtp', 'sendgrid', 'mailgun'] }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full">
          <SettingsIcon className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gradient">Settings</h1>
          <p className="text-base-content/60">Customize your application preferences</p>
        </div>
      </motion.div>

      {/* Theme Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-8">
          <div className="card-body">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="text-purple-500" size={24} />
              <h2 className="text-2xl font-bold">Theme Selection</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {themes.map((theme) => (
                <motion.button
                  key={theme.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => changeTheme(theme.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentTheme === theme.value
                      ? 'border-primary bg-primary/10'
                      : 'border-base-300 hover:border-primary/50'
                  }`}
                >
                  <div className="flex space-x-1 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: theme.preview.primary }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: theme.preview.secondary }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: theme.preview.accent }}
                    />
                  </div>
                  <p className="text-sm font-medium">{theme.name}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {settingSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            >
              <Card>
                <div className="card-body">
                  <div className="flex items-center space-x-3 mb-6">
                    <Icon className={section.color} size={24} />
                    <h2 className="text-xl font-bold">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                        className="flex items-center justify-between"
                      >
                        <label className="label">
                          <span className="label-text font-medium">{item.label}</span>
                        </label>
                        {item.type === 'input' && (
                          <input
                            type="text"
                            defaultValue={item.value as string}
                            className="input input-bordered input-sm w-48"
                          />
                        )}
                        {item.type === 'toggle' && (
                          <input
                            type="checkbox"
                            defaultChecked={item.value as boolean}
                            className="toggle toggle-primary"
                          />
                        )}
                        {item.type === 'select' && (
                          <select
                            defaultValue={item.value as string}
                            className="select select-bordered select-sm w-32"
                          >
                            {item.options?.map((option) => (
                              <option key={option} value={option}>
                                {option} min
                              </option>
                            ))}
                          </select>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* API Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <div className="card-body">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="text-indigo-500" size={24} />
              <h2 className="text-2xl font-bold">API Configuration</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI Processing API</h3>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Base URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://api.example.com"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">API Key</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter API key"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">CRUD API</h3>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Base URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://crud-api.example.com"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">API Key</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter API key"
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary btn-lg"
        >
          <Save size={20} />
          Save Settings
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Settings;