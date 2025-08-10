import React from 'react';

const Cheques: React.FC = () => {
  // This should be connected to your cheques API/service
  const cheques = [
    { id: '1', number: 'CHQ-001', bank: 'Banque X', amount: 1500, status: 'pending' },
    { id: '2', number: 'CHQ-002', bank: 'Banque Y', amount: 3000, status: 'cashed' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gradient mb-2">Cheques</h1>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Cheque #</th>
            <th>Bank</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cheques.map(cheque => (
            <tr key={cheque.id}>
              <td>{cheque.number}</td>
              <td>{cheque.bank}</td>
              <td>{cheque.amount} €</td>
              <td>{cheque.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cheques;
