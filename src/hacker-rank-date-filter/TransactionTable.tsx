import React, { useState } from 'react';
import type { Transaction } from './types/transactions';

interface TransactionTableProps {
  txns: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ txns }) => {
  const [transactions, setTransactions] = useState(txns);
  const [date, setDate] = useState<string>('');

  const sort = () => {
    setTransactions([...transactions.sort((a, b) => a.amount - b.amount)]);
  };

  const searchAllFields = (data: Transaction[], query: string) => {
    if (!Array.isArray(data) || query == null) return [];

    const normalizedQuery = String(query).toLowerCase();

    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(normalizedQuery)
      )
    );
  };

  const filterDate = (date: string) => {
    console.log(date);
    const dateSearchResults = searchAllFields([...transactions], date);
    console.log(dateSearchResults);
    setDate(String(date));
  };

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <label htmlFor="date" className="mr-10">
          Transaction Date
        </label>
        <input
          id="date"
          type="date"
          onChange={e => filterDate(e.target.value)}
          value={date.valueOf()}
          role="search"
        />
        <button
          disabled={date.valueOf() === ''}
          onClick={() =>
            setTransactions(searchAllFields([...transactions], date))
          }
        >
          Filter
        </button>
      </section>

      <table className="mt-10 table">
        <thead>
          <tr className="table">
            <td className="table-header">Date</td>
            <td className="table-header">Description</td>
            <td className="table-header">Type</td>
            <td className="table-header">
              <span id="amount" onClick={sort} role="button">
                Amount ($)
              </span>
            </td>
            <td className="table-header">Available Balance</td>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transation, idx) => (
            <tr key={idx}>
              <td>{transation.date}</td>
              <td>{transation.description}</td>
              {/* <td>type === 1 ? "Debit" : "Credit"</td> */}
              <td>{transation.type === 1 ? 'Debit' : 'Credit'}</td>
              <td>{transation.amount}</td>
              <td>{transation.balance}</td>
            </tr>
          ))}
          {/* <tr>
              <td>date</td>
              <td>description</td>
              <td>type === 1 ? "Debit" : "Credit"</td>
              <td>amount</td>
              <td>balance</td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
