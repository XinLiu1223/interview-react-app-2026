'use client';
import React, { useState, useEffect } from 'react';

type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

// the user objects fetched from the API will be cached in memory
/* 
  Example user object from API:
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
*/

const cache: { users?: UserType[] } = {}; // Simple in-memory cache

const ServiceIntegration = () => {
  const [submitting, setSubmittig] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    name: '',
    data: { year: '', price: '', model: '', size: '' },
  });

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      data: { ...data.data, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittig(true);

    try {
      const response = await fetch('https://api.restful-api.dev/objects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setSubmittig(false);
      setError(null);
      setData({ name: '', data: { year: '', price: '', model: '', size: '' } });
    } catch (err) {
      setError(`Submission failed. Please try again. ${err}`);
    } finally {
      setSubmittig(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.restful-api.dev/objects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Fetched data:', result);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    if (cache.users) return; // Use cached data if available

    setSubmittig(true);
    setError(null);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) throw new Error('Failed to fetch data');

      const json = await response.json();
      cache.users = json; // Store data in cache
      console.log('Fetched users:', json, cache.users);
      // setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmittig(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderForm = () => (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-2"
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <h4>Data - </h4>
          <div>
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              id="year"
              name="year"
              className="border-2"
              value={data.data.year}
              onChange={e => handleDataChange(e)}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              className="border-2"
              value={data.data.price}
              onChange={e => handleDataChange(e)}
            />
          </div>
          <div>
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              className="border-2"
              value={data.data.model}
              onChange={e => handleDataChange(e)}
            />
          </div>
          <div>
            <label htmlFor="size">Size:</label>
            <input
              type="text"
              id="size"
              name="size"
              className="border-2"
              value={data.data.size}
              onChange={e => handleDataChange(e)}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="border-2">
            {submitting ? 'Submitting...' : 'Integrate Service'}
          </button>
        </div>
      </form>
      <div>
        <span className="border-2">{error && 'Submitting error...'}</span>
      </div>
    </>
  );

  return <div className="star-rating">{renderForm()}</div>;
};

export default ServiceIntegration;
