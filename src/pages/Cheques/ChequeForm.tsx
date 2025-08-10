import React, { useState } from 'react';

const ChequeForm: React.FC = () => {
  const [number, setNumber] = useState('');
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [client, setClient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to API
    alert('Cheque saved!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-3xl font-bold">Create/Edit Cheque</h1>
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
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default ChequeForm;
