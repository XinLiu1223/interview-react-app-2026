import { useState, useEffect } from 'react';
import CustomerList from './CustomerList';
import List from './List';

function SearchCustomer() {
  const [customersList, searchCustomers] = useState(List);
  useEffect(() => {
    console.log(List);
    // searchCustomers(List);
  }, []);

  const searchAllFields = (data: typeof List, query: string) => {
    if (!Array.isArray(data) || query == null) return [];

    const normalizedQuery = String(query).toLowerCase();

    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(normalizedQuery)
      )
    );
  };

  const customerSearch = (value: string) => {
    console.log(value);
    // const searchResult = searchAllFields([...customersList], value);
    const searchResult = searchAllFields([...List], value);
    console.log(searchResult);
    searchCustomers(searchResult);
  };

  return (
    <>
      <div className="layout-row align-items-center justify-content-center mt-30">
        <input
          className="large mx-20 w-20"
          data-testid="search-input"
          placeholder="Enter search term (Eg: Phil)"
          onChange={e => customerSearch(e.target.value)}
        />
      </div>
      <CustomerList customers={customersList} />
    </>
  );
}

export default SearchCustomer;
