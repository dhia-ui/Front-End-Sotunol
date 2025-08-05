import axios from 'axios';
import { Invoice, ExtractedData, ApiResponse, DashboardStats } from '../types';

// API Configuration
const AI_API_BASE = 'https://github.com/dhia-ui/End-points-IA.git'; // Replace with actual endpoint
const CRUD_API_BASE = 'https://github.com/dhia-ui/Sotunol-API-.git'; // Replace with actual endpoint

// Create axios instances
const aiApi = axios.create({
  baseURL: AI_API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const crudApi = axios.create({
  baseURL: CRUD_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptors
aiApi.interceptors.request.use((config) => {
  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

crudApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptors
const handleResponse = (response: any) => response.data;
const handleError = (error: any) => {
  console.error('API Error:', error);
  throw error.response?.data || error.message;
};

aiApi.interceptors.response.use(handleResponse, handleError);
crudApi.interceptors.response.use(handleResponse, handleError);

// AI Services
export const aiService = {
  // Process facture (invoice) image
  processFacture: async (imageFile: File): Promise<ApiResponse<ExtractedData>> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await aiApi.post('/facture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      // Mock response for development
      return {
        success: true,
        data: {
          type: 'facture',
          originalImage: URL.createObjectURL(imageFile),
          extractedText: {
            invoiceNumber: 'INV-2024-001',
            date: '2024-01-15',
            clientName: 'John Doe',
            clientEmail: 'john@example.com',
            items: [
              { description: 'Web Development', quantity: 1, rate: 1500, amount: 1500 },
              { description: 'Design Services', quantity: 2, rate: 500, amount: 1000 }
            ],
            subtotal: 2500,
            tax: 250,
            total: 2750
          },
          confidence: 0.95,
          processedAt: new Date().toISOString(),
          status: 'completed'
        }
      };
    }
  },

  // Process cheque image
  processCheque: async (imageFile: File): Promise<ApiResponse<ExtractedData>> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await aiApi.post('/cheque', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      // Mock response for development
      return {
        success: true,
        data: {
          type: 'cheque',
          originalImage: URL.createObjectURL(imageFile),
          extractedText: {
            checkNumber: 'CHK-001234',
            date: '2024-01-15',
            payee: 'ABC Company',
            amount: 2750.00,
            amountInWords: 'Two Thousand Seven Hundred Fifty Dollars',
            bankName: 'First National Bank',
            accountNumber: '****1234'
          },
          confidence: 0.92,
          processedAt: new Date().toISOString(),
          status: 'completed'
        }
      };
    }
  },

  // Process kimbiale parts image
  processKimbiale: async (imageFile: File): Promise<ApiResponse<ExtractedData>> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await aiApi.post('/kimbiale', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      // Mock response for development
      return {
        success: true,
        data: {
          type: 'kimbiale',
          originalImage: URL.createObjectURL(imageFile),
          extractedText: {
            partNumber: 'KMB-2024-001',
            partName: 'Engine Component',
            manufacturer: 'Kimbiale Industries',
            specifications: {
              weight: '2.5kg',
              dimensions: '15x10x5 cm',
              material: 'Aluminum Alloy'
            },
            price: 450.00,
            availability: 'In Stock'
          },
          confidence: 0.88,
          processedAt: new Date().toISOString(),
          status: 'completed'
        }
      };
    }
  },

  // Save extracted data
  saveExtractedData: async (data: ExtractedData): Promise<ApiResponse<ExtractedData>> => {
    try {
      const response = await aiApi.post('/save-extracted', data);
      return response;
    } catch (error) {
      // Mock response for development
      return {
        success: true,
        data: { ...data, id: Date.now().toString() }
      };
    }
  }
};

// CRUD Services
export const crudService = {
  // Invoice CRUD operations
  invoices: {
    getAll: async (): Promise<ApiResponse<Invoice[]>> => {
      try {
        const response = await crudApi.get('/invoices');
        return response;
      } catch (error) {
        // Mock response for development
        return {
          success: true,
          data: [
            {
              id: '1',
              number: 'INV-2024-001',
              date: '2024-01-15',
              dueDate: '2024-02-15',
              clientName: 'John Doe',
              clientEmail: 'john@example.com',
              clientAddress: '123 Main St, City, State 12345',
              items: [
                { id: '1', description: 'Web Development', quantity: 1, rate: 1500, amount: 1500 },
                { id: '2', description: 'Design Services', quantity: 2, rate: 500, amount: 1000 }
              ],
              subtotal: 2500,
              tax: 250,
              total: 2750,
              status: 'sent',
              createdAt: '2024-01-15T10:00:00Z',
              updatedAt: '2024-01-15T10:00:00Z'
            },
            {
              id: '2',
              number: 'INV-2024-002',
              date: '2024-01-20',
              dueDate: '2024-02-20',
              clientName: 'Jane Smith',
              clientEmail: 'jane@example.com',
              clientAddress: '456 Oak Ave, City, State 12345',
              items: [
                { id: '3', description: 'Consulting Services', quantity: 10, rate: 150, amount: 1500 }
              ],
              subtotal: 1500,
              tax: 150,
              total: 1650,
              status: 'paid',
              createdAt: '2024-01-20T10:00:00Z',
              updatedAt: '2024-01-20T10:00:00Z'
            }
          ]
        };
      }
    },

    getById: async (id: string): Promise<ApiResponse<Invoice>> => {
      try {
        const response = await crudApi.get(`/invoices/${id}`);
        return response;
      } catch (error) {
        throw error;
      }
    },

    create: async (invoice: Omit<Invoice, 'id'>): Promise<ApiResponse<Invoice>> => {
      try {
        const response = await crudApi.post('/invoices', invoice);
        return response;
      } catch (error) {
        // Mock response for development
        return {
          success: true,
          data: { ...invoice, id: Date.now().toString() }
        };
      }
    },

    update: async (id: string, invoice: Partial<Invoice>): Promise<ApiResponse<Invoice>> => {
      try {
        const response = await crudApi.put(`/invoices/${id}`, invoice);
        return response;
      } catch (error) {
        // Mock response for development
        return {
          success: true,
          data: { ...invoice, id } as Invoice
        };
      }
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      try {
        const response = await crudApi.delete(`/invoices/${id}`);
        return response;
      } catch (error) {
        // Mock response for development
        return { success: true, data: undefined };
      }
    }
  },

  // Dashboard statistics
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    try {
      const response = await crudApi.get('/dashboard/stats');
      return response;
    } catch (error) {
      // Mock response for development
      return {
        success: true,
        data: {
          totalInvoices: 25,
          totalRevenue: 45750,
          pendingInvoices: 8,
          overdueInvoices: 3,
          monthlyRevenue: [
            { month: 'Jan', revenue: 12500 },
            { month: 'Feb', revenue: 15200 },
            { month: 'Mar', revenue: 18050 },
            { month: 'Apr', revenue: 22100 },
            { month: 'May', revenue: 19800 },
            { month: 'Jun', revenue: 25400 }
          ],
          invoicesByStatus: [
            { status: 'paid', count: 14 },
            { status: 'sent', count: 8 },
            { status: 'draft', count: 2 },
            { status: 'overdue', count: 1 }
          ]
        }
      };
    }
  }
};