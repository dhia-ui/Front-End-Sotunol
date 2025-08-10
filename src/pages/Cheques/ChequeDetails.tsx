import React from 'react';
import { useParams } from 'react-router-dom';

// Dummy data for demonstration; replace with API fetch as needed
const chequeData = {
  id: '1',
  number: 'CHQ-001',
  bank: 'Banque X',
  amount: 1500,
  status: 'pending',
  date: '2025-08-09',
  client: 'John Doe'
};

const ChequeDetails: React.FC = () => {
  const { id } = useParams();
  // TODO: Fetch cheque data by id, for now using dummy data

  const cheque = chequeData; // Replace with fetched data

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Cheque Details</h1>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <p><strong>Cheque Number:</strong> {cheque.number}</p>
          <p><strong>Bank:</strong> {cheque.bank}</p>
          <p><strong>Amount:</strong> {cheque.amount} €</p>
          <p><strong>Status:</strong> {cheque.status}</p>
          <p><strong>Date:</strong> {cheque.date}</p>
          <p><strong>Client:</strong> {cheque.client}</p>
        </div>
      </div>
     
    </div>
  );
};

export default ChequeDetails;
