// import React from 'react';
import List from './List';

function CustomerList({ customers }: { customers: typeof List }) {
  console.log(customers);
  return (
    <div className="layout-column align-items-center justify-content-start">
      {/* <p data-testid="no-results">No Results Found!</p> */}
      <div className="card w-40 pt-30 pb-8 mt-20">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Location</th>
              <th>Gender</th>
              <th>Income</th>
            </tr>
          </thead>
          <tbody data-testid="searched-customers">
            {customers?.map((customer, idx) => (
              <tr key={idx}>
                <td>{customer.name}</td>
                <td>{customer.age}</td>
                <td>{customer.location}</td>
                <td>{customer.gender}</td>
                <td>{customer.income}</td>
              </tr>
            ))}
            {/* <tr>
              <td>Jeremy Clarke</td>
              <td>21</td>
              <td>Seattle</td>
              <td>Male</td>
              <td>$120,000</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
