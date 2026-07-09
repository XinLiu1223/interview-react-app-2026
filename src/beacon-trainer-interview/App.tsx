import  { useEffect, useState } from 'react';
import './style.css';
import Form from './Form.js';

export default function App() {
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      let users;
      if (res.ok) {
        // console.log('users', res.json());
      }
      users = await res.json();
      console.log('data', users);
      setTableData(users);
    };

    getUser();
  }, []);

  useEffect(() => {
    console.log('tableData', tableData);
  }, [tableData]);

  const addUserForm = (data: Record<string, string>) => {
    console.log('added', data);
    setTableData([...tableData, data]);
  };

  return (
    <div className="container">
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.website}</td>
            </tr>
          ))}
          {/* <tr>
            <td>name</td>
            <td>email</td>
            <td>website</td>
          </tr> */}
        </tbody>
      </table>
      <Form addUser={(user) => addUserForm(user)} />
    </div>
  );
}
