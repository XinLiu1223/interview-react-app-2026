'use client';
import React, { useState, useEffect } from 'react';

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
