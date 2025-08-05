import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Copy, Download, Save } from 'lucide-react';
import { ExtractedData } from '../../types';
import toast from 'react-hot-toast';

interface ExtractedDataDisplayProps {
  data: ExtractedData;
  onSave: (data: ExtractedData) => void;
}

const ExtractedDataDisplay: React.FC<ExtractedDataDisplayProps> = ({ data, onSave }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data.extractedText, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-${data.type}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('JSON file downloaded!');
  };

  const handleSave = () => {
    onSave(data);
    toast.success('Data saved successfully!');
  };

  const renderFactureData = (extractedText: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Invoice Number</span>
          </label>
          <input
            type="text"
            value={extractedText.invoiceNumber || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Date</span>
          </label>
          <input
            type="text"
            value={extractedText.date || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Client Name</span>
          </label>
          <input
            type="text"
            value={extractedText.clientName || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Client Email</span>
          </label>
          <input
            type="text"
            value={extractedText.clientEmail || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
      </div>

      {extractedText.items && (
        <div>
          <h4 className="font-semibold mb-2">Items</h4>
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
                {extractedText.items.map((item: any, index: number) => (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Subtotal</div>
          <div className="stat-value text-lg">${extractedText.subtotal}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Tax</div>
          <div className="stat-value text-lg">${extractedText.tax}</div>
        </div>
        <div className="stat bg-primary text-primary-content rounded-lg">
          <div className="stat-title">Total</div>
          <div className="stat-value text-lg">${extractedText.total}</div>
        </div>
      </div>
    </div>
  );

  const renderChequeData = (extractedText: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Check Number</span>
          </label>
          <input
            type="text"
            value={extractedText.checkNumber || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Date</span>
          </label>
          <input
            type="text"
            value={extractedText.date || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Payee</span>
          </label>
          <input
            type="text"
            value={extractedText.payee || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Amount</span>
          </label>
          <input
            type="text"
            value={`$${extractedText.amount}` || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-semibold">Amount in Words</span>
          </label>
          <input
            type="text"
            value={extractedText.amountInWords || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Bank Name</span>
          </label>
          <input
            type="text"
            value={extractedText.bankName || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Account Number</span>
          </label>
          <input
            type="text"
            value={extractedText.accountNumber || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
      </div>
    </div>
  );

  const renderKimbialeData = (extractedText: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Part Number</span>
          </label>
          <input
            type="text"
            value={extractedText.partNumber || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Part Name</span>
          </label>
          <input
            type="text"
            value={extractedText.partName || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Manufacturer</span>
          </label>
          <input
            type="text"
            value={extractedText.manufacturer || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Price</span>
          </label>
          <input
            type="text"
            value={`$${extractedText.price}` || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Availability</span>
          </label>
          <input
            type="text"
            value={extractedText.availability || ''}
            className="input input-bordered"
            readOnly
          />
        </div>
      </div>

      {extractedText.specifications && (
        <div>
          <h4 className="font-semibold mb-2">Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(extractedText.specifications).map(([key, value]) => (
              <div key={key} className="form-control">
                <label className="label">
                  <span className="label-text font-semibold capitalize">{key}</span>
                </label>
                <input
                  type="text"
                  value={value as string}
                  className="input input-bordered"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderExtractedData = () => {
    switch (data.type) {
      case 'facture':
        return renderFactureData(data.extractedText);
      case 'cheque':
        return renderChequeData(data.extractedText);
      case 'kimbiale':
        return renderKimbialeData(data.extractedText);
      default:
        return <div>Unknown data type</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-100 shadow-xl"
    >
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${
              data.status === 'completed' ? 'bg-success' : 'bg-warning'
            }`}>
              {data.status === 'completed' ? (
                <CheckCircle className="text-white" size={20} />
              ) : (
                <AlertCircle className="text-white" size={20} />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold capitalize">
                {data.type} Data Extracted
              </h2>
              <p className="text-sm text-base-content/60">
                Confidence: {Math.round(data.confidence * 100)}%
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => copyToClipboard(JSON.stringify(data.extractedText, null, 2))}
              className="btn btn-outline btn-sm"
            >
              <Copy size={16} />
              Copy JSON
            </button>
            <button
              onClick={downloadJSON}
              className="btn btn-outline btn-sm"
            >
              <Download size={16} />
              Download
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary btn-sm"
            >
              <Save size={16} />
              Save Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Image */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Original Image</h3>
            <img
              src={data.originalImage}
              alt="Original"
              className="w-full h-64 object-contain rounded-lg border border-base-300"
            />
          </div>

          {/* Extracted Data */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Extracted Data</h3>
            {renderExtractedData()}
          </div>
        </div>

        {/* Raw JSON Data */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Raw JSON Data</h3>
          <div className="mockup-code">
            <pre className="text-sm overflow-x-auto">
              <code>{JSON.stringify(data.extractedText, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExtractedDataDisplay;