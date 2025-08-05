export interface Invoice {
  id?: string;
  number: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface ExtractedData {
  id?: string;
  type: 'facture' | 'cheque' | 'kimbiale';
  originalImage: string;
  extractedText: any;
  confidence: number;
  processedAt: string;
  status: 'processing' | 'completed' | 'error';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  totalInvoices: number;
  totalRevenue: number;
  pendingInvoices: number;
  overdueInvoices: number;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
  }>;
  invoicesByStatus: Array<{
    status: string;
    count: number;
  }>;
}

export interface Theme {
  name: string;
  value: string;
  preview: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
}