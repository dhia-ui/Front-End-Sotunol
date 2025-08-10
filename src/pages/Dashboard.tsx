import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  FileText, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  Activity
} from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import RevenueChart from '../components/Dashboard/RevenueChart';
import InvoiceStatusChart from '../components/Dashboard/InvoiceStatusChart';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { crudService } from '../services/api';
import { DashboardStats } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await crudService.getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <AlertTriangle size={48} className="mx-auto text-warning mb-4" />
        <h2 className="text-2xl font-bold mb-2">Unable to load dashboard</h2>
        <p className="text-base-content/60">Please try refreshing the page</p>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5% from last month',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'bg-success'
    },
    {
      title: 'Total Invoices',
      value: stats.totalInvoices,
      change: '+3 new this week',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'bg-primary'
    },
    {
      title: 'Pending Invoices',
      value: stats.pendingInvoices,
      change: '-2 from last week',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'bg-warning'
    },
    {
      title: 'Overdue Invoices',
      value: stats.overdueInvoices,
      change: stats.overdueInvoices > 0 ? 'Needs attention' : 'All caught up!',
      changeType: stats.overdueInvoices > 0 ? 'negative' as const : 'positive' as const,
      icon: AlertTriangle,
      color: 'bg-error'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Dashboard</h1>
          <p className="text-base-content/60">
            Welcome back! Here's what's happening with your invoices.
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <div className="badge badge-primary badge-lg">
            <Calendar size={16} className="mr-1" />
            {new Date().toLocaleDateString()}
          </div>
          <div className="badge badge-secondary badge-lg">
            <Activity size={16} className="mr-1" />
            Live Data
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard key={card.title} {...card} index={index} />
        ))}
        <div className="card bg-base-100 shadow-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="card-title text-2xl mb-2">Cheques Management</h2>
            <p className="text-base-content/60">View and manage cheques</p>
          </div>
          <a href="/cheques" className="btn btn-primary mt-4">Go to Cheques</a>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart data={stats.monthlyRevenue} />
        <InvoiceStatusChart data={stats.invoicesByStatus} />
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Invoice INV-2024-001 was paid', time: '2 hours ago', type: 'success' },
              { action: 'New invoice INV-2024-002 created', time: '4 hours ago', type: 'info' },
              { action: 'Invoice INV-2024-003 is overdue', time: '1 day ago', type: 'warning' },
              { action: 'Client John Doe added', time: '2 days ago', type: 'info' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-base-200 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'success' ? 'bg-success' :
                  activity.type === 'warning' ? 'bg-warning' : 'bg-info'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-base-content/60">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
