import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Send,
  DollarSign
} from 'lucide-react';
import { Invoice } from '../types';
import { crudService } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Modal from '../components/UI/Modal';
import toast from 'react-hot-toast';

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await crudService.invoices.getAll();
      if (response.success) {
        setInvoices(response.data);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;

    try {
      const response = await crudService.invoices.delete(id);
      if (response.success) {
        setInvoices(prev => prev.filter(inv => inv.id !== id));
        toast.success('Invoice deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast.error('Failed to delete invoice');
    }
  };

  const handleStatusUpdate = async (id: string, status: Invoice['status']) => {
    try {
      const response = await crudService.invoices.update(id, { status });
      if (response.success) {
        setInvoices(prev => prev.map(inv => 
          inv.id === id ? { ...inv, status } : inv
        ));
        toast.success('Invoice status updated');
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast.error('Failed to update invoice status');
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Invoice['status']) => {
    const statusConfig = {
      draft: { class: 'badge-warning', text: 'Draft' },
      sent: { class: 'badge-info', text: 'Sent' },
      paid: { class: 'badge-success', text: 'Paid' },
      overdue: { class: 'badge-error', text: 'Overdue' }
    };
    
    const config = statusConfig[status];
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading invoices..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Invoices</h1>
          <p className="text-base-content/60">
            Manage your invoices and track payments
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-4 lg:mt-0"
        >
          <Plus size={20} />
          Create Invoice
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="form-control flex-1">
              <div className="input-group">
                <span>
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="form-control">
              <select
                className="select select-bordered"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <button className="btn btn-outline">
              <Filter size={20} />
              More Filters
            </button>
          </div>
        </div>
      </motion.div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="hover:bg-base-200"
                  >
                    <td className="font-mono font-semibold">{invoice.number}</td>
                    <td>
                      <div>
                        <div className="font-semibold">{invoice.clientName}</div>
                        <div className="text-sm text-base-content/60">{invoice.clientEmail}</div>
                      </div>
                    </td>
                    <td>{new Date(invoice.date).toLocaleDateString()}</td>
                    <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="font-semibold">${invoice.total.toLocaleString()}</td>
                    <td>{getStatusBadge(invoice.status)}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setIsModalOpen(true);
                          }}
                          className="btn btn-ghost btn-sm"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="btn btn-ghost btn-sm" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-ghost btn-sm" title="Download">
                          <Download size={16} />
                        </button>
                        {invoice.status === 'draft' && (
                          <button
                            onClick={() => handleStatusUpdate(invoice.id!, 'sent')}
                            className="btn btn-ghost btn-sm"
                            title="Send"
                          >
                            <Send size={16} />
                          </button>
                        )}
                        {invoice.status === 'sent' && (
                          <button
                            onClick={() => handleStatusUpdate(invoice.id!, 'paid')}
                            className="btn btn-ghost btn-sm"
                            title="Mark as Paid"
                          >
                            <DollarSign size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteInvoice(invoice.id!)}
                          className="btn btn-ghost btn-sm text-error"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2">No invoices found</h3>
              <p className="text-base-content/60">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first invoice to get started'
                }
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Invoice Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invoice Details"
        size="lg"
      >
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Invoice Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Number:</span> {selectedInvoice.number}</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedInvoice.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Due Date:</span> {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Status:</span> {getStatusBadge(selectedInvoice.status)}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Client Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedInvoice.clientName}</p>
                  <p><span className="font-medium">Email:</span> {selectedInvoice.clientEmail}</p>
                  <p><span className="font-medium">Address:</span> {selectedInvoice.clientAddress}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Items</h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>${item.rate}</td>
                        <td>${item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Subtotal</div>
                <div className="stat-value text-lg">${selectedInvoice.subtotal}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Tax</div>
                <div className="stat-value text-lg">${selectedInvoice.tax}</div>
              </div>
              <div className="stat bg-primary text-primary-content rounded-lg">
                <div className="stat-title">Total</div>
                <div className="stat-value text-lg">${selectedInvoice.total}</div>
              </div>
            </div>

            {selectedInvoice.notes && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Notes</h3>
                <p className="text-base-content/70">{selectedInvoice.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Invoices;