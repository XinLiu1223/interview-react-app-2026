// import React from 'react';
import TransactionTable from './TransactionTable';
// import 'h8k-components';
import { transactions } from './data/transactions';

// import './App.css';

// const title: string = 'HackerBank';

const App = () => {
  return (
    <div className="container-fluid">
      {/* <h8k-navbar header={title} /> */}
      <TransactionTable txns={transactions} />
    </div>
  );
};

export default App;
