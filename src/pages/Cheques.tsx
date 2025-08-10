import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Dummy data for demonstration; replace with API fetch as needed
const initialCheques = [
  { id: '1', number: 'CHQ-001', bank: 'Banque X', amount: 1500, status: 'pending', date: '2025-08-09', client: 'John Doe' },
  { id: '2', number: 'CHQ-002', bank: 'Banque Y', amount: 3000, status: 'cashed', date: '2025-08-01', client: 'Jane Smith' }
];

const Cheques: React.FC = () => {
  const [cheques, setCheques] = useState(initialCheques);
  const [showForm, setShowForm] = useState(false);
  const [selectedCheque, setSelectedCheque] = useState<typeof initialCheques[0] | null>(null);

  // Form states
  const [number, setNumber] = useState('');
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('pending');

  // Details modal
  const [showDetails, setShowDetails] = useState(false);

  const handleCreate = () => {
    setNumber('');
    setBank('');
    setAmount('');
    setDate('');
    setClient('');
    setStatus('pending');
    setShowForm(true);
    setSelectedCheque(null);
  };

  const handleEdit = (cheque: typeof initialCheques[0]) => {
    setNumber(cheque.number);
    setBank(cheque.bank);
    setAmount(cheque.amount.toString());
    setDate(cheque.date);
    setClient(cheque.client);
    setStatus(cheque.status);
    setShowForm(true);
    setSelectedCheque(cheque);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCheque) {
      setCheques(cheques.map(ch =>
        ch.id === selectedCheque.id
          ? { ...ch, number, bank, amount: Number(amount), date, client, status }
          : ch
      ));
    } else {
      setCheques([
        ...cheques,
        {
          id: (cheques.length + 1).toString(),
          number,
          bank,
          amount: Number(amount),
          date,
          client,
          status
        }
      ]);
    }
    setShowForm(false);
  };

  const handleViewDetails = (cheque: typeof initialCheques[0]) => {
    setSelectedCheque(cheque);
    setShowDetails(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gradient mb-2">Cheques</h1>
      <button className="btn btn-primary mb-4" onClick={handleCreate}>Create Cheque</button>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Cheque #</th>
            <th>Bank</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Client</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cheques.map(cheque => (
            <tr key={cheque.id}>
              <td>{cheque.number}</td>
              <td>{cheque.bank}</td>
              <td>{cheque.amount} €</td>
              <td>{cheque.status}</td>
              <td>{cheque.date}</td>
              <td>{cheque.client}</td>
              <td>
                <button className="btn btn-ghost btn-sm" onClick={() => handleViewDetails(cheque)}>View</button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(cheque)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cheque Details Modal */}
      {showDetails && selectedCheque && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="card bg-base-100 shadow-lg w-full max-w-lg">
            <div className="card-body">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" onClick={() => setShowDetails(false)}>✕</button>
              <h2 className="text-2xl font-bold mb-2">Cheque Details</h2>
              <p><strong>Cheque Number:</strong> {selectedCheque.number}</p>
              <p><strong>Bank:</strong> {selectedCheque.bank}</p>
              <p><strong>Amount:</strong> {selectedCheque.amount} €</p>
              <p><strong>Status:</strong> {selectedCheque.status}</p>
              <p><strong>Date:</strong> {selectedCheque.date}</p>
              <p><strong>Client:</strong> {selectedCheque.client}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cheque Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="card bg-base-100 shadow-lg w-full max-w-lg p-6 space-y-4">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" onClick={() => setShowForm(false)}>✕</button>
            <h2 className="text-2xl font-bold mb-2">{selectedCheque ? "Edit Cheque" : "Create Cheque"}</h2>
            <div>
              <label>Cheque Number</label>
              <input className="input input-bordered w-full"
                value={number} onChange={e => setNumber(e.target.value)} required />
            </div>
            <div>
              <label>Bank</label>
              <input className="input input-bordered w-full"
                value={bank} onChange={e => setBank(e.target.value)} required />
            </div>
            <div>
              <label>Amount</label>
              <input className="input input-bordered w-full"
                type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
            </div>
            <div>
              <label>Date</label>
              <input className="input input-bordered w-full"
                type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div>
              <label>Client</label>
              <input className="input input-bordered w-full"
                value={client} onChange={e => setClient(e.target.value)} required />
            </div>
            <div>
              <label>Status</label>
              <select className="select select-bordered w-full" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="cashed">Cashed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">{selectedCheque ? "Save Changes" : "Save"}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cheques;
